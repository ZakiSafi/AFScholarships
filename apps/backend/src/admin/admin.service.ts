import { BadRequestException, Injectable } from '@nestjs/common';
import { ReportStatus, VerificationStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  listReports(status?: ReportStatus) {
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

  async resolveReport(
    reportId: string,
    status: ReportStatus,
    reviewerId: string,
  ) {
    if (status === ReportStatus.OPEN) {
      throw new BadRequestException('Resolution status cannot be OPEN');
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
        verificationStatus: VerificationStatus.FLAGGED_STALE,
      },
    });

    return {
      flaggedCount: result.count,
      staleDays,
    };
  }
}
