"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const jobs_service_1 = require("../jobs/jobs.service");
const prisma_service_1 = require("../prisma/prisma.service");
const reports_service_1 = require("../reports/reports.service");
let AdminService = class AdminService {
    prisma;
    jobsService;
    reportsService;
    constructor(prisma, jobsService, reportsService) {
        this.prisma = prisma;
        this.jobsService = jobsService;
        this.reportsService = reportsService;
    }
    listReports(status) {
        return this.reportsService.listForModeration(status);
    }
    async resolveReport(reportId, status, reviewerId) {
        if (status === client_1.ReportStatus.OPEN) {
            throw new common_1.BadRequestException('Resolution status cannot be OPEN');
        }
        return this.prisma.$transaction(async (tx) => {
            const report = await tx.listingReport.update({
                where: { id: reportId },
                data: {
                    status,
                    reviewedById: reviewerId,
                    resolvedAt: new Date(),
                },
            });
            await tx.moderationActionLog.create({
                data: {
                    actorId: reviewerId,
                    entityType: 'listing_report',
                    entityId: reportId,
                    action: status === client_1.ReportStatus.RESOLVED ? 'resolve' : 'dismiss',
                    metadata: { status },
                },
            });
            return report;
        });
    }
    listApplications(status) {
        return this.prisma.partnerApplication.findMany({
            where: status ? { status } : undefined,
            include: {
                scholarship: {
                    select: { id: true, slug: true, title: true, provider: true },
                },
                user: {
                    select: { id: true, email: true, name: true },
                },
                statusLogs: { orderBy: { createdAt: 'desc' }, take: 1 },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateApplicationStatus(applicationId, payload, reviewerId) {
        const application = await this.prisma.partnerApplication.findUnique({
            where: { id: applicationId },
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.partnerApplication.update({
                where: { id: applicationId },
                data: {
                    status: payload.status,
                    reviewedById: reviewerId,
                    reviewedAt: new Date(),
                },
                include: {
                    scholarship: true,
                    user: { select: { id: true, email: true, name: true } },
                    statusLogs: { orderBy: { createdAt: 'asc' } },
                },
            });
            await tx.partnerApplicationStatusLog.create({
                data: {
                    applicationId,
                    fromStatus: application.status,
                    toStatus: payload.status,
                    note: payload.note,
                    changedById: reviewerId,
                },
            });
            await tx.moderationActionLog.create({
                data: {
                    actorId: reviewerId,
                    entityType: 'partner_application',
                    entityId: applicationId,
                    action: 'status_update',
                    metadata: {
                        fromStatus: application.status,
                        toStatus: payload.status,
                        note: payload.note,
                    },
                },
            });
            return updated;
        });
    }
    async listAuditLogs(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (query.entityType) {
            where.entityType = query.entityType;
        }
        if (query.entityId) {
            where.entityId = query.entityId;
        }
        const [items, total] = await this.prisma.$transaction([
            this.prisma.moderationActionLog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    actor: { select: { id: true, email: true, name: true } },
                },
            }),
            this.prisma.moderationActionLog.count({ where }),
        ]);
        return {
            items,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
    async flagStaleScholarships(staleDays = 30, actorId) {
        void staleDays;
        return this.jobsService.runStaleScholarshipCheck(actorId);
    }
    async bulkVerify(payload, reviewerId) {
        const status = payload.status ?? client_1.VerificationStatus.VERIFIED;
        const results = [];
        for (const id of payload.scholarshipIds) {
            try {
                const scholarship = await this.prisma.scholarship.findUnique({
                    where: { id },
                });
                if (!scholarship) {
                    results.push({ id, success: false, error: 'Not found' });
                    continue;
                }
                await this.prisma.$transaction(async (tx) => {
                    await tx.scholarship.update({
                        where: { id },
                        data: {
                            verificationStatus: status,
                            verifiedAt: status === client_1.VerificationStatus.VERIFIED ? new Date() : null,
                            lastReviewedAt: new Date(),
                        },
                    });
                    await tx.verificationReview.create({
                        data: {
                            scholarshipId: id,
                            reviewerId,
                            previousStatus: scholarship.verificationStatus,
                            newStatus: status,
                            note: payload.note,
                        },
                    });
                    await tx.moderationActionLog.create({
                        data: {
                            actorId: reviewerId,
                            entityType: 'scholarship',
                            entityId: id,
                            action: 'bulk_verify',
                            metadata: { status, note: payload.note },
                        },
                    });
                });
                results.push({ id, success: true });
            }
            catch (error) {
                results.push({
                    id,
                    success: false,
                    error: error instanceof Error ? error.message : 'Failed',
                });
            }
        }
        return {
            total: payload.scholarshipIds.length,
            succeeded: results.filter((r) => r.success).length,
            failed: results.filter((r) => !r.success).length,
            results,
        };
    }
    async bulkArchiveExpired(payload, actorId) {
        const now = new Date();
        const where = {
            status: client_1.ScholarshipStatus.PUBLISHED,
            deadlineAt: { lt: now },
        };
        const expired = await this.prisma.scholarship.findMany({
            where,
            select: { id: true, slug: true, title: true },
        });
        if (payload.dryRun) {
            return { dryRun: true, count: expired.length, scholarships: expired };
        }
        if (!expired.length) {
            return { archivedCount: 0, scholarships: [] };
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.scholarship.updateMany({
                where: { id: { in: expired.map((s) => s.id) } },
                data: { status: client_1.ScholarshipStatus.ARCHIVED },
            });
            for (const scholarship of expired) {
                await tx.moderationActionLog.create({
                    data: {
                        actorId,
                        entityType: 'scholarship',
                        entityId: scholarship.id,
                        action: 'bulk_archive_expired',
                        metadata: { slug: scholarship.slug, title: scholarship.title },
                    },
                });
            }
        });
        return {
            archivedCount: expired.length,
            scholarships: expired,
        };
    }
    async runJob(job, actorId) {
        switch (job) {
            case 'stale-scholarships':
                return this.jobsService.runStaleScholarshipCheck(actorId);
            case 'reminder-sender':
                return this.jobsService.runReminderSender();
            case 'digest-sender':
                return this.jobsService.runDigestSender();
            case 'notification-retry':
                return this.jobsService.runNotificationRetry();
            default:
                throw new common_1.BadRequestException(`Unknown job: ${job}`);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jobs_service_1.JobsService,
        reports_service_1.ReportsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map