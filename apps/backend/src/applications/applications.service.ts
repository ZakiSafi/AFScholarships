import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ApplicationStatus,
  ScholarshipStatus,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnerApplicationDto } from './dto/create-partner-application.dto';

const applicationInclude = {
  scholarship: {
    select: {
      id: true,
      slug: true,
      title: true,
      provider: true,
      deadlineAt: true,
      isPartnerApplication: true,
    },
  },
  statusLogs: { orderBy: { createdAt: 'asc' as const } },
  answers: true,
  attachments: true,
};

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async applyToPartnerScholarship(
    scholarshipId: string,
    userId: string,
    payload: CreatePartnerApplicationDto,
  ) {
    const scholarship = await this.prisma.scholarship.findFirst({
      where: {
        id: scholarshipId,
        status: ScholarshipStatus.PUBLISHED,
      },
    });
    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }
    if (!scholarship.isPartnerApplication) {
      throw new BadRequestException(
        'This scholarship only supports external application',
      );
    }

    const existing = await this.prisma.partnerApplication.findFirst({
      where: { scholarshipId, userId },
    });
    if (existing) {
      throw new BadRequestException(
        'You already submitted an application for this scholarship',
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
        answers: payload.answers
          ? {
              create: payload.answers.map((item) => ({
                questionKey: item.questionKey,
                answer: item.answer,
              })),
            }
          : undefined,
        statusLogs: {
          create: {
            toStatus: ApplicationStatus.SUBMITTED,
            note: 'Application submitted',
          },
        },
      },
      include: applicationInclude,
    });
  }

  async listMine(userId: string) {
    return this.prisma.partnerApplication.findMany({
      where: { userId },
      include: applicationInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(applicationId: string, userId: string, isAdmin: boolean) {
    const application = await this.prisma.partnerApplication.findUnique({
      where: { id: applicationId },
      include: {
        ...applicationInclude,
        user: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (!isAdmin && application.userId !== userId) {
      throw new ForbiddenException('Not your application');
    }

    return application;
  }
}
