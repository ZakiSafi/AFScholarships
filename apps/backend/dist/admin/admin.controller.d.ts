import { ApplicationStatus, ReportStatus } from '@prisma/client';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { UpdateApplicationStatusDto } from '../applications/dto/update-application-status.dto';
import { BulkArchiveExpiredDto } from './dto/bulk-archive.dto';
import { BulkVerifyScholarshipsDto } from './dto/bulk-verify.dto';
import { ListAuditLogsDto } from './dto/list-audit-logs.dto';
import { ResolveReportDto } from './dto/resolve-report.dto';
import { RunJobDto } from './dto/run-job.dto';
import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    listReports(status?: ReportStatus): import("@prisma/client").Prisma.PrismaPromise<({
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
    resolveReport(id: string, user: AuthUser, payload: ResolveReportDto): Promise<{
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
    listApplications(status?: ApplicationStatus): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            name: string | null;
            id: string;
            email: string;
        };
        scholarship: {
            id: string;
            slug: string;
            title: string;
            provider: string;
        };
        statusLogs: {
            id: string;
            createdAt: Date;
            note: string | null;
            fromStatus: import("@prisma/client").$Enums.ApplicationStatus | null;
            toStatus: import("@prisma/client").$Enums.ApplicationStatus;
            changedById: string | null;
            applicationId: string;
        }[];
    } & {
        id: string;
        status: import("@prisma/client").$Enums.ApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        userId: string;
        scholarshipId: string;
        reviewedById: string | null;
        fullName: string;
        phone: string | null;
        country: string | null;
        educationLevel: string | null;
        statement: string;
        docsUrls: string[];
        reviewedAt: Date | null;
    })[]>;
    updateApplicationStatus(id: string, user: AuthUser, payload: UpdateApplicationStatusDto): Promise<{
        user: {
            name: string | null;
            id: string;
            email: string;
        };
        scholarship: {
            id: string;
            slug: string;
            title: string;
            summary: string;
            description: string;
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
            status: import("@prisma/client").$Enums.ScholarshipStatus;
            startsAt: Date | null;
            deadlineAt: Date;
            deadlineTimezone: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            verifiedAt: Date | null;
            lastReviewedAt: Date | null;
            isFeatured: boolean;
            createdById: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        statusLogs: {
            id: string;
            createdAt: Date;
            note: string | null;
            fromStatus: import("@prisma/client").$Enums.ApplicationStatus | null;
            toStatus: import("@prisma/client").$Enums.ApplicationStatus;
            changedById: string | null;
            applicationId: string;
        }[];
    } & {
        id: string;
        status: import("@prisma/client").$Enums.ApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        userId: string;
        scholarshipId: string;
        reviewedById: string | null;
        fullName: string;
        phone: string | null;
        country: string | null;
        educationLevel: string | null;
        statement: string;
        docsUrls: string[];
        reviewedAt: Date | null;
    }>;
    auditLogs(query: ListAuditLogsDto): Promise<{
        items: ({
            actor: {
                name: string | null;
                id: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            entityType: string;
            entityId: string;
            action: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            actorId: string;
        })[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    bulkVerify(user: AuthUser, payload: BulkVerifyScholarshipsDto): Promise<{
        total: number;
        succeeded: number;
        failed: number;
        results: {
            id: string;
            success: boolean;
            error?: string;
        }[];
    }>;
    bulkArchiveExpired(user: AuthUser, payload: BulkArchiveExpiredDto): Promise<{
        dryRun: boolean;
        count: number;
        scholarships: {
            id: string;
            slug: string;
            title: string;
        }[];
        archivedCount?: undefined;
    } | {
        archivedCount: number;
        scholarships: {
            id: string;
            slug: string;
            title: string;
        }[];
        dryRun?: undefined;
        count?: undefined;
    }>;
    flagStale(user: AuthUser, days?: string): Promise<{
        flaggedCount: number;
        staleDays: number;
    }>;
    runJob(user: AuthUser, payload: RunJobDto): Promise<{
        users: number;
        sent: number;
        skipped: number;
    } | {
        retried: number;
        succeeded: number;
        maxRetries: number;
    } | {
        processed: number;
        sent: number;
        failed: number;
    } | {
        flaggedCount: number;
        staleDays: number;
    }>;
}
