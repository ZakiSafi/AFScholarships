import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {
  ApplicationStatus,
  Prisma,
  ReportStatus,
  ScholarshipStatus,
  VerificationStatus,
} from '@prisma/client';
import { JobsService } from '../jobs/jobs.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReportsService } from '../reports/reports.service';
import { UpdateApplicationStatusDto } from '../applications/dto/update-application-status.dto';
import { BulkArchiveExpiredDto } from './dto/bulk-archive.dto';
import { BulkVerifyScholarshipsDto } from './dto/bulk-verify.dto';
import { ListAuditLogsDto } from './dto/list-audit-logs.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jobsService: JobsService,
    private readonly reportsService: ReportsService,
  ) {}

  listReports(status?: ReportStatus) {
    return this.reportsService.listForModeration(status);
  }

  async resolveReport(
    reportId: string,
    status: ReportStatus,
    reviewerId: string,
  ) {
    if (status === ReportStatus.OPEN) {
      throw new BadRequestException('Resolution status cannot be OPEN');
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
          action: status === ReportStatus.RESOLVED ? 'resolve' : 'dismiss',
          metadata: { status },
        },
      });

      return report;
    });
  }

  listApplications(status?: ApplicationStatus) {
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

  async updateApplicationStatus(
    applicationId: string,
    payload: UpdateApplicationStatusDto,
    reviewerId: string,
  ) {
    const application = await this.prisma.partnerApplication.findUnique({
      where: { id: applicationId },
    });
    if (!application) {
      throw new NotFoundException('Application not found');
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

  async listAuditLogs(query: ListAuditLogsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: Prisma.ModerationActionLogWhereInput = {};
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

  async flagStaleScholarships(staleDays = 30, actorId?: string) {
    void staleDays;
    return this.jobsService.runStaleScholarshipCheck(actorId);
  }

  async bulkVerify(payload: BulkVerifyScholarshipsDto, reviewerId: string) {
    const status = payload.status ?? VerificationStatus.VERIFIED;
    const results: { id: string; success: boolean; error?: string }[] = [];

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
              verifiedAt:
                status === VerificationStatus.VERIFIED ? new Date() : null,
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
      } catch (error) {
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

  async bulkArchiveExpired(
    payload: BulkArchiveExpiredDto,
    actorId: string,
  ) {
    const now = new Date();
    const where = {
      status: ScholarshipStatus.PUBLISHED,
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
        data: { status: ScholarshipStatus.ARCHIVED },
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

  async runJob(job: string, actorId?: string) {
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
        throw new BadRequestException(`Unknown job: ${job}`);
    }
  }
}
