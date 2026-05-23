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
                    id: string;
                    createdAt: Date;
                    slug: string;
                    name: string;
                };
            } & {
                scholarshipId: string;
                tagId: string;
            })[];
        } & {
            description: string;
            title: string;
            status: import("@prisma/client").$Enums.ScholarshipStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            summary: string;
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
            startsAt: Date | null;
            deadlineAt: Date;
            deadlineTimezone: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            verifiedAt: Date | null;
            lastReviewedAt: Date | null;
            isFeatured: boolean;
            createdById: string | null;
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
                    id: string;
                    createdAt: Date;
                    slug: string;
                    name: string;
                };
            } & {
                scholarshipId: string;
                tagId: string;
            })[];
        } & {
            description: string;
            title: string;
            status: import("@prisma/client").$Enums.ScholarshipStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            summary: string;
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
            startsAt: Date | null;
            deadlineAt: Date;
            deadlineTimezone: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            verifiedAt: Date | null;
            lastReviewedAt: Date | null;
            isFeatured: boolean;
            createdById: string | null;
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
            description: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
        }[];
        steps: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            url: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                slug: string;
                name: string;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            note: string | null;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            reviewerId: string;
        })[];
    } & {
        description: string;
        title: string;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        summary: string;
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
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
    }>;
    getRelated(slug: string, limit?: number): Promise<{
        items: {
            title: string;
            id: string;
            slug: string;
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
            description: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
        }[];
        steps: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            url: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                slug: string;
                name: string;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            note: string | null;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            reviewerId: string;
        })[];
    } & {
        description: string;
        title: string;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        summary: string;
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
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
    }>;
    update(id: string, payload: UpdateScholarshipDto): Promise<{
        requirements: {
            description: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
        }[];
        steps: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            url: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                slug: string;
                name: string;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            note: string | null;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            reviewerId: string;
        })[];
    } & {
        description: string;
        title: string;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        summary: string;
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
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
    }>;
    publish(id: string, actorId: string): Promise<{
        requirements: {
            description: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
        }[];
        steps: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            url: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                slug: string;
                name: string;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            note: string | null;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            reviewerId: string;
        })[];
    } & {
        description: string;
        title: string;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        summary: string;
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
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
    }>;
    archive(id: string, actorId: string): Promise<{
        requirements: {
            description: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
        }[];
        steps: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            url: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                slug: string;
                name: string;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            note: string | null;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            reviewerId: string;
        })[];
    } & {
        description: string;
        title: string;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        summary: string;
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
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
    }>;
    verify(id: string, status: VerificationStatus, reviewerId?: string): Promise<{
        requirements: {
            description: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            label: string;
            isMandatory: boolean;
        }[];
        benefits: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
        }[];
        steps: {
            description: string;
            title: string;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            orderIndex: number;
            isRequired: boolean;
        }[];
        faqs: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            answer: string;
            orderIndex: number;
            question: string;
        }[];
        sources: {
            id: string;
            scholarshipId: string;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            url: string;
            lastCheckedAt: Date | null;
        }[];
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                slug: string;
                name: string;
            };
        } & {
            scholarshipId: string;
            tagId: string;
        })[];
        verificationReviews: ({
            reviewer: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            note: string | null;
            id: string;
            scholarshipId: string;
            createdAt: Date;
            previousStatus: import("@prisma/client").$Enums.VerificationStatus;
            newStatus: import("@prisma/client").$Enums.VerificationStatus;
            reviewerId: string;
        })[];
    } & {
        description: string;
        title: string;
        status: import("@prisma/client").$Enums.ScholarshipStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        summary: string;
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
        startsAt: Date | null;
        deadlineAt: Date;
        deadlineTimezone: string;
        verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        lastReviewedAt: Date | null;
        isFeatured: boolean;
        createdById: string | null;
    }>;
    createReport(scholarshipId: string, payload: ReportListingDto, userId?: string): Promise<{
        status: import("@prisma/client").$Enums.ReportStatus;
        id: string;
        scholarshipId: string;
        userId: string | null;
        reviewedById: string | null;
        reason: string;
        details: string | null;
        resolvedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private setStatus;
    private queryScholarships;
    private buildWhere;
    private buildOrderBy;
    private seedScholarships;
}
