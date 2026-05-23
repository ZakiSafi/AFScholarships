import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { ApplicationsService } from './applications.service';
import { CreatePartnerApplicationDto } from './dto/create-partner-application.dto';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    createPartnerApplication(scholarshipId: string, user: AuthUser, payload: CreatePartnerApplicationDto): Promise<{
        attachments: {
            id: string;
            applicationId: string;
            fileName: string;
            fileUrl: string;
            mimeType: string | null;
            sizeBytes: number | null;
            uploadedAt: Date;
        }[];
        scholarship: {
            id: string;
            slug: string;
            title: string;
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
    listMine(user: AuthUser): Promise<({
        attachments: {
            id: string;
            applicationId: string;
            fileName: string;
            fileUrl: string;
            mimeType: string | null;
            sizeBytes: number | null;
            uploadedAt: Date;
        }[];
        scholarship: {
            id: string;
            slug: string;
            title: string;
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
    getById(id: string, user: AuthUser): Promise<{
        user: {
            name: string | null;
            id: string;
            email: string;
        };
        attachments: {
            id: string;
            applicationId: string;
            fileName: string;
            fileUrl: string;
            mimeType: string | null;
            sizeBytes: number | null;
            uploadedAt: Date;
        }[];
        scholarship: {
            id: string;
            slug: string;
            title: string;
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
}
