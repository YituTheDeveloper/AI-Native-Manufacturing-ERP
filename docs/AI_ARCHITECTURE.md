# AI Architecture

The AI capability will be introduced after the ERP has a mature identity, tenant, and authorization boundary. This is a plan; there are no LLM calls, agent tools, RAG documents, or model predictions in the repository.

## Planned components

- **Copilot orchestration:** a Spring Boot boundary authenticates the user, resolves tenant scope, applies permissions, and records tool activity.
- **Provider adapters:** an internal `AIProvider` contract isolates OpenAI and Gemini request/response handling. Verify official provider APIs, SDKs, and retention behavior before implementation.
- **ERP tool registry:** explicit typed tools for READ, ANALYSIS, PROPOSAL, WRITE, and ADMINISTRATIVE work. The model cannot execute SQL or access unrestricted repositories.
- **Proposal and approval records:** write actions persist a typed preview, permission decision, approval outcome, execution result, and audit metadata. High-impact actions require a human approval.
- **RAG:** tenant-scoped document and chunk records with content hashes and page/section metadata, stored in PostgreSQL with pgvector. Retrieval returns source citations and treats retrieved content as untrusted input.
- **ML service:** Python/FastAPI exposes typed demand forecast and anomaly detection endpoints when meaningful historical data is available. Predictions carry model version, timestamp, and uncertainty where meaningful.

## Safety boundaries

- Enforce authorization server-side for every tool call. Never use the tenant ID supplied by a browser as the security authority.
- Validate every model-produced argument against a schema before any tool runs.
- Keep READ and ANALYSIS tools separate from PROPOSAL and WRITE tools.
- Require explicit permission and configured human approval for high-impact operations, including purchasing, inventory, finance, supplier, role, and period changes.
- Do not present predictions as facts. Distinguish source facts, calculations, model estimates, and recommendations.
- Do not retain prompts or ERP data longer than the explicit product policy requires; do not log sensitive payloads unnecessarily.
- Test cross-tenant retrieval, tool permission failures, malformed arguments, prompt injection in retrieved documents, provider timeouts/failures, and approval boundaries.

## Implementation order

1. Mature identity and backend authorization.
2. Read-only ERP tools and audit records.
3. Tenant-aware RAG with citations.
4. Proposals and human approval.
5. Authorized write execution.
6. Forecasting and anomaly inference through the separately deployable ML service.

