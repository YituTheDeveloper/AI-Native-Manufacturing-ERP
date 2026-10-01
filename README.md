# AI-Native Manufacturing ERP

A multi-tenant ERP for small and medium-sized manufacturers and distributors. The product plan connects CRM, sales, procurement, inventory, manufacturing, quality, finance, assets, workforce, analytics, and permission-aware AI capabilities.

## Project status

This repository is at the Phase 0 foundation stage. The three supplied requirement documents are the primary product specification. No application code, APIs, database schema, or AI behavior has been implemented yet.

The initial technical direction is a Next.js web application, a Spring Boot modular monolith, and PostgreSQL as the transactional source of truth. Kafka, Redis, pgvector, and the Python/FastAPI ML service are planned for the phases that need them.

## Start here

- [Implementation roadmap](docs/IMPLEMENTATION_ROADMAP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Development environment](docs/DEVELOPMENT.md)
- [Architecture decision record](docs/DECISIONS/ADR-0001-platform-architecture.md)
- [Source specifications](docs/DEVELOPMENT.md#source-specifications)

## Local database foundation

Docker Desktop and PostgreSQL are not available in the inspected environment, and the host is Windows 10 Home. Review the Docker compatibility note in the [development guide](docs/DEVELOPMENT.md) before trying to start the Compose service.

Once Docker Desktop is available on a supported host:

```powershell
Copy-Item .env.example .env
docker compose --env-file .env -f infra/compose.yaml up -d postgres
docker compose --env-file .env -f infra/compose.yaml ps
```

The Compose file starts PostgreSQL only. Kafka, Redis, application services, and migrations will be added with their implementation phases.

