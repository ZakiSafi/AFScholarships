# API Contracts (MVP)

Base URL: `/`

## Auth
- `POST /auth/login`
- `GET /auth/profile` (JWT)

## Scholarships
- `GET /scholarships` with filters: `search`, `country`, `degreeLevel`, `fundingType`, `eligibleCountry`, `partnerOnly`, `page`, `limit`
- `GET /scholarships/:slug`
- `POST /scholarships/:id/report` (JWT)
- `POST /scholarships` (Admin)
- `PATCH /scholarships/:id` (Admin)
- `PATCH /scholarships/:id/verify` (Admin)

## Saved Items
- `GET /saved-items` (JWT)
- `POST /saved-items/:scholarshipId` (JWT)
- `DELETE /saved-items/:scholarshipId` (JWT)

## Partner Applications
- `POST /applications/partner/:scholarshipId` (JWT)
- `GET /applications/me` (JWT)

## Reminders
- `GET /reminders/me` (JWT)
- `POST /reminders/scholarship/:scholarshipId` (JWT)
- `POST /reminders/:id/mark-sent` (Admin)

## Admin Moderation
- `GET /admin/reports` (Admin)
- `PATCH /admin/reports/:id/resolve` (Admin)
- `PATCH /admin/scholarships/flag-stale?days=30` (Admin)
