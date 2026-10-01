# AI-Native Manufacturing ERP

A multi-tenant ERP for small and medium-sized manufacturers and distributors. The product plan connects CRM, sales, procurement, inventory, manufacturing, quality, finance, assets, workforce, analytics, and permission-aware AI capabilities.

## Project status

This repository is at the Phase 0 foundation stage. The three supplied requirement documents are the primary product specification. No application code, APIs, database schema, or AI behavior has been implemented yet.

The initial technical direction is a Next.js web application, a Spring Boot modular monolith, and PostgreSQL as the transactional source of truth. Supabase's hosted PostgreSQL is the preferred development database, so Docker is not required for the current setup. Kafka, Redis, pgvector, and the Python/FastAPI ML service are planned for the phases that need them.

## Start here

- [Implementation roadmap](docs/IMPLEMENTATION_ROADMAP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Development environment](docs/DEVELOPMENT.md)
- [Architecture decision record](docs/DECISIONS/ADR-0001-platform-architecture.md)
- [Source specifications](docs/DEVELOPMENT.md#source-specifications)

## Development database

Create a Supabase development project, then copy the connection values from **Dashboard → Connect** into a local `.env` file. Use the direct connection when your network supports IPv6; otherwise use the shared session pooler. The [development guide](docs/DEVELOPMENT.md) explains the connection choice and security boundaries.

Once you have the project connection values:

```powershell
Copy-Item .env.example .env
```

Fill in the placeholders in `.env` from Supabase. The schema will be managed by committed Flyway migrations when the backend is initialized; the Supabase SQL Editor is useful for inspection, but should not become an untracked schema source. Do not put database credentials or Supabase secret/service-role keys in browser code.
