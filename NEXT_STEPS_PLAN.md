# AfScholarships Production Master Plan

This file is the implementation blueprint to follow before writing more code.
It is intentionally detailed and file-by-file so work can continue from any machine.

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

## 2) Current State Summary

- Monorepo and Docker setup exists
- Basic backend modules exist (`auth`, `scholarships`, `saved-items`, `applications`, `reminders`, `admin`)
- Prisma schema exists but is not yet normalized for full production workflows
- Frontend is currently single-file style and not feature-route architecture

---

## 3) Target Backend Architecture (NestJS)

### 3.1 Required root module structure

Create and use these folders under `apps/backend/src`:

- `common/`
  - `decorators/`
  - `guards/`
  - `interceptors/`
  - `filters/`
  - `pipes/`
  - `constants/`
- `config/`
- `health/`
- `jobs/`
- `mailer/`
- `uploads/`

Existing feature modules to keep and expand:

- `auth/`
- `users/` (new)
- `profiles/` (new)
- `scholarships/`
- `saved-items/`
- `applications/`
- `reminders/`
- `notifications/` (new)
- `admin/`
- `reports/` (new)
- `recommendations/` (new)
- `analytics/` (new)

### 3.2 Backend file contract per module

Each module must follow:

- `<feature>.module.ts`
- `<feature>.controller.ts`
- `<feature>.service.ts`
- `dto/*.dto.ts`
- `entities/*.entity.ts` (response contracts)
- `validators/*.ts`
- `policies/*.policy.ts` (where role/business permissions are needed)

### 3.3 Prisma schema target (tables/models)

Upgrade `apps/backend/prisma/schema.prisma` to include:

Identity and access:
- `User`
- `AuthProviderAccount`
- `RefreshToken`
- `SessionToken`
- `PasswordResetToken`

User profile and preference:
- `UserProfile`
- `UserPreference`

Scholarship catalog:
- `Scholarship`
- `ScholarshipRequirement`
- `ScholarshipBenefit`
- `ApplicationStep`
- `ScholarshipFaq`
- `ScholarshipSource`
- `ScholarshipTag`
- junction table `ScholarshipToTag`

Student engagement:
- `SavedScholarship`
- `UserReminder`
- `NotificationLog`

Application workflow:
- `PartnerApplication`
- `PartnerApplicationAnswer`
- `PartnerApplicationStatusLog`
- `ApplicationAttachment`

Trust and moderation:
- `ListingReport`
- `VerificationReview`
- `ModerationActionLog`

Growth analytics support:
- `AttributionTouchpoint`
- `ReferralInvite`
- `ReferralConversion`

### 3.4 Prisma migration policy

- Use deterministic migrations under `apps/backend/prisma/migrations/`
- Add indexes for:
  - scholarship search fields (`title`, `provider`, `hostCountry`)
  - deadline sorting
  - moderation queues (`status`, `createdAt`)
  - reminder dispatch windows (`reminderAt`, `status`)

### 3.5 Auth module completion checklist

In `apps/backend/src/auth` add:

- controllers/routes:
  - `POST /auth/signup`
  - `POST /auth/login`
  - `POST /auth/refresh`
  - `POST /auth/logout`
  - `POST /auth/forgot-password`
  - `POST /auth/reset-password`
  - `GET /auth/google`
  - `GET /auth/google/callback`
- dto:
  - `signup.dto.ts`
  - `refresh-token.dto.ts`
  - `forgot-password.dto.ts`
  - `reset-password.dto.ts`
- strategies:
  - `jwt-access.strategy.ts`
  - `jwt-refresh.strategy.ts`
  - `google.strategy.ts`
- guards:
  - `jwt-access.guard.ts`
  - `jwt-refresh.guard.ts`
  - `google-auth.guard.ts`
  - `roles.guard.ts`
- token rotation and revocation support in service

### 3.6 Scholarship discovery module completion

In `apps/backend/src/scholarships` add:

- list endpoint improvements:
  - faceted filters
  - sorting
  - pagination metadata
- detail payload improvements:
  - requirements
  - benefits
  - FAQ
  - sources + verification history
- admin lifecycle:
  - draft/published/archived status
  - verification workflow + review logs

### 3.7 Admin module completion

In `apps/backend/src/admin` add:

- moderation queue endpoints
- report resolution endpoints
- partner application review endpoints
- audit logs read endpoints
- bulk operations:
  - bulk verify
  - bulk archive expired scholarships

### 3.8 Jobs and mailer

In `apps/backend/src/jobs` add:

- stale scholarship checker job
- reminder sender job
- digest sender job
- retry job for failed notifications

In `apps/backend/src/mailer` add:

- provider abstraction
- mailhog adapter for local
- SMTP adapter for production
- email templates (reminder, digest, reset password)

---

## 4) Target Frontend Architecture (React + TS + RTK Query + Zod)

### 4.1 Replace single-file app with route architecture

Refactor frontend to use:

- `src/app/`
  - `router.tsx`
  - `providers.tsx`
  - `layouts/PublicLayout.tsx`
  - `layouts/DashboardLayout.tsx`
  - `layouts/AdminLayout.tsx`

### 4.2 Services layer

Under `src/services/`:

- `baseApi.ts` (RTK Query base setup)
- optional shared helpers `api.ts`
- auth token header and refresh handling

### 4.3 Feature folder contract (required)

For each feature under `src/features/<feature>/`:

- `types.ts`
- `validation.ts` (Zod)
- `api.ts` (RTK Query endpoints for that feature)
- `hooks.ts`
- `selectors.ts` (if needed)
- optional `slice.ts`

Features to create:

- `auth`
- `scholarships`
- `saved`
- `applications`
- `reminders`
- `profile`
- `admin`
- `analytics`

### 4.4 Pages folder contract (required)

Under `src/pages/`:

- `auth/`
  - `LoginPage.tsx`
  - `SignupPage.tsx`
  - `ForgotPasswordPage.tsx`
  - `ResetPasswordPage.tsx`
  - `AuthCallbackPage.tsx`
- `public/`
  - `LandingPage.tsx`
  - `AboutPage.tsx`
  - `ContactPage.tsx`
  - `PrivacyPage.tsx`
  - `TermsPage.tsx`
- `scholarships/`
  - `ScholarshipListPage.tsx`
  - `ScholarshipDetailPage.tsx`
  - `ScholarshipComparePage.tsx`
- `dashboard/`
  - `StudentDashboardPage.tsx`
  - `SavedPage.tsx`
  - `ApplicationsPage.tsx`
  - `RemindersPage.tsx`
  - `ProfilePage.tsx`
  - `SettingsPage.tsx`
- `admin/`
  - `AdminDashboardPage.tsx`
  - `AdminScholarshipsPage.tsx`
  - `AdminReportsPage.tsx`
  - `AdminApplicationsPage.tsx`
  - `AdminUsersPage.tsx`
  - `AdminAuditLogsPage.tsx`

### 4.5 UI system and reusable components

Under `src/components/`:

- `ui/`
  - `Button.tsx`, `Input.tsx`, `Select.tsx`, `Textarea.tsx`
  - `Badge.tsx`, `Tabs.tsx`, `Modal.tsx`
  - `Table.tsx`, `Pagination.tsx`
  - `Toast.tsx`, `Skeleton.tsx`
- `layout/`
  - `Navbar.tsx`, `Footer.tsx`, `Sidebar.tsx`
  - `PageHeader.tsx`, `EmptyState.tsx`

### 4.6 Route access policy

- Public routes:
  - landing, scholarship list/detail, legal pages
- Protected routes:
  - save, apply, reminders, profile, settings
- Role-gated routes:
  - all admin pages

### 4.7 Frontend analytics architecture

Keep and expand:

- `src/analytics/track.ts`
- `src/analytics/attribution.ts`
- add provider bridge:
  - `src/analytics/provider.ts` (PostHog/GA4 integration point)

---

## 5) API Contract Completion (must exist before frontend finalization)

Auth:
- `/auth/signup`, `/auth/login`, `/auth/refresh`, `/auth/logout`
- `/auth/forgot-password`, `/auth/reset-password`
- `/auth/google`, `/auth/google/callback`

Scholarships:
- list, detail, related, report
- admin create/update/publish/archive/verify

Student:
- saved CRUD
- reminders CRUD
- partner application create + history + status timeline

Admin:
- reports queue + resolve/dismiss
- verification review
- application review queue
- audit logs + bulk moderation actions

---

## 6) Testing Strategy Before Launch

Backend:
- Unit tests for services and policy rules
- E2E tests for:
  - auth lifecycle
  - scholarship discovery/detail
  - save/remind/apply
  - admin moderation flows

Frontend:
- Component tests for key forms and route guards
- Integration tests for major user journeys
- Smoke E2E:
  - sign up/login
  - discover -> save -> reminder
  - partner apply
  - admin moderation

---

## 7) Environment and Deployment Readiness

### 7.1 Required environment sets

Backend:
- database URL
- JWT secrets (access/refresh)
- Google OAuth client/secret
- SMTP host/port/credentials
- frontend origin and CORS policy

Frontend:
- API URL
- OAuth callback URL
- analytics provider keys (optional at launch)

### 7.2 Production ops checklist

- DB backups and migration runbook
- structured logging
- health endpoints
- error monitoring
- rate limiting
- security headers

---

## 8) Phased Build Sequence (implementation order)

Phase A:
- finalize Prisma schema + migrations
- complete auth module with OAuth/reset/refresh

Phase B:
- complete scholarship catalog domain and trust workflows
- complete saved/reminders/applications domain

Phase C:
- complete admin moderation and audit domain
- add scheduler and mailer modules

Phase D:
- frontend architecture refactor (`app`, `features`, `pages`, `services`)
- build public pages + auth pages + student dashboard pages + admin pages

Phase E:
- add analytics provider bridge and growth instrumentation polish
- full test suite + staging dry run + launch prep

---

## 9) Definition of Deploy-Ready

- Full auth lifecycle working (email + Google OAuth + reset + refresh/logout)
- Scholarship lifecycle complete (draft/publish/verify/archive)
- Student core flows complete (discover/save/remind/apply/track)
- Admin console complete (moderation/verification/application review/audit)
- Background jobs active (stale checks/reminders/digests)
- Lint/typecheck/tests passing
- Production env and operations docs complete
