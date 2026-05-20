# AfScholarships Next Steps Plan

This file is the single source of truth for what remains after current MVP implementation.

## Status Snapshot

## Completed
- Core monorepo and dockerized stack
- Auth, scholarship browsing, saved items, reminders, partner applications
- Admin moderation + verification controls
- Baseline analytics event tracking and attribution capture

## Remaining (High Priority)

### 1) Data Quality and Trust Hardening
- Add automated freshness job to flag stale listings daily (scheduler/cron).
- Add stronger source validation rules for scholarship ingestion.
- Add report triage priority (critical/high/normal).

### 2) User Profile and Personalization
- Expand profile fields:
  - education level
  - target country
  - target degree
  - field interests
  - language test status
- Build recommendation logic:
  - eligibility-first ranking
  - deadline urgency boost
  - profile-match score

### 3) Application Experience
- Add file upload support for partner applications (S3/compatible object storage).
- Add application draft save and resume.
- Add richer application status timeline for users.

### 4) Notifications
- Replace local-only mail testing path with production SMTP provider integration.
- Add digest scheduler (daily/weekly).
- Add reminder cadence presets (7 days, 3 days, 1 day before deadline).

### 5) Admin CMS Improvements
- Add scholarship create/edit forms in dedicated admin pages (not only API/admin mini controls).
- Add audit log for moderation actions.
- Bulk actions: verify multiple listings, archive expired opportunities.

## Engagement and User-Friendliness Enhancements

### Product UX
- Add onboarding wizard after signup:
  - “What degree?”, “Which countries?”, “Preferred fields?”
- Add empty states with guidance and suggested actions.
- Add deadline urgency chips and countdown labels.
- Improve detail page readability:
  - step timeline
  - required docs checklist
  - official source trust badges

### Retention Loops
- “Saved scholarship reminder” nudges for inactive users.
- Weekly personalized opportunity digest.
- Simple referral flow:
  - invite friends
  - unlock premium checklist templates

### Localization and Accessibility
- Add tri-language support (Dari/Pashto/English).
- Add keyboard navigation support and stronger ARIA labeling.
- Ensure contrast and mobile responsiveness for all primary flows.

## Growth Execution Plan (90 Days)

### Month 1
- SEO landing pages for high-intent keywords.
- Analytics dashboard for activation funnel.
- Partnership outreach list and messaging templates.

### Month 2
- Social deadline content cadence.
- Campus ambassadors / advisors outreach.
- Launch referral experiments.

### Month 3
- Evaluate channel ROI and double down on best performing channels.
- Introduce personalized scholarship recommendations.
- Publish success stories and case studies.

## Technical Backlog (Implementation Order)

1. Backend scheduler for stale checks + reminder dispatch.
2. Profile entity updates + migration + profile API.
3. Frontend onboarding/profile editor screens.
4. Recommendation endpoint + ranking strategy.
5. File upload pipeline for partner applications.
6. Admin CMS pages + audit logs.
7. i18n framework and translated content support.

## Definition of “Ready for Public Launch”

- Stable auth/session and role permissions
- Verified scholarship moderation loop working
- Reminder emails live on production SMTP
- Mobile-friendly UI for core flows
- Basic recommendation relevance
- Funnel analytics visible (acquisition, activation, apply conversion)
- Clear legal/privacy pages and reporting mechanism
