import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import {
  Prisma,
  ScholarshipStatus,
  UserRole,
  VerificationStatus,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AdminListScholarshipsDto } from './dto/list-scholarships.dto';
import {
  ListScholarshipsDto,
  ScholarshipSortField,
  SortOrder,
} from './dto/list-scholarships.dto';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { ReportListingDto } from './dto/report-listing.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import {
  buildNestedCreate,
  replaceNestedContent,
  scholarshipDetailInclude,
} from './scholarships-content.helper';
import {
  SCHOLARSHIP_SEEDS,
  SEED_TAG_DEFINITIONS,
} from './scholarships.seed-data';

@Injectable()
export class ScholarshipsService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedScholarships();
  }

  async list(query: ListScholarshipsDto) {
    return this.queryScholarships(query, { status: ScholarshipStatus.PUBLISHED });
  }

  async adminList(query: AdminListScholarshipsDto) {
    const where: Prisma.ScholarshipWhereInput = {};
    if (query.status) {
      where.status = query.status;
    }
    return this.queryScholarships(query, where);
  }

  async getFacets() {
    const baseWhere: Prisma.ScholarshipWhereInput = {
      status: ScholarshipStatus.PUBLISHED,
    };

    const published = await this.prisma.scholarship.findMany({
      where: baseWhere,
      select: {
        hostCountry: true,
        degreeLevel: true,
        fundingType: true,
        fieldOfStudy: true,
        isPartnerApplication: true,
        verificationStatus: true,
        tags: { select: { tag: { select: { slug: true, name: true } } } },
      },
    });

    const countBy = <T extends string>(
      items: T[],
    ): { value: T; count: number }[] => {
      const map = new Map<T, number>();
      for (const item of items) {
        map.set(item, (map.get(item) ?? 0) + 1);
      }
      return [...map.entries()]
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count);
    };

    const tagMap = new Map<string, { slug: string; name: string; count: number }>();
    for (const row of published) {
      for (const { tag } of row.tags) {
        const existing = tagMap.get(tag.slug);
        if (existing) {
          existing.count += 1;
        } else {
          tagMap.set(tag.slug, { slug: tag.slug, name: tag.name, count: 1 });
        }
      }
    }

    const fieldCounts = new Map<string, number>();
    for (const row of published) {
      for (const field of row.fieldOfStudy) {
        fieldCounts.set(field, (fieldCounts.get(field) ?? 0) + 1);
      }
    }

    return {
      countries: countBy(published.map((s) => s.hostCountry)),
      degreeLevels: countBy(published.map((s) => s.degreeLevel)),
      fundingTypes: countBy(published.map((s) => s.fundingType)),
      verificationStatuses: countBy(published.map((s) => s.verificationStatus)),
      partnerApplication: {
        inPlatform: published.filter((s) => s.isPartnerApplication).length,
        external: published.filter((s) => !s.isPartnerApplication).length,
      },
      fieldsOfStudy: [...fieldCounts.entries()]
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count),
      tags: [...tagMap.values()].sort((a, b) => b.count - a.count),
      total: published.length,
    };
  }

  async getBySlug(slug: string) {
    const scholarship = await this.prisma.scholarship.findFirst({
      where: { slug, status: ScholarshipStatus.PUBLISHED },
      include: scholarshipDetailInclude,
    });

    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }

    return scholarship;
  }

  async getRelated(slug: string, limit = 4) {
    const current = await this.prisma.scholarship.findFirst({
      where: { slug, status: ScholarshipStatus.PUBLISHED },
      select: {
        id: true,
        hostCountry: true,
        degreeLevel: true,
        fundingType: true,
        fieldOfStudy: true,
      },
    });

    if (!current) {
      throw new NotFoundException('Scholarship not found');
    }

    const items = await this.prisma.scholarship.findMany({
      where: {
        status: ScholarshipStatus.PUBLISHED,
        id: { not: current.id },
        OR: [
          { hostCountry: current.hostCountry },
          { degreeLevel: current.degreeLevel },
          { fundingType: current.fundingType },
          ...(current.fieldOfStudy.length
            ? [{ fieldOfStudy: { hasSome: current.fieldOfStudy } }]
            : []),
        ],
      },
      take: limit,
      orderBy: [{ isFeatured: 'desc' }, { deadlineAt: 'asc' }],
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
        isFeatured: true,
        isPartnerApplication: true,
      },
    });

    return { items, total: items.length };
  }

  async create(payload: CreateScholarshipDto, userId: string) {
    if (!payload.isPartnerApplication && !payload.applicationUrl) {
      throw new BadRequestException(
        'applicationUrl is required for non-partner scholarships',
      );
    }

    const nested = buildNestedCreate(payload);

    return this.prisma.scholarship.create({
      data: {
        ...nested,
        slug: payload.slug,
        title: payload.title,
        summary: payload.summary,
        description: payload.description,
        provider: payload.provider,
        hostCountry: payload.hostCountry,
        degreeLevel: payload.degreeLevel,
        fundingType: payload.fundingType,
        languageRequirement: payload.languageRequirement,
        fieldOfStudy: payload.fieldOfStudy ?? [],
        eligibleCountries: payload.eligibleCountries ?? [],
        minAge: payload.minAge,
        maxAge: payload.maxAge,
        applicationUrl: payload.applicationUrl,
        isPartnerApplication: payload.isPartnerApplication ?? false,
        status: ScholarshipStatus.DRAFT,
        startsAt: payload.startsAt ? new Date(payload.startsAt) : null,
        deadlineAt: new Date(payload.deadlineAt),
        deadlineTimezone: payload.deadlineTimezone ?? 'UTC',
        isFeatured: payload.isFeatured ?? false,
        createdById: userId,
      },
      include: scholarshipDetailInclude,
    });
  }

  async update(id: string, payload: UpdateScholarshipDto) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id },
    });
    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }

    const { steps, requirements, benefits, faqs, sources, tags, ...scalar } =
      payload;

    const hasNestedContent =
      steps !== undefined ||
      requirements !== undefined ||
      benefits !== undefined ||
      faqs !== undefined ||
      sources !== undefined ||
      tags !== undefined;

    return this.prisma.$transaction(async (tx) => {
      if (hasNestedContent) {
        await replaceNestedContent(tx, id, {
          steps,
          requirements,
          benefits,
          faqs,
          sources,
          tags,
        });
      }

      return tx.scholarship.update({
        where: { id },
        data: {
          ...scalar,
          startsAt: scalar.startsAt ? new Date(scalar.startsAt) : undefined,
          deadlineAt: scalar.deadlineAt
            ? new Date(scalar.deadlineAt)
            : undefined,
        },
        include: scholarshipDetailInclude,
      });
    });
  }

  async publish(id: string, actorId: string) {
    return this.setStatus(id, ScholarshipStatus.PUBLISHED, actorId, 'publish');
  }

  async archive(id: string, actorId: string) {
    return this.setStatus(id, ScholarshipStatus.ARCHIVED, actorId, 'archive');
  }

  async verify(
    id: string,
    status: VerificationStatus,
    reviewerId?: string,
  ) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id },
    });
    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.scholarship.update({
        where: { id },
        data: {
          verificationStatus: status,
          verifiedAt:
            status === VerificationStatus.VERIFIED ? new Date() : null,
          lastReviewedAt: new Date(),
        },
        include: scholarshipDetailInclude,
      });

      if (reviewerId) {
        await tx.verificationReview.create({
          data: {
            scholarshipId: id,
            reviewerId,
            previousStatus: scholarship.verificationStatus,
            newStatus: status,
          },
        });

        await tx.moderationActionLog.create({
          data: {
            actorId: reviewerId,
            entityType: 'scholarship',
            entityId: id,
            action: 'verify',
            metadata: {
              previousStatus: scholarship.verificationStatus,
              newStatus: status,
            },
          },
        });
      }

      return updated;
    });
  }

  async createReport(
    scholarshipId: string,
    payload: ReportListingDto,
    userId?: string,
  ) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id: scholarshipId },
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

  private async setStatus(
    id: string,
    status: ScholarshipStatus,
    actorId: string,
    action: string,
  ) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id },
    });
    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }

    if (status === ScholarshipStatus.PUBLISHED && !scholarship.deadlineAt) {
      throw new BadRequestException('Cannot publish without a deadline');
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.scholarship.update({
        where: { id },
        data: { status },
        include: scholarshipDetailInclude,
      });

      await tx.moderationActionLog.create({
        data: {
          actorId,
          entityType: 'scholarship',
          entityId: id,
          action,
          metadata: {
            previousStatus: scholarship.status,
            newStatus: status,
          },
        },
      });

      return updated;
    });
  }

  private async queryScholarships(
    query: ListScholarshipsDto,
    baseWhere: Prisma.ScholarshipWhereInput,
  ) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;
    const where = this.buildWhere(query, baseWhere);
    const orderBy = this.buildOrderBy(query.sortBy, query.sortOrder);

    const [items, total] = await this.prisma.$transaction([
      this.prisma.scholarship.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          tags: { include: { tag: true } },
        },
      }),
      this.prisma.scholarship.count({ where }),
    ]);

    const facets = query.includeFacets ? await this.getFacets() : undefined;

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
      ...(facets ? { facets } : {}),
    };
  }

  private buildWhere(
    query: ListScholarshipsDto,
    baseWhere: Prisma.ScholarshipWhereInput,
  ): Prisma.ScholarshipWhereInput {
    const where: Prisma.ScholarshipWhereInput = { ...baseWhere };

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { summary: { contains: query.search, mode: 'insensitive' } },
        { provider: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.country) {
      where.hostCountry = { equals: query.country, mode: 'insensitive' };
    }
    if (query.degreeLevel) {
      where.degreeLevel = query.degreeLevel;
    }
    if (query.fundingType) {
      where.fundingType = query.fundingType;
    }
    if (query.eligibleCountry) {
      where.eligibleCountries = { has: query.eligibleCountry };
    }
    if (query.fieldOfStudy) {
      where.fieldOfStudy = { has: query.fieldOfStudy };
    }
    if (query.tag) {
      where.tags = { some: { tag: { slug: query.tag } } };
    }
    if (query.partnerOnly) {
      where.isPartnerApplication = true;
    }
    if (query.verificationStatus) {
      where.verificationStatus = query.verificationStatus;
    }

    return where;
  }

  private buildOrderBy(
    sortBy?: ScholarshipSortField,
    sortOrder?: SortOrder,
  ): Prisma.ScholarshipOrderByWithRelationInput[] {
    const direction = sortOrder === SortOrder.DESC ? 'desc' : 'asc';

    switch (sortBy) {
      case ScholarshipSortField.TITLE:
        return [{ title: direction }];
      case ScholarshipSortField.CREATED:
        return [{ createdAt: direction }];
      case ScholarshipSortField.FEATURED:
        return [{ isFeatured: 'desc' }, { deadlineAt: 'asc' }];
      case ScholarshipSortField.DEADLINE:
      default:
        return [{ isFeatured: 'desc' }, { deadlineAt: direction }];
    }
  }

  private resolveSeedDeadline(month: number, day: number): Date {
    const now = new Date();
    const year = now.getUTCFullYear();
    let deadline = new Date(Date.UTC(year, month - 1, day));
    if (deadline < now) {
      deadline = new Date(Date.UTC(year + 1, month - 1, day));
    }
    return deadline;
  }

  private async seedScholarships() {
    const admin = await this.prisma.user.findFirst({
      where: { role: UserRole.ADMIN },
      select: { id: true },
    });

    for (const seed of SCHOLARSHIP_SEEDS) {
      const deadlineAt = this.resolveSeedDeadline(
        seed.deadlineMonth,
        seed.deadlineDay,
      );
      const now = new Date();

      const nestedContent = {
        requirements: seed.requirements,
        benefits: seed.benefits,
        faqs: seed.faqs,
        sources: seed.sources.map((source) => ({
          url: source.url,
          label: source.label,
        })),
        steps: seed.steps,
        tags: seed.tags.map((slug) => ({
          slug,
          name: SEED_TAG_DEFINITIONS[slug] ?? slug,
        })),
      };

      const scalar = {
        title: seed.title,
        summary: seed.summary,
        description: seed.description,
        provider: seed.provider,
        hostCountry: seed.hostCountry,
        degreeLevel: seed.degreeLevel,
        fundingType: seed.fundingType,
        languageRequirement: seed.languageRequirement ?? null,
        fieldOfStudy: seed.fieldOfStudy,
        eligibleCountries: seed.eligibleCountries,
        applicationUrl: seed.isPartnerApplication
          ? null
          : (seed.applicationUrl ?? null),
        isPartnerApplication: seed.isPartnerApplication ?? false,
        deadlineAt,
        deadlineTimezone: 'UTC',
        verificationStatus: VerificationStatus.VERIFIED,
        verifiedAt: now,
        lastReviewedAt: now,
        isFeatured: seed.isFeatured ?? false,
        status: ScholarshipStatus.PUBLISHED,
        createdById: admin?.id,
      };

      const existing = await this.prisma.scholarship.findUnique({
        where: { slug: seed.slug },
        select: { id: true },
      });

      if (existing) {
        await this.prisma.$transaction(async (tx) => {
          await replaceNestedContent(tx, existing.id, nestedContent);
          await tx.scholarship.update({
            where: { id: existing.id },
            data: scalar,
          });
        });
        continue;
      }

      await this.prisma.scholarship.create({
        data: {
          slug: seed.slug,
          ...scalar,
          ...buildNestedCreate(nestedContent),
        },
      });
    }
  }
}
