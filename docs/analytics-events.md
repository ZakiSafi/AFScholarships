# Analytics Event Dictionary

These events are tracked client-side, forwarded to the configured analytics provider (`VITE_ANALYTICS_PROVIDER`: `console`, `ga4`, or `posthog`), and stored as an event queue in local storage for debugging (last 200 events).

## Core funnel events

- `login_success`
  - Trigger: user signs in successfully
  - Payload: `role`
- `scholarship_filter_applied`
  - Trigger: list filters changed
  - Payload: `search`, `country`, `degreeLevel`, `fundingType`, `partnerOnly`
- `scholarship_opened`
  - Trigger: user opens a scholarship detail
  - Payload: `slug`, `hostCountry`, `degreeLevel`, `fundingType`
- `scholarship_saved`
  - Trigger: save action succeeds
  - Payload: `scholarshipId`
- `scholarship_unsaved`
  - Trigger: remove save action succeeds
  - Payload: `scholarshipId`
- `external_apply_clicked`
  - Trigger: official external apply link clicked
  - Payload: `scholarshipId`, `provider`
- `partner_application_submitted`
  - Trigger: in-platform partner application submission succeeds
  - Payload: `scholarshipId`
- `reminder_created`
  - Trigger: reminder created successfully
  - Payload: `scholarshipId`, `reminderAt`
- `listing_reported`
  - Trigger: report listing action succeeds
  - Payload: `scholarshipId`, `reason`

## Admin trust events

- `admin_report_resolved`
  - Trigger: admin resolves or dismisses report
  - Payload: `reportId`, `status`
