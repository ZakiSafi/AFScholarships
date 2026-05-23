import { DegreeLevel, FundingType } from '@prisma/client';
type SeedRequirement = {
    orderIndex: number;
    label: string;
    description: string;
    isMandatory?: boolean;
};
type SeedBenefit = {
    orderIndex: number;
    title: string;
    description: string;
};
type SeedFaq = {
    orderIndex: number;
    question: string;
    answer: string;
};
type SeedSource = {
    url: string;
    label: string;
};
type SeedTag = string;
export type ScholarshipSeed = {
    slug: string;
    title: string;
    summary: string;
    description: string;
    provider: string;
    hostCountry: string;
    degreeLevel: DegreeLevel;
    fundingType: FundingType;
    languageRequirement?: string;
    fieldOfStudy: string[];
    eligibleCountries: string[];
    applicationUrl?: string;
    isPartnerApplication?: boolean;
    isFeatured?: boolean;
    deadlineMonth: number;
    deadlineDay: number;
    requirements: SeedRequirement[];
    benefits: SeedBenefit[];
    faqs: SeedFaq[];
    sources: SeedSource[];
    tags: SeedTag[];
    steps?: Array<{
        orderIndex: number;
        title: string;
        description: string;
    }>;
};
export declare const SCHOLARSHIP_SEEDS: ScholarshipSeed[];
export declare const SEED_TAG_DEFINITIONS: Record<string, string>;
export {};
