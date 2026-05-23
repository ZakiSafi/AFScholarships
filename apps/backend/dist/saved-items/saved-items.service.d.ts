import { PrismaService } from '../prisma/prisma.service';
export declare class SavedItemsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listForUser(userId: string): Promise<({
        scholarship: {
            id: string;
            slug: string;
            title: string;
            summary: string;
            provider: string;
            hostCountry: string;
            degreeLevel: import("@prisma/client").$Enums.DegreeLevel;
            fundingType: import("@prisma/client").$Enums.FundingType;
            isPartnerApplication: boolean;
            status: import("@prisma/client").$Enums.ScholarshipStatus;
            deadlineAt: Date;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
    } & {
        createdAt: Date;
        userId: string;
        scholarshipId: string;
    })[]>;
    isSaved(userId: string, scholarshipId: string): Promise<{
        saved: boolean;
        savedAt: Date | null;
    }>;
    save(userId: string, scholarshipId: string): Promise<{
        scholarship: {
            id: string;
            slug: string;
            title: string;
            deadlineAt: Date;
        };
    } & {
        createdAt: Date;
        userId: string;
        scholarshipId: string;
    }>;
    remove(userId: string, scholarshipId: string): Promise<{
        success: boolean;
    }>;
}
