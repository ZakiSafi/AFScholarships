import { Module } from '@nestjs/common'
import { MAIL_PROVIDER } from './mailer.constants'
import { MailerService } from './mailer.service'
import { NodemailerMailProvider } from './providers/nodemailer.provider'

@Module({
  providers: [
    {
      provide: MAIL_PROVIDER,
      useClass: NodemailerMailProvider,
    },
    MailerService,
  ],
  exports: [MailerService],
})
export class MailerModule {}
