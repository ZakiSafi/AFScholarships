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
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    listReports(status) {
        return this.prisma.listingReport.findMany({
            where: status ? { status } : undefined,
            include: {
                scholarship: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        provider: true,
                        verificationStatus: true,
                    },
                },
                user: {
                    select: { id: true, email: true, name: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
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
    async flagStaleScholarships(staleDays = 30) {
        const threshold = new Date();
        threshold.setDate(threshold.getDate() - staleDays);
        const result = await this.prisma.scholarship.updateMany({
            where: {
                OR: [
                    { lastReviewedAt: null },
                    { lastReviewedAt: { lt: threshold } },
                ],
            },
            data: {
                verificationStatus: client_1.VerificationStatus.FLAGGED_STALE,
            },
        });
        return { flaggedCount: result.count, staleDays };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map