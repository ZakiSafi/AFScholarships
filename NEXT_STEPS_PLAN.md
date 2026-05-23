# AfScholarships Production Master Plan

This file is the implementation blueprint. **Status last updated:** 2026-05-23.

**Legend:** ✅ Done · ⚠️ Partial · ❌ Not started

---

## 1) Product Scope Locked For Launch

- Audience: Afghan-first, global-ready scholarship platform
- Auth: email/password + forgot/reset + Google OAuth
- Business model at launch: free (no payments/subscriptions)
- Core launch flows:
  - discover scholarships
  - inspect full details and process
  - save scholarships
  - set reminders
  - apply externally or through partner in-platform form
  - report suspicious/outdated listings
  - admin moderation and verification

---

## 2) Current State Summary (as of 2026-05-23)

### Backend — ⚠️ Core API complete; not deploy-ready end-to-end

- ✅ Monorepo + Docker (Postgres, MailHog, backend, frontend)
- ✅ Production Prisma schema + migration (`prisma/migrations/20260523120000_production_schema/`)
- ✅ Phases **A, B, C** implemented (auth, catalog, student flows, admin bulk, jobs, mailer)
- ⚠️ Section **9 deploy-ready** criteria **not** fully met (tests, ops hardening, some planned modules skipped)
- See **§3** and **§8** for item-level status

### Frontend — ⚠️ Early scaffold only; not functional product

- ✅ React Router + providers (`src/app/router.tsx`, `providers.tsx`)
- ✅ Marketing **landing page** (static/mock data in `data/landing.ts`, not wired to API)
- ✅ Partial UI primitives (`Button`, `Input`, `Card`, `Badge`, layout nav/footer)
- ❌ No real auth, scholarship browse/detail, student dashboard, or admin console pages
- ❌ `services/authApi.ts` is outdated vs backend (wrong token shape, missing endpoints, monolithic)
- See **§4** and **§8 Phase D** for required work

---

## 3) Target Backend Architecture (NestJS)

### 3.1 Required root module structure — ⚠️ Partial

| Path | Status | Notes |
|------|--------|-------|
| `common/decorators/` | ✅ | `current-user`, `roles` |
| `common/guards/` | ✅ | `roles.guard` (JWT guards live under `auth/guards/`) |
| `common/filters/` | ✅ | `http-exception.filter` |
| `common/constants/` | ✅ | `roles.ts` |
| `common/interceptors/` | ❌ | Not created |
| `common/pipes/` | ❌ | Not created |
| `config/` | ✅ | `configuration.ts`, `config.module.ts` |
| `health/` | ✅ | `GET /health` |
| `jobs/` | ✅ | Cron jobs + `JobsService` |
| `mailer/` | ✅ | Nodemailer provider + templates |
| `uploads/` | ❌ | No file upload module (`ApplicationAttachment` in DB only) |

| Module | Status | Notes |
|--------|--------|-------|
| `auth/` | ✅ | See §3.5 |
| `users/` | ✅ | Admin list/get |
| `profiles/` | ✅ | `GET/PATCH profiles/me`, preferences |
| `scholarships/` | ✅ | See §3.6 |
| `saved-items/` | ✅ | List, save, remove, check |
| `applications/` | ✅ | Apply, list me, get by id + status logs |
| `reminders/` | ✅ | CRUD + admin mark-sent |
| `admin/` | ✅ | See §3.7 |
| `reports/` | ⚠️ | Service only; creation still on scholarships controller |
| `notifications/` | ❌ | `NotificationLog` in DB; used by jobs, no REST module |
| `recommendations/` | ❌ | Not started (schema has attribution/referral only) |
| `analytics/` | ❌ | Not started (backend module) |

### 3.2 Backend file contract per module — ⚠️ Partial

Implemented for most modules: `*.module.ts`, `*.controller.ts`, `*.service.ts`, `dto/*.dto.ts`.

**Not consistently implemented:**

- ❌ `entities/*.entity.ts` (response DTOs) — Prisma types used directly
- ❌ `validators/*.ts` — class-validator on DTOs only
- ❌ `policies/*.policy.ts` — `RolesGuard` only

### 3.3 Prisma schema target — ✅ Done

All models from the plan exist in `apps/backend/prisma/schema.prisma`:

Identity, profile, catalog, engagement, applications, trust/moderation, growth analytics tables — ✅

### 3.4 Prisma migration policy — ✅ Done

- ✅ Migrations under `apps/backend/prisma/migrations/`
- ✅ Indexes on search fields, deadlines, moderation, reminders

### 3.5 Auth module completion — ⚠️ Mostly done

| Item | Status |
|------|--------|
| `POST /auth/signup` | ✅ |
| `POST /auth/login` | ✅ |
| `POST /auth/refresh` | ✅ (opaque refresh token in DB, not JWT refresh body strategy) |
| `POST /auth/logout` | ✅ |
| `POST /auth/forgot-password` | ✅ |
| `POST /auth/reset-password` | ✅ |
| `GET /auth/google` | ✅ (requires `GOOGLE_CLIENT_ID` / `SECRET`) |
| `GET /auth/google/callback` | ✅ |
| DTOs (signup, refresh, forgot, reset) | ✅ |
| `jwt-access.strategy.ts` | ✅ |
| `jwt-refresh.strategy.ts` | ⚠️ File exists; refresh flow uses DB hash in service, not this strategy |
| `google.strategy.ts` | ✅ |
| `jwt-access.guard.ts` | ✅ |
| `jwt-refresh.guard.ts` | ⚠️ Present; not used on `/auth/refresh` |
| `google-auth.guard.ts` | ✅ |
| `roles.guard.ts` | ✅ (in `common/guards/`) |
| Token rotation + revocation | ✅ |

### 3.6 Scholarship discovery module — ✅ Done

| Item | Status |
|------|--------|
| Faceted filters + `GET /scholarships/facets` | ✅ |
| Sorting + pagination metadata | ✅ |
| Detail: requirements, benefits, FAQ, sources, verification history | ✅ |
| `GET /scholarships/:slug/related` | ✅ |
| Admin: draft on create, `PATCH publish`, `PATCH archive`, verify + review logs | ✅ |
| `GET /scholarships/admin/list` | ✅ |

### 3.7 Admin module — ✅ Done

| Item | Status |
|------|--------|
| Moderation queue (reports) | ✅ |
| Report resolve/dismiss | ✅ |
| Partner application review queue + status update | ✅ |
| Audit logs read | ✅ |
| Bulk verify | ✅ |
| Bulk archive expired | ✅ |
| Flag stale (via jobs service) | ✅ |
| Manual `POST /admin/jobs/run` | ✅ |

### 3.8 Jobs and mailer — ✅ Done

| Item | Status |
|------|--------|
| Stale scholarship job | ✅ |
| Reminder sender job | ✅ |
| Digest sender job | ✅ |
| Notification retry job | ✅ |
| Mail provider abstraction | ✅ |
| MailHog (dev) / SMTP (prod via env) | ✅ (single Nodemailer transport) |
| Templates: reset, reminder, digest | ✅ |

---

## 4) Target Frontend Architecture (React + TS + RTK Query + Zod)

**Overall: ❌ Not complete — ~15% of Phase D.** Landing + router exist; product flows do not.

### 4.0 What exists today (inventory)

| Area | Status | Location |
|------|--------|----------|
| Router | ⚠️ | `src/app/router.tsx` — mostly `PlaceholderPage` |
| Providers | ⚠️ | Redux + Router only; no auth bootstrap / refresh |
| Landing | ⚠️ | `pages/public/LandingPage.tsx` + `components/landing/*` — **mock data**, not API |
| UI kit | ⚠️ | `Button`, `Input`, `Card`, `Badge` only |
| RTK API | ⚠️ | `services/authApi.ts` — **stale**, monolithic, wrong auth response shape |
| Auth slice | ⚠️ | Token in memory only; no refresh persistence |
| Analytics | ⚠️ | `track.ts`, `attribution.ts`, `experiments.ts` — no `provider.ts` |

### 4.1 Route architecture — ⚠️ Partial

| Item | Status |
|------|--------|
| `src/app/router.tsx` | ✅ |
| `src/app/providers.tsx` | ✅ Auth hydrate on boot |
| `layouts/PublicLayout.tsx` | ✅ |
| `layouts/DashboardLayout.tsx` | ✅ Shell + nav (pages placeholder) |
| `layouts/AdminLayout.tsx` | ⚠️ Uses dashboard placeholder at `/admin` |
| `ProtectedRoute` / `AdminRoute` / `GuestRoute` | ✅ |

### 4.2 Services layer — ⚠️ Partial (D-Foundation done)

| Item | Status |
|------|--------|
| `baseApi.ts` with shared base query | ✅ |
| Token + **refresh** interceptor (401 → refresh → retry) | ✅ |
| Split feature `api.ts` files | ⚠️ `auth` + `scholarships` done; saved/applications/etc. TBD |

**Required API alignment** (backend changed; frontend must update):

- Auth: `accessToken` + `refreshToken` (not `access_token`)
- Add: signup, refresh, logout, forgot/reset password, OAuth callback page handler
- Scholarships: facets, related, `includeFacets`, sort params, expanded detail shape
- Saved: `GET /saved-items/check/:id`
- Reminders: `PATCH`, `DELETE`
- Applications: `GET /applications/:id` with status logs
- Profiles: `/profiles/me`, `/profiles/me/preferences`
- Admin: applications queue, audit logs, bulk verify/archive, job run (if exposing in UI)

### 4.3 Feature folders — ❌ Not started (per contract)

| Feature | `types.ts` | `validation.ts` | `api.ts` | `hooks.ts` | `slice.ts` |
|---------|------------|-----------------|----------|------------|------------|
| `auth` | ✅ | ✅ | ✅ | ✅ | ✅ `authSlice` + storage |
| `scholarships` | ✅ | ❌ | ✅ | ❌ | ❌ |
| `saved` | ✅ | ❌ | ✅ | ❌ | ❌ |
| `applications` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `reminders` | ✅ | ❌ | ✅ | ❌ | ❌ |
| `profile` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `admin` | ✅ | ❌ | ✅ | ❌ | ❌ |
| `analytics` | ❌ | ❌ | ❌ | ❌ | ❌ |

### 4.4 Pages — ⚠️ Partial

| Page | Status |
|------|--------|
| `public/LandingPage.tsx` | ⚠️ UI; featured/search wired to API |
| `public/AboutPage.tsx` | ❌ Placeholder route only |
| `public/ContactPage.tsx` | ❌ Not routed |
| `public/PrivacyPage.tsx` | ❌ Placeholder |
| `public/TermsPage.tsx` | ❌ Placeholder |
| `auth/LoginPage.tsx` | ✅ |
| `auth/SignupPage.tsx` | ✅ |
| `auth/ForgotPasswordPage.tsx` | ✅ |
| `auth/ResetPasswordPage.tsx` | ✅ |
| `auth/AuthCallbackPage.tsx` | ✅ |
| `public/ScholarshipsListPage.tsx` | ✅ API + filters |
| `public/ScholarshipDetailPage.tsx` | ✅ API + related |
| `scholarships/ScholarshipComparePage.tsx` | ❌ |
| `dashboard/*` (overview, saved, applications, detail, apply, reminders, profile) | ✅ |
| `admin/*` (overview, scholarships, reports, applications, audit, jobs) | ✅ |

### 4.5 UI system — ⚠️ Partial

| Component | Status |
|-----------|--------|
| Button, Input, Card, Badge | ✅ |
| Select, Tabs, Modal | ❌ |
| Textarea | ✅ |
| Table, Pagination | ❌ |
| Toast, Skeleton | ❌ |
| Navbar, Footer | ✅ (`PublicNavbar`, `Footer`) |
| Sidebar, PageHeader, EmptyState | ❌ |

### 4.6 Route access policy — ❌ Not implemented

| Policy | Status |
|--------|--------|
| Public routes | ⚠️ Routes exist; no layout/guard structure |
| Protected routes (auth required) | ✅ |
| Admin role-gated routes | ✅ |

### 4.7 Frontend analytics — ⚠️ Partial

| Item | Status |
|------|--------|
| `track.ts` | ✅ |
| `attribution.ts` | ✅ |
| `provider.ts` (PostHog/GA4) | ✅ |

### 4.8 Additional frontend tasks (recommended for fully functional app)

These are **required for a complete product** but were implicit in the plan; add to Phase D scope:

1. ~~**Auth persistence**~~ — ✅ localStorage + hydrate on load
2. ~~**Protected route wrapper**~~ — ✅
3. ~~**Admin route wrapper**~~ — ✅
4. **Wire landing** — replace `data/landing.ts` mocks with `GET /scholarships` + facets (or keep hero static + real featured list)
5. **Scholarship list** — filters, sort, pagination, facet chips synced to URL query params
6. **Scholarship detail** — full sections (requirements, benefits, FAQ, sources, steps, apply CTA external vs partner)
7. **Student dashboard shell** — sidebar nav: Saved, Applications, Reminders, Profile, Settings
8. **Forms with Zod** — login, signup, apply, report listing, profile edit
9. **Error / loading states** — Skeleton, empty states, API error toasts
10. **Admin console** — tables for scholarships (admin list), reports, applications, users, audit logs; actions wired to admin APIs
11. **OAuth callback page** — read tokens from redirect query, store, navigate to dashboard
12. **Environment** — document `VITE_API_URL`, callback URL in README
13. **Compare page** — optional for v1; can defer if not launch-critical

---

## 5) API Contract Completion — ✅ Backend ready for frontend

| Area | Status |
|------|--------|
| Auth (signup, login, refresh, logout, reset, Google) | ✅ |
| Scholarships (list, facets, detail, related, report, admin CRUD/lifecycle) | ✅ |
| Student (saved, reminders, applications + timeline) | ✅ |
| Admin (reports, applications, audit, bulk, jobs) | ✅ |
| Profiles | ✅ |

Frontend must be updated to consume these contracts (see §4.2).

---

## 6) Testing Strategy Before Launch — ⚠️ Baseline in place

| Area | Status |
|------|--------|
| Backend unit tests | ✅ (`health`, `auth`, `app` controller) |
| Backend E2E | ✅ (health endpoints smoke) |
| Frontend unit tests | ✅ (Vitest: attribution, format helpers) |
| Frontend E2E smoke | ✅ (Playwright: landing, catalog, login) |

---

## 7) Environment and Deployment Readiness — ⚠️ Partial

### 7.1 Environment sets

| Item | Status |
|------|--------|
| Backend DB, JWT, Google OAuth, SMTP, CORS | ✅ `docker-compose.yml` + `apps/backend/.env.example` + `docs/ops/deployment.md` |
| Frontend API URL, analytics, OAuth callback | ✅ `apps/frontend/.env.example` |

### 7.2 Production ops checklist

| Item | Status |
|------|--------|
| DB backups / migration runbook | ✅ `docs/ops/runbook.md` |
| Structured logging | ✅ HTTP JSON request logs |
| Health endpoints | ✅ |
| Error monitoring | ❌ (wire Sentry/Datadog externally) |
| Rate limiting | ✅ `@nestjs/throttler` (120/min) |
| Security headers | ✅ `helmet` |

---

## 8) Phased Build Sequence (implementation order)

| Phase | Scope | Status |
|-------|--------|--------|
| **A** | Prisma + migrations; auth (OAuth/reset/refresh) | ✅ **Done** |
| **B** | Scholarship catalog; saved/reminders/applications; users/profiles | ✅ **Done** |
| **C** | Admin moderation/audit; jobs; mailer | ✅ **Done** |
| **D** | Frontend architecture + all product pages | ✅ **D-Foundation + D-Public + D-Student + D-Admin** (polish/tests pending) |
| **E** | Analytics provider; tests; launch prep | ✅ **Done** (expand test coverage + Sentry as needed) |

---

## 9) Definition of Deploy-Ready

| Criterion | Status |
|-----------|--------|
| Full auth lifecycle (email + Google + reset + refresh/logout) | ⚠️ Backend ✅ · Frontend ✅ (Google needs env keys) |
| Scholarship lifecycle (draft/publish/verify/archive) | ⚠️ Backend ✅ · Admin UI ✅ (no create/edit form yet) |
| Student flows (discover/save/remind/apply/track) | ⚠️ Backend ✅ · Frontend ✅ (partner apply + profile) |
| Admin console complete | ⚠️ Backend ✅ · Frontend ✅ (queues + bulk ops; no scholarship editor) |
| Background jobs active | ✅ |
| Lint/typecheck/tests passing | ✅ `npm run test` + typecheck |
| Production env + ops docs | ✅ `docs/ops/*` + `.env.example` files |

**Verdict:** Backend is **API-complete for Phases A–C** but **not 100% finished** if you include tests, ops hardening, uploads, and optional modules from §3.1. It is **ready for frontend integration**. Frontend is **not** ready for launch.

---

## 10) Next work (do not start until approved)

When you want implementation, say **yes** and which slice to do first, for example:

1. **Phase D — Foundation:** `baseApi.ts`, auth feature (Zod + pages + refresh), protected routes
2. **Phase D — Public:** Scholarship list + detail wired to API
3. **Phase D — Student dashboard:** Saved, reminders, applications, profile
4. **Phase D — Admin:** Admin layout + moderation tables
5. **Phase E:** Tests + ops + analytics provider

No code changes should be made until you explicitly approve a slice.
