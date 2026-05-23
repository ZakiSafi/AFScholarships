import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ReportListingDto } from '../scholarships/dto/report-listing.dto';

/**
 * Trust & moderation reports (listing reports from students).
 * Admin resolution lives under AdminModule; this service owns report creation and reads.
 */
@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    scholarshipId: string,
    payload: ReportListingDto,
    userId?: string,
  ) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id: scholarshipId },
      select: { id: true },
    });
    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }

    return this.prisma.listingReport.create({
      data: {
        scholarshipId,
        userId,
        reason: payload.reason,
        details: payload.details,
      },
    });
  }

  listForModeration(status?: ReportStatus) {
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
        user: { select: { id: true, email: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
