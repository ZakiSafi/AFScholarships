import { VerificationStatus } from '@prisma/client';
export declare class BulkVerifyScholarshipsDto {
    scholarshipIds: string[];
    status?: VerificationStatus;
    note?: string;
}
