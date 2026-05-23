import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthTokensService } from './auth-tokens.service';
import { AuthUser } from './interfaces/auth-user.interface';
import { GoogleProfile } from './strategies/google.strategy';
export declare class AuthService implements OnModuleInit {
    private readonly prisma;
    private readonly tokens;
    private readonly mailer;
    private readonly config;
    constructor(prisma: PrismaService, tokens: AuthTokensService, mailer: MailerService, config: ConfigService);
    onModuleInit(): Promise<void>;
    signup(email: string, password: string, name?: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.UserRole;
        };
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.UserRole;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.UserRole;
        };
    }>;
    logout(refreshToken: string): Promise<{
        success: boolean;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, password: string): Promise<{
        message: string;
    }>;
    handleGoogleLogin(profile: GoogleProfile): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.UserRole;
        };
    }>;
    getProfile(user: AuthUser): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        emailVerifiedAt: Date | null;
        profile: {
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            fieldOfStudy: string | null;
            country: string | null;
            educationLevel: string | null;
            avatarUrl: string | null;
            bio: string | null;
            city: string | null;
            province: string | null;
            targetDegree: import("@prisma/client").$Enums.DegreeLevel | null;
            targetCountry: string | null;
            interests: string[];
            linkedinUrl: string | null;
        } | null;
        preference: {
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            locale: string;
            timezone: string;
            emailDigestEnabled: boolean;
            marketingOptIn: boolean;
            preferredCountries: string[];
            preferredDegreeLevels: import("@prisma/client").$Enums.DegreeLevel[];
        } | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    isGoogleOAuthEnabled(): boolean;
    private issueTokenPair;
    private ensureDemoUser;
}
