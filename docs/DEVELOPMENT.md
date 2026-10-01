# Development Environment

This guide records the inspected host, target runtime versions, and the planned hosted database setup. Application frameworks are not initialized yet; exact library pins belong in the relevant app manifest and must be rechecked before installation.

## Inspected environment on 2026-10-01

| Tool or platform | Installed status |
| --- | --- |
| Operating system | Windows 10 Home (`Core`), version 10.0.19045, build 19045 (22H2) |
| Node.js | 22.14.0; upgrade to the selected Node 24 LTS target before frontend work |
| npm | 10.9.2 |
| pnpm | 11.19.0 available from the workspace tool path; package manager not selected yet |
| Java | 19.0.1; non-LTS and outside the selected LTS target |
| Python | 3.13.3; usable for general scripts, but below the recorded ML target |
| Docker / Docker Compose | Not installed or on PATH; not required for development against hosted Supabase PostgreSQL |
| WSL | WSL 2.7.10 detected; `wsl --status` could not enumerate distributions due to access denied |
| PostgreSQL client/server | `psql` and `postgres` commands not found |
| Git | 2.49.0; repository was not initialized before this foundation task; Git author identity is configured |
| Maven / Gradle | Neither global command found; a project wrapper will be selected with the backend build tool |
| Existing app manifests/configuration | None; the repository initially contained only the three specification documents and temporary Word lock files |
| Environment files | No `.env` file or application environment file was present; no secrets were read or copied |

Docker is intentionally not a Phase 0 prerequisite. Supabase's hosted PostgreSQL can be used over a normal database connection. Docker will be needed only if the project later uses Supabase's local full-stack CLI or Docker-backed Testcontainers; those workflows can be deferred or replaced with an isolated hosted test project. The host is Windows 10 Home/Core, so check current [Docker Windows requirements](https://docs.docker.com/desktop/setup/install/windows-install/) if a later workflow needs it.

## Verified stable versions

Checked against official release pages on 2026-10-01. These are planning targets; only the Node version marker is pinned in this initial foundation. The hosted PostgreSQL version is controlled by the Supabase project and must be verified there. Re-check each version when its implementation phase begins.

| Technology | Stable target | Compatibility / decision note | Official source |
| --- | --- | --- | --- |
| Next.js | 16.3.8, Active LTS | Latest patched Active LTS line; requires Node 20.9+. | [September 2026 security release](https://nextjs.org/blog), [support policy](https://nextjs.org/support-policy), [npm registry](https://registry.npmjs.org/next/latest) |
| React / React DOM | 19.3.0 | React 19.3 is the current stable line; Next 16.3.8 accepts React 19. | [React 19.3 announcement](https://react.dev/blog/2026/09/09/react-19-3), [Next.js package metadata](https://registry.npmjs.org/next/latest) |
| TypeScript | 7.0.2 | Stable latest. Confirm Next.js editor/type-checker plugin compatibility at Phase 1; keep 6.0.3 as a compatible fallback if the plugin requires the prior compiler API. | [TypeScript 7 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/), [npm registry](https://registry.npmjs.org/typescript/latest), [Next.js TypeScript minimum](https://nextjs.org/docs/app/guides/upgrading/version-16) |
| Node.js | 24.21.0 LTS | Selected runtime; Next 16 requires Node 20.9 or later. `.nvmrc` records this target. | [Node.js releases](https://nodejs.org/en/about/previous-releases), [Node.js release blog](https://nodejs.org/en/blog) |
| Java | 25 LTS | Selected LTS; Spring Boot 4.1.1 supports Java 17 through 26, so Java 25 is in range. | [Oracle Java SE support roadmap](https://www.oracle.com/java/technologies/java-se-support-roadmap.html), [Spring Boot system requirements](https://docs.spring.io/spring-boot/system-requirements.html) |
| Spring Boot | 4.1.1 | Latest stable 4.1 patch shown in project releases; 4.2 milestones are pre-release and are not selected. | [Spring Boot releases](https://github.com/spring-projects/spring-boot/releases), [system requirements](https://docs.spring.io/spring-boot/system-requirements.html) |
| PostgreSQL | 18.6 upstream baseline | PostgreSQL 19 remains beta and is excluded. Supabase's hosted default is PostgreSQL 17; its 17.11 minor release was rolling out in September 2026. Select 18 if available for a new project; otherwise use the latest managed stable version and record the compatibility exception. Verify with `SHOW server_version`. | [PostgreSQL 18.6 release notes](https://www.postgresql.org/docs/release/18.6/), [Supabase PostgreSQL 17.11 platform update](https://supabase.com/changelog) |
| pgvector | 0.8.6 upstream | Latest released version observed; 0.8.7 is unreleased. Recheck the extension version and PostgreSQL compatibility when RAG begins; Supabase manages extension installation. | [pgvector changelog](https://github.com/pgvector/pgvector/blob/master/CHANGELOG.md), [project README](https://github.com/pgvector/pgvector) |
| Apache Kafka | 4.3.1 | Latest stable 4.3 line listed as supported; add in Phase 12, after transactional flows are stable. | [Apache Kafka downloads](https://kafka.apache.org/community/downloads/), [4.3.1 announcement](https://kafka.apache.org/blog/2026/06/25/apache-kafka-4.3.1-release-announcement/) |
| Redis Open Source | 8.10.1 | Latest stable 8.10 patch; Redis is deferred until a measured cache/ephemeral use case exists. | [Redis 8.10 release notes](https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/release-notes/redisce/redisos-8.10-release-notes/), [version support](https://redis.io/docs/latest/operate/oss_and_stack/install/version-mgmt/) |
| Python | 3.14.8 | Latest stable Python release observed; recheck when Phase 16 selects the ML library set. | [Python 3.14.8 release](https://www.python.org/downloads/release/python-3148/) |
| FastAPI | 0.142.2 | Latest stable release observed on 2026-09-30; deferred with the ML service. | [FastAPI release notes](https://fastapi.tiangolo.com/release-notes/) |

### Dependency choices deferred until their phase

Tailwind CSS, accessible UI primitives, TanStack Query, React Hook Form, Zod, Playwright, JUnit, Testcontainers, OpenAPI tooling, Hibernate, Flyway, ML libraries, and OpenTelemetry integrations are not installed or pinned. Their exact stable versions and compatibility will be checked before their relevant app is initialized; no framework dependency manifest exists yet.

## Supabase hosted PostgreSQL

Use a dedicated Supabase **development** project; one has not been provisioned yet. Create a local `.env` from `.env.example`, then copy the host, port, database name, username, and password from the project's Dashboard → Connect page. Keep the filled `.env` out of Git. The project receives traffic only through the server-side Spring Boot API; the browser must never receive database credentials or a Supabase secret/service-role key.

For a persistent Spring Boot backend, Supabase recommends a direct connection when the network supports IPv6. If the network is IPv4-only, use the shared **session** pooler and copy its exact host and username from the dashboard. Avoid transaction pooler mode for the Spring/Flyway connection: it does not support prepared statements by default and does not preserve session state between transactions. Supabase also recommends direct connections for migrations and other single-session database operations. See [Supabase connection guidance](https://supabase.com/docs/guides/database/connecting-to-postgres) and [pooling limits](https://supabase.com/docs/guides/database/connecting-to-postgres/pooling-and-limits).

The project's specification names PostgreSQL 18.6. Supabase currently defaults hosted projects to PostgreSQL 17, with 17.11 rolling out as of September 2026. When creating the project, use PostgreSQL 18 if Supabase offers it. Otherwise, use its latest supported stable version and record the compatibility decision; verify the actual server version in SQL Editor with:

```sql
SHOW server_version;
```

Use Flyway migration files in source control as the schema authority once the backend exists. Supabase SQL Editor is useful for querying and diagnostics; avoid making untracked schema changes there. Supabase's local CLI stack requires Docker, but it is not needed to connect to the hosted project. See [local CLI requirements](https://supabase.com/docs/guides/local-development/cli/getting-started).

Supabase Row Level Security does not automatically know the ERP user when Spring connects directly through JDBC. The backend must still enforce authorization and tenant scope. If database RLS is added later, pass a validated tenant context within each transaction and use a least-privilege application database role. Supabase documents that its `service_role` bypasses RLS; do not use that key in the browser or as the eventual ERP runtime identity. See [Supabase RLS guidance](https://supabase.com/docs/guides/database/postgres/row-level-security).

No Supabase project, database schema, migration, database user, or credential has been created in this repository or workspace. The host does not have `psql`; SQL Editor is available in the Supabase dashboard, and a database client can be selected later if needed.

## Source specifications

- `01_General_Requirements_AI_Native_Manufacturing_ERP.docx`
- `02_Frontend_Requirements_and_AI_Agent_Instructions.docx`
- `03_Backend_Database_Requirements_and_AI_Agent_Instructions.docx`
