import { PrismaService } from '../prisma/prisma.service';
export declare class SavedItemsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listForUser(userId: string): Promise<({
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
        scholarshipId: string;
        userId: string;
        createdAt: Date;
    })[]>;
    save(userId: string, scholarshipId: string): Promise<{
        scholarshipId: string;
        userId: string;
        createdAt: Date;
    }>;
    remove(userId: string, scholarshipId: string): Promise<{
        success: boolean;
    }>;
}
