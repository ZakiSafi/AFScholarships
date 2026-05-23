import { ReportStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ReportListingDto } from '../scholarships/dto/report-listing.dto';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(scholarshipId: string, payload: ReportListingDto, userId?: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.ReportStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        scholarshipId: string;
        reason: string;
        details: string | null;
        resolvedAt: Date | null;
        reviewedById: string | null;
    }>;
    listForModeration(status?: ReportStatus): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            name: string | null;
            id: string;
            email: string;
        } | null;
        scholarship: {
            id: string;
            slug: string;
            title: string;
            provider: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.ReportStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        scholarshipId: string;
        reason: string;
        details: string | null;
        resolvedAt: Date | null;
        reviewedById: string | null;
    })[]>;
}
