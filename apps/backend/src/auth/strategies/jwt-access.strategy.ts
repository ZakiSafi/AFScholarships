import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { UserRole } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AccessTokenPayload } from '../auth-tokens.service'

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        config.get<string>('jwt.accessSecret') ?? 'super-secret-key',
    })
  }

  validate(payload: AccessTokenPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    }
  }
}
