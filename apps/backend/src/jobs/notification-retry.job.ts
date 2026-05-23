import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { JobsService } from './jobs.service';

@Injectable()
export class NotificationRetryJob {
  private readonly logger = new Logger(NotificationRetryJob.name);

  constructor(
    private readonly jobsService: JobsService,
    private readonly config: ConfigService,
  ) {}

  @Cron(process.env.JOB_NOTIFICATION_RETRY_CRON ?? '0 */6 * * *')
  async handleCron() {
    if (!this.isEnabled()) return;

    this.logger.log('Running notification retry job');
    const result = await this.jobsService.runNotificationRetry();
    this.logger.log(`Notification retry complete: ${JSON.stringify(result)}`);
  }

  private isEnabled() {
    return this.config.get<boolean>('jobs.enabled') !== false;
  }
}
