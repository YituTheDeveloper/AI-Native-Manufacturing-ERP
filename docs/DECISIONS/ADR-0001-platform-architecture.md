# ADR 0001 Platform Architecture

- **Status:** Accepted
- **Date:** 2026-10-01
- **Decision owners:** Project maintainers

## Context

The project specifications describe a broad multi-tenant manufacturing ERP with transactional inventory and accounting, event-driven workflows, AI tools, retrieval, and predictive ML. Starting with many independently deployed services would add deployment and consistency costs before the domain workflows exist. At the same time, the platform needs explicit boundaries so later asynchronous, vector, and ML capabilities do not weaken tenant authorization or transactional integrity.

The initial repository contains specifications but no implementation. This ADR establishes the foundation choices and the conditions for introducing later components.

## Decisions

### Modular monolith for the ERP core

The ERP backend starts as one Spring Boot deployable organized into domain-owned packages. Identity/tenant, CRM, sales, procurement, inventory, manufacturing, quality, finance, assets, workforce, workflow, analytics, and AI keep clear business boundaries. Modules communicate through explicit application/domain contracts. Separate deployable services are introduced only for concrete scaling, runtime, or ownership needs; ML inference is the planned first independent runtime.

### PostgreSQL as the transactional source of truth

PostgreSQL owns tenant-scoped ERP state, migrations, transactional workflows, stock/accounting ledgers, AI proposals/audit data, and initial vector data. Supabase-hosted PostgreSQL is the selected development database; the application connects with standard PostgreSQL/JDBC and Flyway rather than depending on Supabase-only data APIs. Foreign keys, constraints, indexes, decimal types, transactions, optimistic locking, and migration review protect integrity. Hibernate does not create or destructively update production schemas.

### Supabase-hosted PostgreSQL for development

Use a dedicated Supabase development project to avoid storing a local database container. Store its connection values only in `.env` and connect from the backend; the browser never receives the database password or an admin/service-role key. Use a direct database endpoint for a persistent backend and migrations when IPv6 is available, or Supabase's shared session pooler for a long-lived connection from an IPv4-only network. Do not use transaction-pooler mode for the Spring/Flyway connection because it does not preserve all session features and has prepared-statement limitations. Keep Flyway migration files in source control as the schema authority.

Supabase's current hosted default is PostgreSQL 17, with the 17.11 minor release rolling out in September 2026. The project baseline is PostgreSQL 18.6. At project creation, select 18 if Supabase offers it; otherwise use the latest managed stable version it offers (currently expected to be 17.11), verify it with `SHOW server_version`, and record the supported-version exception. This favors a managed supported database over a local container while preserving portable PostgreSQL SQL and migrations.

### Kafka for meaningful asynchronous domain events

Kafka is the event broker when completed business workflows need asynchronous consumers. Important events use a PostgreSQL transactional outbox to avoid a database/broker dual-write gap. Events carry IDs, type, tenant and aggregate scope, timestamp, schema version, and payload metadata. Consumers are idempotent with retry and dead-letter handling. Kafka is not used as an RPC mechanism or introduced before a stable domain flow requires it.

### Redis only for bounded ephemeral uses

Redis may support measured caching, rate limiting, or short-lived session/idempotency/coordination state. It is not the source of truth. Each use must define TTL, invalidation, failure behavior, and why PostgreSQL or an in-process mechanism is insufficient. Redis is not part of the initial database setup.

### Python/FastAPI for predictive ML inference

Demand forecasting and anomaly detection will run in a separately deployable Python/FastAPI service after the ERP contains useful historical data. The API will validate typed inputs and return model version, inference time, and uncertainty where meaningful. The service will use the simplest defensible model and will not write transactional ERP state directly.

### Provider abstraction for LLM integrations

AI orchestration and authorization remain in Spring Boot. OpenAI and Gemini implementations are isolated behind an internal provider interface. Provider APIs, SDK versions, retention behavior, tool-calling contracts, and failure modes are verified from official documentation when Phase 13 begins. No provider key or prompt data is committed.

### PostgreSQL/pgvector for initial RAG

The first RAG implementation uses PostgreSQL with pgvector rather than a dedicated vector service. Documents, chunks, metadata, embeddings, and content hashes are tenant-scoped. Retrieval applies tenant filters, supports controlled replacement/re-indexing, and returns citations. Retrieved document text is untrusted input. A separate vector system is considered only if measured scale or required capabilities justify it.

## Consequences

- Early business invariants, inventory movements, and double-entry posting stay within one transaction boundary.
- PostgreSQL and migration discipline are foundational; ledgers provide traceable history rather than mutable summary-only state.
- Event, cache, LLM, RAG, and ML operations remain deferred until the workflow and authorization boundaries they depend on exist.
- Local development depends on the internet and a Supabase development project. No database project or credential is stored in this repository.
- Supabase RLS is not automatically tied to the ERP's authenticated user when Spring connects directly with JDBC. The backend remains the authorization authority; any later RLS design must pass a validated tenant context transaction-locally and use a least-privilege runtime role. Supabase documents that its `service_role` bypasses RLS, so it must not be used by the browser or as the eventual ERP runtime role.
- Supabase currently defaults hosted projects to PostgreSQL 17 while the project requirement names PostgreSQL 18.6. Recheck the offered server version when provisioning and document the compatibility exception if necessary.
- Docker remains optional for development against the hosted database. Supabase's local CLI stack and Testcontainers-based isolated tests do require a Docker-compatible runtime, so those workflows can be reconsidered later without making Docker a Phase 0 prerequisite.
- A single deployable lowers initial operating complexity but requires package boundaries and dependency review to prevent unwanted coupling.
- TypeScript 7 is the current stable release, but Next.js IDE/compiler-plugin compatibility must be confirmed in Phase 1 because the TypeScript team notes that the new compiler does not yet provide a stable programmatic API for every plugin workflow.

## Version baseline recorded for planning

The verified versions and official sources are tracked in [Development](../DEVELOPMENT.md#verified-stable-versions). These are dated planning targets, not yet installed dependency locks. Versions will be checked again when each phase introduces its dependencies.
