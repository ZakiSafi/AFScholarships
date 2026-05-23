import { ApplicationStatus, Prisma, ReportStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateApplicationStatusDto } from '../applications/dto/update-application-status.dto';
import { ListAuditLogsDto } from './dto/list-audit-logs.dto';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listReports(status?: ReportStatus): Prisma.PrismaPromise<({
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
    resolveReport(reportId: string, status: ReportStatus, reviewerId: string): Promise<{
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
    listApplications(status?: ApplicationStatus): Prisma.PrismaPromise<({
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
    updateApplicationStatus(applicationId: string, payload: UpdateApplicationStatusDto, reviewerId: string): Promise<{
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
    listAuditLogs(query: ListAuditLogsDto): Promise<{
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
            metadata: Prisma.JsonValue | null;
        })[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    flagStaleScholarships(staleDays?: number): Promise<{
        flaggedCount: number;
        staleDays: number;
    }>;
}
