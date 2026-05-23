import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { AdminListScholarshipsDto } from './dto/list-scholarships.dto';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { ListScholarshipsDto } from './dto/list-scholarships.dto';
import { ReportListingDto } from './dto/report-listing.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { VerifyScholarshipDto } from './dto/verify-scholarship.dto';
import { ScholarshipsService } from './scholarships.service';
export declare class ScholarshipsController {
    private readonly scholarshipsService;
    constructor(scholarshipsService: ScholarshipsService);
    facets(): Promise<{
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
    related(slug: string, limit?: string): Promise<{
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
    report(scholarshipId: string, payload: ReportListingDto, user: AuthUser): Promise<{
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
    create(payload: CreateScholarshipDto, user: AuthUser): Promise<{
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
    publish(id: string, user: AuthUser): Promise<{
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
    archive(id: string, user: AuthUser): Promise<{
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
    verify(id: string, payload: VerifyScholarshipDto, user: AuthUser): Promise<{
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
}
