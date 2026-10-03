# AI-Native Manufacturing ERP

A multi-tenant ERP for small and medium-sized manufacturers and distributors. The product plan connects CRM, sales, procurement, inventory, manufacturing, quality, finance, assets, workforce, analytics, and permission-aware AI capabilities.

## Project status

The repository contains the Phase 0 project foundation and an early Phase 1 Next.js workspace shell. The three supplied requirement documents are the product specification. The web shell has responsive navigation, setup guidance, module placeholders, and loading/error/not-found states. No ERP API, authentication, database schema, operational workflow, or AI behavior has been implemented yet. Phases 0 and 1 remain in progress.

The initial technical direction is a Next.js web application, a Spring Boot modular monolith, and PostgreSQL as the transactional source of truth. Supabase's hosted PostgreSQL is the preferred development database, so Docker is not required for the current setup. Kafka, Redis, pgvector, and the Python/FastAPI ML service are planned for the phases that need them.

## Start here

- [Implementation roadmap](docs/IMPLEMENTATION_ROADMAP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Development environment](docs/DEVELOPMENT.md)
- [Architecture decision record](docs/DECISIONS/ADR-0001-platform-architecture.md)
- [Source specifications](docs/DEVELOPMENT.md#source-specifications)

## Run the web shell

The repository uses pnpm workspaces. The selected Node.js runtime is pinned in `.nvmrc` and enforced by `package.json`; this machine currently has Node 22.14.0, so switch to Node 24.21.0 before using these commands:

```powershell
pnpm install
pnpm dev
```

The root scripts also include `pnpm typecheck` and `pnpm build`. The web app is a foundation preview; module pages intentionally contain no fabricated ERP records.

## Development database

Use a dedicated Supabase development project. The project URL and API keys are not PostgreSQL login credentials: copy the database host, database name, username, and password from **Dashboard → Connect** into the ignored `.env` file. Use the direct connection when your network supports IPv6; otherwise use the shared session pooler. The [development guide](docs/DEVELOPMENT.md) explains the connection choice and security boundaries.

Once you have the project connection values:

```powershell
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

Fill in the placeholders in `.env` from Supabase. Keep `.env.example` as a placeholder-only template. The schema will be managed by committed Flyway migrations when the backend is initialized; the Supabase SQL Editor is useful for inspection, but should not become an untracked schema source. Do not put database credentials or Supabase secret/service-role keys in browser code.
