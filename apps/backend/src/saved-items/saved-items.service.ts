import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SavedItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async listForUser(userId: string) {
    return this.prisma.savedScholarship.findMany({
      where: { userId },
      include: {
        scholarship: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async save(userId: string, scholarshipId: string) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id: scholarshipId },
      select: { id: true },
    });
    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
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

  async remove(userId: string, scholarshipId: string) {
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
}
