import { DegreeLevel, FundingType } from '@prisma/client';
declare class ApplicationStepDto {
    orderIndex: number;
    title: string;
    description: string;
    isRequired?: boolean;
}
export declare class CreateScholarshipDto {
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
    steps?: ApplicationStepDto[];
}
export {};
