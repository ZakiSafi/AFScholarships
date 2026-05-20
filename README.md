# AfScholarships Monorepo

AfScholarships is an Afghan-first scholarship discovery and guidance platform with hybrid applications:
- External apply links for most scholarships
- In-platform application flow for partner opportunities

## Current Stack

- `apps/backend`: NestJS + Swagger + JWT + Prisma + PostgreSQL
- `apps/frontend`: React + TypeScript + Tailwind + Redux Toolkit + RTK Query + Lucide
- `docker-compose.yml`: backend, frontend, postgres, mailhog

## What Is Already Done

### Backend
- JWT login and profile
- Role-aware auth (`USER`/`ADMIN`)
- Scholarship module:
  - List/search/filter scholarships
  - Scholarship detail endpoint
  - Create/update/verify scholarship (admin)
  - Report listing endpoint
- Saved scholarships module
- Partner application module
- Reminder module
- Admin moderation module:
  - Reports list + resolve
  - Flag stale scholarships
- Prisma models for scholarship lifecycle and trust workflow
- Seeded demo records

### Frontend
- App IA pages:
  - Discover
  - Saved
  - Applications
  - Reminders
  - Profile
  - Admin (role-gated)
- Discover flow:
  - Search/filter scholarships
  - Open details and process steps
  - Save/unsave
  - Report listing
  - Create reminder
  - External apply tracking
  - Partner apply form
- Admin UI:
  - Resolve reports
  - Update verification status
- Analytics basics:
  - Event tracking queue
  - UTM/referrer attribution capture
  - Growth experiments config

### Project Docs Added
- `docs/api-contracts.md`
- `docs/frontend-ia.md`
- `docs/analytics-events.md`
- `docs/growth-experiments.md`
- `NEXT_STEPS_PLAN.md` (root roadmap for what remains)

## Run With Docker

From repository root:

- `npm run start:back` -> backend + postgres + mailhog
- `npm run start:front` -> frontend + backend + postgres + mailhog
- `npm run stop` -> stop all services

## Service URLs

- Backend API: `http://localhost:3001`
- Swagger docs: `http://localhost:3001/api/docs`
- Frontend: `http://localhost:5173`
- Postgres host port: `5433`
- MailHog SMTP host port: `1026`
- MailHog UI: `http://localhost:8026`

## Demo Login

- Email: `admin@afscholarships.dev`
- Password: `password123`

## How To Test End-to-End

1. Start stack:
   - `npm run start:front`
2. Open frontend:
   - `http://localhost:5173`
3. Login with demo credentials.
4. Test core user flows:
   - Discover -> filter/search scholarships
   - Open a scholarship detail
   - Save/unsave scholarship
   - Create a reminder
   - Submit report for a listing
   - Submit partner application (for partner scholarship)
5. Test admin flows (same demo admin user):
   - Go to Admin page
   - Resolve moderation reports
   - Update verification status
6. Test API manually in Swagger:
   - `http://localhost:3001/api/docs`
7. Test email infrastructure:
   - Open `http://localhost:8026` (MailHog UI)

## Local Quality Checks

- Backend:
  - `cd apps/backend && npm run lint && npm run build`
- Frontend:
  - `cd apps/frontend && npm run lint && npm run build`
