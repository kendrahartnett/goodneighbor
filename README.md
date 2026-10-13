# GoodNeighbor

GoodNeighbor is a Chicago volunteer-opportunity discovery app with public browsing and a single-admin editorial dashboard. The application is implemented through Phase 4; Phase 5 release verification is in progress. See [Phase 5 status](docs/PHASE5_STATUS.md) and the [release checklist](docs/RELEASE_CHECKLIST.md) before deployment.

## Product snapshot

- Audience: people who want an approachable way to find local volunteer opportunities.
- Launch market: Chicago only.
- Initial content: eight verified opportunity listings.
- Public experience: editorial discovery, search/filtering, listing detail, a private suggestion form, and a clear path to the official organizer sign-up destination.
- Admin experience: one protected dashboard for managing listings and viewing private suggestions.
- Visual character: earthy, editorial, welcoming, contemporary, photo-forward, and subtly animated.

## Chosen stack

Next.js App Router, React, TypeScript, Tailwind CSS, Neon PostgreSQL, Prisma with migrations, Auth.js using GitHub OAuth, custom fetch-based REST CRUD, and Vercel.

## Optional photo uploads

Only the admin listing create/edit forms accept photos. Visitor listing suggestions are text-only and do not need Blob. Admin photo uploads require a **private Vercel Blob store** connected to the GoodNeighbor Vercel project. For local admin photo testing, add the store's `BLOB_READ_WRITE_TOKEN` to ignored `.env.local`, or use the connected project's `BLOB_STORE_ID` and a current `VERCEL_OIDC_TOKEN`. Do not paste either credential into chat or commit it. Restart the local server after adding the variable. Vercel's OIDC token is short-lived; pull a fresh development token when needed, taking care not to overwrite the existing Neon database URLs in `.env.local`.

## Start here

1. Read [the build plan](docs/BUILD_PLAN.md) for sequencing.
2. Treat [the product spec](docs/PRODUCT_SPEC.md), [technical spec](docs/TECHNICAL_SPEC.md), and [design spec](docs/DESIGN_SPEC.md) as the source of truth.
3. Follow [AGENTS.md](AGENTS.md) before making implementation decisions.
4. Use [the test plan](docs/TEST_PLAN.md) to define done.

For local Phase 5 browser testing on Windows, run `npm run dev:test` from this project directory, then open `http://localhost:3000`. This launches against the already-migrated, isolated Neon `phase5-request-photo-check` branch without editing `.env.local` or production. Stop it with Ctrl+C before starting another server on port 3000. The test branch expires October 19, 2026; refresh the script's branch target after that date. Plain `npm run dev` instead uses `.env.local`, which currently targets production and is missing the Phase 5 migration.

## Explicit non-goals for v1

- Accounts or saved opportunities for general visitors.
- Volunteer registration, scheduling, attendance tracking, messaging, or payments.
- Self-published listings or multi-admin roles.
- Markets outside Chicago.
- A CMS or third-party listings ingestion pipeline.

## Verification required at implementation time

The exact current integration patterns and package compatibility for Next.js, Prisma, Auth.js, GitHub OAuth callbacks, and Vercel must be checked against their official documentation before implementation. The architectural intent in this package is stable; version-specific APIs are not assumed.


## Author

Kendra Anne Hartnett

Github: [@kendrahartnett](https://github.com/kendrahartnett)

Build with: Codex CLI
