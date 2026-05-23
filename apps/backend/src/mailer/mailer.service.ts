import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MAIL_PROVIDER } from './mailer.constants'
import type { MailProvider } from './interfaces/mail-message.interface'
import { digestTemplate } from './templates/digest.template'
import { passwordResetTemplate } from './templates/password-reset.template'
import { reminderTemplate } from './templates/reminder.template'

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name)

  constructor(
    @Inject(MAIL_PROVIDER) private readonly provider: MailProvider,
    private readonly config: ConfigService,
  ) {}

  async sendPasswordResetEmail(to: string, resetUrl: string) {
    const template = passwordResetTemplate(resetUrl)
    return this.send(to, template.subject, template.html, template.text)
  }

  async sendReminderEmail(
    to: string,
    params: {
      scholarshipTitle: string
      deadlineAt: string
      scholarshipUrl: string
    },
  ) {
    const template = reminderTemplate(params)
    return this.send(to, template.subject, template.html, template.text)
  }

  async sendDigestEmail(
    to: string,
    params: {
      userName: string
      items: { title: string; deadlineAt: string; url: string }[]
    },
  ) {
    const template = digestTemplate(params)
    return this.send(to, template.subject, template.html, template.text)
  }

  private async send(
    to: string,
    subject: string,
    html: string,
    text?: string,
  ) {
    try {
      const result = await this.provider.send({ to, subject, html, text })
      this.logger.log(`Email sent to ${to}: ${subject}`)
      return { success: true, ...result }
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error)
      throw error
    }
  }
}
