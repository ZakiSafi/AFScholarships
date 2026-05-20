import { Injectable, NotFoundException } from '@nestjs/common';
import { ReminderStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    scholarshipId: string,
    payload: CreateReminderDto,
  ) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id: scholarshipId },
      select: { id: true },
    });
    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }

    return this.prisma.userReminder.create({
      data: {
        userId,
        scholarshipId,
        reminderAt: new Date(payload.reminderAt),
      },
    });
  }

  async listMine(userId: string) {
    return this.prisma.userReminder.findMany({
      where: { userId },
      include: { scholarship: true },
      orderBy: { reminderAt: 'asc' },
    });
  }

  async markSent(reminderId: string) {
    return this.prisma.userReminder.update({
      where: { id: reminderId },
      data: {
        status: ReminderStatus.SENT,
        sentAt: new Date(),
      },
    });
  }
}
