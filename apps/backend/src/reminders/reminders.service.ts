import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReminderStatus, ScholarshipStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    scholarshipId: string,
    payload: CreateReminderDto,
  ) {
    const scholarship = await this.prisma.scholarship.findFirst({
      where: {
        id: scholarshipId,
        status: ScholarshipStatus.PUBLISHED,
      },
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

  async listMine(userId: string) {
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

  async update(
    reminderId: string,
    userId: string,
    payload: UpdateReminderDto,
  ) {
    const reminder = await this.findOwnedReminder(reminderId, userId);

    if (reminder.status === ReminderStatus.SENT) {
      throw new ForbiddenException('Cannot update a sent reminder');
    }

    return this.prisma.userReminder.update({
      where: { id: reminderId },
      data: { reminderAt: new Date(payload.reminderAt) },
      include: { scholarship: true },
    });
  }

  async remove(reminderId: string, userId: string) {
    await this.findOwnedReminder(reminderId, userId);
    await this.prisma.userReminder.delete({ where: { id: reminderId } });
    return { success: true };
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

  private async findOwnedReminder(reminderId: string, userId: string) {
    const reminder = await this.prisma.userReminder.findUnique({
      where: { id: reminderId },
    });
    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }
    if (reminder.userId !== userId) {
      throw new ForbiddenException('Not your reminder');
    }
    return reminder;
  }
}
