import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { UserRole } from '@prisma/client'
import { createHash, randomBytes } from 'crypto'

export interface AccessTokenPayload {
  sub: string
  email: string
  role: UserRole
}

@Injectable()
export class AuthTokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signAccessToken(payload: AccessTokenPayload) {
    const secret =
      this.config.get<string>('jwt.accessSecret') ?? 'super-secret-key'
    const options: JwtSignOptions = {
      secret,
      expiresIn: (this.config.get<string>('jwt.accessExpiresIn') ??
        '15m') as JwtSignOptions['expiresIn'],
    }
    return this.jwtService.signAsync(payload, options)
  }

  generateRefreshToken() {
    const raw = randomBytes(48).toString('hex')
    const hash = this.hashToken(raw)
    const expiresIn = this.config.get<string>('jwt.refreshExpiresIn') ?? '7d'
    const expiresAt = this.parseExpiry(expiresIn)
    return { raw, hash, expiresAt }
  }

  generateResetToken() {
    const raw = randomBytes(32).toString('hex')
    const hash = this.hashToken(raw)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
    return { raw, hash, expiresAt }
  }

  hashToken(raw: string) {
    return createHash('sha256').update(raw).digest('hex')
  }

  private parseExpiry(expiresIn: string): Date {
    const match = /^(\d+)([smhd])$/.exec(expiresIn)
    if (!match) {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
    const value = parseInt(match[1], 10)
    const unit = match[2]
    const ms =
      unit === 's'
        ? value * 1000
        : unit === 'm'
          ? value * 60 * 1000
          : unit === 'h'
            ? value * 60 * 60 * 1000
            : value * 24 * 60 * 60 * 1000
    return new Date(Date.now() + ms)
  }
}
