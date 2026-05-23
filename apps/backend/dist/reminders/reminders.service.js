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
exports.RemindersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let RemindersService = class RemindersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, scholarshipId, payload) {
        const scholarship = await this.prisma.scholarship.findFirst({
            where: {
                id: scholarshipId,
                status: client_1.ScholarshipStatus.PUBLISHED,
            },
            select: { id: true },
        });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        return this.prisma.userReminder.create({
            data: {
                userId,
                scholarshipId,
                reminderAt: new Date(payload.reminderAt),
            },
            include: {
                scholarship: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        deadlineAt: true,
                    },
                },
            },
        });
    }
    async listMine(userId) {
        return this.prisma.userReminder.findMany({
            where: { userId },
            include: {
                scholarship: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        provider: true,
                        deadlineAt: true,
                        hostCountry: true,
                    },
                },
            },
            orderBy: { reminderAt: 'asc' },
        });
    }
    async update(reminderId, userId, payload) {
        const reminder = await this.findOwnedReminder(reminderId, userId);
        if (reminder.status === client_1.ReminderStatus.SENT) {
            throw new common_1.ForbiddenException('Cannot update a sent reminder');
        }
        return this.prisma.userReminder.update({
            where: { id: reminderId },
            data: { reminderAt: new Date(payload.reminderAt) },
            include: { scholarship: true },
        });
    }
    async remove(reminderId, userId) {
        await this.findOwnedReminder(reminderId, userId);
        await this.prisma.userReminder.delete({ where: { id: reminderId } });
        return { success: true };
    }
    async markSent(reminderId) {
        return this.prisma.userReminder.update({
            where: { id: reminderId },
            data: {
                status: client_1.ReminderStatus.SENT,
                sentAt: new Date(),
            },
        });
    }
    async findOwnedReminder(reminderId, userId) {
        const reminder = await this.prisma.userReminder.findUnique({
            where: { id: reminderId },
        });
        if (!reminder) {
            throw new common_1.NotFoundException('Reminder not found');
        }
        if (reminder.userId !== userId) {
            throw new common_1.ForbiddenException('Not your reminder');
        }
        return reminder;
    }
};
exports.RemindersService = RemindersService;
exports.RemindersService = RemindersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RemindersService);
//# sourceMappingURL=reminders.service.js.map