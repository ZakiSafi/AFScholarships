declare const _default: () => {
    nodeEnv: string;
    port: number;
    databaseUrl: string | undefined;
    frontendUrl: string;
    jwt: {
        accessSecret: string;
        refreshSecret: string;
        accessExpiresIn: string;
        refreshExpiresIn: string;
    };
    google: {
        clientId: string;
        clientSecret: string;
        callbackUrl: string;
    };
    mail: {
        host: string;
        port: number;
        secure: boolean;
        user: string;
        password: string;
        from: string;
    };
    jobs: {
        enabled: boolean;
        staleScholarshipCron: string;
        reminderSenderCron: string;
        digestSenderCron: string;
        notificationRetryCron: string;
        staleDays: number;
        notificationMaxRetries: number;
    };
};
export default _default;
