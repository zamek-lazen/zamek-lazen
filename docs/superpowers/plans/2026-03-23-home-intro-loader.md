# Home Intro Loader Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a first-session intro loader to the homepage that reveals the existing hero without affecting other routes or replaying after locale switches.

**Architecture:** Render a dedicated client overlay only on the homepage, persist the "already played" state in `sessionStorage`, and use lightweight CSS-driven animation for the progress line, wordmark fade, and reveal mask. Keep the existing hero mounted underneath so the exit lands as a clean reveal.

**Tech Stack:** Next.js App Router, TypeScript, React 19, next-intl, Tailwind CSS v4

---

## File map

- Create: `components/pages/home/home-intro-loader.tsx`
  - Owns first-visit detection, progress timing, overlay lifecycle, and scroll locking.
- Modify: `components/pages/home/index.ts`
  - Re-export the new loader component.
- Modify: `app/[locale]/page.tsx`
  - Mount the loader only on the homepage.
- Modify: `app/globals.css`
  - Add loader-specific keyframes and utility classes for the reveal.

## Chunk 1: Intro overlay component

### Task 1: Build the homepage intro loader

**Files:**
- Create: `components/pages/home/home-intro-loader.tsx`

- [ ] Detect first visit with a shared `sessionStorage` key.
- [ ] Skip rendering entirely after the intro has already been played.
- [ ] Animate a timed percentage/progress rail.
- [ ] Lock body scroll while active and release it on completion.
- [ ] Provide a reduced-motion fallback with a shorter fade.

## Chunk 2: Homepage integration

### Task 2: Mount the loader on `/` only

**Files:**
- Modify: `app/[locale]/page.tsx`
- Modify: `components/pages/home/index.ts`

- [ ] Render the intro loader ahead of the hero on the homepage.
- [ ] Keep the rest of the homepage unchanged.

## Chunk 3: Styling and verification

### Task 3: Add reveal styling and validate

**Files:**
- Modify: `app/globals.css`

- [ ] Add keyframes/classes for the progress rail and soft aperture reveal.
- [ ] Run `bun run lint`.
- [ ] If lint is clean, summarize behavior and any residual risk.
