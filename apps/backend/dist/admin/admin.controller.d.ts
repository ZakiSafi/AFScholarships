import { ReportStatus } from '@prisma/client';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { ResolveReportDto } from './dto/resolve-report.dto';
import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    listReports(status?: ReportStatus): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            email: string;
            name: string | null;
        } | null;
        scholarship: {
            description: string;
            title: string;
            status: import("@prisma/client").$Enums.ScholarshipStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            summary: string;
            provider: string;
            hostCountry: string;
            degreeLevel: import("@prisma/client").$Enums.DegreeLevel;
            fundingType: import("@prisma/client").$Enums.FundingType;
            languageRequirement: string | null;
            fieldOfStudy: string[];
            eligibleCountries: string[];
            minAge: number | null;
            maxAge: number | null;
            applicationUrl: string | null;
            isPartnerApplication: boolean;
            startsAt: Date | null;
            deadlineAt: Date;
            deadlineTimezone: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            verifiedAt: Date | null;
            lastReviewedAt: Date | null;
            isFeatured: boolean;
            createdById: string | null;
        };
    } & {
        status: import("@prisma/client").$Enums.ReportStatus;
        id: string;
        scholarshipId: string;
        userId: string | null;
        reviewedById: string | null;
        reason: string;
        details: string | null;
        resolvedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    resolveReport(id: string, user: AuthUser, payload: ResolveReportDto): Promise<{
        status: import("@prisma/client").$Enums.ReportStatus;
        id: string;
        scholarshipId: string;
        userId: string | null;
        reviewedById: string | null;
        reason: string;
        details: string | null;
        resolvedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    flagStale(days?: string): Promise<{
        flaggedCount: number;
        staleDays: number;
    }>;
}
