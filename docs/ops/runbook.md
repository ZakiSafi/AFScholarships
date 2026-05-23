# Operations runbook

## Database backups

- **Frequency:** daily automated snapshots (managed Postgres) or `pg_dump` cron
- **Retention:** 30 days minimum
- **Restore test:** quarterly restore to staging

Example manual backup:

```bash
pg_dump "$DATABASE_URL" -Fc -f "afscholarships-$(date +%F).dump"
```

## Migrations

Apply pending migrations after deploy:

```bash
cd apps/backend
npx prisma migrate deploy
```

Never use `prisma db push` in production unless explicitly approved for hotfixes.

## Manual admin jobs

From **Admin → Jobs** in the UI, or via API:

```http
POST /admin/jobs/run
Authorization: Bearer <admin-access-token>
Content-Type: application/json

{ "job": "reminder-sender" }
```

Jobs: `stale-scholarships`, `reminder-sender`, `digest-sender`, `notification-retry`

## Incident response

| Symptom | Check | Action |
|---------|-------|--------|
| 5xx spike | API logs (`HTTP` JSON lines) | Roll back deploy; check DB connectivity |
| DB `down` in `/health` | Postgres status, connection pool | Failover / restart DB; verify `DATABASE_URL` |
| Emails not sending | SMTP credentials, MailHog vs prod | Fix `MAIL_*` env; retry `notification-retry` job |
| Auth failures | JWT secrets changed? | Ensure access/refresh secrets stable across instances |
| Rate limit 429 | Legitimate traffic spike | Raise Throttler limit or add CDN caching for public GETs |

## Logs

HTTP requests log one JSON line per response:

```json
{"method":"GET","path":"/scholarships","statusCode":200,"durationMs":42}
```

5xx errors are logged at error level in `HttpExceptionFilter`.

## Local quality gates

From repository root:

```bash
npm run test
npm run typecheck --workspace=frontend
npm run build --workspace=backend
npm run build --workspace=frontend
```
