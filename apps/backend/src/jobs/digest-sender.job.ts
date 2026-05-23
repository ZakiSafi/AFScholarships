import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { JobsService } from './jobs.service';

@Injectable()
export class DigestSenderJob {
  private readonly logger = new Logger(DigestSenderJob.name);

  constructor(
    private readonly jobsService: JobsService,
    private readonly config: ConfigService,
  ) {}

  @Cron(process.env.JOB_DIGEST_SENDER_CRON ?? '0 8 * * 1')
  async handleCron() {
    if (!this.isEnabled()) return;

    this.logger.log('Running digest sender job');
    const result = await this.jobsService.runDigestSender();
    this.logger.log(`Digest sender complete: ${JSON.stringify(result)}`);
  }

  private isEnabled() {
    return this.config.get<boolean>('jobs.enabled') !== false;
  }
}
