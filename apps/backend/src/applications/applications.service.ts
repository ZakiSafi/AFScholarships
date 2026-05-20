import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnerApplicationDto } from './dto/create-partner-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async applyToPartnerScholarship(
    scholarshipId: string,
    userId: string,
    payload: CreatePartnerApplicationDto,
  ) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id: scholarshipId },
    });
    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }
    if (!scholarship.isPartnerApplication) {
      throw new BadRequestException(
        'This scholarship only supports external application',
      );
    }

    return this.prisma.partnerApplication.create({
      data: {
        scholarshipId,
        userId,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        country: payload.country,
        educationLevel: payload.educationLevel,
        statement: payload.statement,
        docsUrls: payload.docsUrls ?? [],
      },
    });
  }

  async listMine(userId: string) {
    return this.prisma.partnerApplication.findMany({
      where: { userId },
      include: {
        scholarship: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
