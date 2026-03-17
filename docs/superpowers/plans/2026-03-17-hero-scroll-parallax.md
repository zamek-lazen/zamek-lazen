# Hero Scroll Parallax Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage WebGL hero with a simple DOM-based scroll parallax using `sky`, `castle`, and `flowers`, while keeping the existing text overlay intact.

**Architecture:** The hero scene will move from Three.js planes to three absolutely stacked DOM image layers. Homepage state will be simplified by removing intro/loading orchestration, and the hero wrapper will always render in its ready state. Scroll progress will drive small per-layer transforms, with a static fallback for reduced motion.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind CSS, Next Image

---

## Chunk 1: Simplify Homepage Hero State

### Task 1: Remove obsolete intro state from homepage shell

**Files:**
- Modify: `components/pages/home/page.tsx`
- Modify: `components/pages/home/types.ts`

- [ ] Remove `phase` and `progress` state from `Homepage`.
- [ ] Remove `SceneStyle` CSS variables that only supported intro/pointer state.
- [ ] Keep `heroRef` and `rootRef` only if still needed after the scene rewrite.
- [ ] Delete `IntroPhase` from `components/pages/home/types.ts` if nothing else uses it.

## Chunk 2: Replace WebGL Scene With DOM Parallax

### Task 2: Rewrite hero scene as three layered images

**Files:**
- Modify: `components/pages/home/parallax-scene.tsx`

- [ ] Remove Three.js usage entirely.
- [ ] Render three absolute image layers in this order: `sky`, `castle`, `flowers`.
- [ ] Compute scroll progress from `heroRef` and viewport position.
- [ ] Apply small `translate3d` values per layer for realistic parallax.
- [ ] Respect `prefers-reduced-motion` by freezing transforms.

### Task 3: Keep transforms easy to tune

**Files:**
- Modify: `components/pages/home/parallax-scene.tsx`

- [ ] Define explicit constants for the `sky`, `castle`, and `flowers` parallax strengths.
- [ ] Clamp scroll progress to a predictable range so mobile and desktop stay stable.
- [ ] Ensure image layers fill the hero and keep existing atmosphere without manual canvas alignment logic.

## Chunk 3: Simplify Hero Wrapper

### Task 4: Remove loader-only UI and intro masking

**Files:**
- Modify: `components/pages/home/hero.tsx`

- [ ] Remove loader overlay markup and props.
- [ ] Remove intro-state-dependent opacity logic.
- [ ] Keep side labels, overlay gradients, and scroll prompt visible immediately.
- [ ] Preserve current text hierarchy and layout.

## Chunk 4: Verify

### Task 5: Run validation and visual QA

**Files:**
- Modify: `components/pages/home/page.tsx`
- Modify: `components/pages/home/hero.tsx`
- Modify: `components/pages/home/parallax-scene.tsx`

- [ ] Run `bun run lint`.
- [ ] Run `bun run build`.
- [ ] Open the homepage in the browser and verify desktop hero behavior.
- [ ] Open the homepage in a mobile viewport and verify the parallax remains subtle and readable.
