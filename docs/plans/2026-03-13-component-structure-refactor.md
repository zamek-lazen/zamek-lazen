# Component Structure Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refaktorovat page-specific komponenty do složek podle stránek, odstranit CSS moduly, převést homepage a historii na Tailwind-only styling a přejmenovat font tokeny na generické názvy.

**Architecture:** Homepage a historie budou mít vlastní entry komponenty pod `components/pages/*`, které budou skládat menší sekční komponenty. Sdílené komponenty zůstanou v `components/shared`, zatím jen pro skutečně opakované moduly. Globální CSS bude redukované na tokeny a reset, zatímco page-specific vzhled se přesune do Tailwind utility tříd v TSX.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, next-intl, Three.js

---

### Task 1: Prepare Directory Structure

**Files:**
- Create: `components/pages/home/index.ts`
- Create: `components/pages/home/types.ts`
- Create: `components/pages/history/index.ts`
- Create: `components/pages/history/types.ts`
- Create: `components/shared/`
- Modify: `app/[locale]/page.tsx`
- Modify: `app/[locale]/historie/page.tsx`

**Step 1: Create the target directory tree**

Create the page-specific folders and barrel files:

- `components/pages/home/`
- `components/pages/history/`
- `components/shared/`

**Step 2: Extract shared types from the flat components**

Move homepage types from `components/homepage-vibe.tsx` into `components/pages/home/types.ts`.
Move history types from `components/history-story.tsx` into `components/pages/history/types.ts`.

**Step 3: Add barrel exports**

Export the future page-level components and types from:

- `components/pages/home/index.ts`
- `components/pages/history/index.ts`

**Step 4: Point route files at the new entrypoints**

Update:

- `app/[locale]/page.tsx`
- `app/[locale]/historie/page.tsx`

to import from the new page folders instead of the old flat files.

**Step 5: Verify no runtime change yet**

Run:

```bash
bunx eslint 'app/[locale]/page.tsx' 'app/[locale]/historie/page.tsx'
```

Expected: no errors.

### Task 2: Move Shared Header Component

**Files:**
- Create: `components/shared/site-header.tsx`
- Modify: `app/[locale]/layout.tsx`
- Delete: `components/site-header.tsx`

**Step 1: Move the header component**

Copy the current implementation from `components/site-header.tsx` into `components/shared/site-header.tsx`.

**Step 2: Update imports**

Change `app/[locale]/layout.tsx` to import from `@/components/shared/site-header`.

**Step 3: Remove the old flat file**

Delete `components/site-header.tsx`.

**Step 4: Verify the move**

Run:

```bash
bunx eslint 'app/[locale]/layout.tsx' components/shared/site-header.tsx
```

Expected: no errors.

### Task 3: Split Homepage Into Small Components

**Files:**
- Create: `components/pages/home/page.tsx`
- Create: `components/pages/home/hero.tsx`
- Create: `components/pages/home/parallax-scene.tsx`
- Create: `components/pages/home/highlights.tsx`
- Create: `components/pages/home/family-section.tsx`
- Create: `components/pages/home/weddings-section.tsx`
- Create: `components/pages/home/events-section.tsx`
- Create: `components/pages/home/gallery-section.tsx`
- Create: `components/pages/home/contact-section.tsx`
- Modify: `app/[locale]/page.tsx`
- Delete: `components/homepage-vibe.tsx`

**Step 1: Create the homepage page-level orchestrator**

Move the main `HomepageVibe` composition into `components/pages/home/page.tsx`.

**Step 2: Isolate Three.js logic**

Extract the WebGL/canvas loader, intro animation and texture preload logic into `components/pages/home/parallax-scene.tsx`.

**Step 3: Extract hero and content sections**

Split the remaining JSX into one component per section:

- `hero.tsx`
- `highlights.tsx`
- `family-section.tsx`
- `weddings-section.tsx`
- `events-section.tsx`
- `gallery-section.tsx`
- `contact-section.tsx`

**Step 4: Keep props local and explicit**

Pass only the minimum required copy/data to each section component. Do not re-introduce a giant shared props object into every child.

**Step 5: Remove the old flat homepage component**

Delete `components/homepage-vibe.tsx` after the route imports point to the new entrypoint.

### Task 4: Convert Homepage CSS Module to Tailwind

**Files:**
- Modify: `components/pages/home/page.tsx`
- Modify: `components/pages/home/hero.tsx`
- Modify: `components/pages/home/highlights.tsx`
- Modify: `components/pages/home/family-section.tsx`
- Modify: `components/pages/home/weddings-section.tsx`
- Modify: `components/pages/home/events-section.tsx`
- Modify: `components/pages/home/gallery-section.tsx`
- Modify: `components/pages/home/contact-section.tsx`
- Delete: `components/homepage-vibe.module.css`

**Step 1: Inline layout and visual rules into TSX**

Translate the styles from `components/homepage-vibe.module.css` into Tailwind utility classes across the new homepage components.

**Step 2: Preserve special visual treatments**

Keep the current gradients, overlays, spacing rhythm and responsive layout behavior in Tailwind form. Avoid shortcuts that noticeably simplify the design.

**Step 3: Localize repeated class groups**

If a class sequence repeats inside one file, extract it into a local `const` string in that file. Do not create a global helper for this.

**Step 4: Delete the CSS module**

Remove `components/homepage-vibe.module.css` only after all references are gone.

**Step 5: Verify stale references are gone**

Run:

```bash
rg -n 'homepage-vibe|module\\.css' app components
```

Expected: no results pointing at deleted homepage files.

### Task 5: Split History Into Small Components

**Files:**
- Create: `components/pages/history/page.tsx`
- Create: `components/pages/history/hero.tsx`
- Create: `components/pages/history/timeline-nav.tsx`
- Create: `components/pages/history/chapter.tsx`
- Create: `components/pages/history/gallery.tsx`
- Create: `components/pages/history/closing.tsx`
- Modify: `app/[locale]/historie/page.tsx`
- Delete: `components/history-story.tsx`

**Step 1: Create the history page-level orchestrator**

Move the current `HistoryStory` assembly into `components/pages/history/page.tsx`.

**Step 2: Extract section components**

Split history into focused components:

- `hero.tsx`
- `timeline-nav.tsx`
- `chapter.tsx`
- `gallery.tsx`
- `closing.tsx`

**Step 3: Keep observer logic in the page-level component**

Leave the sticky timeline active-state behavior in `components/pages/history/page.tsx`, unless the extracted `timeline-nav.tsx` needs a narrow callback-based interface.

**Step 4: Remove the old flat history component**

Delete `components/history-story.tsx` after route imports and types are migrated.

### Task 6: Rename Font Tokens

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `components/pages/home/*.tsx`
- Modify: `components/pages/history/*.tsx`
- Modify: `components/shared/site-header.tsx`

**Step 1: Rename the font variables in app layout**

Update the font loaders in `app/layout.tsx` so the CSS variables become:

- `--font-primary`
- `--font-title`

Add `--font-secondary` only if it is actually used after the refactor.

**Step 2: Update Tailwind theme mapping**

In `app/globals.css`, change the `@theme inline` mapping so:

- `--font-sans` points to `--font-primary`
- `--font-serif` points to `--font-title`

**Step 3: Update remaining direct CSS variable references**

Replace any direct `var(--font-outfit)` or `var(--font-cormorant)` references in the refactored TSX or global CSS.

**Step 4: Verify no legacy font tokens remain**

Run:

```bash
rg -n 'font-outfit|font-cormorant|--font-primary|--font-title|--font-secondary' app components
```

Expected: only the new token names remain in active code.

### Task 7: Final Verification

**Files:**
- Modify: any files touched above as needed for fixes

**Step 1: Lint the refactor**

Run:

```bash
bunx eslint app components
```

Expected: no errors.

**Step 2: Search for deleted file references**

Run:

```bash
rg -n 'history-story|homepage-vibe|homepage-vibe\\.module\\.css|components/site-header' app components
```

Expected: no stale imports.

**Step 3: Review the final file structure**

Run:

```bash
find components -maxdepth 3 -type f | sort
```

Expected: homepage and history files live under `components/pages/*`, shared files under `components/shared/*`, and no old flat page-specific files remain.

**Step 4: Manual browser verification**

Open the homepage and `/historie` page and confirm:

- layout matches the pre-refactor design
- parallax intro still runs
- sticky history timeline still updates
- typography still renders correctly with the renamed tokens

**Step 5: Do not commit**

Project instruction says never commit to git, so stop after verified working changes.
