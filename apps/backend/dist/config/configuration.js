"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
    databaseUrl: process.env.DATABASE_URL,
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET ?? 'super-secret-key',
        refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'super-refresh-secret-key',
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        callbackUrl: process.env.GOOGLE_CALLBACK_URL ??
            'http://localhost:3001/auth/google/callback',
    },
    mail: {
        host: process.env.MAIL_HOST ?? 'mailhog',
        port: parseInt(process.env.MAIL_PORT ?? '1025', 10),
        secure: process.env.MAIL_SECURE === 'true',
        user: process.env.MAIL_USER ?? '',
        password: process.env.MAIL_PASSWORD ?? '',
        from: process.env.MAIL_FROM ?? 'noreply@afscholarships.dev',
    },
    jobs: {
        enabled: process.env.JOBS_ENABLED !== 'false',
        staleScholarshipCron: process.env.JOB_STALE_SCHOLARSHIP_CRON ?? '0 2 * * *',
        reminderSenderCron: process.env.JOB_REMINDER_SENDER_CRON ?? '*/15 * * * *',
        digestSenderCron: process.env.JOB_DIGEST_SENDER_CRON ?? '0 8 * * 1',
        notificationRetryCron: process.env.JOB_NOTIFICATION_RETRY_CRON ?? '0 */6 * * *',
        staleDays: parseInt(process.env.JOB_STALE_DAYS ?? '30', 10),
        notificationMaxRetries: parseInt(process.env.JOB_NOTIFICATION_MAX_RETRIES ?? '3', 10),
    },
});
//# sourceMappingURL=configuration.js.map