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
let ScholarshipsService = class ScholarshipsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        await this.seedScholarships();
    }
    async list(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;
        const where = {
            status: client_1.ScholarshipStatus.PUBLISHED,
        };
        if (query.search) {
            where.OR = [
                { title: { contains: query.search, mode: 'insensitive' } },
                { summary: { contains: query.search, mode: 'insensitive' } },
                { provider: { contains: query.search, mode: 'insensitive' } },
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
        if (query.partnerOnly) {
            where.isPartnerApplication = true;
        }
        if (query.verificationStatus) {
            where.verificationStatus = query.verificationStatus;
        }
        const [items, total] = await this.prisma.$transaction([
            this.prisma.scholarship.findMany({
                where,
                skip,
                take: limit,
                orderBy: [{ isFeatured: 'desc' }, { deadlineAt: 'asc' }],
            }),
            this.prisma.scholarship.count({ where }),
        ]);
        return {
            items,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getBySlug(slug) {
        const scholarship = await this.prisma.scholarship.findFirst({
            where: { slug, status: client_1.ScholarshipStatus.PUBLISHED },
            include: {
                steps: { orderBy: { orderIndex: 'asc' } },
                requirements: { orderBy: { orderIndex: 'asc' } },
                benefits: { orderBy: { orderIndex: 'asc' } },
                faqs: { orderBy: { orderIndex: 'asc' } },
                sources: true,
                tags: { include: { tag: true } },
            },
        });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        return scholarship;
    }
    async create(payload, userId) {
        if (!payload.isPartnerApplication && !payload.applicationUrl) {
            throw new common_1.BadRequestException('applicationUrl is required for non-partner scholarships');
        }
        return this.prisma.scholarship.create({
            data: {
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
                startsAt: payload.startsAt ? new Date(payload.startsAt) : null,
                deadlineAt: new Date(payload.deadlineAt),
                deadlineTimezone: payload.deadlineTimezone ?? 'UTC',
                isFeatured: payload.isFeatured ?? false,
                createdById: userId,
                steps: payload.steps
                    ? {
                        create: payload.steps.map((step) => ({
                            orderIndex: step.orderIndex,
                            title: step.title,
                            description: step.description,
                            isRequired: step.isRequired ?? true,
                        })),
                    }
                    : undefined,
            },
            include: {
                steps: true,
            },
        });
    }
    async update(id, payload) {
        const scholarship = await this.prisma.scholarship.findUnique({
            where: { id },
        });
        if (!scholarship) {
            throw new common_1.NotFoundException('Scholarship not found');
        }
        return this.prisma.scholarship.update({
            where: { id },
            data: {
                ...payload,
                startsAt: payload.startsAt ? new Date(payload.startsAt) : undefined,
                deadlineAt: payload.deadlineAt
                    ? new Date(payload.deadlineAt)
                    : undefined,
            },
        });
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
    async seedScholarships() {
        const count = await this.prisma.scholarship.count();
        if (count > 0) {
            return;
        }
        const admin = await this.prisma.user.findFirst({
            where: { role: client_1.UserRole.ADMIN },
            select: { id: true },
        });
        const nowYear = new Date().getUTCFullYear();
        await this.prisma.scholarship.createMany({
            data: [
                {
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
                },
                {
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
                },
            ],
        });
        const partnerScholarship = await this.prisma.scholarship.findUnique({
            where: { slug: 'afscholars-partner-program' },
            select: { id: true },
        });
        if (partnerScholarship) {
            await this.prisma.applicationStep.createMany({
                data: [
                    {
                        scholarshipId: partnerScholarship.id,
                        orderIndex: 1,
                        title: 'Prepare profile',
                        description: 'Complete your education history and contact details.',
                    },
                    {
                        scholarshipId: partnerScholarship.id,
                        orderIndex: 2,
                        title: 'Upload statement',
                        description: 'Provide a short motivation statement about your study goals.',
                    },
                    {
                        scholarshipId: partnerScholarship.id,
                        orderIndex: 3,
                        title: 'Submit and wait for review',
                        description: 'Our partner team reviews submissions in 2-4 weeks.',
                    },
                ],
            });
        }
    }
};
exports.ScholarshipsService = ScholarshipsService;
exports.ScholarshipsService = ScholarshipsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScholarshipsService);
//# sourceMappingURL=scholarships.service.js.map