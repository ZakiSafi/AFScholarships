import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { RemindersService } from './reminders.service';
export declare class RemindersController {
    private readonly remindersService;
    constructor(remindersService: RemindersService);
    listMine(user: AuthUser): Promise<({
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
        status: import("@prisma/client").$Enums.ReminderStatus;
        id: string;
        scholarshipId: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        reminderAt: Date;
        channel: import("@prisma/client").$Enums.ReminderChannel;
        sentAt: Date | null;
    })[]>;
    create(scholarshipId: string, user: AuthUser, payload: CreateReminderDto): Promise<{
        status: import("@prisma/client").$Enums.ReminderStatus;
        id: string;
        scholarshipId: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        reminderAt: Date;
        channel: import("@prisma/client").$Enums.ReminderChannel;
        sentAt: Date | null;
    }>;
    markSent(id: string): Promise<{
        status: import("@prisma/client").$Enums.ReminderStatus;
        id: string;
        scholarshipId: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        reminderAt: Date;
        channel: import("@prisma/client").$Enums.ReminderChannel;
        sentAt: Date | null;
    }>;
}
