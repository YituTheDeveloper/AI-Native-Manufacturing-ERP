# Deployment Plan

No deployable application or CI/CD pipeline exists yet. This document records the intended sequence and current limits.

## Local foundation

- The checked-in `infra/compose.yaml` defines PostgreSQL 18.6 only.
- Local credentials come from a developer-owned `.env` created from `.env.example`; never reuse them in a deployed environment.
- The PostgreSQL port binds to loopback. The named data volume persists local development data.
- Docker Desktop is absent in the inspected environment. The host is Windows 10 Home/Core, for which current Docker Windows edition compatibility is unresolved.
- No frontend, backend, Kafka, Redis, ML, migration, or observability container is configured yet.

## Planned production work in Phase 18

- Containerize the Next.js web client, Spring Boot ERP core, and (when implemented) Python/FastAPI ML service.
- Design secrets management, database provisioning, backups/recovery, health checks, migration rollout, TLS, least-privilege service credentials, and environment separation.
- Add CI/CD with GitHub Actions after builds and tests exist.
- Instrument structured logs, metrics, traces, correlation IDs, AI operation metadata, and Kafka lag/failure metrics with OpenTelemetry, Prometheus, and Grafana where appropriate.
- Document deployment, rollback, incident, backup restore, and security response procedures.
- Choose a cloud target only after deployment requirements and cost/operational constraints are documented.

