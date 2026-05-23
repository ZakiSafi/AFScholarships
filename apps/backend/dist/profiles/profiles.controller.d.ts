import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    getMine(user: AuthUser): Promise<{
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
    updateProfile(user: AuthUser, payload: UpdateProfileDto): Promise<{
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
    updatePreference(user: AuthUser, payload: UpdatePreferenceDto): Promise<{
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
