# Production deployment

This guide covers environment variables, release steps, and health checks for AfScholarships.

## Architecture

- **Frontend:** static build (Vite) served by CDN or reverse proxy
- **Backend:** NestJS API behind reverse proxy (TLS termination at proxy)
- **Database:** PostgreSQL 16+
- **Email:** SMTP (production) — not MailHog
- **Jobs:** enabled via `JOBS_ENABLED=true` on a single API instance or dedicated worker

## Backend environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | `production` |
| `PORT` | No | Default `3000` (container internal) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `FRONTEND_URL` | Yes | Public frontend origin for CORS (e.g. `https://afscholarships.org`) |
| `JWT_ACCESS_SECRET` | Yes | Strong random secret |
| `JWT_REFRESH_SECRET` | Yes | Strong random secret (different from access) |
| `JWT_ACCESS_EXPIRES_IN` | No | Default `15m` |
| `JWT_REFRESH_EXPIRES_IN` | No | Default `7d` |
| `GOOGLE_CLIENT_ID` | For OAuth | Google OAuth client |
| `GOOGLE_CLIENT_SECRET` | For OAuth | Google OAuth secret |
| `GOOGLE_CALLBACK_URL` | For OAuth | `https://api.example.com/auth/google/callback` |
| `MAIL_HOST` | Yes | SMTP host |
| `MAIL_PORT` | Yes | SMTP port (587 typical) |
| `MAIL_USER` / `MAIL_PASSWORD` | If required | SMTP credentials |
| `MAIL_FROM` | Yes | From address |
| `MAIL_SECURE` | No | `true` for TLS on port 465 |
| `JOBS_ENABLED` | No | `true` to run scheduled jobs |

## Frontend environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Public API base URL |
| `VITE_ANALYTICS_PROVIDER` | No | `none`, `console`, `ga4`, or `posthog` |
| `VITE_GA4_MEASUREMENT_ID` | For GA4 | GA4 measurement ID |
| `VITE_POSTHOG_KEY` | For PostHog | PostHog project API key |
| `VITE_POSTHOG_HOST` | No | PostHog ingest host |

## Release checklist

1. Run database migrations: `cd apps/backend && npx prisma migrate deploy`
2. Build backend: `npm run build --workspace=backend`
3. Build frontend: `npm run build --workspace=frontend`
4. Deploy API with health check on `GET /health`
5. Deploy static frontend and point `VITE_API_URL` at production API
6. Verify Google OAuth redirect URLs in Google Cloud Console
7. Send test email (password reset) via production SMTP
8. Smoke-test: login, catalog, save, admin reports queue

## Health endpoints

- `GET /` — API liveness (`status: ok`)
- `GET /health` — DB connectivity (`services.database`)

Configure your load balancer to use `/health` with a 200 response and `status` of `ok` or `degraded` (degraded = DB down; fail traffic if unacceptable).

## Security defaults (API)

- Helmet security headers
- Global rate limit: 120 requests / minute / IP (adjust in `ThrottlerModule` if needed)
- CORS restricted to `FRONTEND_URL`
- JWT access + refresh rotation

## Analytics

Set `VITE_ANALYTICS_PROVIDER=posthog` or `ga4` in production. Development defaults to `console` (browser devtools). Events are also queued in `localStorage` for debugging (last 200 events).

See [analytics-events.md](../analytics-events.md) for the event dictionary.
