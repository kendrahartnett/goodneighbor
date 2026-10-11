# GoodNeighbor builder prompt log

## Build brief — October 9, 2026

> Read `README.md`, `AGENTS.md`, and every file in `docs/` before writing code. Build GoodNeighbor exactly to the documented v1 scope: a Chicago-only volunteer opportunity discovery app with exactly eight verified seeded listings, public search/filter/detail pages, and a single-admin dashboard. Use Next.js App Router, React, TypeScript, Tailwind, Neon PostgreSQL, Prisma migrations, Auth.js GitHub OAuth, custom fetch-based REST CRUD, and Vercel-ready configuration. First verify current official documentation for version-specific Auth.js, Prisma/Neon, Next.js, and Vercel integrations; record any necessary compatibility decision before implementation. Do not add user accounts, volunteer registration, a CMS, maps, or scope beyond the specs. Implement in phases, run the checks in `docs/TEST_PLAN.md`, and report the files changed, verification performed, and any blockers. I want to verify the build in steps as well. Explain what was done to be at each phase and record all of the prompts to highlight my abilities as a builder during this build in a file called "prompt-log.md" in this project. You can create that now as well.

## Builder capabilities demonstrated

- Converts an editorial product brief into an accessible, server-rendered application architecture.
- Checks primary documentation before choosing version-sensitive integrations.
- Designs a safe single-admin boundary and a validated REST CRUD surface.
- Uses authoritative organizer sources and transparent verification dates instead of fabricated availability.
- Builds in inspectable phases with tests and release checks.

## Phase 4 — visual system and motion — October 10, 2026

> Approved to continue and complete phase 4

### Builder capabilities demonstrated

- Establishes a coherent, reusable React component system rather than styling one-off pages.
- Uses intentionally generated, non-organizer imagery with descriptive alt text and an image-failure fallback.
- Builds an accessible, pausable slideshow with keyboard-reachable controls and a reduced-motion path.
- Carries accessible visual conventions through navigation, cards, filters, forms, loading states, focus states, and responsive layouts.
- Verifies the application through linting, type checks, automated tests, and a production build before handoff.

## Design refinement — October 10, 2026

> clean up the style and ui with this.

### Builder capabilities demonstrated

- Translates a detailed visual identity specification into a consistent production UI without expanding the v1 product scope.
- Applies a token-based forest, cream, sage, terracotta, and ochre system across public discovery and editorial administration.
- Improves the information hierarchy of search, details, dashboards, and authoring forms while preserving established React and REST behavior.
- Uses optimized local imagery and accessible, motion-aware interaction patterns.

## Logo, hero, and interface polish — October 10, 2026

> I need you to polish the ui. I want the logo here that I sent to be the logo and I also want the image to be a hero section near the top of the homepage. I want you to add more to the design and really polish the ui. The buttons and spacing needs to be adjusted. Review everything after you update with these changes. and then I will review before we move on. Fix this.

### Builder capabilities demonstrated

- Gives concrete visual feedback with references for brand, color, motion, homepage, and admin layouts.
- Directs an iterative review loop and retains final design approval.
- Balances presentation work with accessibility, responsive behavior, and functional verification.

## Admin authentication flow repair — October 10, 2026

> The admin login and logout, keeps sending me straight back into the dashboard, why am I not being redirected back to the github oauth sign in page? this need to be checked and fixed

### Builder capabilities demonstrated

- Identifies a real authentication-flow usability problem through hands-on testing.
- Asks for both root-cause investigation and a verified correction, including the difference between app logout and GitHub's browser session.

## Phase 5 approval — October 10, 2026

> Approved. Move on to Phase 5

### Builder capabilities demonstrated

- Uses explicit phase approval to move from feature work into a release-quality gate.
- Prioritizes tests, source verification, accessibility, safe database migration, and production configuration before launch.

## Phase 5 review and schema expansion — October 10, 2026

> for phase 5 status update: the vercel project link is: goodneighbor-psi.vercel.app. I verified all of the browser automation and I approve. I want you to correct that the hero image on the landing page needs to be a little smaller to fit the screen. The header text on the top of all the pages can be slightly smaller. I am verifying and reviewing the offical sources for the data seed. Add to the schema: Address, Phone, and Volunteer Positions to be a part of the CRUD. Volunteer categories also needs to include: Animal Welfare, Skills-Based & Virtual Volunteering, Public Safety. I will continue to review official sources and update data at a later testing time

### Builder capabilities demonstrated

- Supplies a live deployment URL and explicitly signs off on browser testing while keeping release judgment separate from the latest requested changes.
- Gives precise visual feedback on hero scale and page-heading hierarchy.
- Expands the editorial content model intentionally while preserving the eight existing records for later official-source review.
