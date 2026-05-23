import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { RemindersService } from './reminders.service';
export declare class RemindersController {
    private readonly remindersService;
    constructor(remindersService: RemindersService);
    listMine(user: AuthUser): Promise<({
        scholarship: {
            id: string;
            slug: string;
            title: string;
            provider: string;
            hostCountry: string;
            deadlineAt: Date;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.ReminderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        scholarshipId: string;
        reminderAt: Date;
        channel: import("@prisma/client").$Enums.ReminderChannel;
        sentAt: Date | null;
    })[]>;
    create(user: AuthUser, scholarshipId: string, payload: CreateReminderDto): Promise<{
        scholarship: {
            id: string;
            slug: string;
            title: string;
            deadlineAt: Date;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.ReminderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        scholarshipId: string;
        reminderAt: Date;
        channel: import("@prisma/client").$Enums.ReminderChannel;
        sentAt: Date | null;
    }>;
    update(user: AuthUser, id: string, payload: UpdateReminderDto): Promise<{
        scholarship: {
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
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.ReminderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        scholarshipId: string;
        reminderAt: Date;
        channel: import("@prisma/client").$Enums.ReminderChannel;
        sentAt: Date | null;
    }>;
    remove(user: AuthUser, id: string): Promise<{
        success: boolean;
    }>;
    markSent(id: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.ReminderStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        scholarshipId: string;
        reminderAt: Date;
        channel: import("@prisma/client").$Enums.ReminderChannel;
        sentAt: Date | null;
    }>;
}
