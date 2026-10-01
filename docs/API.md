# API Conventions

This document records planned API conventions from the specifications. No API routes or contracts exist yet; they will be added with the backend foundation and the first domain slices.

## Planned standards

- Use resource-oriented REST endpoints and stable externally exposed identifiers, preferably UUIDs.
- Add a public API version when compatibility needs it; the exact route prefix will be decided when the first API is initialized.
- Validate request input at the API boundary and return a documented, machine-readable error shape with a correlation ID.
- Never return SQL details, internal stack traces, secrets, or cross-tenant information.
- Paginate collections and expose consistent sorting/filtering semantics; never return unbounded lists.
- Use idempotency for safely retryable creation, payment, inventory, and event operations.
- Enforce authorization and tenant scope in the backend; UI checks are only a usability aid.
- Publish the contract through OpenAPI when API endpoints are implemented.

## Contract status

There are no implemented endpoints, generated clients, OpenAPI files, or mock business responses at this foundation stage.

