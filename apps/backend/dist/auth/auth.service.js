"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const mailer_service_1 = require("../mailer/mailer.service");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_tokens_service_1 = require("./auth-tokens.service");
let AuthService = class AuthService {
    prisma;
    tokens;
    mailer;
    config;
    constructor(prisma, tokens, mailer, config) {
        this.prisma = prisma;
        this.tokens = tokens;
        this.mailer = mailer;
        this.config = config;
    }
    async onModuleInit() {
        await this.ensureDemoUser();
    }
    async signup(email, password, name) {
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw new common_1.ConflictException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                profile: { create: {} },
                preference: { create: {} },
                authProviders: {
                    create: {
                        provider: client_1.AuthProviderType.EMAIL,
                        providerAccountId: email,
                    },
                },
            },
        });
        return this.issueTokenPair(user);
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user?.password || !user.isActive) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.issueTokenPair(user);
    }
    async refresh(refreshToken) {
        const tokenHash = this.tokens.hashToken(refreshToken);
        const stored = await this.prisma.refreshToken.findUnique({
            where: { tokenHash },
            include: { user: true },
        });
        if (!stored ||
            stored.revokedAt ||
            stored.expiresAt < new Date() ||
            !stored.user.isActive) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        await this.prisma.refreshToken.update({
            where: { id: stored.id },
            data: { revokedAt: new Date() },
        });
        return this.issueTokenPair(stored.user);
    }
    async logout(refreshToken) {
        const tokenHash = this.tokens.hashToken(refreshToken);
        await this.prisma.refreshToken.updateMany({
            where: { tokenHash, revokedAt: null },
            data: { revokedAt: new Date() },
        });
        return { success: true };
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return { message: 'If the email exists, a reset link was sent.' };
        }
        await this.prisma.passwordResetToken.updateMany({
            where: { userId: user.id, usedAt: null },
            data: { usedAt: new Date() },
        });
        const { raw, hash, expiresAt } = this.tokens.generateResetToken();
        await this.prisma.passwordResetToken.create({
            data: { userId: user.id, tokenHash: hash, expiresAt },
        });
        const frontendUrl = this.config.get('frontendUrl');
        const resetUrl = `${frontendUrl}/reset-password?token=${raw}`;
        await this.mailer.sendPasswordResetEmail(email, resetUrl);
        return { message: 'If the email exists, a reset link was sent.' };
    }
    async resetPassword(token, password) {
        const tokenHash = this.tokens.hashToken(token);
        const resetRecord = await this.prisma.passwordResetToken.findUnique({
            where: { tokenHash },
            include: { user: true },
        });
        if (!resetRecord ||
            resetRecord.usedAt ||
            resetRecord.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
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
        ]);
        return { message: 'Password updated successfully' };
    }
    async handleGoogleLogin(profile) {
        const account = await this.prisma.authProviderAccount.findUnique({
            where: {
                provider_providerAccountId: {
                    provider: client_1.AuthProviderType.GOOGLE,
                    providerAccountId: profile.providerAccountId,
                },
            },
            include: { user: true },
        });
        if (account) {
            return this.issueTokenPair(account.user);
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { email: profile.email },
        });
        if (existingUser) {
            await this.prisma.authProviderAccount.create({
                data: {
                    userId: existingUser.id,
                    provider: client_1.AuthProviderType.GOOGLE,
                    providerAccountId: profile.providerAccountId,
                },
            });
            return this.issueTokenPair(existingUser);
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
                        provider: client_1.AuthProviderType.GOOGLE,
                        providerAccountId: profile.providerAccountId,
                    },
                },
            },
        });
        return this.issueTokenPair(user);
    }
    getProfile(user) {
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
        });
    }
    isGoogleOAuthEnabled() {
        return Boolean(this.config.get('google.clientId') &&
            this.config.get('google.clientSecret'));
    }
    async issueTokenPair(user) {
        const accessToken = await this.tokens.signAccessToken({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        const { raw, hash, expiresAt } = this.tokens.generateRefreshToken();
        await this.prisma.refreshToken.create({
            data: { userId: user.id, tokenHash: hash, expiresAt },
        });
        return {
            accessToken,
            refreshToken: raw,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
    async ensureDemoUser() {
        const email = 'admin@afscholarships.dev';
        let user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            user = await this.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name: 'Admin User',
                    role: client_1.UserRole.ADMIN,
                    emailVerifiedAt: new Date(),
                    profile: { create: {} },
                    preference: { create: {} },
                    authProviders: {
                        create: {
                            provider: client_1.AuthProviderType.EMAIL,
                            providerAccountId: email,
                        },
                    },
                },
            });
        }
        else if (user.role !== client_1.UserRole.ADMIN) {
            user = await this.prisma.user.update({
                where: { id: user.id },
                data: { role: client_1.UserRole.ADMIN },
            });
        }
        const hasProfile = await this.prisma.userProfile.findUnique({
            where: { userId: user.id },
        });
        if (!hasProfile) {
            await this.prisma.userProfile.create({ data: { userId: user.id } });
        }
        const hasPreference = await this.prisma.userPreference.findUnique({
            where: { userId: user.id },
        });
        if (!hasPreference) {
            await this.prisma.userPreference.create({ data: { userId: user.id } });
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_tokens_service_1.AuthTokensService,
        mailer_service_1.MailerService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map