import { DegreeLevel, FundingType, ScholarshipStatus, VerificationStatus } from '@prisma/client';
export declare enum ScholarshipSortField {
    DEADLINE = "deadline",
    TITLE = "title",
    CREATED = "created",
    FEATURED = "featured"
}
export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
export declare class ListScholarshipsDto {
    page?: number;
    limit?: number;
    search?: string;
    country?: string;
    degreeLevel?: DegreeLevel;
    fundingType?: FundingType;
    eligibleCountry?: string;
    fieldOfStudy?: string;
    tag?: string;
    partnerOnly?: boolean;
    verificationStatus?: VerificationStatus;
    sortBy?: ScholarshipSortField;
    sortOrder?: SortOrder;
    includeFacets?: boolean;
}
export declare class AdminListScholarshipsDto extends ListScholarshipsDto {
    status?: ScholarshipStatus;
}
