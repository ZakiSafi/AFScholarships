import { ConfigService } from '@nestjs/config';
import type { MailProvider } from './interfaces/mail-message.interface';
export declare class MailerService {
    private readonly provider;
    private readonly config;
    private readonly logger;
    constructor(provider: MailProvider, config: ConfigService);
    sendPasswordResetEmail(to: string, resetUrl: string): Promise<{
        messageId?: string;
        accepted: string[];
        success: boolean;
    }>;
    sendReminderEmail(to: string, params: {
        scholarshipTitle: string;
        deadlineAt: string;
        scholarshipUrl: string;
    }): Promise<{
        messageId?: string;
        accepted: string[];
        success: boolean;
    }>;
    sendDigestEmail(to: string, params: {
        userName: string;
        items: {
            title: string;
            deadlineAt: string;
            url: string;
        }[];
    }): Promise<{
        messageId?: string;
        accepted: string[];
        success: boolean;
    }>;
    private send;
}
