# Homepage Minimalization Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the homepage into a calmer editorial composition, with an open hero, no duplicate place section, and clearer preview sections for the main subpages.

**Architecture:** Keep the existing homepage component split, but simplify the section stack. Rebuild the hero layout in place, remove the duplicate estate preview from the homepage assembly, and restyle weddings, events, and gallery previews so they share a lighter editorial rhythm.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, next-intl

---

## Chunk 1: Homepage Structure

### Task 1: Trim the homepage section stack

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] Remove `EstatePreview` from the homepage import list and render tree.
- [ ] Keep `Story` and `HistoryFamilyPreview` as the quality baseline.
- [ ] Preserve existing event data wiring and CTA routing.

## Chunk 2: Hero Redesign

### Task 2: Replace the boxed hero copy with an editorial overlay

**Files:**
- Modify: `components/pages/home/hero.tsx`

- [ ] Keep the current background image and parallax behavior.
- [ ] Remove the glass card, backdrop blur, and heavy boxed composition.
- [ ] Recompose the copy as open text sitting directly on the image.
- [ ] Keep both CTAs visible in the hero.
- [ ] Anchor the nearest event block to the bottom-right on desktop while preserving a readable mobile layout.

## Chunk 3: Preview Simplification

### Task 3: Rebuild the weddings preview into a lighter sneak peek

**Files:**
- Modify: `components/pages/home/weddings-preview.tsx`

- [ ] Reduce the card feeling and heavy overlay treatment.
- [ ] Use one strong image plus a cleaner text-and-steps composition.
- [ ] Keep the section clearly tied to the weddings page.

### Task 4: Rebuild the events preview into an editorial list

**Files:**
- Modify: `components/pages/home/events-preview.tsx`

- [ ] Remove the bulky featured box plus repeated card treatment.
- [ ] Use a featured event narrative on one side and cleaner linked event rows on the other.
- [ ] Keep the live-data behavior intact.

### Task 5: Rebuild the gallery preview into a restrained image composition

**Files:**
- Modify: `components/pages/home/gallery-preview.tsx`

- [ ] Reduce framing and decorative container styling.
- [ ] Let the image composition carry the section.
- [ ] Keep the gallery CTA clear but quiet.

## Chunk 4: Verification

### Task 6: Run targeted verification

**Files:**
- Review: `app/[locale]/page.tsx`
- Review: `components/pages/home/hero.tsx`
- Review: `components/pages/home/weddings-preview.tsx`
- Review: `components/pages/home/events-preview.tsx`
- Review: `components/pages/home/gallery-preview.tsx`

- [ ] Run a targeted build or lint check if available.
- [ ] Review the homepage for section order, CTA presence, and desktop/mobile integrity.
- [ ] Confirm the homepage now reads as previews for `historie`, `rod`, `svatby`, `akce`, and `galerie`.
