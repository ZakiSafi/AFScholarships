import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './interfaces/auth-user.interface';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService implements OnModuleInit {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    onModuleInit(): Promise<void>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    getProfile(user: AuthUser): AuthUser;
    private ensureDemoUser;
}
