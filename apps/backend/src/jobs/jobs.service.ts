import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  NotificationStatus,
  NotificationType,
  ReminderChannel,
  ReminderStatus,
  ScholarshipStatus,
  UserRole,
  VerificationStatus,
} from '@prisma/client';
import { MailerService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly config: ConfigService,
  ) {}

  async runStaleScholarshipCheck(actorId?: string) {
    const staleDays = this.config.get<number>('jobs.staleDays') ?? 30;
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - staleDays);

    const scholarships = await this.prisma.scholarship.findMany({
      where: {
        status: ScholarshipStatus.PUBLISHED,
        OR: [
          { lastReviewedAt: null },
          { lastReviewedAt: { lt: threshold } },
        ],
        verificationStatus: { not: VerificationStatus.FLAGGED_STALE },
      },
      select: { id: true, verificationStatus: true },
    });

    if (!scholarships.length) {
      return { flaggedCount: 0, staleDays };
    }

    const systemActorId = actorId ?? (await this.getSystemActorId());

    await this.prisma.$transaction(async (tx) => {
      await tx.scholarship.updateMany({
        where: { id: { in: scholarships.map((s) => s.id) } },
        data: { verificationStatus: VerificationStatus.FLAGGED_STALE },
      });

      if (systemActorId) {
        for (const scholarship of scholarships) {
          await tx.verificationReview.create({
            data: {
              scholarshipId: scholarship.id,
              reviewerId: systemActorId,
              previousStatus: scholarship.verificationStatus,
              newStatus: VerificationStatus.FLAGGED_STALE,
              note: `Auto-flagged stale after ${staleDays} days without review`,
            },
          });
          await tx.moderationActionLog.create({
            data: {
              actorId: systemActorId,
              entityType: 'scholarship',
              entityId: scholarship.id,
              action: 'auto_flag_stale',
              metadata: { staleDays },
            },
          });
        }
      }
    });

    this.logger.log(`Flagged ${scholarships.length} stale scholarships`);
    return { flaggedCount: scholarships.length, staleDays };
  }

  async runReminderSender() {
    const frontendUrl = this.config.get<string>('frontendUrl') ?? 'http://localhost:5173';
    const now = new Date();

    const dueReminders = await this.prisma.userReminder.findMany({
      where: {
        status: ReminderStatus.PENDING,
        reminderAt: { lte: now },
      },
      include: {
        user: { select: { id: true, email: true, name: true } },
        scholarship: {
          select: { id: true, slug: true, title: true, deadlineAt: true },
        },
      },
      take: 100,
    });

    let sent = 0;
    let failed = 0;

    for (const reminder of dueReminders) {
      const log = await this.prisma.notificationLog.create({
        data: {
          userId: reminder.userId,
          type: NotificationType.REMINDER,
          channel: reminder.channel,
          payload: {
            reminderId: reminder.id,
            scholarshipId: reminder.scholarshipId,
          },
          status: NotificationStatus.PENDING,
        },
      });

      try {
        await this.mailer.sendReminderEmail(reminder.user.email, {
          scholarshipTitle: reminder.scholarship.title,
          deadlineAt: reminder.scholarship.deadlineAt.toISOString().slice(0, 10),
          scholarshipUrl: `${frontendUrl}/scholarships/${reminder.scholarship.slug}`,
        });

        await this.prisma.$transaction([
          this.prisma.userReminder.update({
            where: { id: reminder.id },
            data: { status: ReminderStatus.SENT, sentAt: new Date() },
          }),
          this.prisma.notificationLog.update({
            where: { id: log.id },
            data: { status: NotificationStatus.SENT, sentAt: new Date() },
          }),
        ]);
        sent += 1;
      } catch (error) {
        failed += 1;
        await this.prisma.$transaction([
          this.prisma.userReminder.update({
            where: { id: reminder.id },
            data: { status: ReminderStatus.FAILED },
          }),
          this.prisma.notificationLog.update({
            where: { id: log.id },
            data: {
              status: NotificationStatus.FAILED,
              error: error instanceof Error ? error.message : 'Unknown error',
            },
          }),
        ]);
      }
    }

    return { processed: dueReminders.length, sent, failed };
  }

  async runDigestSender() {
    const frontendUrl = this.config.get<string>('frontendUrl') ?? 'http://localhost:5173';
    const windowStart = new Date();
    const windowEnd = new Date();
    windowEnd.setDate(windowEnd.getDate() + 14);

    const users = await this.prisma.user.findMany({
      where: {
        isActive: true,
        preference: { emailDigestEnabled: true },
      },
      select: {
        id: true,
        email: true,
        name: true,
        savedScholarships: {
          include: {
            scholarship: {
              select: {
                slug: true,
                title: true,
                deadlineAt: true,
                status: true,
              },
            },
          },
        },
      },
    });

    let sent = 0;
    let skipped = 0;

    for (const user of users) {
      const items = user.savedScholarships
        .map((saved) => saved.scholarship)
        .filter(
          (scholarship) =>
            scholarship.status === ScholarshipStatus.PUBLISHED &&
            scholarship.deadlineAt >= windowStart &&
            scholarship.deadlineAt <= windowEnd,
        )
        .map((scholarship) => ({
          title: scholarship.title,
          deadlineAt: scholarship.deadlineAt.toISOString().slice(0, 10),
          url: `${frontendUrl}/scholarships/${scholarship.slug}`,
        }));

      if (!items.length) {
        skipped += 1;
        continue;
      }

      const log = await this.prisma.notificationLog.create({
        data: {
          userId: user.id,
          type: NotificationType.DIGEST,
          channel: ReminderChannel.EMAIL,
          payload: { itemCount: items.length },
          status: NotificationStatus.PENDING,
        },
      });

      try {
        await this.mailer.sendDigestEmail(user.email, {
          userName: user.name ?? 'Student',
          items,
        });
        await this.prisma.notificationLog.update({
          where: { id: log.id },
          data: { status: NotificationStatus.SENT, sentAt: new Date() },
        });
        sent += 1;
      } catch (error) {
        await this.prisma.notificationLog.update({
          where: { id: log.id },
          data: {
            status: NotificationStatus.FAILED,
            error: error instanceof Error ? error.message : 'Unknown error',
          },
        });
      }
    }

    return { users: users.length, sent, skipped };
  }

  async runNotificationRetry() {
    const maxRetries =
      this.config.get<number>('jobs.notificationMaxRetries') ?? 3;

    const failedLogs = await this.prisma.notificationLog.findMany({
      where: { status: NotificationStatus.FAILED },
      include: { user: { select: { email: true, name: true } } },
      take: 50,
      orderBy: { createdAt: 'asc' },
    });

    let retried = 0;
    let succeeded = 0;

    for (const log of failedLogs) {
      const payload = log.payload as Record<string, unknown> & {
        retryCount?: number;
        reminderId?: string;
        scholarshipId?: string;
        itemCount?: number;
      };
      const retryCount = payload.retryCount ?? 0;
      if (retryCount >= maxRetries || !log.user?.email) {
        continue;
      }

      retried += 1;

      try {
        if (log.type === NotificationType.REMINDER && payload.reminderId) {
          const reminder = await this.prisma.userReminder.findUnique({
            where: { id: payload.reminderId as string },
            include: {
              scholarship: { select: { slug: true, title: true, deadlineAt: true } },
            },
          });
          if (!reminder) continue;

          const frontendUrl =
            this.config.get<string>('frontendUrl') ?? 'http://localhost:5173';
          await this.mailer.sendReminderEmail(log.user.email, {
            scholarshipTitle: reminder.scholarship.title,
            deadlineAt: reminder.scholarship.deadlineAt.toISOString().slice(0, 10),
            scholarshipUrl: `${frontendUrl}/scholarships/${reminder.scholarship.slug}`,
          });

          await this.prisma.userReminder.update({
            where: { id: reminder.id },
            data: { status: ReminderStatus.SENT, sentAt: new Date() },
          });
        }

        await this.prisma.notificationLog.update({
          where: { id: log.id },
          data: {
            status: NotificationStatus.SENT,
            sentAt: new Date(),
            error: null,
            payload: { ...payload, retryCount: retryCount + 1 },
          },
        });
        succeeded += 1;
      } catch (error) {
        await this.prisma.notificationLog.update({
          where: { id: log.id },
          data: {
            error: error instanceof Error ? error.message : 'Retry failed',
            payload: { ...payload, retryCount: retryCount + 1 },
          },
        });
      }
    }

    return { retried, succeeded, maxRetries };
  }

  private async getSystemActorId() {
    const admin = await this.prisma.user.findFirst({
      where: { role: UserRole.ADMIN, isActive: true },
      select: { id: true },
    });
    return admin?.id ?? null;
  }
}
