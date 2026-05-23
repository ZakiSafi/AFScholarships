"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScholarshipsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const list_scholarships_dto_1 = require("./dto/list-scholarships.dto");
const scholarships_content_helper_1 = require("./scholarships-content.helper");
let ScholarshipsService = class ScholarshipsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        await this.seedScholarships();
    }
    async list(query) {
        return this.queryScholarships(query, { status: client_1.ScholarshipStatus.PUBLISHED });
    }
    async adminList(query) {
        const where = {};
        if (query.status) {
            where.status = query.status;
        }
        return this.queryScholarships(query, where);
    }
    async getFacets() {
        const baseWhere = {
            status: client_1.ScholarshipStatus.PUBLISHED,
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
        const countBy = (items) => {
            const map = new Map();
            for (const item of items) {
                map.set(item, (map.get(item) ?? 0) + 1);
            }
            return [...map.entries()]
                .map(([value, count]) => ({ value, count }))
                .sort((a, b) => b.count - a.count);
        };
        const tagMap = new Map();
        for (const row of published) {
            for (const { tag } of row.tags) {
                const existing = tagMap.get(tag.slug);
                if (existing) {
                    existing.count += 1;
                }
                else {
                    tagMap.set(tag.slug, { slug: tag.slug, name: tag.name, count: 1 });
                }
            }
        }
        const fieldCounts = new Map();
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
    async getBySlug(slug) {
        const scholarship = await this.prisma.scholarship.findFirst({
            where: { slug, status: client_1.ScholarshipStatus.PUBLISHED },
            include: scholarships_content_helper_1.scholarshipDetailInclude,
        });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        return scholarship;
    }
    async getRelated(slug, limit = 4) {
        const current = await this.prisma.scholarship.findFirst({
            where: { slug, status: client_1.ScholarshipStatus.PUBLISHED },
            select: {
                id: true,
                hostCountry: true,
                degreeLevel: true,
                fundingType: true,
                fieldOfStudy: true,
            },
        });
        if (!current) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        const items = await this.prisma.scholarship.findMany({
            where: {
                status: client_1.ScholarshipStatus.PUBLISHED,
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
    async create(payload, userId) {
        if (!payload.isPartnerApplication && !payload.applicationUrl) {
            throw new common_1.BadRequestException('applicationUrl is required for non-partner scholarships');
        }
        const nested = (0, scholarships_content_helper_1.buildNestedCreate)(payload);
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
                status: client_1.ScholarshipStatus.DRAFT,
                startsAt: payload.startsAt ? new Date(payload.startsAt) : null,
                deadlineAt: new Date(payload.deadlineAt),
                deadlineTimezone: payload.deadlineTimezone ?? 'UTC',
                isFeatured: payload.isFeatured ?? false,
                createdById: userId,
            },
            include: scholarships_content_helper_1.scholarshipDetailInclude,
        });
    }
    async update(id, payload) {
        const scholarship = await this.prisma.scholarship.findUnique({
            where: { id },
        });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        const { steps, requirements, benefits, faqs, sources, tags, ...scalar } = payload;
        const hasNestedContent = steps !== undefined ||
            requirements !== undefined ||
            benefits !== undefined ||
            faqs !== undefined ||
            sources !== undefined ||
            tags !== undefined;
        return this.prisma.$transaction(async (tx) => {
            if (hasNestedContent) {
                await (0, scholarships_content_helper_1.replaceNestedContent)(tx, id, {
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
                include: scholarships_content_helper_1.scholarshipDetailInclude,
            });
        });
    }
    async publish(id, actorId) {
        return this.setStatus(id, client_1.ScholarshipStatus.PUBLISHED, actorId, 'publish');
    }
    async archive(id, actorId) {
        return this.setStatus(id, client_1.ScholarshipStatus.ARCHIVED, actorId, 'archive');
    }
    async verify(id, status, reviewerId) {
        const scholarship = await this.prisma.scholarship.findUnique({
            where: { id },
        });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.scholarship.update({
                where: { id },
                data: {
                    verificationStatus: status,
                    verifiedAt: status === client_1.VerificationStatus.VERIFIED ? new Date() : null,
                    lastReviewedAt: new Date(),
                },
                include: scholarships_content_helper_1.scholarshipDetailInclude,
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
    async createReport(scholarshipId, payload, userId) {
        const scholarship = await this.prisma.scholarship.findUnique({
            where: { id: scholarshipId },
        });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
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
    async setStatus(id, status, actorId, action) {
        const scholarship = await this.prisma.scholarship.findUnique({
            where: { id },
        });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        if (status === client_1.ScholarshipStatus.PUBLISHED && !scholarship.deadlineAt) {
            throw new common_1.BadRequestException('Cannot publish without a deadline');
        }
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.scholarship.update({
                where: { id },
                data: { status },
                include: scholarships_content_helper_1.scholarshipDetailInclude,
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
    async queryScholarships(query, baseWhere) {
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
    buildWhere(query, baseWhere) {
        const where = { ...baseWhere };
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
    buildOrderBy(sortBy, sortOrder) {
        const direction = sortOrder === list_scholarships_dto_1.SortOrder.DESC ? 'desc' : 'asc';
        switch (sortBy) {
            case list_scholarships_dto_1.ScholarshipSortField.TITLE:
                return [{ title: direction }];
            case list_scholarships_dto_1.ScholarshipSortField.CREATED:
                return [{ createdAt: direction }];
            case list_scholarships_dto_1.ScholarshipSortField.FEATURED:
                return [{ isFeatured: 'desc' }, { deadlineAt: 'asc' }];
            case list_scholarships_dto_1.ScholarshipSortField.DEADLINE:
            default:
                return [{ isFeatured: 'desc' }, { deadlineAt: direction }];
        }
    }
    async seedScholarships() {
        await this.prisma.scholarship.updateMany({
            where: {
                slug: { in: ['turkiye-burslari', 'afscholars-partner-program'] },
                status: client_1.ScholarshipStatus.DRAFT,
            },
            data: { status: client_1.ScholarshipStatus.PUBLISHED },
        });
        const publishedCount = await this.prisma.scholarship.count({
            where: { status: client_1.ScholarshipStatus.PUBLISHED },
        });
        if (publishedCount > 0) {
            return;
        }
        const admin = await this.prisma.user.findFirst({
            where: { role: client_1.UserRole.ADMIN },
            select: { id: true },
        });
        const nowYear = new Date().getUTCFullYear();
        const turkiye = await this.prisma.scholarship.create({
            data: {
                slug: 'turkiye-burslari',
                title: 'Turkiye Burslari Scholarship',
                summary: 'Fully funded undergraduate and graduate scholarships in Turkiye.',
                description: 'Turkiye Burslari provides tuition, stipend, accommodation, and health insurance for international students.',
                provider: 'Turkiye Scholarships',
                hostCountry: 'Turkey',
                degreeLevel: 'MASTER',
                fundingType: 'FULL',
                languageRequirement: 'English or Turkish program requirements apply',
                fieldOfStudy: ['Engineering', 'Social Sciences'],
                eligibleCountries: ['Afghanistan', 'Pakistan', 'Uzbekistan'],
                applicationUrl: 'https://www.turkiyeburslari.gov.tr/',
                isPartnerApplication: false,
                deadlineAt: new Date(Date.UTC(nowYear, 11, 20)),
                deadlineTimezone: 'UTC',
                verificationStatus: 'VERIFIED',
                verifiedAt: new Date(),
                lastReviewedAt: new Date(),
                isFeatured: true,
                status: client_1.ScholarshipStatus.PUBLISHED,
                createdById: admin?.id,
                requirements: {
                    create: [
                        {
                            orderIndex: 1,
                            label: 'Nationality',
                            description: 'Open to eligible countries including Afghanistan.',
                            isMandatory: true,
                        },
                        {
                            orderIndex: 2,
                            label: 'Academic record',
                            description: 'Minimum GPA requirements vary by program.',
                            isMandatory: true,
                        },
                    ],
                },
                benefits: {
                    create: [
                        {
                            orderIndex: 1,
                            title: 'Full tuition',
                            description: 'University tuition fees covered.',
                        },
                        {
                            orderIndex: 2,
                            title: 'Monthly stipend',
                            description: 'Living allowance for students.',
                        },
                    ],
                },
                sources: {
                    create: [
                        {
                            url: 'https://www.turkiyeburslari.gov.tr/',
                            label: 'Official program website',
                            lastCheckedAt: new Date(),
                        },
                    ],
                },
                tags: {
                    create: [
                        {
                            tag: {
                                connectOrCreate: {
                                    where: { slug: 'fully-funded' },
                                    create: { slug: 'fully-funded', name: 'Fully funded' },
                                },
                            },
                        },
                    ],
                },
            },
        });
        const partner = await this.prisma.scholarship.create({
            data: {
                slug: 'afscholars-partner-program',
                title: 'AfScholarships Partner Opportunity Program',
                summary: 'Partner-managed scholarship intake with in-platform application.',
                description: 'Students can submit profile and statement directly in AfScholarships for partner selection rounds.',
                provider: 'AfScholarships Partners',
                hostCountry: 'Global',
                degreeLevel: 'BACHELOR',
                fundingType: 'PARTIAL',
                languageRequirement: 'No IELTS required at screening stage',
                fieldOfStudy: ['Computer Science', 'Business'],
                eligibleCountries: ['Afghanistan'],
                isPartnerApplication: true,
                deadlineAt: new Date(Date.UTC(nowYear, 8, 15)),
                deadlineTimezone: 'UTC',
                verificationStatus: 'VERIFIED',
                verifiedAt: new Date(),
                lastReviewedAt: new Date(),
                isFeatured: true,
                status: client_1.ScholarshipStatus.PUBLISHED,
                createdById: admin?.id,
                tags: {
                    create: [
                        {
                            tag: {
                                connectOrCreate: {
                                    where: { slug: 'apply-in-app' },
                                    create: { slug: 'apply-in-app', name: 'Apply in-app' },
                                },
                            },
                        },
                    ],
                },
            },
        });
        await this.prisma.applicationStep.createMany({
            data: [
                {
                    scholarshipId: partner.id,
                    orderIndex: 1,
                    title: 'Prepare profile',
                    description: 'Complete your education history and contact details.',
                },
                {
                    scholarshipId: partner.id,
                    orderIndex: 2,
                    title: 'Upload statement',
                    description: 'Provide a short motivation statement about your study goals.',
                },
                {
                    scholarshipId: partner.id,
                    orderIndex: 3,
                    title: 'Submit and wait for review',
                    description: 'Our partner team reviews submissions in 2-4 weeks.',
                },
            ],
        });
        await this.prisma.scholarshipFaq.create({
            data: {
                scholarshipId: turkiye.id,
                orderIndex: 1,
                question: 'Do I need to know Turkish?',
                answer: 'Many programs are offered in English; check each university requirement.',
            },
        });
    }
};
exports.ScholarshipsService = ScholarshipsService;
exports.ScholarshipsService = ScholarshipsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScholarshipsService);
//# sourceMappingURL=scholarships.service.js.map