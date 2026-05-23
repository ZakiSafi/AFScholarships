import { ConfigService } from '@nestjs/config';
import { MailMessage, MailProvider, MailSendResult } from '../interfaces/mail-message.interface';
export declare class NodemailerMailProvider implements MailProvider {
    private readonly config;
    private readonly logger;
    private transporter;
    constructor(config: ConfigService);
    private getTransporter;
    send(message: MailMessage): Promise<MailSendResult>;
}
