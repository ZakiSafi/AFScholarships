import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async getMine(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
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

    if (!user) {
      return null;
    }

    if (!user.profile) {
      await this.prisma.userProfile.create({ data: { userId } });
    }
    if (!user.preference) {
      await this.prisma.userPreference.create({ data: { userId } });
    }

    return this.prisma.user.findUnique({
      where: { id: userId },
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

  async updateProfile(userId: string, payload: UpdateProfileDto) {
    const { name, ...profileData } = payload;

    return this.prisma.$transaction(async (tx) => {
      if (name !== undefined) {
        await tx.user.update({ where: { id: userId }, data: { name } });
      }

      const profile = await tx.userProfile.upsert({
        where: { userId },
        create: { userId, ...profileData },
        update: profileData,
      });

      return profile;
    });
  }

  async updatePreference(userId: string, payload: UpdatePreferenceDto) {
    return this.prisma.userPreference.upsert({
      where: { userId },
      create: { userId, ...payload },
      update: payload,
    });
  }
}
