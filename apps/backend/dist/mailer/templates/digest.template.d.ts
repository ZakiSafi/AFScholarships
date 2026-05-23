export declare function digestTemplate(params: {
    userName: string;
    items: {
        title: string;
        deadlineAt: string;
        url: string;
    }[];
}): {
    subject: string;
    html: string;
    text: string;
};
