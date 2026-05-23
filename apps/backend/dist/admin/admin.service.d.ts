import { ApplicationStatus, Prisma, ReportStatus } from '@prisma/client';
import { JobsService } from '../jobs/jobs.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReportsService } from '../reports/reports.service';
import { UpdateApplicationStatusDto } from '../applications/dto/update-application-status.dto';
import { BulkArchiveExpiredDto } from './dto/bulk-archive.dto';
import { BulkVerifyScholarshipsDto } from './dto/bulk-verify.dto';
import { ListAuditLogsDto } from './dto/list-audit-logs.dto';
export declare class AdminService {
    private readonly prisma;
    private readonly jobsService;
    private readonly reportsService;
    constructor(prisma: PrismaService, jobsService: JobsService, reportsService: ReportsService);
    listReports(status?: ReportStatus): Prisma.PrismaPromise<({
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
    resolveReport(reportId: string, status: ReportStatus, reviewerId: string): Promise<{
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
    listApplications(status?: ApplicationStatus): Prisma.PrismaPromise<({
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
    updateApplicationStatus(applicationId: string, payload: UpdateApplicationStatusDto, reviewerId: string): Promise<{
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
    listAuditLogs(query: ListAuditLogsDto): Promise<{
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
            metadata: Prisma.JsonValue | null;
            actorId: string;
        })[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    flagStaleScholarships(staleDays?: number, actorId?: string): Promise<{
        flaggedCount: number;
        staleDays: number;
    }>;
    bulkVerify(payload: BulkVerifyScholarshipsDto, reviewerId: string): Promise<{
        total: number;
        succeeded: number;
        failed: number;
        results: {
            id: string;
            success: boolean;
            error?: string;
        }[];
    }>;
    bulkArchiveExpired(payload: BulkArchiveExpiredDto, actorId: string): Promise<{
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
    runJob(job: string, actorId?: string): Promise<{
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
