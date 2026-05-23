import { UserRole } from '@prisma/client';
export declare class ListUsersDto {
    page?: number;
    limit?: number;
    search?: string;
    role?: UserRole;
}
