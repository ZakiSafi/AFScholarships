import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class JobsService {
    private readonly prisma;
    private readonly mailer;
    private readonly config;
    private readonly logger;
    constructor(prisma: PrismaService, mailer: MailerService, config: ConfigService);
    runStaleScholarshipCheck(actorId?: string): Promise<{
        flaggedCount: number;
        staleDays: number;
    }>;
    runReminderSender(): Promise<{
        processed: number;
        sent: number;
        failed: number;
    }>;
    runDigestSender(): Promise<{
        users: number;
        sent: number;
        skipped: number;
    }>;
    runNotificationRetry(): Promise<{
        retried: number;
        succeeded: number;
        maxRetries: number;
    }>;
    private getSystemActorId;
}
