export declare class ApplicationStepDto {
    orderIndex: number;
    title: string;
    description: string;
    isRequired?: boolean;
}
export declare class ScholarshipRequirementDto {
    orderIndex: number;
    label: string;
    description: string;
    isMandatory?: boolean;
}
export declare class ScholarshipBenefitDto {
    orderIndex: number;
    title: string;
    description: string;
}
export declare class ScholarshipFaqDto {
    orderIndex: number;
    question: string;
    answer: string;
}
export declare class ScholarshipSourceDto {
    url: string;
    label: string;
}
export declare class ScholarshipTagDto {
    slug: string;
    name: string;
}
export declare class NestedScholarshipContentDto {
    steps?: ApplicationStepDto[];
    requirements?: ScholarshipRequirementDto[];
    benefits?: ScholarshipBenefitDto[];
    faqs?: ScholarshipFaqDto[];
    sources?: ScholarshipSourceDto[];
    tags?: ScholarshipTagDto[];
}
