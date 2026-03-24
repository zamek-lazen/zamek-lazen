# Events Preview Ledger Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify the homepage events preview so the right side reads as one clear editorial program list and the copy speaks about the cultural season instead of CMS or ticketing infrastructure.

**Architecture:** Keep the left column as-is. Convert the right column into a single vertical ledger where the first event becomes the featured row and the remaining events continue in the same grid. Update Czech and German translations so the section reads visitor-first.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, next-intl

---

## Chunk 1: Structure

### Task 1: Rebuild the right column into a single ledger

**Files:**
- Modify: `components/pages/home/events-preview.tsx`

- [ ] Split `events` into featured and remaining items.
- [ ] Render the featured item as the first row instead of a separate internal layout.
- [ ] Keep the same CTA and data wiring.

## Chunk 2: Copy

### Task 2: Remove CMS-oriented wording

**Files:**
- Modify: `messages/cs.json`
- Modify: `messages/de.json`

- [ ] Rewrite the section body to describe the cultural season, not Sanity or smsticket.
- [ ] Rewrite fallback featured copy to stay calm and editorial.

## Chunk 3: Verification

### Task 3: Verify the section

**Files:**
- Review: `components/pages/home/events-preview.tsx`
- Review: `messages/cs.json`
- Review: `messages/de.json`

- [ ] Run targeted lint on the touched files.
- [ ] Run a production build to confirm the homepage still renders cleanly.
