# GoodNeighbor

GoodNeighbor is a Chicago volunteer-opportunity discovery app with public browsing and a single-admin editorial dashboard. The application is implemented through Phase 4; Phase 5 release verification is in progress. See [Phase 5 status](docs/PHASE5_STATUS.md) and the [release checklist](docs/RELEASE_CHECKLIST.md) before deployment.

## Product snapshot

- Audience: people who want an approachable way to find local volunteer opportunities.
- Launch market: Chicago only.
- Initial content: eight verified opportunity listings.
- Public experience: editorial discovery, search/filtering, listing detail, and a clear path to the official organizer sign-up destination.
- Admin experience: one protected dashboard for managing listings.
- Visual character: earthy, editorial, welcoming, contemporary, photo-forward, and subtly animated.

## Chosen stack

Next.js App Router, React, TypeScript, Tailwind CSS, Neon PostgreSQL, Prisma with migrations, Auth.js using GitHub OAuth, custom fetch-based REST CRUD, and Vercel.

## Start here

1. Read [the build plan](docs/BUILD_PLAN.md) for sequencing.
2. Treat [the product spec](docs/PRODUCT_SPEC.md), [technical spec](docs/TECHNICAL_SPEC.md), and [design spec](docs/DESIGN_SPEC.md) as the source of truth.
3. Follow [AGENTS.md](AGENTS.md) before making implementation decisions.
4. Use [the test plan](docs/TEST_PLAN.md) to define done.

## Explicit non-goals for v1

- Accounts or saved opportunities for general visitors.
- Volunteer registration, scheduling, attendance tracking, messaging, or payments.
- User-generated listings or multi-admin roles.
- Markets outside Chicago.
- A CMS or third-party listings ingestion pipeline.

## Verification required at implementation time

The exact current integration patterns and package compatibility for Next.js, Prisma, Auth.js, GitHub OAuth callbacks, and Vercel must be checked against their official documentation before implementation. The architectural intent in this package is stable; version-specific APIs are not assumed.


## Author

Kendra Anne Hartnett

Github: [@kendrahartnett](https://github.com/kendrahartnett)

Build with: Codex CLI
