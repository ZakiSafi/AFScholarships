import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { SavedItemsService } from './saved-items.service';
export declare class SavedItemsController {
    private readonly savedItemsService;
    constructor(savedItemsService: SavedItemsService);
    list(user: AuthUser): Promise<({
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
    check(user: AuthUser, scholarshipId: string): Promise<{
        saved: boolean;
        savedAt: Date | null;
    }>;
    save(user: AuthUser, scholarshipId: string): Promise<{
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
    remove(user: AuthUser, scholarshipId: string): Promise<{
        success: boolean;
    }>;
}
