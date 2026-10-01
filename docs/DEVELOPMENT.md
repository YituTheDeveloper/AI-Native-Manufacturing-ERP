# Development Environment

This guide records the inspected host, target runtime versions, and the current local database setup. Application frameworks are not initialized yet; exact library pins belong in the relevant app manifest and must be rechecked before installation.

## Inspected environment on 2026-10-01

| Tool or platform | Installed status |
| --- | --- |
| Operating system | Windows 10 Home (`Core`), version 10.0.19045, build 19045 (22H2) |
| Node.js | 22.14.0; upgrade to the selected Node 24 LTS target before frontend work |
| npm | 10.9.2 |
| pnpm | 11.19.0 available from the workspace tool path; package manager not selected yet |
| Java | 19.0.1; non-LTS and outside the selected LTS target |
| Python | 3.13.3; usable for general scripts, but below the recorded ML target |
| Docker / Docker Compose | Not installed or not on PATH; the PostgreSQL service has not been started |
| WSL | WSL 2.7.10 detected; `wsl --status` could not enumerate distributions due to access denied |
| PostgreSQL client/server | `psql` and `postgres` commands not found |
| Git | 2.49.0; repository was not initialized before this foundation task; Git author identity is configured |
| Maven / Gradle | Neither global command found; a project wrapper will be selected with the backend build tool |
| Existing app manifests/configuration | None; the repository initially contained only the three specification documents and temporary Word lock files |
| Environment files | No `.env` file or application environment file was present; no secrets were read or copied |

### Docker on this host

Docker Desktop 4.93.0 is the latest stable release listed on the official release-notes page as of this inspection. Docker Desktop is absent here. Docker's current Windows install requirements list Windows 10 Pro, Enterprise, or Education 22H2 (build 19045), while this host identifies as Windows 10 Home/Core. WSL 2.7.10 exceeds the documented WSL 2.1.5 minimum, but the Windows edition is not in the listed Windows 10 requirements. Resolve the host compatibility before running Compose; do not assume that matching the build number is sufficient. See [Docker's Windows install requirements](https://docs.docker.com/desktop/setup/install/windows-install/) and [release notes](https://docs.docker.com/desktop/release-notes/).

## Verified stable versions

Checked against official release pages on 2026-10-01. These are planning targets; only the PostgreSQL image and Node version marker are pinned in this initial foundation. Re-check each version when its implementation phase begins.

| Technology | Stable target | Compatibility / decision note | Official source |
| --- | --- | --- | --- |
| Next.js | 16.3.8, Active LTS | Latest patched Active LTS line; requires Node 20.9+. | [September 2026 security release](https://nextjs.org/blog), [support policy](https://nextjs.org/support-policy), [npm registry](https://registry.npmjs.org/next/latest) |
| React / React DOM | 19.3.0 | React 19.3 is the current stable line; Next 16.3.8 accepts React 19. | [React 19.3 announcement](https://react.dev/blog/2026/09/09/react-19-3), [Next.js package metadata](https://registry.npmjs.org/next/latest) |
| TypeScript | 7.0.2 | Stable latest. Confirm Next.js editor/type-checker plugin compatibility at Phase 1; keep 6.0.3 as a compatible fallback if the plugin requires the prior compiler API. | [TypeScript 7 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/), [npm registry](https://registry.npmjs.org/typescript/latest), [Next.js TypeScript minimum](https://nextjs.org/docs/app/guides/upgrading/version-16) |
| Node.js | 24.21.0 LTS | Selected runtime; Next 16 requires Node 20.9 or later. `.nvmrc` records this target. | [Node.js releases](https://nodejs.org/en/about/previous-releases), [Node.js release blog](https://nodejs.org/en/blog) |
| Java | 25 LTS | Selected LTS; Spring Boot 4.1.1 supports Java 17 through 26, so Java 25 is in range. | [Oracle Java SE support roadmap](https://www.oracle.com/java/technologies/java-se-support-roadmap.html), [Spring Boot system requirements](https://docs.spring.io/spring-boot/system-requirements.html) |
| Spring Boot | 4.1.1 | Latest stable 4.1 patch shown in project releases; 4.2 milestones are pre-release and are not selected. | [Spring Boot releases](https://github.com/spring-projects/spring-boot/releases), [system requirements](https://docs.spring.io/spring-boot/system-requirements.html) |
| PostgreSQL | 18.6 | Latest released 18.x patch; PostgreSQL 19 remains beta and is excluded. Used by local Compose. | [PostgreSQL 18.6 release notes](https://www.postgresql.org/docs/release/18.6/), [official image tags](https://hub.docker.com/_/postgres) |
| pgvector | 0.8.6 | Latest released version observed; 0.8.7 is unreleased. Recheck PostgreSQL 18 compatibility when RAG begins. | [pgvector changelog](https://github.com/pgvector/pgvector/blob/master/CHANGELOG.md), [project README](https://github.com/pgvector/pgvector) |
| Apache Kafka | 4.3.1 | Latest stable 4.3 line listed as supported; add in Phase 12, after transactional flows are stable. | [Apache Kafka downloads](https://kafka.apache.org/community/downloads/), [4.3.1 announcement](https://kafka.apache.org/blog/2026/06/25/apache-kafka-4.3.1-release-announcement/) |
| Redis Open Source | 8.10.1 | Latest stable 8.10 patch; Redis is deferred until a measured cache/ephemeral use case exists. | [Redis 8.10 release notes](https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/release-notes/redisce/redisos-8.10-release-notes/), [version support](https://redis.io/docs/latest/operate/oss_and_stack/install/version-mgmt/) |
| Python | 3.14.8 | Latest stable Python release observed; recheck when Phase 16 selects the ML library set. | [Python 3.14.8 release](https://www.python.org/downloads/release/python-3148/) |
| FastAPI | 0.142.2 | Latest stable release observed on 2026-09-30; deferred with the ML service. | [FastAPI release notes](https://fastapi.tiangolo.com/release-notes/) |
| Docker Desktop | 4.93.0 | Latest stable release listed on 2026-09-28; not installed. Host edition compatibility must be resolved first. | [Docker Desktop release notes](https://docs.docker.com/desktop/release-notes/), [Windows install requirements](https://docs.docker.com/desktop/setup/install/windows-install/) |

### Dependency choices deferred until their phase

Tailwind CSS, accessible UI primitives, TanStack Query, React Hook Form, Zod, Playwright, JUnit, Testcontainers, OpenAPI tooling, Hibernate, Flyway, ML libraries, and OpenTelemetry integrations are not installed or pinned. Their exact stable versions and compatibility will be checked before their relevant app is initialized; no framework dependency manifest exists yet.

## Local PostgreSQL

The initial Compose file defines only PostgreSQL 18.6, binds its port to localhost, and stores data in a named volume. The local password in `.env.example` is a development placeholder; create a local `.env` and replace it before starting the service. `.env` is ignored by Git.

```powershell
Copy-Item .env.example .env
docker compose --env-file .env -f infra/compose.yaml up -d postgres
docker compose --env-file .env -f infra/compose.yaml ps
docker compose --env-file .env -f infra/compose.yaml exec postgres pg_isready
```

The commands have not been run because Docker is unavailable. No database schema, migration, user, or production credential has been created. The Compose file intentionally excludes Redis and Kafka.

## Source specifications

- `01_General_Requirements_AI_Native_Manufacturing_ERP.docx`
- `02_Frontend_Requirements_and_AI_Agent_Instructions.docx`
- `03_Backend_Database_Requirements_and_AI_Agent_Instructions.docx`

