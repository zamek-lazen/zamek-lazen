# Events Archive And Recap Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add event start times, separate past events on `/akce`, and support recap text plus YouTube video on past event detail pages.

**Architecture:** Extend the existing `event` Sanity document with optional editorial fields that remain backward compatible with current content. Keep one shared event model, derive upcoming vs past from the event date in Prague time, and render recap/video only where content exists. Reuse the existing detail route and add a small Portable Text renderer instead of introducing a separate archive content system.

**Tech Stack:** Next.js App Router, TypeScript, next-intl, next-sanity, Sanity schema types, Portable Text

---

### Task 1: Extend Event Content Model

**Files:**
- Modify: `sanity/schemaTypes/eventType.ts`
- Modify: `sanity/schemaTypes/blockContentType.ts`

- [ ] Add optional `startTime` field in `HH:mm` format.
- [ ] Add optional `recap` field using `blockContent`.
- [ ] Add optional `youtubeUrl` field with validation for YouTube links.
- [ ] Keep existing event documents valid without migration.

### Task 2: Extend Shared Event Data Layer

**Files:**
- Modify: `types.ts`
- Modify: `sanity/lib/events.ts`

- [ ] Extend shared event types with start time, recap, YouTube URL, and past/upcoming status.
- [ ] Add queries for upcoming events and past events ordered appropriately.
- [ ] Add shared formatting helpers for date plus optional time.
- [ ] Add safe YouTube URL parsing for detail-page embeds.

### Task 3: Rebuild `/akce` Listing

**Files:**
- Modify: `app/[locale]/akce/page.tsx`
- Modify: `messages/cs.json`
- Modify: `messages/de.json`

- [ ] Keep upcoming events as the primary section.
- [ ] Add a visually separated archive section for past events.
- [ ] Ensure past-event cards clearly read as completed events.
- [ ] Update empty states and labels to match the new structure.

### Task 4: Enrich Event Detail Pages

**Files:**
- Modify: `app/[locale]/akce/[slug]/page.tsx`
- Create: `components/shared/portable-text.tsx`
- Create: `components/shared/youtube-embed.tsx`

- [ ] Render date plus optional start time in the hero lead.
- [ ] Keep smsticket embed for future events.
- [ ] Render recap content for past events when present.
- [ ] Render a responsive YouTube embed when a valid link exists.

### Task 5: Verify

**Files:**
- No code changes required unless lint finds issues.

- [ ] Run `bun run lint`.
- [ ] Fix any type or lint regressions introduced by the change.

Plan complete and saved to `docs/superpowers/plans/2026-03-25-events-archive-recap.md`. Ready to execute.
