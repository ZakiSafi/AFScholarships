import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
export interface AccessTokenPayload {
    sub: string;
    email: string;
    role: UserRole;
}
export declare class AuthTokensService {
    private readonly jwtService;
    private readonly config;
    constructor(jwtService: JwtService, config: ConfigService);
    signAccessToken(payload: AccessTokenPayload): Promise<string>;
    generateRefreshToken(): {
        raw: string;
        hash: string;
        expiresAt: Date;
    };
    generateResetToken(): {
        raw: string;
        hash: string;
        expiresAt: Date;
    };
    hashToken(raw: string): string;
    private parseExpiry;
}
