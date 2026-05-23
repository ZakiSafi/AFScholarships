import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '../mailer/mailer.module';
import { DigestSenderJob } from './digest-sender.job';
import { JobsService } from './jobs.service';
import { NotificationRetryJob } from './notification-retry.job';
import { ReminderSenderJob } from './reminder-sender.job';
import { StaleScholarshipJob } from './stale-scholarship.job';

@Module({
  imports: [ScheduleModule.forRoot(), MailerModule],
  providers: [
    JobsService,
    StaleScholarshipJob,
    ReminderSenderJob,
    DigestSenderJob,
    NotificationRetryJob,
  ],
  exports: [JobsService],
})
export class JobsModule {}
