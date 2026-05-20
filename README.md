# AfScholarships Monorepo

This repository contains:

- `apps/backend`: NestJS API with Swagger, JWT auth, Prisma ORM, PostgreSQL
- `apps/frontend`: React + TypeScript app with Tailwind CSS, Redux Toolkit, RTK Query, and Lucide icons
- `mailhog`: local SMTP capture service for email testing

## Run with Docker

From the repository root:

- `npm run start:back` -> starts backend + postgres + mailhog
- `npm run start:front` -> starts frontend + backend + postgres + mailhog
- `npm run stop` -> stops all compose services

## Service URLs

- Backend API: `http://localhost:3001`
- Swagger docs: `http://localhost:3001/api/docs`
- Frontend: `http://localhost:5173`
- MailHog UI: `http://localhost:8026`

## Demo Login

- Email: `admin@afscholarships.dev`
- Password: `password123`
