import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUser } from './interfaces/auth-user.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.ensureDemoUser();
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  getProfile(user: AuthUser) {
    return user;
  }

  private async ensureDemoUser() {
    const email = 'admin@afscholarships.dev';
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      if (user.role !== UserRole.ADMIN) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { role: UserRole.ADMIN },
        });
      }
      return;
    }

    const hashedPassword = await bcrypt.hash('password123', 10);
    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Admin User',
        role: UserRole.ADMIN,
      },
    });
  }
}
