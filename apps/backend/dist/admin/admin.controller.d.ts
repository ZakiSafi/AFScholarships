import { ApplicationStatus, ReportStatus } from '@prisma/client';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { UpdateApplicationStatusDto } from '../applications/dto/update-application-status.dto';
import { ListAuditLogsDto } from './dto/list-audit-logs.dto';
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
            title: string;
            id: string;
            slug: string;
            provider: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
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
    listApplications(status?: ApplicationStatus): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            email: string;
            name: string | null;
        };
        scholarship: {
            title: string;
            id: string;
            slug: string;
            provider: string;
        };
        statusLogs: {
            note: string | null;
            id: string;
            createdAt: Date;
            fromStatus: import("@prisma/client").$Enums.ApplicationStatus | null;
            toStatus: import("@prisma/client").$Enums.ApplicationStatus;
            changedById: string | null;
            applicationId: string;
        }[];
    } & {
        status: import("@prisma/client").$Enums.ApplicationStatus;
        id: string;
        scholarshipId: string;
        userId: string;
        reviewedById: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
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
            id: string;
            email: string;
            name: string | null;
        };
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
        statusLogs: {
            note: string | null;
            id: string;
            createdAt: Date;
            fromStatus: import("@prisma/client").$Enums.ApplicationStatus | null;
            toStatus: import("@prisma/client").$Enums.ApplicationStatus;
            changedById: string | null;
            applicationId: string;
        }[];
    } & {
        status: import("@prisma/client").$Enums.ApplicationStatus;
        id: string;
        scholarshipId: string;
        userId: string;
        reviewedById: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
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
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            entityType: string;
            entityId: string;
            id: string;
            createdAt: Date;
            actorId: string;
            action: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
        })[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    flagStale(days?: string): Promise<{
        flaggedCount: number;
        staleDays: number;
    }>;
}
