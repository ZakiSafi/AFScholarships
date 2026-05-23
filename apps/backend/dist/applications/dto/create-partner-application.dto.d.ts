declare class ApplicationAnswerDto {
    questionKey: string;
    answer: string;
}
export declare class CreatePartnerApplicationDto {
    fullName: string;
    email: string;
    phone?: string;
    country?: string;
    educationLevel?: string;
    statement: string;
    docsUrls?: string[];
    answers?: ApplicationAnswerDto[];
}
export {};
