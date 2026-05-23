import { DegreeLevel } from '@prisma/client';
export declare class UpdateProfileDto {
    name?: string;
    avatarUrl?: string;
    bio?: string;
    city?: string;
    province?: string;
    country?: string;
    educationLevel?: string;
    fieldOfStudy?: string;
    targetDegree?: DegreeLevel;
    targetCountry?: string;
    interests?: string[];
    linkedinUrl?: string;
}
