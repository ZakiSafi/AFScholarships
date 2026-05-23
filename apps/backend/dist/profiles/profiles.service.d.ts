import { PrismaService } from '../prisma/prisma.service';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfilesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMine(userId: string): Promise<{
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
    } | null>;
    updateProfile(userId: string, payload: UpdateProfileDto): Promise<{
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
    }>;
    updatePreference(userId: string, payload: UpdatePreferenceDto): Promise<{
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        locale: string;
        timezone: string;
        emailDigestEnabled: boolean;
        marketingOptIn: boolean;
        preferredCountries: string[];
        preferredDegreeLevels: import("@prisma/client").$Enums.DegreeLevel[];
    }>;
}
