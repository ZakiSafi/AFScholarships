import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MailerService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthTokensService } from './auth-tokens.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const prisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    refreshToken: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
  };

  const tokens = {
    hashToken: jest.fn((value: string) => `hash:${value}`),
    signAccessToken: jest.fn(),
    generateRefreshToken: jest.fn(),
    generateResetToken: jest.fn(),
  };

  const mailer = {
    sendPasswordReset: jest.fn(),
  };

  const config = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(
      prisma as unknown as PrismaService,
      tokens as unknown as AuthTokensService,
      mailer as unknown as MailerService,
      config as unknown as ConfigService,
    );
  });

  describe('login', () => {
    it('throws when credentials are invalid', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.login('a@b.com', 'secret')).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });

    it('returns tokens when password is valid', async () => {
      const hashed = await bcrypt.hash('password123', 10);
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'a@b.com',
        password: hashed,
        isActive: true,
        role: UserRole.USER,
      });
      tokens.signAccessToken.mockResolvedValue('access');
      tokens.generateRefreshToken.mockReturnValue({
        raw: 'refresh',
        hash: 'refresh-hash',
        expiresAt: new Date(Date.now() + 60_000),
      });
      prisma.refreshToken.create.mockResolvedValue({ id: 'rt-1' });

      const result = await service.login('a@b.com', 'password123');

      expect(result.accessToken).toBe('access');
      expect(result.refreshToken).toBe('refresh');
      expect(tokens.signAccessToken).toHaveBeenCalled();
    });
  });

  describe('signup', () => {
    it('throws when email is already registered', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'existing' });

      await expect(
        service.signup('a@b.com', 'password123', 'Test'),
      ).rejects.toBeInstanceOf(ConflictException);
    });
  });
});
