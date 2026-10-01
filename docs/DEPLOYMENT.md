# Deployment Plan

No deployable application or CI/CD pipeline exists yet. This document records the intended sequence and current limits.

## Development database

- Development will use a dedicated Supabase-hosted PostgreSQL project; it is not provisioned yet.
- Connection values belong in a developer-owned `.env` created from `.env.example`; never commit them or reuse development credentials for production.
- The web browser does not connect directly to PostgreSQL. Spring Boot owns authentication, authorization, validation, and tenant scoping.
- Supabase project storage is remote, so development depends on network and account access. Keep private/company data out of the portfolio development project.
- Docker is not required for this database workflow. The Supabase CLI's local full-stack mode does require Docker, so it is not part of the current setup.
- Flyway migrations will be kept in the repository and run against the selected development database once the backend is initialized.

## Planned production work in Phase 18

- Package and deploy the Next.js web client, Spring Boot ERP core, and (when implemented) Python/FastAPI ML service for the chosen runtime. Docker containers are one option, not a development prerequisite.
- Design secrets management, database provisioning, backups/recovery, health checks, migration rollout, TLS, least-privilege service credentials, and environment separation.
- Add CI/CD with GitHub Actions after builds and tests exist.
- Instrument structured logs, metrics, traces, correlation IDs, AI operation metadata, and Kafka lag/failure metrics with OpenTelemetry, Prometheus, and Grafana where appropriate.
- Document deployment, rollback, incident, backup restore, and security response procedures.
- Choose a cloud target only after deployment requirements and cost/operational constraints are documented.
