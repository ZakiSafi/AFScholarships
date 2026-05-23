import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {
  ApplicationStatus,
  Prisma,
  ReportStatus,
  VerificationStatus,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateApplicationStatusDto } from '../applications/dto/update-application-status.dto';
import { ListAuditLogsDto } from './dto/list-audit-logs.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  listReports(status?: ReportStatus) {
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
        verificationStatus: VerificationStatus.FLAGGED_STALE,
      },
    });

    return { flaggedCount: result.count, staleDays };
  }
}
