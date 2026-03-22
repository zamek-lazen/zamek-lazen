# Gallery masonry design - 2026-03-21

## Goal

Update `/galerie` so it stops feeling like a temporary placeholder and becomes a full editorial gallery page. Remove the current green informational strip and replace the basic grid with a richer masonry-style image layout using all available estate, flora, and archival photos, excluding branding assets.

## Approved direction

Use a clean editorial gallery structure:

- keep the page hero for orientation and continuity
- remove the informational notice block entirely
- render a masonry grid immediately under the hero
- include all available photos from `public/images/estate`, `public/images/flora`, and `public/images/historical`
- exclude crest/branding files from `public/images/branding`

This approach preserves the calm identity of the site while making the gallery feel complete and visually generous.

## Current state

The current gallery page in `app/[locale]/galerie/page.tsx`:

- renders a shared `PageHero`
- shows a green dark section with `GalleryPage.notice`
- uses a small fixed list of six images
- uses a simple equal-height grid rather than a masonry rhythm

This creates a temporary or unfinished impression and does not reflect the amount of available imagery already in the repo.

## Content scope

Include all currently available gallery-suitable images:

- estate photos in `public/images/estate`
- flora/detail photos in `public/images/flora`
- historical/archive photos in `public/images/historical`

Exclude:

- `public/images/branding/castle-crest.webp`
- `public/images/branding/castle-crest.png`

The resulting gallery should use all current non-branding images present in the approved folders at implementation time.

## Visual design

### Page structure

1. `PageHero` stays at the top
2. gallery content starts immediately below the hero
3. the first visible content after the hero is the image grid, not an explanatory paragraph

### Grid direction

Use an editorial masonry-style grid rather than uniform cards.

Desired behavior:

- mobile: one column
- tablet: two columns
- desktop: three columns
- cards vary in height to create rhythm
- larger scenic images should appear earlier in the flow
- detail and archival images should punctuate, not dominate, the opening rows

### Surface treatment

- keep the same dark forest atmosphere already used on the site
- avoid introducing a bright gallery background
- maintain subtle borders or no borders where the image rhythm is strong enough
- keep radius restrained and consistent with the current design system

### Image treatment

- use `next/image`
- preserve strong crops with `object-cover`
- vary card heights intentionally
- do not letterbox images
- do not add heavy overlays, labels, or decorative chrome in the first pass

## Ordering strategy

The gallery should not be random.

Recommended ordering:

1. strong current exterior images first
2. park and seasonal views next
3. flora close-ups interwoven as breathing moments
4. archival material in the later part of the masonry flow

This keeps the page from opening with a museum-like tone while still honoring the historical layer.

## Technical design

### Data source

For this pass, keep gallery data local in `app/[locale]/galerie/page.tsx` or move it into a nearby constant if it improves clarity.

Each item should include required metadata:

- `src`
- localized `alt`
- width and height, or a clearly defined aspect-ratio / size token for masonry rhythm

### Translations

The `GalleryPage.notice` key becomes unused once the informational strip is removed.

The existing translation keys can remain in place for now unless cleanup is part of the implementation pass. The visible page still needs:

- localized eyebrow copy instead of a hardcoded `Galerie`
- `GalleryPage.title`
- `GalleryPage.lead`

### Masonry implementation

The first pass does not require a dedicated masonry library.

Preferred implementation:

- a responsive grid with explicit card height variants or row spans
- DOM order should match the intended visual and reading sequence

Priority is visual quality and simplicity, not plugin complexity.

Avoid CSS columns in the first pass because they make visual order less predictable relative to DOM order.

### Accessibility

- each image needs meaningful alt text where possible
- if exact historical metadata is unavailable, alt text should remain descriptive but restrained
- image order should still make sense when read linearly in DOM order

## Rejected alternatives

### Keep the green notice strip and only add more images

Rejected because the notice is the main reason the page feels provisional.

### Equal-height card grid with all images

Rejected because it would increase quantity without improving the editorial feel.

### Separate tabs for current / flora / archive

Rejected because it adds interface weight before the gallery has earned it and breaks the continuous visual flow.

## Verification

After implementation, verify:

- the green informational strip is gone
- the page hero remains intact
- all available non-branding images are present
- the first rows open with stronger scenic contemporary imagery
- the masonry layout works on mobile, tablet, and desktop
- the page feels denser and more complete without becoming cluttered

## Out of scope

- lightbox
- category filters
- CMS-driven gallery content
- captions visible in the UI
- archive/current toggles
