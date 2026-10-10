# Compatibility decisions — October 9, 2026

## Confirmed integration choices

- **Next.js:** use the current App Router convention: `app/**/route.ts` route handlers built on Web `Request`/`Response` APIs. Public pages remain server components; browser interaction is isolated to client components.
- **Auth.js:** use the current v5-style `auth.ts` export (`NextAuth({ providers: [GitHub] })`) and re-export `handlers` from `app/api/auth/[...nextauth]/route.ts`. Configure `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, and required production `AUTH_SECRET`. Authorization is separately enforced by the server-side GitHub ID/login allowlist.
- **Prisma + Neon:** use a pooled Neon URL as `DATABASE_URL` for runtime through `@prisma/adapter-neon`; use a non-pooled `DIRECT_URL` for Prisma CLI/migrations in `prisma.config.ts`. This is appropriate for Vercel’s serverless runtime. Migrations are committed and production uses `prisma migrate deploy`, never `db push`.
- **Vercel:** deploy the standard Next.js application and configure secret environment variables in Vercel. Do not run seed scripts automatically on previews; run the deterministic seed intentionally against the intended database.

## Sources checked

- https://authjs.dev/reference/nextjs
- https://www.prisma.io/docs/orm/v6/overview/databases/neon
- https://nextjs.org/docs/app/getting-started/route-handlers
- https://vercel.com/marketplace/prisma/prisma-postgres

## Environment variables

`DATABASE_URL`, `DIRECT_URL`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `AUTH_SECRET`, and either `ADMIN_GITHUB_ID` (preferred) or `ADMIN_GITHUB_LOGIN`.
