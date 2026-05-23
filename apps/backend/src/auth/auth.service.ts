import {
  BadRequestException,
  ConflictException,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  AuthProviderType,
  UserRole,
} from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { MailerService } from '../mailer/mailer.service'
import { PrismaService } from '../prisma/prisma.service'
import { AuthTokensService } from './auth-tokens.service'
import { AuthUser } from './interfaces/auth-user.interface'
import { GoogleProfile } from './strategies/google.strategy'

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokens: AuthTokensService,
    private readonly mailer: MailerService,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    await this.ensureDemoUser()
  }

  async signup(email: string, password: string, name?: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } })
    if (existing) {
      throw new ConflictException('Email already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profile: { create: {} },
        preference: { create: {} },
        authProviders: {
          create: {
            provider: AuthProviderType.EMAIL,
            providerAccountId: email,
          },
        },
      },
    })

    return this.issueTokenPair(user)
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user?.password || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return this.issueTokenPair(user)
  }

  async refresh(refreshToken: string) {
    const tokenHash = this.tokens.hashToken(refreshToken)
    const stored = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    })

    if (
      !stored ||
      stored.revokedAt ||
      stored.expiresAt < new Date() ||
      !stored.user.isActive
    ) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    })

    return this.issueTokenPair(stored.user)
  }

  async logout(refreshToken: string) {
    const tokenHash = this.tokens.hashToken(refreshToken)
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    })
    return { success: true }
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      return { message: 'If the email exists, a reset link was sent.' }
    }

    await this.prisma.passwordResetToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    })

    const { raw, hash, expiresAt } = this.tokens.generateResetToken()
    await this.prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash: hash, expiresAt },
    })

    const frontendUrl = this.config.get<string>('frontendUrl')
    const resetUrl = `${frontendUrl}/reset-password?token=${raw}`
    await this.mailer.sendPasswordResetEmail(email, resetUrl)

    return { message: 'If the email exists, a reset link was sent.' }
  }

  async resetPassword(token: string, password: string) {
    const tokenHash = this.tokens.hashToken(token)
    const resetRecord = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    })

    if (
      !resetRecord ||
      resetRecord.usedAt ||
      resetRecord.expiresAt < new Date()
    ) {
      throw new BadRequestException('Invalid or expired reset token')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: resetRecord.userId },
        data: { password: hashedPassword },
      }),
      this.prisma.passwordResetToken.update({
        where: { id: resetRecord.id },
        data: { usedAt: new Date() },
      }),
      this.prisma.refreshToken.updateMany({
        where: { userId: resetRecord.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ])

    return { message: 'Password updated successfully' }
  }

  async handleGoogleLogin(profile: GoogleProfile) {
    const account = await this.prisma.authProviderAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider: AuthProviderType.GOOGLE,
          providerAccountId: profile.providerAccountId,
        },
      },
      include: { user: true },
    })

    if (account) {
      return this.issueTokenPair(account.user)
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: profile.email },
    })

    if (existingUser) {
      await this.prisma.authProviderAccount.create({
        data: {
          userId: existingUser.id,
          provider: AuthProviderType.GOOGLE,
          providerAccountId: profile.providerAccountId,
        },
      })
      return this.issueTokenPair(existingUser)
    }

    const user = await this.prisma.user.create({
      data: {
        email: profile.email,
        name: profile.name,
        emailVerifiedAt: new Date(),
        profile: { create: {} },
        preference: { create: {} },
        authProviders: {
          create: {
            provider: AuthProviderType.GOOGLE,
            providerAccountId: profile.providerAccountId,
          },
        },
      },
    })

    return this.issueTokenPair(user)
  }

  getProfile(user: AuthUser) {
    return this.prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerifiedAt: true,
        createdAt: true,
        profile: true,
        preference: true,
      },
    })
  }

  isGoogleOAuthEnabled() {
    return Boolean(
      this.config.get<string>('google.clientId') &&
        this.config.get<string>('google.clientSecret'),
    )
  }

  private async issueTokenPair(user: {
    id: string
    email: string
    name: string | null
    role: UserRole
  }) {
    const accessToken = await this.tokens.signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    const { raw, hash, expiresAt } = this.tokens.generateRefreshToken()
    await this.prisma.refreshToken.create({
      data: { userId: user.id, tokenHash: hash, expiresAt },
    })

    return {
      accessToken,
      refreshToken: raw,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  }

  private async ensureDemoUser() {
    const email = 'admin@afscholarships.dev'
    let user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      const hashedPassword = await bcrypt.hash('password123', 10)
      user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: 'Admin User',
          role: UserRole.ADMIN,
          emailVerifiedAt: new Date(),
          profile: { create: {} },
          preference: { create: {} },
          authProviders: {
            create: {
              provider: AuthProviderType.EMAIL,
              providerAccountId: email,
            },
          },
        },
      })
    } else if (user.role !== UserRole.ADMIN) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { role: UserRole.ADMIN },
      })
    }

    const hasProfile = await this.prisma.userProfile.findUnique({
      where: { userId: user.id },
    })
    if (!hasProfile) {
      await this.prisma.userProfile.create({ data: { userId: user.id } })
    }
    const hasPreference = await this.prisma.userPreference.findUnique({
      where: { userId: user.id },
    })
    if (!hasPreference) {
      await this.prisma.userPreference.create({ data: { userId: user.id } })
    }
  }
}
