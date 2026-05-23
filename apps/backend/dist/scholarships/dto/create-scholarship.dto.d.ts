import { DegreeLevel, FundingType } from '@prisma/client';
import { NestedScholarshipContentDto } from './scholarship-content.dto';
export declare class CreateScholarshipDto extends NestedScholarshipContentDto {
    slug: string;
    title: string;
    summary: string;
    description: string;
    provider: string;
    hostCountry: string;
    degreeLevel: DegreeLevel;
    fundingType: FundingType;
    languageRequirement?: string;
    fieldOfStudy?: string[];
    eligibleCountries?: string[];
    minAge?: number;
    maxAge?: number;
    applicationUrl?: string;
    isPartnerApplication?: boolean;
    startsAt?: string;
    deadlineAt: string;
    deadlineTimezone?: string;
    isFeatured?: boolean;
}
