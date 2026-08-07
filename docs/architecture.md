# Architecture

## Product layers

Student Utility Hub is split into four layers:

1. `apps/web`: Next.js app router frontend with SaaS landing pages, dashboard, tool workbench, admin console, SEO routes, and blog structure.
2. `apps/api`: Express API for auth, AI, documents, OCR, calculators, workspace state, and admin telemetry.
3. `packages/shared`: Shared tool catalog, pricing, testimonials, blog metadata, and constants used across web/API.
4. `packages/db`: Prisma PostgreSQL schema for durable product data.

## Runtime services

- PostgreSQL stores users, subscriptions, projects, files, jobs, AI conversations, usage, API keys, ads, and audit logs.
- S3-compatible storage stores encrypted uploads and generated outputs.
- Workers should process PDF/image/Office conversion jobs asynchronously.
- AI calls are routed through the API so keys, quotas, audit logs, moderation, and usage can be centrally enforced.
- OCR can be implemented through a provider adapter, a Tesseract worker, or cloud OCR APIs.

## Key workflows

- Document workflow: upload -> malware scan -> encrypted storage -> job creation -> queue worker -> signed download -> history.
- AI workflow: upload/index context -> quota check -> stream AI answer -> save conversation -> token usage event.
- Exam workflow: image/PDF validation -> preset transform -> KB-size compression -> portal-ready output.
- Cloud workflow: projects, favorites, history, recent tools, retention policies, and cross-device sync.

## Scalability path

- Move CPU-heavy PDF/image processing to worker services.
- Add Redis or a managed queue for job orchestration.
- Add vector indexing for AI PDF Q&A and research workspaces.
- Split API modules into services as traffic grows.
- Add API marketplace keys and usage-based billing.
- Add DigiLocker, Aadhaar eSign, mobile apps, browser extension, and voice assistant integrations behind provider interfaces.
