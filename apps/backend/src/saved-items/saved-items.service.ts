import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ScholarshipStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SavedItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async listForUser(userId: string) {
    return this.prisma.savedScholarship.findMany({
      where: { userId },
      include: {
        scholarship: {
          select: {
            id: true,
            slug: true,
            title: true,
            summary: true,
            provider: true,
            hostCountry: true,
            degreeLevel: true,
            fundingType: true,
            deadlineAt: true,
            verificationStatus: true,
            isPartnerApplication: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async isSaved(userId: string, scholarshipId: string) {
    const record = await this.prisma.savedScholarship.findUnique({
      where: {
        userId_scholarshipId: { userId, scholarshipId },
      },
    });
    return { saved: Boolean(record), savedAt: record?.createdAt ?? null };
  }

  async save(userId: string, scholarshipId: string) {
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

    return this.prisma.savedScholarship.upsert({
      where: {
        userId_scholarshipId: { userId, scholarshipId },
      },
      create: { userId, scholarshipId },
      update: {},
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

  async remove(userId: string, scholarshipId: string) {
    try {
      await this.prisma.savedScholarship.delete({
        where: {
          userId_scholarshipId: { userId, scholarshipId },
        },
      });
    } catch {
      throw new NotFoundException('Saved scholarship not found');
    }
    return { success: true };
  }
}
