# Stack 2.0

An enterprise-grade, Polyglot Monorepo built for extreme scale and resilience.

## Features
- **Frontend**: Next.js 15 (App Router) + Tailwind CSS + shadcn/ui
- **Backend (Core)**: NestJS (TypeScript)
- **Backend (AI)**: FastAPI (Python)
- **Database**: PostgreSQL 16 via Drizzle ORM
- **Auth**: NextAuth.js v5 (SSO ready)
- **Infrastructure**: AWS EKS, RDS, Elasticache (Redis) via Terraform
- **Monorepo Tooling**: Turborepo, pnpm workspaces

## Quickstart (Development)
1. `pnpm install`
2. `./scripts/setup-dev.sh` (Boots local Postgres & Redis)
3. `pnpm db:generate && pnpm db:push`
4. `pnpm dev` (Starts all services)
