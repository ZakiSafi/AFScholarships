import { ConfigService } from '@nestjs/config';
import { JobsService } from './jobs.service';
export declare class NotificationRetryJob {
    private readonly jobsService;
    private readonly config;
    private readonly logger;
    constructor(jobsService: JobsService, config: ConfigService);
    handleCron(): Promise<void>;
    private isEnabled;
}
