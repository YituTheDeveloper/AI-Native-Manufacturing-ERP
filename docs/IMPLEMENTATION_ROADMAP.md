# Implementation Roadmap

This roadmap sequences the ERP into reviewable phases. Phase 0 remains in progress because the selected host runtimes and verified PostgreSQL connection are unresolved. Phase 1 has an initial web shell but has not met its exit criteria. Each phase must meet its exit criteria before the next major phase begins.

## Delivery rules

- Deliver one coherent vertical slice at a time; do not create hollow modules and report them as finished.
- For a feature, design the data change first, then implement domain rules, API, authorization, UI, tests, audit/observability, and documentation.
- Use migrations for every schema change. PostgreSQL remains authoritative for transactional state.
- Verify stable versions and compatibility against official documentation immediately before introducing a dependency.
- Use Kafka, Redis, AI providers, RAG, and ML only in the phases that implement their use cases.

## Phase 0 — Project Foundation

**Status: In progress.**

- [x] Read all three specification documents and inspect the repository.
- [x] Record the architecture and a dated stable-version matrix with official sources.
- [x] Create the roadmap, architecture, and initial ADR.
- [x] Add repository conventions, Supabase connection example, and planned app directories.
- [x] Initialize Git and create the foundation commit.
- [ ] Upgrade Node to the selected Node 24 LTS release and Java to Java 25 LTS before their phases.
- [ ] Add the PostgreSQL host, database user, and password to ignored local `.env`, then verify a TLS-protected database connection. The current URL/API values do not provide JDBC credentials; the supplied service key returned HTTP 401 on a read-only check.
- [ ] Confirm the hosted PostgreSQL version and record a compatibility decision if Supabase does not offer the PostgreSQL 18 baseline.
- [ ] Confirm a Java build tool choice and wrapper version when the backend project is initialized.

**Exit criteria:** the development application can connect to its dedicated Supabase PostgreSQL project; version choices are pinned at first use; secrets remain local; the repository conventions and project docs are committed. Docker is optional for this cloud-database workflow.

## Phase 1 — Frontend Foundation

**Status: In progress.**

- [x] Initialize Next.js with App Router, React, strict TypeScript, and the selected package manager.
- [x] Add a responsive ERP shell, module routes, design tokens, setup/empty states, and route loading/error/not-found states.
- Add a typed API client, session-aware request boundary, validation conventions, and frontend permission-aware navigation.
- Add form and server-state dependencies only as needed; establish Playwright for critical browser flows.
- Keep screens shell-only until real APIs exist; do not add fabricated business data.

The current web shell passes `pnpm typecheck` and `pnpm build`. The host Node version does not yet meet the repository's Node 24.21.0 engine requirement, and browser accessibility/critical flows have not been exercised by an automated suite.

**Exit criteria:** frontend development/build commands work under the selected runtime, strict type checking is clean, accessible shell states are browser-verified, and the session-aware API boundary is established.

## Phase 2 — Backend Foundation

- Initialize the Java/Spring Boot modular monolith with a verified Java LTS and Spring Boot 4.x stable patch.
- Establish domain packages, configuration profiles, REST conventions, validation, safe error responses, correlation IDs, and structured logs.
- Connect PostgreSQL and configure Flyway migrations; disable destructive automatic schema generation.
- Add OpenAPI, service/repository conventions, and PostgreSQL integration-test infrastructure using Testcontainers or a separate isolated test database; never run destructive tests against the shared development project.
- Do not publish events or add Redis until a concrete domain workflow needs them.

**Exit criteria:** application starts against PostgreSQL, a baseline migration applies cleanly, API error/validation contracts are documented, and representative tests run against an isolated database.

## Phase 3 — Identity and Multi-Tenancy

- Implement organizations, users, roles, permissions, tenant context, authentication/session handling, authorization, and audit records.
- Derive tenant scope from authenticated identity; never trust a browser-supplied tenant ID.
- Enforce scope in service and persistence boundaries; evaluate PostgreSQL Row-Level Security for the deployment model.
- Build tenant-aware login, organization selection, access-denied, and role-aware navigation flows.
- Prove tenant A cannot read or modify tenant B data.

**Exit criteria:** a complete login-to-tenant-scoped-request slice works through the API and UI, with security and isolation tests.

## Phase 4 — Product and CRM

- Implement products, categories, units of measure, customers, contacts, leads, opportunities, and CRM activities.
- Define tenant-scoped keys, pagination, search/filter behavior, validation, and audit rules.

**Exit criteria:** one CRM/product workflow works end to end with authorization, migrations, and tests.

## Phase 5 — Sales

- Implement quotations, pricing/discount rules, sales orders and lines, reservation requests, deliveries, returns, and invoicing integration boundaries.
- Preserve a trace from quote through order, delivery, invoice, and payment.

**Exit criteria:** a sales order can be quoted, confirmed, tracked, and handed to inventory/accounting safely.

## Phase 6 — Procurement

- Implement purchase requisitions, approvals, RFQs, supplier comparison, purchase orders, receiving, and supplier performance.
- Record approval and receiving history with tenant scope and auditable transitions.

**Exit criteria:** approved purchase orders can be received transactionally and traced to inventory/AP processes.

## Phase 7 — Inventory

- Implement warehouses, bins, stock ledger, reservations, transfers, batch/lot and serial tracking, returns, and weighted-average valuation.
- Make movements atomic and protect allocations from concurrency errors.
- Add stock ledger and transaction tests before using quantities in sales/manufacturing.

**Exit criteria:** stock-changing workflows are ledger-backed, transactional, idempotent where retryable, and concurrency-tested.

## Phase 8 — Finance

- Implement chart of accounts, journals/lines, fiscal periods, AR/AP, invoices, payments/allocations, and period controls.
- Enforce balanced double-entry posting and source-document traceability.
- Add trial balance, P&L, and balance sheet reports.

**Exit criteria:** postings are balanced and auditable; financial statements reconcile to the ledger.

## Phase 9 — Manufacturing

- Implement BOMs and effective-dated versions, routings, work centers, production orders, reservations, consumption, output, yield, and scrap.
- Support PLANNED → RELEASED → IN_PROGRESS → QUALITY_CHECK → COMPLETED plus cancellation/rejection paths.
- Include material availability and basic capacity checks.

**Exit criteria:** a production order consumes reserved materials, records output/scrap, and moves through quality to inventory.

## Phase 10 — Quality and Assets

- Implement inspection plans/results, defects, non-conformance, corrective action, asset register, depreciation, and maintenance history.
- Connect quality decisions to production and returns, with auditable asset/inspection changes.

**Exit criteria:** quality holds/rejections and asset service/depreciation records follow their domain rules.

## Phase 11 — Workflow Engine

- Implement workflow definitions, approval rules/instances/actions, delegation, escalation, and audit history.
- Integrate only after the business transitions and role model are stable.

**Exit criteria:** a configurable approval path is enforced on the server and its decisions are traceable.

## Phase 12 — Event-Driven Architecture

- Add Kafka, domain event schemas, transactional outbox, reliable publication, retries, dead-letter handling, and idempotent consumers.
- Begin with meaningful completed workflows such as GoodsReceiptCompleted or InvoicePosted; do not use Kafka for internal method calls.

**Exit criteria:** important state changes publish versioned events without a database/broker dual-write gap.

## Phase 13 — AI Platform

- Add the AI orchestration/authorization boundary, provider abstraction, OpenAI and Gemini adapters, tool registry, conversations, and AI audit records.
- Verify current official SDK/API documentation before choosing provider libraries or APIs.
- Partition tools into READ, ANALYSIS, PROPOSAL, WRITE, and ADMINISTRATIVE policies.

**Exit criteria:** provider failures, invalid structured arguments, permissions, retention, and approval boundaries are handled and observable.

## Phase 14 — RAG

- Add tenant-scoped document ingestion, text extraction, chunking, embeddings, PostgreSQL/pgvector storage, metadata filters, retrieval, and citations.
- Support safe re-indexing and prevent cross-tenant retrieval.
- Treat retrieved text as untrusted input and test prompt-injection boundaries.

**Exit criteria:** responses cite authorized source documents and tenant isolation is demonstrated end to end.

## Phase 15 — AI Agents

- Add permission-aware read and analysis tools first, then proposals, followed by explicitly authorized write tools.
- Require human approval for high-impact writes and persist proposals, approvals, tool results, and audit events.
- Never allow arbitrary SQL execution by the model.

**Exit criteria:** tool arguments are schema-validated, authorization is server-side, and approval/audit behavior is tested.

## Phase 16 — Predictive ML

- Add a separately deployable Python/FastAPI inference service once meaningful historical data exists.
- Start with defensible demand forecasting and anomaly detection; version models and record training metadata.
- Validate feature compatibility, input schemas, missing data, model loading, prediction uncertainty, and inference failures.

**Exit criteria:** typed inference contracts return model versions and honest uncertainty, with model and API tests.

## Phase 17 — Analytics

- Build dashboards and operational KPIs for sales, procurement, inventory, manufacturing, and finance from real authorized data.
- Use paginated/aggregated APIs and deterministic number formatting; do not hard-code dashboard results.

**Exit criteria:** KPI definitions are documented, tenant-scoped, and reconcile to source workflows.

## Phase 18 — Production Engineering

- Complete deployment packaging for the selected runtime, CI/CD, OpenTelemetry, metrics, tracing, structured logging, and error reporting. Docker is optional unless the chosen deployment or isolated-test workflow requires containers.
- Add Prometheus/Grafana dashboards, Kafka health/lag monitoring, performance tests, security hardening, and deployment/runbook documentation.
- Review secrets, backups/recovery, access controls, migration rollout, and operational alerts.

**Exit criteria:** supported deployment and rollback procedures are documented and verified; no phase is called production-ready based only on a local build.

## First end-to-end vertical slice

After Phases 1 and 2 establish the UI and API foundations, the first full business slice is **tenant-aware identity**: user signs in, selects an organization, receives a server-derived tenant context, sees role-aware navigation, and receives a safe access-denied response for unauthorized routes. It must include migrations, backend authorization, audit events, UI states, and cross-tenant read/write tests before moving into CRM.
