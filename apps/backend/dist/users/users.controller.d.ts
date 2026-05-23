import { ListUsersDto } from './dto/list-users.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    list(query: ListUsersDto): Promise<{
        items: {
            name: string | null;
            id: string;
            createdAt: Date;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            emailVerifiedAt: Date | null;
            isActive: boolean;
            profile: {
                country: string | null;
                targetDegree: import("@prisma/client").$Enums.DegreeLevel | null;
                targetCountry: string | null;
            } | null;
        }[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    getById(id: string): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        emailVerifiedAt: Date | null;
        isActive: boolean;
        profile: {
            fieldOfStudy: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            country: string | null;
            educationLevel: string | null;
            avatarUrl: string | null;
            bio: string | null;
            city: string | null;
            province: string | null;
            targetDegree: import("@prisma/client").$Enums.DegreeLevel | null;
            targetCountry: string | null;
            interests: string[];
            linkedinUrl: string | null;
        } | null;
        preference: {
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            locale: string;
            timezone: string;
            emailDigestEnabled: boolean;
            marketingOptIn: boolean;
            preferredCountries: string[];
            preferredDegreeLevels: import("@prisma/client").$Enums.DegreeLevel[];
        } | null;
    }>;
}
