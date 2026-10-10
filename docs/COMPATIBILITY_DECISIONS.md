# Compatibility decisions — October 9, 2026

## Confirmed integration choices

- **Next.js:** use the current App Router convention: `app/**/route.ts` route handlers built on Web `Request`/`Response` APIs. Public pages remain server components; browser interaction is isolated to client components.
- **Auth.js:** use the current v5-style `auth.ts` export (`NextAuth({ providers: [GitHub] })`) and re-export `handlers` from `app/api/auth/[...nextauth]/route.ts`. Configure `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, and required production `AUTH_SECRET`. Authorization is separately enforced by the server-side GitHub ID/login allowlist.
- **Prisma + Neon:** this repository uses Prisma 6.19, a pooled Neon URL as `DATABASE_URL` for runtime through `@prisma/adapter-neon`, and a non-pooled `DIRECT_URL` in `prisma/schema.prisma` for CLI migrations. There is no `prisma.config.ts`; the Prisma 7 deprecation warning does not change the v6 migration behavior. Migrations are committed and production uses `prisma migrate deploy`, never `db push`.
- **Vercel:** deploy the standard Next.js application and configure secret environment variables in Vercel. Do not run seed scripts automatically on previews; run the deterministic seed intentionally against the intended database.

## Phase 5 release decisions — October 10, 2026

- Generate Prisma Client in `postinstall` as Prisma's Vercel guide recommends, so cached dependencies cannot leave the client stale after a schema change. Keep `npm run build` as `next build`; on Windows, generating while a development server holds Prisma's DLL can fail with `EPERM`.
- Do **not** run `prisma migrate deploy` in the default Vercel build. A preview build must never migrate the production database. Test migrations on an isolated Neon branch, then run `npm run db:deploy` deliberately with a direct production URL before the production deployment.
- Use a separate GitHub OAuth app for the production hostname; its callback is `https://<production-host>/api/auth/callback/github`. The local app keeps `http://localhost:3000/api/auth/callback/github`.
- Keep Preview `DATABASE_URL` and `DIRECT_URL` pointed at an isolated Neon branch, not production. Do not automatically seed previews.

## Sources checked

- https://authjs.dev/reference/nextjs
- https://www.prisma.io/docs/orm/v6/overview/databases/neon
- https://nextjs.org/docs/app/getting-started/route-handlers
- https://vercel.com/marketplace/prisma/prisma-postgres
- https://www.prisma.io/docs/orm/v6/prisma-client/deployment/serverless/deploy-to-vercel
- https://authjs.dev/guides/configuring-github
- https://vercel.com/docs/environment-variables

## Environment variables

`DATABASE_URL`, `DIRECT_URL`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `AUTH_SECRET`, and either `ADMIN_GITHUB_ID` (preferred) or `ADMIN_GITHUB_LOGIN`.
