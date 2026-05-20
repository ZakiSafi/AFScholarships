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
exports.SavedItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SavedItemsService = class SavedItemsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listForUser(userId) {
        return this.prisma.savedScholarship.findMany({
            where: { userId },
            include: {
                scholarship: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async save(userId, scholarshipId) {
        const scholarship = await this.prisma.scholarship.findUnique({
            where: { id: scholarshipId },
            select: { id: true },
        });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        return this.prisma.savedScholarship.upsert({
            where: {
                userId_scholarshipId: {
                    userId,
                    scholarshipId,
                },
            },
            create: {
                userId,
                scholarshipId,
            },
            update: {},
        });
    }
    async remove(userId, scholarshipId) {
        await this.prisma.savedScholarship.delete({
            where: {
                userId_scholarshipId: {
                    userId,
                    scholarshipId,
                },
            },
        });
        return { success: true };
    }
};
exports.SavedItemsService = SavedItemsService;
exports.SavedItemsService = SavedItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SavedItemsService);
//# sourceMappingURL=saved-items.service.js.map