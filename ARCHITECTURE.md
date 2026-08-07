# Architecture Overview

## The Monorepo (Turborepo)
We utilize a polyglot monorepo structure.
- `apps/web`: The user-facing Next.js frontend.
- `apps/api-core`: The NestJS business logic service.
- `apps/api-ai`: The Python FastAPI service for AI.
- `packages/db`: Shared Drizzle ORM instance.
- `packages/auth`: Shared NextAuth configuration.
- `packages/ui`: Shared React component library.

## Data Flow
1. User authenticates via `apps/web` (NextAuth).
2. `apps/web` calls `apps/api-core` for business transactions.
3. `apps/api-core` uses `@stack/db` to query RDS PostgreSQL.
4. If AI generation is needed, `api-core` queues a job or calls `apps/api-ai`.
