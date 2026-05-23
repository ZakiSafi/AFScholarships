import { ConfigService } from '@nestjs/config';
export declare class MailerService {
    private readonly config;
    private readonly logger;
    constructor(config: ConfigService);
    sendPasswordResetEmail(to: string, resetUrl: string): Promise<{
        queued: boolean;
    }>;
}
