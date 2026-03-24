# Weddings Funnel Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the weddings page into a guided conversion funnel that ends with prominent phone and email contact actions.

**Architecture:** Keep the funnel in the existing route file, feed it from localized message keys, and structure the page into five sections: hero support, reasons, process, venue scenarios, and final contact. Reuse the current visual language so the page feels stronger without drifting away from the rest of the site.

**Tech Stack:** Next.js App Router, TypeScript, React, next-intl, Tailwind CSS

---

## File map

- Modify: `messages/cs.json`
  - Replace the sparse weddings copy with sectioned funnel content and CTA labels.
- Modify: `messages/de.json`
  - Mirror the same structure for German.
- Modify: `app/[locale]/svatby/page.tsx`
  - Rebuild the page into the new multi-section funnel.

## Chunk 1: Localized funnel content

### Task 1: Expand weddings translation keys

**Files:**
- Modify: `messages/cs.json`
- Modify: `messages/de.json`

- [ ] Add hero support copy and top contact labels.
- [ ] Add three "why here" items.
- [ ] Add richer process copy for all four steps.
- [ ] Add short atmosphere copy for both ceremony settings.
- [ ] Add the closing contact block headline and body.

## Chunk 2: Page rebuild

### Task 2: Restructure the weddings route

**Files:**
- Modify: `app/[locale]/svatby/page.tsx`

- [ ] Build top-level helper data arrays from translations.
- [ ] Add an early contact panel beneath the hero.
- [ ] Replace the paragraph stack with a three-reason section.
- [ ] Rework the process into a stronger two-column editorial layout.
- [ ] Present the two ceremony settings as separate scenario cards.
- [ ] Add a large final CTA section with `tel:` and `mailto:` actions.

## Chunk 3: Verification

### Task 3: Validate structure and syntax

**Files:**
- Modify: `app/[locale]/svatby/page.tsx`
- Modify: `messages/cs.json`
- Modify: `messages/de.json`

- [ ] Run `bun run lint`.
- [ ] If lint passes, review the final flow and confirm that phone/email contact is visible in both the opening and closing parts of the page.
