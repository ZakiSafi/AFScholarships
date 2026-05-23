import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { JobsService } from './jobs.service';

@Injectable()
export class ReminderSenderJob {
  private readonly logger = new Logger(ReminderSenderJob.name);

  constructor(
    private readonly jobsService: JobsService,
    private readonly config: ConfigService,
  ) {}

  @Cron(process.env.JOB_REMINDER_SENDER_CRON ?? '*/15 * * * *')
  async handleCron() {
    if (!this.isEnabled()) return;

    this.logger.log('Running reminder sender job');
    const result = await this.jobsService.runReminderSender();
    this.logger.log(`Reminder sender complete: ${JSON.stringify(result)}`);
  }

  private isEnabled() {
    return this.config.get<boolean>('jobs.enabled') !== false;
  }
}
