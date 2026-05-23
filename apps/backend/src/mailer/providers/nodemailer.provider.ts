import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import {
  MailMessage,
  MailProvider,
  MailSendResult,
} from '../interfaces/mail-message.interface'

@Injectable()
export class NodemailerMailProvider implements MailProvider {
  private readonly logger = new Logger(NodemailerMailProvider.name)
  private transporter: Transporter | null = null

  constructor(private readonly config: ConfigService) {}

  private getTransporter(): Transporter {
    if (!this.transporter) {
      const host = this.config.get<string>('mail.host') ?? 'mailhog'
      const port = this.config.get<number>('mail.port') ?? 1025
      const secure = this.config.get<boolean>('mail.secure') ?? false
      const user = this.config.get<string>('mail.user')
      const pass = this.config.get<string>('mail.password')

      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: user && pass ? { user, pass } : undefined,
      })

      this.logger.log(`Mail transport configured: ${host}:${port}`)
    }
    return this.transporter
  }

  async send(message: MailMessage): Promise<MailSendResult> {
    const from = this.config.get<string>('mail.from') ?? 'noreply@afscholarships.dev'
    const result = await this.getTransporter().sendMail({
      from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    })

    return {
      messageId: result.messageId,
      accepted: result.accepted?.map(String) ?? [message.to],
    }
  }
}
