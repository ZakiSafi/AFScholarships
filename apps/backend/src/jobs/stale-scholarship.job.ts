import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { JobsService } from './jobs.service';

@Injectable()
export class StaleScholarshipJob {
  private readonly logger = new Logger(StaleScholarshipJob.name);

  constructor(
    private readonly jobsService: JobsService,
    private readonly config: ConfigService,
  ) {}

  @Cron(process.env.JOB_STALE_SCHOLARSHIP_CRON ?? '0 2 * * *')
  async handleCron() {
    if (!this.isEnabled()) return;

    this.logger.log('Running stale scholarship check');
    const result = await this.jobsService.runStaleScholarshipCheck();
    this.logger.log(`Stale check complete: ${JSON.stringify(result)}`);
  }

  private isEnabled() {
    return this.config.get<boolean>('jobs.enabled') !== false;
  }
}
