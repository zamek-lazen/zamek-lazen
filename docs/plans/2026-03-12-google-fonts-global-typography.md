# Global Google Fonts Typography Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the local reference fonts with similar Google Fonts and use them globally through the existing font variables.

**Architecture:** Keep the current font variable contract intact and swap only the underlying font loaders plus CSS references. This minimizes layout churn while removing local `@font-face` definitions from the homepage module.

**Tech Stack:** Next.js 16, React 19, `next/font/google`, Tailwind v4 globals, CSS Modules

---

### Task 1: Switch global font loaders

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Update Google font imports**

Replace `Outfit` and `Cormorant_Garamond` with `Syne` and `Bodoni_Moda`.

**Step 2: Preserve existing CSS variable names**

Keep `--font-outfit` and `--font-cormorant` so the rest of the codebase does not need a wider refactor.

**Step 3: Load the used weights**

Use:
- `Syne`: `400`, `500`, `700`, `800`
- `Bodoni Moda`: `400`, `500`, `600`

### Task 2: Remove local homepage font definitions

**Files:**
- Modify: `components/homepage-vibe.module.css`

**Step 1: Delete local `@font-face` blocks**

Remove all definitions for `GrafierRef` and `NeueMachinaRef`.

**Step 2: Point homepage typography to global variables**

Replace every explicit `GrafierRef` usage with `var(--font-cormorant), serif`.

Replace every explicit `NeueMachinaRef` usage with `var(--font-outfit), sans-serif`.

### Task 3: Keep global body typography aligned

**Files:**
- Modify: `app/globals.css`

**Step 1: Keep existing font mappings**

Retain `--font-sans` and `--font-serif`.

**Step 2: Tighten the fallback stack**

Use the new sans variable first with a minimal fallback chain.

### Task 4: Verify cleanup

**Files:**
- Inspect: `app/layout.tsx`
- Inspect: `app/globals.css`
- Inspect: `components/homepage-vibe.module.css`

**Step 1: Run lint**

Run: `bun run lint`

Expected: no ESLint errors caused by the typography refactor

**Step 2: Search for obsolete font references**

Run: `rg -n 'GrafierRef|NeueMachinaRef' app components`

Expected: no matches

**Step 3: Do not commit**

Repository instructions explicitly say not to commit from this task.
