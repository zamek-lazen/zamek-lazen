# SEO Foundation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the missing technical SEO foundation for the multilingual Zamek Lazen site without changing visible page copy.

**Architecture:** Centralize SEO logic in shared helpers so locale-aware metadata, canonical URLs, hreflang alternates, sitemap entries, and JSON-LD stay consistent across routes. Keep page changes thin by having each route provide only its translated title/description and any route-specific schema payload.

**Tech Stack:** Next.js App Router metadata API, next-intl routing, Sanity content queries, TypeScript

---

## Chunk 1: Shared SEO Infrastructure

### Task 1: Add shared constants and metadata helpers

**Files:**
- Create: `lib/seo/constants.ts`
- Create: `lib/seo/metadata.ts`
- Create: `lib/seo/schema.ts`

- [ ] Define the production site URL, locale map, route path map, fallback OG image, and reusable contact/social constants.
- [ ] Add helper functions for canonical URLs, hreflang alternates, locale-aware metadata objects, and description normalization.
- [ ] Add helper functions for global and page-specific JSON-LD payloads.

### Task 2: Add crawl/indexation routes

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Modify: `sanity/lib/events.ts`

- [ ] Add `robots.ts` with sitemap reference and `Disallow` rules for non-public authoring paths.
- [ ] Add `sitemap.ts` that emits localized static routes and localized event detail URLs.
- [ ] Extend event data helpers only as needed to support sitemap generation cleanly.

## Chunk 2: Route Wiring

### Task 3: Wire global metadata and structured data

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/[locale]/layout.tsx`

- [ ] Replace placeholder site metadata with production metadata base, working icons, default OG/Twitter data, and robots defaults.
- [ ] Inject locale-aware global JSON-LD for the website, organization, and castle/place entity.

### Task 4: Add page metadata for public routes

**Files:**
- Modify: `app/[locale]/page.tsx`
- Modify: `app/[locale]/historie/page.tsx`
- Modify: `app/[locale]/rod/page.tsx`
- Modify: `app/[locale]/svatby/page.tsx`
- Modify: `app/[locale]/akce/page.tsx`
- Modify: `app/[locale]/galerie/page.tsx`
- Modify: `app/[locale]/kontakt/page.tsx`

- [ ] Add `generateMetadata` per route using existing translated content only.
- [ ] Add page-level JSON-LD, including breadcrumbs where it adds value.

### Task 5: Add event-detail metadata and schema

**Files:**
- Modify: `app/[locale]/akce/[slug]/page.tsx`

- [ ] Generate per-event metadata with canonical URL, localized title/description, and event image fallback.
- [ ] Inject `Event` JSON-LD plus breadcrumb data for detail pages.

### Task 6: Keep non-public routes out of search

**Files:**
- Modify: `app/studio/[[...tool]]/page.tsx`

- [ ] Override studio metadata so the authoring environment is explicitly `noindex, nofollow`.

## Chunk 3: Verification

### Task 7: Validate the implementation

**Files:**
- Modify only if verification reveals issues

- [ ] Run `bun run lint`.
- [ ] Run `bun run build`.
- [ ] Fix any metadata typing or route generation issues that surface.
