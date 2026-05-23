import { Prisma } from '@prisma/client';
import { NestedScholarshipContentDto } from './dto/scholarship-content.dto';
export declare const scholarshipDetailInclude: {
    steps: {
        orderBy: {
            orderIndex: "asc";
        };
    };
    requirements: {
        orderBy: {
            orderIndex: "asc";
        };
    };
    benefits: {
        orderBy: {
            orderIndex: "asc";
        };
    };
    faqs: {
        orderBy: {
            orderIndex: "asc";
        };
    };
    sources: boolean;
    tags: {
        include: {
            tag: boolean;
        };
    };
    verificationReviews: {
        orderBy: {
            createdAt: "desc";
        };
        take: number;
        include: {
            reviewer: {
                select: {
                    id: boolean;
                    name: boolean;
                    email: boolean;
                };
            };
        };
    };
};
type NestedScholarshipRelations = Pick<Prisma.ScholarshipUncheckedCreateInput, 'steps' | 'requirements' | 'benefits' | 'faqs' | 'sources' | 'tags'>;
export declare function buildNestedCreate(content?: NestedScholarshipContentDto): NestedScholarshipRelations;
export declare function replaceNestedContent(tx: Prisma.TransactionClient, scholarshipId: string, content: NestedScholarshipContentDto): Promise<void>;
export {};
