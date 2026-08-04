# Cloudflare Phase 2 — Account & tooling setup

Status for PantryPilot v2 rebuild ([PROJECT_REBUILD_PLAN.md](../PROJECT_REBUILD_PLAN.md) § Phase 2, issue #134).

## Domain decision

| Field                       | Value                             |
| --------------------------- | --------------------------------- |
| Domain status               | **C** — No domain planned for now |
| Domain name                 | n/a                               |
| Zone already on Cloudflare? | **no**                            |

Use `*.workers.dev` for preview and production until a custom domain exists.

### Blocking prerequisite (Phases 7 & 9)

**Buy or point a domain to Cloudflare** before:

- Phase 7 — Email Routing (requires a verified zone)
- Phase 9 — attaching a production custom domain to the Worker

Email Routing and custom-domain steps cannot be fully completed under decision C.

## Account products (confirmed)

| Product       | Status                                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Workers       | Available (account already has Workers)                                                                                                                                               |
| D1            | Available in dashboard                                                                                                                                                                |
| R2            | Product available; **subscription activation** requires a payment method on file (free tier still $0 until overages). Complete “Add R2 subscription” in the dashboard before Phase 6. |
| Email Routing | Product available; zone setup deferred (domain decision C)                                                                                                                            |

## Secrets for Phase 10 (CI)

GitHub Actions will need these repository secrets later (Phase 10). Values live in a password manager — **never commit them**.

| Secret                  | Purpose                         |
| ----------------------- | ------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Deploy / manage Workers, D1, R2 |
| `CLOUDFLARE_ACCOUNT_ID` | Target Cloudflare account       |

API token permissions created in Phase 2 (no Email Routing zone perms yet):

- Account → Workers Scripts → Edit
- Account → D1 → Edit
- Account → Workers R2 Storage → Edit

When a domain/zone is added, extend the token (or create a new one) with Zone → Email Routing permissions as needed.

## Local Wrangler auth

With no `package.json` until Phase 3 scaffolding:

```bash
npx wrangler@latest login
npx wrangler@latest whoami
```

Auth is stored under `~/.wrangler` (OAuth), not in the repo. Wrangler will be installed as a project dependency with `@opennextjs/cloudflare` in Phase 3.
