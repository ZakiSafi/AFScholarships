import { PrismaService } from '../prisma/prisma.service';
export declare class SavedItemsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listForUser(userId: string): Promise<({
        scholarship: {
            title: string;
            status: import("@prisma/client").$Enums.ScholarshipStatus;
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
        };
    } & {
        scholarshipId: string;
        userId: string;
        createdAt: Date;
    })[]>;
    isSaved(userId: string, scholarshipId: string): Promise<{
        saved: boolean;
        savedAt: Date | null;
    }>;
    save(userId: string, scholarshipId: string): Promise<{
        scholarship: {
            title: string;
            id: string;
            slug: string;
            deadlineAt: Date;
        };
    } & {
        scholarshipId: string;
        userId: string;
        createdAt: Date;
    }>;
    remove(userId: string, scholarshipId: string): Promise<{
        success: boolean;
    }>;
}
