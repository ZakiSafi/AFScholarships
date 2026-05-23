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
        from: string;
    };
};
export default _default;
