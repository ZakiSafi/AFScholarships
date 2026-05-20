import { PrismaService } from '../prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
export declare class RemindersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, scholarshipId: string, payload: CreateReminderDto): Promise<{
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
    listMine(userId: string): Promise<({
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
    markSent(reminderId: string): Promise<{
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
