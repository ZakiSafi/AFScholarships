import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name)

  constructor(private readonly config: ConfigService) {}

  async sendPasswordResetEmail(to: string, resetUrl: string) {
    const from = this.config.get<string>('mail.from')
    this.logger.log(
      `[mail] Password reset to=${to} from=${from} url=${resetUrl}`,
    )
    // SMTP/MailHog integration wired in Phase C jobs module
    return { queued: true }
  }
}
