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
    related(slug: string, limit?: string): Promise<{
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
    report(scholarshipId: string, payload: ReportListingDto, user: AuthUser): Promise<{
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
    create(payload: CreateScholarshipDto, user: AuthUser): Promise<{
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
    publish(id: string, user: AuthUser): Promise<{
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
    archive(id: string, user: AuthUser): Promise<{
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
    verify(id: string, payload: VerifyScholarshipDto, user: AuthUser): Promise<{
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
}
