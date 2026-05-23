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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const applicationInclude = {
    scholarship: {
        select: {
            id: true,
            slug: true,
            title: true,
            provider: true,
            deadlineAt: true,
            isPartnerApplication: true,
        },
    },
    statusLogs: { orderBy: { createdAt: 'asc' } },
    answers: true,
    attachments: true,
};
let ApplicationsService = class ApplicationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async applyToPartnerScholarship(scholarshipId, userId, payload) {
        const scholarship = await this.prisma.scholarship.findFirst({
            where: {
                id: scholarshipId,
                status: client_1.ScholarshipStatus.PUBLISHED,
            },
        });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        if (!scholarship.isPartnerApplication) {
            throw new common_1.BadRequestException('This scholarship only supports external application');
        }
        const existing = await this.prisma.partnerApplication.findFirst({
            where: { scholarshipId, userId },
        });
        if (existing) {
            throw new common_1.BadRequestException('You already submitted an application for this scholarship');
        }
        return this.prisma.partnerApplication.create({
            data: {
                scholarshipId,
                userId,
                fullName: payload.fullName,
                email: payload.email,
                phone: payload.phone,
                country: payload.country,
                educationLevel: payload.educationLevel,
                statement: payload.statement,
                docsUrls: payload.docsUrls ?? [],
                answers: payload.answers
                    ? {
                        create: payload.answers.map((item) => ({
                            questionKey: item.questionKey,
                            answer: item.answer,
                        })),
                    }
                    : undefined,
                statusLogs: {
                    create: {
                        toStatus: client_1.ApplicationStatus.SUBMITTED,
                        note: 'Application submitted',
                    },
                },
            },
            include: applicationInclude,
        });
    }
    async listMine(userId) {
        return this.prisma.partnerApplication.findMany({
            where: { userId },
            include: applicationInclude,
            orderBy: { createdAt: 'desc' },
        });
    }
    async getById(applicationId, userId, isAdmin) {
        const application = await this.prisma.partnerApplication.findUnique({
            where: { id: applicationId },
            include: {
                ...applicationInclude,
                user: {
                    select: { id: true, email: true, name: true },
                },
            },
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (!isAdmin && application.userId !== userId) {
            throw new common_1.ForbiddenException('Not your application');
        }
        return application;
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map