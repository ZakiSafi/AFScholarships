import { PrismaService } from '../prisma/prisma.service';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfilesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMine(userId: string): Promise<{
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
    } | null>;
    updateProfile(userId: string, payload: UpdateProfileDto): Promise<{
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
    }>;
    updatePreference(userId: string, payload: UpdatePreferenceDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        locale: string;
        timezone: string;
        emailDigestEnabled: boolean;
        marketingOptIn: boolean;
        preferredCountries: string[];
        preferredDegreeLevels: import("@prisma/client").$Enums.DegreeLevel[];
    }>;
}
