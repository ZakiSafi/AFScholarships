import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'

export interface GoogleProfile {
  provider: 'google'
  providerAccountId: string
  email: string
  name?: string
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('google.clientId') || 'not-configured',
      clientSecret: config.get<string>('google.clientSecret') || 'not-configured',
      callbackURL: config.get<string>('google.callbackUrl'),
      scope: ['email', 'profile'],
    })
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const email = profile.emails?.[0]?.value
    if (!email) {
      return done(new Error('Google account has no email'), undefined)
    }
    const user: GoogleProfile = {
      provider: 'google',
      providerAccountId: profile.id,
      email,
      name: profile.displayName,
    }
    done(null, user)
  }
}
