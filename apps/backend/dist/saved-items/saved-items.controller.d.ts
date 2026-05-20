import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { SavedItemsService } from './saved-items.service';
export declare class SavedItemsController {
    private readonly savedItemsService;
    constructor(savedItemsService: SavedItemsService);
    list(user: AuthUser): Promise<({
        scholarship: {
            description: string;
            title: string;
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
    save(user: AuthUser, scholarshipId: string): Promise<{
        scholarshipId: string;
        userId: string;
        createdAt: Date;
    }>;
    remove(user: AuthUser, scholarshipId: string): Promise<{
        success: boolean;
    }>;
}
