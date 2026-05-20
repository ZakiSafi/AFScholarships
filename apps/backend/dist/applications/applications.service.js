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
const prisma_service_1 = require("../prisma/prisma.service");
let ApplicationsService = class ApplicationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async applyToPartnerScholarship(scholarshipId, userId, payload) {
        const scholarship = await this.prisma.scholarship.findUnique({
            where: { id: scholarshipId },
        });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        if (!scholarship.isPartnerApplication) {
            throw new common_1.BadRequestException('This scholarship only supports external application');
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
            },
        });
    }
    async listMine(userId) {
        return this.prisma.partnerApplication.findMany({
            where: { userId },
            include: {
                scholarship: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map