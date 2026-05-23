import { OnModuleInit } from '@nestjs/common';
import { VerificationStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AdminListScholarshipsDto } from './dto/list-scholarships.dto';
import { ListScholarshipsDto } from './dto/list-scholarships.dto';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { ReportListingDto } from './dto/report-listing.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
export declare class ScholarshipsService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    list(query: ListScholarshipsDto): Promise<{
        facets?: {
            countries: {
                value: string;
                count: number;
            }[];
            degreeLevels: {
                value: import("@prisma/client").$Enums.DegreeLevel;
                count: number;
            }[];
            fundingTypes: {
                value: import("@prisma/client").$Enums.FundingType;
                count: number;
            }[];
            verificationStatuses: {
                value: import("@prisma/client").$Enums.VerificationStatus;
                count: number;
            }[];
            partnerApplication: {
                inPlatform: number;
                external: number;
            };
            fieldsOfStudy: {
                value: string;
                count: number;
            }[];
            tags: {
                slug: string;
                name: string;
                count: number;
            }[];
            total: number;
        } | undefined;
        items: ({
            tags: ({
                tag: {
                    name: string;
                    id: string;
                    slug: string;
                    createdAt: Date;
                };
            } & {
                scholarshipId: string;
                tagId: string;
            })[];
        } & {
            id: string;
            slug: string;
            title: string;
            summary: string;
            description: string;
            provider: string;
            hostCountry: string;
            degreeLevel: import("@prisma/client").$Enums.DegreeLevel;
            fundingType: import("@prisma/client").$Enums.FundingType;
            languageRequirement: string | null;
            fieldOfStudy: string[];
            eligibleCountries: string[];
            minAge: number | null;
            maxAge: number | null;
            applicationUrl: string | null;
            isPartnerApplication: boolean;
            status: import("@prisma/client").$Enums.ScholarshipStatus;
            startsAt: Date | null;
            deadlineAt: Date;
            deadlineTimezone: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            verifiedAt: Date | null;
            lastReviewedAt: Date | null;
            isFeatured: boolean;
            createdById: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
    adminList(query: AdminListScholarshipsDto): Promise<{
        facets?: {
            countries: {
                value: string;
                count: number;
            }[];
            degreeLevels: {
                value: import("@prisma/client").$Enums.DegreeLevel;
                count: number;
            }[];
            fundingTypes: {
                value: import("@prisma/client").$Enums.FundingType;
                count: number;
            }[];
            verificationStatuses: {
                value: import("@prisma/client").$Enums.VerificationStatus;
                count: number;
            }[];
            partnerApplication: {
                inPlatform: number;
                external: number;
            };
            fieldsOfStudy: {
                value: string;
                count: number;
            }[];
            tags: {
                slug: string;
                name: string;
                count: number;
            }[];
            total: number;
        } | undefined;
        items: ({
            tags: ({
                tag: {
                    name: string;
                    id: string;
                    slug: string;
                    createdAt: Date;
                };
            } & {
                scholarshipId: string;
                tagId: string;
            })[];
        } & {
            id: string;
            slug: string;
            title: string;
            summary: string;
            description: string;
            provider: string;
            hostCountry: string;
            degreeLevel: import("@prisma/client").$Enums.DegreeLevel;
            fundingType: import("@prisma/client").$Enums.FundingType;
            languageRequirement: string | null;
            fieldOfStudy: string[];
            eligibleCountries: string[];
            minAge: number | null;
            maxAge: number | null;
            applicationUrl: string | null;
            isPartnerApplication: boolean;
            status: import("@prisma/client").$Enums.ScholarshipStatus;
            startsAt: Date | null;
            deadlineAt: Date;
            deadlineTimezone: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            verifiedAt: Date | null;
            lastReviewedAt: Date | null;
            isFeatured: boolean;
            createdById: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
    getFacets(): Promise<{
        countries: {
            value: string;
            count: number;
        }[];
        degreeLevels: {
            value: import("@prisma/client").$Enums.DegreeLevel;
            count: number;
        }[];
        fundingTypes: {
            value: import("@prisma/client").$Enums.FundingType;
            count: number;
        }[];
        verificationStatuses: {
            value: import("@prisma/client").$Enums.VerificationStatus;
            count: number;
        }[];
        partnerApplication: {
            inPlatform: number;
            external: number;
        };
        fieldsOfStudy: {
            value: string;
            count: number;
        }[];
        tags: {
            slug: string;
            name: string;
            count: number;
        }[];
        total: number;
    }>;
    getBySlug(slug: string): Promise<{
        requirements: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
        }[];
        steps: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            url: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            label: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                name: string;
                id: string;
                slug: string;
                createdAt: Date;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                name: string | null;
                id: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            scholarshipId: string;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            note: string | null;
            reviewerId: string;
        })[];
    } & {
        id: string;
        slug: string;
        title: string;
        summary: string;
        description: string;
        provider: string;
        hostCountry: string;
        degreeLevel: import("@prisma/client").$Enums.DegreeLevel;
        fundingType: import("@prisma/client").$Enums.FundingType;
        languageRequirement: string | null;
        fieldOfStudy: string[];
        eligibleCountries: string[];
        minAge: number | null;
        maxAge: number | null;
        applicationUrl: string | null;
        isPartnerApplication: boolean;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getRelated(slug: string, limit?: number): Promise<{
        items: {
            id: string;
            slug: string;
            title: string;
            summary: string;
            provider: string;
            hostCountry: string;
            degreeLevel: import("@prisma/client").$Enums.DegreeLevel;
            fundingType: import("@prisma/client").$Enums.FundingType;
            isPartnerApplication: boolean;
            deadlineAt: Date;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            isFeatured: boolean;
        }[];
        total: number;
    }>;
    create(payload: CreateScholarshipDto, userId: string): Promise<{
        requirements: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
        }[];
        steps: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            url: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            label: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                name: string;
                id: string;
                slug: string;
                createdAt: Date;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                name: string | null;
                id: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            scholarshipId: string;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            note: string | null;
            reviewerId: string;
        })[];
    } & {
        id: string;
        slug: string;
        title: string;
        summary: string;
        description: string;
        provider: string;
        hostCountry: string;
        degreeLevel: import("@prisma/client").$Enums.DegreeLevel;
        fundingType: import("@prisma/client").$Enums.FundingType;
        languageRequirement: string | null;
        fieldOfStudy: string[];
        eligibleCountries: string[];
        minAge: number | null;
        maxAge: number | null;
        applicationUrl: string | null;
        isPartnerApplication: boolean;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, payload: UpdateScholarshipDto): Promise<{
        requirements: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
        }[];
        steps: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            url: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            label: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                name: string;
                id: string;
                slug: string;
                createdAt: Date;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                name: string | null;
                id: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            scholarshipId: string;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            note: string | null;
            reviewerId: string;
        })[];
    } & {
        id: string;
        slug: string;
        title: string;
        summary: string;
        description: string;
        provider: string;
        hostCountry: string;
        degreeLevel: import("@prisma/client").$Enums.DegreeLevel;
        fundingType: import("@prisma/client").$Enums.FundingType;
        languageRequirement: string | null;
        fieldOfStudy: string[];
        eligibleCountries: string[];
        minAge: number | null;
        maxAge: number | null;
        applicationUrl: string | null;
        isPartnerApplication: boolean;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    publish(id: string, actorId: string): Promise<{
        requirements: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
        }[];
        steps: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            url: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            label: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                name: string;
                id: string;
                slug: string;
                createdAt: Date;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                name: string | null;
                id: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            scholarshipId: string;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            note: string | null;
            reviewerId: string;
        })[];
    } & {
        id: string;
        slug: string;
        title: string;
        summary: string;
        description: string;
        provider: string;
        hostCountry: string;
        degreeLevel: import("@prisma/client").$Enums.DegreeLevel;
        fundingType: import("@prisma/client").$Enums.FundingType;
        languageRequirement: string | null;
        fieldOfStudy: string[];
        eligibleCountries: string[];
        minAge: number | null;
        maxAge: number | null;
        applicationUrl: string | null;
        isPartnerApplication: boolean;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    archive(id: string, actorId: string): Promise<{
        requirements: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
        }[];
        steps: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            url: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            label: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                name: string;
                id: string;
                slug: string;
                createdAt: Date;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                name: string | null;
                id: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            scholarshipId: string;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            note: string | null;
            reviewerId: string;
        })[];
    } & {
        id: string;
        slug: string;
        title: string;
        summary: string;
        description: string;
        provider: string;
        hostCountry: string;
        degreeLevel: import("@prisma/client").$Enums.DegreeLevel;
        fundingType: import("@prisma/client").$Enums.FundingType;
        languageRequirement: string | null;
        fieldOfStudy: string[];
        eligibleCountries: string[];
        minAge: number | null;
        maxAge: number | null;
        applicationUrl: string | null;
        isPartnerApplication: boolean;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    verify(id: string, status: VerificationStatus, reviewerId?: string): Promise<{
        requirements: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
        }[];
        steps: {
            id: string;
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            url: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            scholarshipId: string;
            label: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                name: string;
                id: string;
                slug: string;
                createdAt: Date;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                name: string | null;
                id: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            scholarshipId: string;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            note: string | null;
            reviewerId: string;
        })[];
    } & {
        id: string;
        slug: string;
        title: string;
        summary: string;
        description: string;
        provider: string;
        hostCountry: string;
        degreeLevel: import("@prisma/client").$Enums.DegreeLevel;
        fundingType: import("@prisma/client").$Enums.FundingType;
        languageRequirement: string | null;
        fieldOfStudy: string[];
        eligibleCountries: string[];
        minAge: number | null;
        maxAge: number | null;
        applicationUrl: string | null;
        isPartnerApplication: boolean;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createReport(scholarshipId: string, payload: ReportListingDto, userId?: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.ReportStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        scholarshipId: string;
        reason: string;
        details: string | null;
        resolvedAt: Date | null;
        reviewedById: string | null;
    }>;
    private setStatus;
    private queryScholarships;
    private buildWhere;
    private buildOrderBy;
    private resolveSeedDeadline;
    private seedScholarships;
}
