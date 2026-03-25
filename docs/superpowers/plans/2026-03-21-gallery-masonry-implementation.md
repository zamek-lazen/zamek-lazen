# Gallery Masonry Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the temporary `/galerie` placeholder section with a full editorial masonry gallery that uses all current non-branding photos and removes the green informational strip.

**Architecture:** Keep the existing gallery hero, move image metadata into a focused gallery data module, and render the page body through a dedicated masonry component that uses an explicit responsive grid with curated height variants. Reuse `next/image`, add localized alt text keys in `messages/cs.json` and `messages/de.json`, and avoid any new library or lightbox in this pass.

**Tech Stack:** Next.js App Router, TypeScript, React 19, next-intl, next/image, Tailwind CSS v4

---

## Working notes

- `package.json` exposes `lint` and `build`, but no dedicated test runner. Do not add a test framework in this change.
- Verification for this plan relies on `npm run lint`, `npm run build`, and manual browser checks.
- The approved spec is in `docs/superpowers/specs/2026-03-21-gallery-masonry-design.md`.
- The current gallery page lives in `app/[locale]/galerie/page.tsx` and uses a fixed six-image array plus `GalleryPage.notice`; both need to change.
- Keep the page editorial and quiet: no filters, no tabs, no lightbox, no visible captions in this pass.

## File map

- Create: `components/pages/gallery/gallery-images.ts`
  - Exports the curated list of all current non-branding gallery assets with localized alt keys and size variants.
- Create: `components/pages/gallery/gallery-masonry.tsx`
  - Renders the responsive masonry-style grid using explicit card height variants and `next/image`.
- Modify: `app/[locale]/galerie/page.tsx`
  - Keeps the hero, removes the notice strip, translates the eyebrow, builds localized image items, and renders the masonry component.
- Modify: `messages/cs.json`
  - Adds gallery eyebrow and localized alt text keys for all included images.
- Modify: `messages/de.json`
  - Adds gallery eyebrow and localized alt text keys for all included images.

## Chunk 1: Gallery data and translations

### Task 1: Create the shared gallery image dataset

**Files:**
- Create: `components/pages/gallery/gallery-images.ts`

- [ ] **Step 1: Create the gallery image type and size variants**

Create `components/pages/gallery/gallery-images.ts` with a focused data type:

```ts
export type GalleryImageSize = "tall" | "medium" | "wide";

export type GalleryImageDefinition = {
  src: string;
  altKey: string;
  width: number;
  height: number;
  size: GalleryImageSize;
};
```

- [ ] **Step 2: Add all current non-branding images in curated order**

Populate the exported list with every current asset from:

- `public/images/estate`
- `public/images/flora`
- `public/images/historical`

Exclude both crest files from `public/images/branding`.

The approved asset list for this plan is:

- `public/images/estate/castle-front-flower.webp`
- `public/images/estate/castle-side-winter-park.webp`
- `public/images/estate/castle-front-summer-path.webp`
- `public/images/estate/castle-park-lawn.webp`
- `public/images/estate/castle-front-park.webp`
- `public/images/estate/castle-front-winter-garden.webp`
- `public/images/estate/castle-lawn-trees-summer.webp`
- `public/images/estate/castle-side-garden-summer.webp`
- `public/images/estate/castle-side-winter.webp`
- `public/images/estate/castle-front-winter.webp`
- `public/images/estate/winter-park-tree.webp`
- `public/images/flora/magnolia-bud-branch-closeup.webp`
- `public/images/flora/magnolia-bud-closeup.webp`
- `public/images/flora/magnolia-bloom-closeup.webp`
- `public/images/flora/magnolia-bud-detail.webp`
- `public/images/historical/lazen-estate-front-path-archive.webp`
- `public/images/historical/lazen-estate-main-facade-archive.webp`
- `public/images/historical/lazen-estate-frontage-archive.webp`
- `public/images/historical/lazen-estate-illustration.webp`
- `public/images/historical/lazen-pioneer-center-archive.webp`
- `public/images/historical/lazen-estate-park-view-archive.webp`
- `public/images/historical/lazen-estate-side-facade-archive.webp`
- `public/images/historical/lazen-estate-hillside-1927.webp`

Use a curated sequence that opens with stronger present-day exterior images, interweaves flora detail shots, and places archival images later in the flow. Example structure:

```ts
export const galleryImages: GalleryImageDefinition[] = [
  {
    src: "/images/estate/castle-front-flower.webp",
    altKey: "imageCastleFrontFlower",
    width: 1600,
    height: 2000,
    size: "tall",
  },
  {
    src: "/images/estate/castle-front-summer-path.webp",
    altKey: "imageCastleFrontSummerPath",
    width: 1800,
    height: 1350,
    size: "wide",
  },
  // ...continue until every current non-branding asset is included
];
```

`width` and `height` must come from the real source image metadata, not rough estimates copied from sample code.

- [ ] **Step 3: Verify there are no branding assets in the exported list**

Check manually that neither of these appears in the dataset:

- `/images/branding/castle-crest.webp`
- `/images/branding/castle-crest.png`

- [ ] **Step 4: Run lint after adding the dataset**

Run: `npm run lint`

Expected: PASS with no type or import errors.

- [ ] **Step 5: Record progress**

If the execution session explicitly requested commits, create a small commit for the gallery dataset. Otherwise, continue without committing.

### Task 2: Add localized gallery eyebrow and alt text

**Files:**
- Modify: `messages/cs.json`
- Modify: `messages/de.json`

- [ ] **Step 1: Add a localized gallery eyebrow key**

In both locale files, add a dedicated eyebrow key under `GalleryPage` so the page no longer hardcodes `Galerie` in JSX:

```json
"GalleryPage": {
  "eyebrow": "Galerie",
  "title": "Fotogalerie",
  "lead": "..."
}
```

Use the appropriate German text in `messages/de.json`.

- [ ] **Step 2: Add localized alt keys for every included image**

Add an `images` object under `GalleryPage` in both locale files. Example shape:

```json
"GalleryPage": {
  "images": {
    "imageCastleFrontFlower": "Průčelí zámku s květy v popředí",
    "imageCastleFrontSummerPath": "Letní cesta k průčelí zámku",
    "imageMagnoliaBloomCloseup": "Detail rozkvetlé magnolie v zámeckém parku"
  }
}
```

Rules for alt text:

- present-day images: describe architecture, park, season, or viewpoint
- flora images: describe the plant detail concisely without poetic excess
- archival images: clearly signal historic or archival character without inventing metadata

Also create a 1:1 mapping between each file in the approved asset list and a `GalleryPage.images.<altKey>` entry in both `messages/cs.json` and `messages/de.json` so no translation key is missing or mismatched.

- [ ] **Step 3: Keep `GalleryPage.notice` unused but intact unless cleanup is trivial**

Do not make translation cleanup a blocker. The page can stop rendering `notice` without deleting the key unless cleanup is very small and clearly safe.

- [ ] **Step 4: Validate translation structure**

Run: `npm run lint`

Expected: PASS with no JSON parsing or import issues.

- [ ] **Step 5: Record progress**

If commits were requested in the execution session, create a small commit for translation updates. Otherwise, continue without committing.

## Chunk 2: Masonry component and page integration

### Task 3: Build the masonry grid component

**Files:**
- Create: `components/pages/gallery/gallery-masonry.tsx`

- [ ] **Step 1: Create the component interface**

Create `components/pages/gallery/gallery-masonry.tsx` with a typed interface tied to the dataset:

```tsx
import Image from "next/image";
import type { GalleryImageDefinition } from "@/components/pages/gallery/gallery-images";

type GalleryMasonryImage = Omit<GalleryImageDefinition, "altKey"> & {
  alt: string;
};

type GalleryMasonryProps = {
  images: GalleryMasonryImage[];
};
```

- [ ] **Step 2: Add an explicit size-to-class map**

Use a small class map so the masonry rhythm is predictable and matches DOM order:

```tsx
const sizeClasses: Record<GalleryImageDefinition["size"], string> = {
  tall: "min-h-104 md:min-h-128",
  medium: "min-h-72 md:min-h-88",
  wide: "min-h-88 md:min-h-104",
};
```

Keep the classes calm and editorial; no dramatic radius or effects.

- [ ] **Step 3: Render the responsive grid**

Build a responsive grid with explicit card sizing rather than CSS columns:

```tsx
export function GalleryMasonry({ images }: GalleryMasonryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {images.map((image) => (
        <figure
          key={image.src}
          className={`relative overflow-hidden rounded-[0.9rem] border border-[rgba(185,212,197,0.14)] ${sizeClasses[image.size]}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </figure>
      ))}
    </div>
  );
}
```

Implementation requirements:

- DOM order must match the intended visual order
- images must use `object-cover`
- no visible captions or overlays in this pass
- radius should stay restrained
- keep `figure` presentation-only in this pass and rely on the localized non-empty `alt` on `Image` as the accessible name

- [ ] **Step 4: Run lint after building the masonry component**

Run: `npm run lint`

Expected: PASS with no prop/type issues.

- [ ] **Step 5: Record progress**

If commits were requested in the execution session, create a small commit for the masonry component. Otherwise, continue without committing.

### Task 4: Replace the gallery placeholder page body

**Files:**
- Modify: `app/[locale]/galerie/page.tsx`

- [ ] **Step 1: Remove the old fixed six-image array and the notice rendering**

Delete the local `galleryImages` string array and remove the paragraph that renders `t("notice")`.

- [ ] **Step 2: Import the dataset and masonry component**

Add imports similar to:

```tsx
import { galleryImages } from "@/components/pages/gallery/gallery-images";
import { GalleryMasonry } from "@/components/pages/gallery/gallery-masonry";
```

- [ ] **Step 3: Build localized image items inside the page**

Map the dataset into translated items after loading `GalleryPage` translations:

```tsx
const images = galleryImages.map((image) => ({
  ...image,
  alt: t(`images.${image.altKey}`),
}));
```

If you prefer stronger typing, add a page-local type for the translated item.

- [ ] **Step 4: Localize the hero eyebrow and render the masonry grid immediately below the hero**

Update the page structure to:

```tsx
<div className="-mt-28 md:-mt-32">
  <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

  <section className="bg-[linear-gradient(180deg,#0c221d,#0f362e)] px-[1.2rem] py-[clamp(3rem,7vw,5.5rem)] md:px-8">
    <div className="mx-auto w-full max-w-376">
      <GalleryMasonry images={images} />
    </div>
  </section>
</div>
```

The first visible content after the hero must be the image grid.

- [ ] **Step 5: Run full verification**

Run: `npm run lint && npm run build`

Expected: both commands PASS.

- [ ] **Step 6: Manually verify the gallery page**

Check these routes and viewport ranges:

- `http://localhost:3000/cs/galerie`
- `http://localhost:3000/de/galerie`

Manual checklist:

- the green information strip is gone
- the hero remains intact
- all current non-branding images appear once
- the first rows begin with strong present-day scenic images
- the layout is one column on mobile, two on tablet, three on desktop
- archival images appear later in the flow and do not dominate the opening
- no crest branding image appears in the gallery
- no obvious layout shift or broken crops

- [ ] **Step 7: Record progress**

If commits were requested in the execution session, create a final integration commit. Otherwise, stop after verification.

## Done definition

- `/galerie` no longer renders the placeholder notice strip.
- The page hero remains, with localized eyebrow text.
- The gallery includes all current non-branding images from the approved folders.
- The page uses a curated masonry-style grid with explicit size variants.
- Each image has a localized alt text entry.
- The gallery passes `npm run lint` and `npm run build`.
- Manual checks confirm the layout works in Czech and German across responsive breakpoints.
