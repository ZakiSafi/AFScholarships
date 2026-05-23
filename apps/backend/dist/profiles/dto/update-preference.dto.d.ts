import { DegreeLevel } from '@prisma/client';
export declare class UpdatePreferenceDto {
    locale?: string;
    timezone?: string;
    emailDigestEnabled?: boolean;
    marketingOptIn?: boolean;
    preferredCountries?: string[];
    preferredDegreeLevels?: DegreeLevel[];
}
