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
                scholarship: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async resolveReport(reportId, status, reviewerId) {
        if (status === client_1.ReportStatus.OPEN) {
            throw new common_1.BadRequestException('Resolution status cannot be OPEN');
        }
        return this.prisma.listingReport.update({
            where: { id: reportId },
            data: {
                status,
                reviewedById: reviewerId,
                resolvedAt: new Date(),
            },
        });
    }
    async flagStaleScholarships(staleDays = 30) {
        const threshold = new Date();
        threshold.setDate(threshold.getDate() - staleDays);
        const result = await this.prisma.scholarship.updateMany({
            where: {
                OR: [
                    { lastReviewedAt: null },
                    {
                        lastReviewedAt: {
                            lt: threshold,
                        },
                    },
                ],
            },
            data: {
                verificationStatus: client_1.VerificationStatus.FLAGGED_STALE,
            },
        });
        return {
            flaggedCount: result.count,
            staleDays,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map