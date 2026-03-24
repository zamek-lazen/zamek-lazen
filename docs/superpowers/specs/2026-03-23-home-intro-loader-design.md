# Home intro loader design - 2026-03-23

## Goal

Add a first-visit intro loading animation to the homepage that echoes the reference mood: dark forest canvas, restrained wordmark, progress line, and a soft reveal into the existing hero.

## Approved direction

Use a homepage-only full-screen overlay loader that appears once per browser session and never repeats after locale switching.

The intro should:

- run only on `/`
- play only on the first visit in the current session
- sit above the already-rendered homepage so the exit feels like a reveal, not a route change
- use a timed progress sequence rather than real network loading
- end with a soft organic aperture inspired by foliage framing in the reference video
- fall back to a shorter fade in reduced-motion mode

## Interaction design

### Entry

- lock scroll while the intro is active
- show a dark forest surface with a subtle vignette
- center a quiet `ZÁMEK LÁZEŇ` mark with `CHUDENICE` beneath
- place a thin loading rail and numeric progress near the lower center

### Exit

- ramp progress to 100%
- hold briefly
- open the overlay through a soft radial/organic mask so the hero image appears underneath
- fade the wordmark and progress away before the overlay fully clears

### Persistence

- store the played state in `sessionStorage`
- use one shared storage key across locales so `CS / DE` switching does not replay the intro

## Technical design

- Create a focused client component for the intro overlay.
- Mount it only on the homepage route.
- Keep the hero mounted underneath the overlay.
- Add a small `intro-lock` body class while the overlay is active to prevent scroll.
- Avoid new animation dependencies; use React state plus CSS keyframes/transitions.

## Accessibility

- respect `prefers-reduced-motion`
- avoid trapping keyboard focus in the intro because it is purely decorative
- mark decorative layers as `aria-hidden`

## Verification

- homepage shows intro on first visit
- refresh on homepage in the same tab/session does not replay once state is stored
- locale switch does not replay
- non-home routes never show the intro
- reduced-motion mode uses a simpler, shorter fade
