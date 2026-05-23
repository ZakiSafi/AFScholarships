import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { MailerModule } from '../mailer/mailer.module'
import { AuthTokensService } from './auth-tokens.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './strategies/google.strategy'
import { JwtAccessStrategy } from './strategies/jwt-access.strategy'

const googleOAuthProviders =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? [GoogleStrategy]
    : []

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    JwtModule.register({}),
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthTokensService,
    JwtAccessStrategy,
    ...googleOAuthProviders,
  ],
  exports: [AuthService, AuthTokensService],
})
export class AuthModule {}
