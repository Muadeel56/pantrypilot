# PantryPilot Rebuild Plan — Next.js + Cloudflare Stack

Stack: Next.js (frontend + backend), Cloudflare D1 (database), Cloudflare R2 (object storage),
Cloudflare Email Routing (email), Cloudflare Workers via OpenNext (deployment).
Repo strategy: same GitHub repo, old code wiped and replaced.

---

## Phase 0 — Backup & Safety Net

1. Confirm `git status` is clean or stash/commit any pending work.
2. Create a tag/branch preserving current state before deleting anything:
   ```
   git checkout -b archive/vue-firebase-vuejs
   git push -u origin archive/vue-firebase-vuejs
   git checkout feature/firebase-setup   # or main
   ```
3. Locally export anything not in git that you still need (e.g. Firebase project data, `.env` secrets, Firestore export) — Firebase data will NOT be preserved by this plan since you're moving to D1/R2.
4. Note any Firebase console resources (project ID, collections) you want reference to when designing the new D1 schema.

**Exit criteria:** old code is safely recoverable from `archive/vue-firebase-vuejs` even after deletion.

---

## Phase 1 — Cleanup Old Project

1. Delete Vue/Vite/Firebase source and config:
   - `src/`, `public/`, `index.html`, `dist/`
   - `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`
   - `firebase/`, `firebase.json`, `.firebaserc`, `FIREBASE_SETUP.md`
   - `src/composables/useFirebase.ts`, `src/composables/useFirestore.ts`, `src/config/`
   - Audit/report artifacts no longer relevant: `ACCESSIBILITY_AUDIT_REPORT.md`, `ACCESSIBILITY_FIXES_SUMMARY.md`, `axe-report*.json`, `lighthouse-*`, `PERFORMANCE_BASELINE_REPORT.md`, `FOLLOW_UP_ISSUES.md`, `milestone_description.md` (keep if you want historical record — otherwise archive into a `docs/legacy/` folder before deleting, or rely on the `archive/*` branch/tag from Phase 0).
   - `.github/workflows/firebase-hosting-*.yml`
   - `node_modules/`, `package-lock.json`
2. Remove Firebase/Vue dependencies from `package.json` (or just delete `package.json` — Phase 3 regenerates it).
3. Decide what to keep as-is: `LICENSE`, `README.md` (will be rewritten), `docs/` (review contents — keep anything still relevant to product requirements, discard tooling-specific docs).
4. Commit the cleanup as its own commit before scaffolding the new app, so history clearly shows "removed old stack" separately from "added new stack":
   ```
   git add -A
   git commit -m "chore: remove Vue/Vite/Firebase codebase ahead of Next.js/Cloudflare rebuild"
   ```

**Exit criteria:** repo root is essentially empty except `.git`, `LICENSE`, and whatever docs you chose to keep.

---

## Phase 2 — Cloudflare & Tooling Account Setup

1. Ensure you have a Cloudflare account with Workers/D1/R2/Email Routing enabled (all available on free tier for dev).
2. Install/auth Wrangler CLI: `npm install -D wrangler` and `npx wrangler login`.
3. Decide on domain: do you have (or plan to add) a domain in Cloudflare DNS? Required for:
   - Email Routing (needs a verified zone).
   - Production Worker custom domain.
   If not yet, note "buy/point domain to Cloudflare" as a blocking prerequisite for Phases 6 and 9's custom-domain step (workers.dev subdomain works without one for everything except email).
4. Create a Cloudflare API token (Workers Scripts:Edit, D1:Edit, R2:Edit, Email Routing:Edit) and store it — you'll need it for GitHub Actions secrets later (Phase 10), not committed to the repo.

**Exit criteria:** `wrangler whoami` succeeds; you know whether a custom domain is available.

---

## Phase 3 — Next.js Project Scaffolding

1. Scaffold app in repo root:
   ```
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```
2. Add Cloudflare dev tooling:
   ```
   npm install -D @opennextjs/cloudflare wrangler
   ```
3. Run the OpenNext Cloudflare init to generate `open-next.config.ts`, `wrangler.jsonc`, and adjust `next.config.ts` per its instructions (`npx opennextjs-cloudflare@latest` or manual setup per current OpenNext docs).
4. Add `.gitignore` entries: `.wrangler/`, `.open-next/`, `.env*.local`.
5. Set up code quality tooling carried over in spirit from the old project: ESLint (Next's default + any custom rules), Prettier, `lint`/`format` scripts in `package.json`.
6. Verify local dev: `npm run dev` loads default Next.js page.
7. Verify local Cloudflare emulation: `npx wrangler dev` (via OpenNext build) serves the app through `workerd`.

**Exit criteria:** Next.js app runs locally both via `next dev` and via Wrangler's Cloudflare Workers runtime.

---

## Phase 4 — Database: Cloudflare D1

1. Create D1 database:
   ```
   npx wrangler d1 create pantrypilot-db
   ```
   Add the returned `database_id`/binding to `wrangler.jsonc`.
2. Choose an ORM: **Drizzle ORM** (recommended — first-class D1 driver, typed schema, migration tooling that works well with Wrangler).
   ```
   npm install drizzle-orm
   npm install -D drizzle-kit
   ```
3. Define initial schema in `src/db/schema.ts`. Since feature scope is being redefined fresh (Phase 8 will nail down specifics), start minimal: `users`, `sessions`, `accounts`, `verification_tokens` (needed by Auth.js D1 adapter) — domain tables (pantry items, recipes, etc.) added once Phase 8 scope is settled.
4. Configure `drizzle.config.ts` pointed at D1 (via `wrangler d1` driver mode) so `drizzle-kit generate` + `wrangler d1 migrations apply` work.
5. Create local + remote migration workflow:
   ```
   npx wrangler d1 migrations create pantrypilot-db init
   npx drizzle-kit generate
   npx wrangler d1 migrations apply pantrypilot-db --local
   npx wrangler d1 migrations apply pantrypilot-db --remote
   ```
6. Add a typed `getDb()` helper that pulls the D1 binding from Cloudflare's request context (via `getCloudflareContext()` from OpenNext) for use in Next.js Route Handlers/Server Actions.

**Exit criteria:** a Route Handler can read/write a test row in D1 locally and after deploy.

---

## Phase 5 — Authentication: Auth.js + D1

1. Install Auth.js v5 (`next-auth@beta`) and the D1 adapter path:
   ```
   npm install next-auth@beta
   npm install @auth/drizzle-adapter
   ```
   (Auth.js has an official Drizzle adapter; point it at the Drizzle-D1 instance from Phase 4 rather than a dedicated D1-only adapter, which is less maintained.)
2. Configure providers — decide now: email/password (credentials) vs OAuth (Google/GitHub) vs magic link. **Decision needed from you before this phase**: which sign-in method(s) to support (affects whether Cloudflare Email is also used for magic-link/verification mail, tying Phase 5 to Phase 7).
3. Set up `auth.ts` config, session strategy (JWT recommended for Workers' stateless edge runtime rather than database sessions, to avoid a D1 round-trip per request — but D1 sessions are fine too given D1's low latency; pick JWT for simplicity unless you need server-side session revocation).
4. Add middleware (`src/middleware.ts`) for route protection.
5. Wire `SessionProvider` in root layout, build sign-in/sign-out UI.
6. Add `AUTH_SECRET` and any OAuth client secrets as Cloudflare Worker secrets (`npx wrangler secret put AUTH_SECRET`), never in `.env` committed to git.

**Exit criteria:** user can sign up/sign in, a session persists, protected routes redirect when unauthenticated — tested both locally and via a preview deploy.

---

## Phase 6 — File Storage: Cloudflare R2

1. Create bucket:
   ```
   npx wrangler r2 bucket create pantrypilot-assets
   ```
   Add R2 binding to `wrangler.jsonc`.
2. Build a small storage helper (`src/lib/r2.ts`) wrapping `put`/`get`/`delete`/signed-URL generation via the R2 binding accessed through `getCloudflareContext()`.
3. Decide access pattern:
   - **Private assets**: serve via a Next.js Route Handler that streams from R2 (auth-gated).
   - **Public assets** (e.g. recipe images): either a public R2 bucket + custom domain, or a Worker route proxying with caching headers.
4. Implement one concrete use case end-to-end (e.g. user avatar or item photo upload) as a smoke test: client upload → Route Handler → R2 `put` → store object key in D1 → render via `get`/public URL.
5. Add file-size/type validation server-side before accepting uploads.

**Exit criteria:** upload → store → retrieve round-trip works locally and in a deployed preview.

---

## Phase 7 — Email: Cloudflare Email Routing

**Important caveat to plan around:** Cloudflare Email Routing is primarily built for *receiving/forwarding* mail on a zone, plus a `send_email` Worker binding that can only send to destination addresses you've explicitly verified in the dashboard — it is **not** a general transactional-email API for sending to arbitrary end-user addresses (no arbitrary recipient sending, no built-in deliverability/reputation tooling like a normal ESP). Confirm this fits your needs:
- Fine for: internal notifications, contact-form-to-owner forwarding, alerting to your own verified inbox.
- Not fine for: password reset / magic-link emails to arbitrary signups, marketing mail, transactional receipts to customers.

Steps:
1. Add your domain as a Cloudflare zone (if not already) — required for Email Routing.
2. Enable Email Routing in the dashboard, verify destination address(es).
3. Add the `send_email` binding to `wrangler.jsonc` for outbound sends from a Worker/Route Handler.
4. Build `src/lib/email.ts` wrapping the binding, used for whichever notifications fit the caveat above.
5. **Decision point flagged for you:** if Auth.js (Phase 5) needs to send verification/magic-link emails to arbitrary user addresses, Cloudflare Email Routing alone won't cover it — the plan should either (a) restrict auth to OAuth/credentials only (no email verification needed), or (b) pair Cloudflare Email for internal notices with a proper transactional provider (Resend, Postmark, etc.) for user-facing auth emails. Confirm which path before finishing Phase 5.

**Exit criteria:** at least one real notification (e.g. new-signup alert to your own inbox) sends successfully end-to-end.

---

## Phase 8 — Feature Scoping & Core Build

Since scope is being defined fresh rather than ported from the old app:

1. Write a short product spec: what does PantryPilot v2 actually do? (e.g. pantry inventory tracking, expiry alerts, recipe suggestions, shopping lists — pick concrete v1 scope).
2. Turn the spec into a data model: extend the Drizzle schema from Phase 4 with real domain tables (e.g. `pantry_items`, `categories`, `recipes`, `shopping_list_items`), including foreign keys to `users`.
3. Design the route/page structure in the App Router (`/dashboard`, `/pantry`, `/recipes`, etc.) and which are Server Components vs need client interactivity.
4. Build core CRUD flows per entity: Server Actions or Route Handlers + Drizzle queries scoped to the signed-in user.
5. Wire R2 (Phase 6) into whichever entities need images/attachments.
6. Wire Email (Phase 7) into whichever flows need notifications, respecting the Phase 7 caveat.
7. Add basic UI polish: loading/error states, empty states, responsive layout (Tailwind, carried over from scaffold).
8. Add tests: unit tests for data-layer functions (Vitest), and at least smoke-level component/integration tests.

**Exit criteria:** a usable v1 feature set works end-to-end locally.

---

## Phase 9 — Deployment: Cloudflare Workers (OpenNext)

1. Confirm `npm run build` (Next build) → `opennextjs-cloudflare build` → `wrangler deploy` chain works via the scripts OpenNext's init generated (typically `preview`/`deploy` npm scripts).
2. Add all required bindings (D1, R2, Email, secrets) to `wrangler.jsonc` for the production environment; consider a separate `wrangler.jsonc` env block (or `--env staging`) for a staging deployment with its own D1/R2 resources so you're not testing against production data.
3. Deploy: `npm run deploy` → verify the `*.workers.dev` URL serves the app correctly with all bindings functioning.
4. If a custom domain is available (Phase 2), attach it via Worker Routes/Custom Domains in the dashboard or `wrangler.jsonc` `routes` config.
5. Smoke-test the deployed app: auth flow, D1 read/write, R2 upload, email send.

**Exit criteria:** production URL fully functional, matching local behavior.

---

## Phase 10 — CI/CD via GitHub Actions

1. Add `.github/workflows/deploy.yml`: on push to `main`, run lint + typecheck + tests, then `wrangler deploy` using `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` GitHub Actions secrets (from Phase 2's API token).
2. Optionally add a PR-preview workflow (build + `wrangler versions upload` for preview URLs, or deploy to a `staging` environment) mirroring what the old Firebase Hosting PR-preview workflow did.
3. Add a CI-only workflow (lint/typecheck/test) that runs on all PRs regardless of branch, so branch protection can require it.

**Exit criteria:** merging to `main` auto-deploys; PRs get lint/test feedback before merge.

---

## Phase 11 — Docs & Repo Hygiene

1. Rewrite `README.md`: stack overview, local setup (`wrangler login`, `.dev.vars` example, `npm run dev`), deployment instructions, architecture diagram/summary.
2. Add `.dev.vars.example` documenting required local secrets (`AUTH_SECRET`, any OAuth keys) without real values.
3. Update/remove stale docs in `docs/` from the old stack.
4. Confirm `LICENSE` still applies as intended.
5. Tag a `v2.0.0-alpha` release once Phase 9 deployment is verified.

**Exit criteria:** a new contributor could clone the repo and get running from `README.md` alone.

---

## Phase 12 — Push & Wrap-Up

1. Push all commits to `origin` on the working branch, open a PR into `main` summarizing "rebuild PantryPilot on Next.js + Cloudflare stack" (or merge directly if working straight on `main`, per your usual workflow).
2. Confirm GitHub Actions deploy workflow runs green on merge.
3. Do a final manual pass on the deployed production URL.

---

## Decisions Still Needed From You (blocking specific phases)

| Phase | Decision | Options |
|---|---|---|
| 5 | Auth provider(s) | OAuth (Google/GitHub) vs credentials vs magic link — affects whether Phase 7's email limitation blocks auth |
| 2 | Custom domain availability | Determines whether Email Routing (needs a zone) and custom Worker domain are possible now or deferred |
| 7 | Email-for-auth workaround | If magic-link/password-reset to arbitrary users is needed, pick a companion transactional provider or drop that requirement |
| 8 | v1 feature scope | Concrete list of entities/screens for PantryPilot v2 |
