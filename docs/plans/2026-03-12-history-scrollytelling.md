# History Scrollytelling Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static history article with an atmospheric scrollytelling page built from the provided Czech and German history copy and archival/current imagery from `public/`.

**Architecture:** Keep `app/[locale]/historie/page.tsx` as the server entry point for translations and pass structured content into a dedicated `components/history-story.tsx` client component. Use Tailwind utility classes for the editorial layout, sticky timeline navigation, and chapter-based scroll progression so the experience stays immersive while matching the rest of the project.

**Tech Stack:** Next.js App Router, React 19, next-intl, CSS Modules, Next Image

---

### Task 1: Prepare localized scrollytelling content

**Files:**
- Modify: `messages/cs.json`
- Modify: `messages/de.json`

**Step 1:** Add new `HistoryPage` keys for intro, facts, chapter labels, chapter bodies, closing section, and CTA labels while preserving existing `title`, `lead`, and `p1`-`p3` keys used elsewhere.

**Step 2:** Verify the new copy reflects the supplied history documents and keeps Czech/German content structurally aligned.

### Task 2: Build the storytelling component

**Files:**
- Create: `components/history-story.tsx`

**Step 1:** Create a typed client component that renders the hero, sticky timeline, four story chapters, and closing image gallery using Tailwind classes.

**Step 2:** Use `IntersectionObserver` to highlight the active chapter in the timeline while the reader scrolls.

**Step 3:** Compose the visuals from existing `public/` assets with a mix of archival and present-day photographs.

### Task 3: Connect the localized route

**Files:**
- Modify: `app/[locale]/historie/page.tsx`

**Step 1:** Replace the old article markup with server-side translation mapping into the new component.

**Step 2:** Keep route behavior unchanged and ensure the page still works for both `cs` and `de`.

### Task 4: Verify the result

**Files:**
- No code changes expected

**Step 1:** Run `bun run lint`.

**Step 2:** Run `bun run build`.

**Step 3:** Fix any type, lint, or rendering regressions discovered during verification.
