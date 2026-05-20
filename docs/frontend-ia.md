# Frontend IA (MVP)

The app is structured around primary user workflows:

- `Discover`: search, filter, open scholarship details, external apply, partner apply, save, report, set reminder.
- `Saved`: list of user bookmarked scholarships.
- `Applications`: user submitted partner applications and statuses.
- `Reminders`: user reminders for scholarship deadlines.
- `Profile`: account role and upcoming profile enhancements.
- `Admin` (role-gated): moderation queue and scholarship verification controls.

State approach:
- Auth and profile in Redux slice.
- API data and mutation state in RTK Query service.
- Local UI state for page navigation, filters, and temporary form drafts.
