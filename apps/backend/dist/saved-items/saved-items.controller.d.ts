import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { SavedItemsService } from './saved-items.service';
export declare class SavedItemsController {
    private readonly savedItemsService;
    constructor(savedItemsService: SavedItemsService);
    list(user: AuthUser): Promise<({
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
    check(user: AuthUser, scholarshipId: string): Promise<{
        saved: boolean;
        savedAt: Date | null;
    }>;
    save(user: AuthUser, scholarshipId: string): Promise<{
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
    remove(user: AuthUser, scholarshipId: string): Promise<{
        success: boolean;
    }>;
}
