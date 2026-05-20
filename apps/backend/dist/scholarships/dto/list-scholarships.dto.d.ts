import { DegreeLevel, FundingType, VerificationStatus } from '@prisma/client';
export declare class ListScholarshipsDto {
    page?: number;
    limit?: number;
    search?: string;
    country?: string;
    degreeLevel?: DegreeLevel;
    fundingType?: FundingType;
    eligibleCountry?: string;
    partnerOnly?: boolean;
    verificationStatus?: VerificationStatus;
}
