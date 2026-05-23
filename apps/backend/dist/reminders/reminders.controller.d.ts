import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { RemindersService } from './reminders.service';
export declare class RemindersController {
    private readonly remindersService;
    constructor(remindersService: RemindersService);
    listMine(user: AuthUser): Promise<({
        scholarship: {
            title: string;
            id: string;
            slug: string;
            provider: string;
            hostCountry: string;
            deadlineAt: Date;
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
    create(user: AuthUser, scholarshipId: string, payload: CreateReminderDto): Promise<{
        scholarship: {
            title: string;
            id: string;
            slug: string;
            deadlineAt: Date;
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
    }>;
    update(user: AuthUser, id: string, payload: UpdateReminderDto): Promise<{
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
    }>;
    remove(user: AuthUser, id: string): Promise<{
        success: boolean;
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
