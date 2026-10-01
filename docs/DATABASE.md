# Database Principles

PostgreSQL is the authoritative transactional store. This document records the required data rules; the schema is not yet implemented.

## Design constraints

- Every tenant-owned record has explicit tenant scope or a tenant-scoped parent. Tenant context comes from authentication, not the request body.
- Use normalized relational models, foreign keys, business-key uniqueness, check constraints, and indexes based on query paths. Reserve JSONB for genuinely semi-structured data.
- Store money and exact quantities using decimal/numeric types. Use a consistent UTC timestamp convention.
- Use migrations for every schema change. Production schema changes never rely on destructive ORM auto-DDL.
- Use optimistic locking/version columns where concurrent edits can conflict.
- Keep inventory and accounting history append-only and auditable.
- Commit stock movements with their stock ledger rows atomically. Commit completed receipts with inventory changes atomically.
- Validate double-entry balance before journal posting commits; retain source-document references for traceability.
- Use a transactional outbox for business events that must be published reliably after a database commit.
- Consider PostgreSQL Row-Level Security only after the deployment connection/role model has been designed and tested.

## Planned ledgers

Inventory will derive balances from stock movements and separately track reservations; it will not rely on one mutable `product.quantity` field. Finance will record journal headers and debit/credit lines; invoice totals alone will not represent the accounting record. Weighted average is the initial valuation plan, with FIFO left as a possible extension.

## Current schema status

No database, tables, migration tool configuration, or schema has been created. Flyway is the planned migration tool, subject to a current stable compatibility check when the Spring Boot project is initialized.

