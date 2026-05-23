import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnerApplicationDto } from './dto/create-partner-application.dto';
export declare class ApplicationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    applyToPartnerScholarship(scholarshipId: string, userId: string, payload: CreatePartnerApplicationDto): Promise<{
        statusLogs: {
            id: string;
            createdAt: Date;
            fromStatus: import("@prisma/client").$Enums.ApplicationStatus | null;
            toStatus: import("@prisma/client").$Enums.ApplicationStatus;
            note: string | null;
            changedById: string | null;
            applicationId: string;
        }[];
    } & {
        status: import("@prisma/client").$Enums.ApplicationStatus;
        id: string;
        scholarshipId: string;
        userId: string;
        reviewedById: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullName: string;
        phone: string | null;
        country: string | null;
        educationLevel: string | null;
        statement: string;
        docsUrls: string[];
        reviewedAt: Date | null;
    }>;
    listMine(userId: string): Promise<({
        scholarship: {
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
        };
    } & {
        status: import("@prisma/client").$Enums.ApplicationStatus;
        id: string;
        scholarshipId: string;
        userId: string;
        reviewedById: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullName: string;
        phone: string | null;
        country: string | null;
        educationLevel: string | null;
        statement: string;
        docsUrls: string[];
        reviewedAt: Date | null;
    })[]>;
}
