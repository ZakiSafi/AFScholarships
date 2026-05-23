import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { ApplicationsService } from './applications.service';
import { CreatePartnerApplicationDto } from './dto/create-partner-application.dto';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    createPartnerApplication(scholarshipId: string, user: AuthUser, payload: CreatePartnerApplicationDto): Promise<{
        scholarship: {
            title: string;
            id: string;
            slug: string;
            provider: string;
            isPartnerApplication: boolean;
            deadlineAt: Date;
        };
        answers: {
            id: string;
            applicationId: string;
            questionKey: string;
            answer: string;
        }[];
        statusLogs: {
            note: string | null;
            id: string;
            createdAt: Date;
            fromStatus: import("@prisma/client").$Enums.ApplicationStatus | null;
            toStatus: import("@prisma/client").$Enums.ApplicationStatus;
            changedById: string | null;
            applicationId: string;
        }[];
        attachments: {
            id: string;
            applicationId: string;
            fileName: string;
            fileUrl: string;
            mimeType: string | null;
            sizeBytes: number | null;
            uploadedAt: Date;
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
    listMine(user: AuthUser): Promise<({
        scholarship: {
            title: string;
            id: string;
            slug: string;
            provider: string;
            isPartnerApplication: boolean;
            deadlineAt: Date;
        };
        answers: {
            id: string;
            applicationId: string;
            questionKey: string;
            answer: string;
        }[];
        statusLogs: {
            note: string | null;
            id: string;
            createdAt: Date;
            fromStatus: import("@prisma/client").$Enums.ApplicationStatus | null;
            toStatus: import("@prisma/client").$Enums.ApplicationStatus;
            changedById: string | null;
            applicationId: string;
        }[];
        attachments: {
            id: string;
            applicationId: string;
            fileName: string;
            fileUrl: string;
            mimeType: string | null;
            sizeBytes: number | null;
            uploadedAt: Date;
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
    getById(id: string, user: AuthUser): Promise<{
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
            isPartnerApplication: boolean;
            deadlineAt: Date;
        };
        answers: {
            id: string;
            applicationId: string;
            questionKey: string;
            answer: string;
        }[];
        statusLogs: {
            note: string | null;
            id: string;
            createdAt: Date;
            fromStatus: import("@prisma/client").$Enums.ApplicationStatus | null;
            toStatus: import("@prisma/client").$Enums.ApplicationStatus;
            changedById: string | null;
            applicationId: string;
        }[];
        attachments: {
            id: string;
            applicationId: string;
            fileName: string;
            fileUrl: string;
            mimeType: string | null;
            sizeBytes: number | null;
            uploadedAt: Date;
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
}
