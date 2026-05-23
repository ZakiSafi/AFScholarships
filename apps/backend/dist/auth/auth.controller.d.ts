import type { Response } from 'express';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignupDto } from './dto/signup.dto';
import type { AuthUser } from './interfaces/auth-user.interface';
import { GoogleProfile } from './strategies/google.strategy';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(payload: SignupDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.UserRole;
        };
    }>;
    login(payload: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.UserRole;
        };
    }>;
    refresh(payload: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.UserRole;
        };
    }>;
    logout(payload: RefreshTokenDto): Promise<{
        success: boolean;
    }>;
    forgotPassword(payload: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(payload: ResetPasswordDto): Promise<{
        message: string;
    }>;
    googleAuth(): void;
    googleCallback(req: {
        user: GoogleProfile;
    }, res: Response): Promise<void>;
    profile(user: AuthUser): import("@prisma/client").Prisma.Prisma__UserClient<{
        name: string | null;
        id: string;
        createdAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        emailVerifiedAt: Date | null;
        profile: {
            fieldOfStudy: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
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
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            locale: string;
            timezone: string;
            emailDigestEnabled: boolean;
            marketingOptIn: boolean;
            preferredCountries: string[];
            preferredDegreeLevels: import("@prisma/client").$Enums.DegreeLevel[];
        } | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
