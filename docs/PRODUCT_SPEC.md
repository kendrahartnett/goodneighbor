# GoodNeighbor product specification

## 1. Product definition

GoodNeighbor helps Chicago residents discover trustworthy local volunteer opportunities without the noise and commitment overhead of a large volunteering platform. It is a curated discovery layer: users browse a small set of verified opportunities and continue to an organizer’s official site to participate.

## 2. Goals

1. Make it fast and pleasant to find a relevant Chicago opportunity.
2. Establish trust through transparent verification and source links.
3. Give a single administrator a low-friction way to keep listings current.
4. Make the first visit feel distinctive and warm, not database-like.

## 3. Audience and primary jobs

- First-time volunteer: “Show me something meaningful near my interests, without making me create an account.”
- Returning local: “Help me scan what is available now and get me to the organizer quickly.”
- Admin: “Let me add, update, publish, unpublish, or remove a verified listing safely.”

## 4. v1 scope

### Public pages

- Home: branded hero with photo slideshow, concise value proposition, featured listings, discovery entry point, and trust statement.
- Opportunities index: all published Chicago listings, keyword search, and filters.
- Opportunity detail: full listing information, verification context, and an external action link.
- About/verification: a short explanation of curation and how users should confirm logistics with organizers.

### Admin pages

- Sign-in entry and protected dashboard.
- Listing table/grid with status and last verification date.
- Create, edit, publish/unpublish, and delete listing flows.

### Opportunity fields visible to visitors

Title; organization; concise summary; longer description; Chicago neighborhood or service area; optional address, phone, and volunteer positions when verified; category; optional date/time or ongoing status; commitment note; accessibility/eligibility note when supplied; cover image; organizer action URL; verification date; and source/organizer attribution.

## 5. Content model and listing states

Every launch listing is `published` and `verified`. Drafts are admin-only. Unpublished listings are never included in public pages or public API responses. “Verified” means the administrator checked the organizer’s official source on the stored verification date; it does not mean GoodNeighbor guarantees event availability or quality.

## 6. User journeys

### Discover and act

1. Visitor lands on the home page and sees the Chicago-focused value proposition.
2. They browse featured listings or open all opportunities.
3. They filter/search, open a detail page, assess the organizer and logistics, then select the external “Visit organizer” action.
4. They complete any signup on the organizer’s own site.

### Admin maintenance

1. Admin selects sign in and completes GitHub OAuth.
2. App validates that the GitHub identity matches the configured allowlist.
3. Admin creates or updates a listing, validates preview/content, and publishes it.
4. Admin periodically refreshes the verification date and source.

## 7. Acceptance criteria

- A visitor can view eight initial verified Chicago listings without authentication.
- Search and filters visibly change the set of public results and communicate empty results.
- Each published detail page contains a working organizer URL and verification context.
- Visitors cannot reach or mutate admin data.
- The allowlisted GitHub admin can manage listings; any other authenticated GitHub user is rejected.
- The app clearly remains Chicago-scoped and does not promise availability beyond organizer-supplied information.

## 8. Deferred decisions

Favorites, map search, neighborhood-distance sorting, multilingual content, newsletter capture, organizer submissions, and public user profiles are all deferred. Do not add any of them as incidental scope.
