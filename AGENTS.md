# AGENTS.md

## Project
Build a multilingual presentation website for **Zámek Lázeň v Chudenicích** in a spirit comparable to Schloss Freudenfels (https://www.schloss-freudenfels.ch/en/): editorial, calm, elevated, spatial, and service-oriented. The result must feel like a place, not a brochure.

This document is the implementation brief for any coding/design/content agent working on the site.

---

## 1. North Star

The reference site works because it combines five things well:

1. **Strong sense of place** – the castle is presented as landscape, architecture, and atmosphere, not just as a venue.
2. **Editorial luxury without visual noise** – large headlines, generous whitespace, restrained palette, strong photography, concise copy.
3. **Hospitality-first structure** – users immediately understand what they can do there: celebrate, stay, dine, gather, contact.
4. **Layered depth** – quiet motion, parallax, overlapping image planes, and scenic compositions create a premium “arrival” feeling.
5. **Clear conversion paths** – every section gently pushes toward inquiry, booking, or visiting.

For Zámek Lázeň, preserve that logic but adapt it to **Czech aristocratic park culture**, **family lineage**, **seasonal events**, and **wedding / cultural destination** positioning.

The emotional target is:

- noble but not pompous
- historic but alive
- elegant but warm
- quiet but immersive
- premium but human

---

## 2. Brand Interpretation for Zámek Lázeň

The website must communicate three pillars equally:

### A. Place
A summer castle in a landscaped park, tied to healing spring origins, English park scenery, and seasonal calm.

### B. Lineage
The Czernin family and the Chudenice branch are not decorative trivia; they are part of the site’s identity and should inform the story architecture.

### C. Use today
The estate is a living place for weddings, cultural events, social gatherings, and family continuity.

Do **not** make the project feel like a museum website. It should feel like a **living aristocratic residence and event destination**.

---

## 3. Visual Direction

### Color system
Use the provided palette as the core UI foundation.

```css
:root {
  --color-forest-950: #061611;
  --color-forest-900: #0d3129;
  --color-forest-800: #12463c;
  --color-mist-50: #f2f6f1;
  --color-mist-100: #dde7df;
  --color-mist-200: #b8c9bf;
  --color-mist-300: #8fa89b;
  --color-border-soft: rgba(185, 212, 197, 0.34);
}
```

### Typography
Use these fonts exactly:

```ts
const primaryFont = Syne({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const titleFont = Bodoni_Moda({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
```

### Typographic rules
- **Bodoni Moda** is for display: hero titles, section titles, pull quotes, timeline year markers, stately captions.
- **Syne** is for body, navigation, UI labels, cards, metadata, buttons, and forms.
- Titles should feel sculpted and slightly ceremonial.
- Body copy should stay clean, modern, and legible.
- Avoid overusing italics; use them sparingly for poetic sublines or historical annotations.

### Suggested type scale
- Hero display: `clamp(3.5rem, 8vw, 8rem)`
- Page title: `clamp(2.5rem, 5vw, 5rem)`
- Section title: `clamp(2rem, 4vw, 3.5rem)`
- Lead paragraph: `1.125rem–1.25rem`
- Body: `1rem–1.0625rem`
- Eyebrow: `.72rem–.82rem`, wide tracking, uppercase

### Surface language
- Backgrounds should alternate between **misty light surfaces** and **deep forest sections**.
- Borders must be soft, thin, and understated.
- Cards should feel architectural: large radius is acceptable, but do not make the site feel playful.
- Use translucent overlays sparingly.
- Texture inspiration: vellum, stone dust, old paper, soft fog, botanical green.

---

## 4. Motion + Spatial Language

The site must use motion to suggest **depth and arrival**, not trendiness.

### Global motion principles
- Default motion should be slow, elegant, and low-friction.
- Prefer parallax, fade, drift, reveal, scale, and depth layering.
- Avoid snappy overshoot and bounce.
- Respect `prefers-reduced-motion`.

### Hero requirement
Homepage hero should include a **3D-style parallax effect**.

Recommended structure:
- background landscape / park layer
- mid castle silhouette or facade layer
- foreground branch / sculpture / stone balustrade / texture layer
- floating copy block with subtle depth shift
- optional atmospheric particles or mist gradient on very low opacity

Recommended motion stack:
- mouse/parallax depth on desktop
- subtle scroll-linked parallax on mobile
- image scale from 1.06 → 1 on entry
- title letter/line reveal with stagger
- CTA fade-slide with 100–180ms delay

### Section transitions
- Use masked image reveals, horizontal drift, and scroll-linked opacity.
- Timeline should animate chronologically as the user scrolls.
- Gallery should support cinematic lightbox transitions.

Suggested libraries:
- `framer-motion`
- `lenis` or equivalent for smoothing only if performance remains excellent
- `motion` / native scroll timelines where possible

---

## 5. Information Architecture

Use this primary navigation:

```ts
[
  { href: "/" as const, key: "home" },
  { href: "/historie" as const, key: "history" },
  { href: "/rod" as const, key: "family" },
  { href: "/svatby" as const, key: "weddings" },
  { href: "/akce" as const, key: "events" },
  { href: "/galerie" as const, key: "gallery" },
  { href: "/kontakt" as const, key: "contact" },
]
```

### Navigation behavior
- Transparent over hero, solid after scroll.
- Desktop: centered or slightly offset logo lockup with refined hover states.
- Mobile: fullscreen overlay menu with large editorial links.
- Language switcher: `CS / DE`, with room for `EN` later.

### Footer content
- address
- ownership / management entity
- phone and email
- quick links
- legal links
- language switcher
- optional short estate note

---

## 6. Page-by-Page Structure

## `/` Home
Purpose: establish atmosphere, orient the visitor, and route them to the most important journeys.

### Sections
1. **Hero**
   - 3D parallax hero
   - headline around castle / park / lineage / living place
   - short lead
   - primary CTA: weddings or events inquiry
   - secondary CTA: discover the story

2. **Intro / Estate Overview**
   - short editorial block introducing the castle and park
   - one strong image + one atmospheric detail image

3. **What the estate offers**
   - 3–4 cards:
     - historie a rod
     - svatby
     - kulturní akce
     - park / galerie

4. **Signature story strip**
   - healing spring origin
   - English park
   - summer residence
   - present-day use

5. **Featured events**
   - fed from Sanity
   - upcoming cultural and social program
   - card layout with date emphasis

6. **Wedding preview**
   - ceremony settings / park / hall / atmosphere

7. **Gallery teaser**
   - masonry or asymmetrical editorial grid

8. **Contact CTA**
   - inquiry block
   - map preview

### Home UX note
Home should feel like the strongest page visually. It sets the language for everything else.

---

## `/historie` History
Purpose: tell the story of the site as an unfolding place.

### Core interaction
Build an **interactive timeline**.

### Timeline content buckets
- early origin of the spa / healing spring
- 1728 spa house and chapel
- 1792–1794 new spa inn
- 1821–1823 transformation into summer château
- 1849–1859 classicist rebuilding
- postwar confiscation and brewery-era use
- 2009 return to the Czernin family
- present day cultural and social use

### Timeline interaction model
- sticky year rail on desktop
- scroll-linked chapters
- each chapter can contain:
  - year / date range
  - title
  - narrative text
  - archival image or illustration
  - “what changed here” micro-notes
- on mobile, convert to stacked accordion / cards with progressive reveal

### Extra modules
- “Landscape and park” section
- “People connected to the place” section
- “Then / now” visual comparison module

### Tone
This page should be reflective and cinematic, not academic.

---

## `/rod` Family
Purpose: explain the Czernin of Chudenice lineage in a dignified, readable way.

### Sections
1. Intro to the family branch
2. Genealogical overview
3. Key figures
4. Relationship to Chudenice and the estate
5. Present family continuity

### UI ideas
- family tree lite, not a dense genealogy chart
- portrait cards or crest-based cards
- expandable lineage nodes
- side notes for historical context

### Important rule
Avoid overwhelming users with every name at once. Prioritize narrative clarity over completeness.

---

## `/svatby` Weddings
Purpose: be the strongest conversion page.

### Page structure
1. Hero with emotional headline and scenic setting
2. Why marry here
3. Ceremony / reception spaces
4. How the booking process works
5. Visual inspiration gallery
6. FAQ
7. Inquiry CTA

### Venue modules
Each space should have:
- name
- mood description
- ceremony / reception suitability
- estimated capacity
- photo
- optional floor plan / practical note

### Booking flow section
Use the copy logic from your supplied texts:
- initial informational meeting on site
- explanation of conditions and venue options
- date selection
- church or registry coordination
- confirmed term + agreement/contract

### Conversion UX
- sticky inquiry CTA on desktop
- compact inquiry card on mobile
- allow inquiry for wedding, private celebration, photoshoot

---

## `/akce` Events
Purpose: a living program page with editorial quality.

### Data source
Use **Sanity** as the content source.

### Required event content model
- title
- slug
- event type
- short teaser
- long description
- start date / end date
- start time / end time
- location
- main image
- gallery
- ticket status
- external ticket URL or SMS ticketing metadata
- CTA label
- locale fields or translation references
- SEO fields

### Ticketing
The page should be prepared for **SMS ticketing integration**.

Minimum integration expectation:
- event card can show `available / limited / sold out`
- detail page can render external purchase CTA
- optional webhook sync or periodic sync is acceptable
- support manual override in Sanity

### Page structure
1. upcoming featured event
2. event listing by month or season
3. archive toggle for past events
4. optional calendar view
5. event detail templates

### UX note
This page should feel active and alive, contrasting slightly with the calmness of the other pages.

---

## `/galerie` Gallery
Purpose: create desire and atmosphere.

### Structure
- category filters: exterior / interiors / park / weddings / events / details
- editorial masonry or justified rows
- cinematic lightbox
- optional fullscreen slideshow mode

### Rules
- image quality is critical
- avoid cluttered grids with tiny thumbnails
- mix wide scenic images with close-up details
- preserve negative space

---

## `/kontakt` Contact
Purpose: easy conversion without losing elegance.

### Sections
- invitation paragraph
- contact cards
- inquiry form
- address and access
- embedded map or stylized map preview
- optional contact for weddings / events separately

### Form expectations
- name
- email
- phone
- inquiry type
- preferred date
- guest count
- message
- consent checkbox

### Inquiry types
- wedding
- private celebration
- corporate event
- cultural event
- general inquiry

---

## 7. Content Strategy

### Language versions
Primary languages:
- Czech
- German

Architecture must support:
- localized routes or locale-aware rendering
- translated metadata
- translated structured content in CMS
- language switch preservation where possible

### Tone of voice
Adopt the composure of the reference site:
- short, dignified headings
- restrained subheads
- sensory but not purple prose
- confidence without exaggeration

### Writing rules
- Headlines can be fragmentary and poetic.
- Body copy should be clear and concrete.
- Avoid tourist-brochure clichés.
- Avoid overclaiming luxury.
- History copy should be narratively paced.
- CTA copy should be polite, calm, and direct.

### Examples of acceptable headline style
- Zámek a park.
- Místo, které dýchá časem.
- Oslava v letním sídle.
- Rod, který je s místem spojen.
- Kulturní sezóna na zámku.

---

## 8. Content Sources to Reflect

Use the supplied Czech and German texts as the narrative basis for:
- the castle’s spa and park origin
- the classicist rebuild and landscaped surroundings
- postwar interruption and return in 2009
- current family continuity
- the Czernin lineage and Chudenice connection
- the wedding process and contact information

When adapting copy:
- preserve factual structure
- reduce repetition
- improve readability for web
- break long historical passages into sections
- use summaries first, details second

Do not paste long raw archival text blocks directly into the page UI.

---

## 9. Component System

Required components:

- `SiteHeader`
- `MegaMenu` or fullscreen mobile nav
- `HeroParallaxScene`
- `SectionIntro`
- `EditorialImageBlock`
- `StatOrFeatureList`
- `TimelineInteractive`
- `FamilyNodeGrid`
- `VenueCard`
- `EventCard`
- `EventCalendar`
- `GalleryMasonry`
- `Lightbox`
- `QuoteBlock`
- `ContactCards`
- `InquiryForm`
- `MapSection`
- `Footer`

### Shared component principles
- every component must work on light and dark sections when relevant
- headings and spacing must feel consistent across pages
- avoid generic SaaS cards
- maintain strong visual rhythm via alternating text/image layouts

---

## 10. Photography & Art Direction

The entire experience depends heavily on imagery.

### Priorities
- exterior scenic hero shots
- park vistas and tree-lined paths
- façade details
- interior architectural details
- ceremony atmosphere
- evening ambiance for events
- seasonal change

### Image behavior
- use object-position intentionally
- favor slow zoom and parallax over flashy sliders
- use dark gradients only where text legibility requires it

### Avoid
- stock-photo feeling
- hard HDR look
- over-saturation
- busy collages

---

## 11. Tech Stack Guidance

Preferred assumptions unless the repo dictates otherwise:

- **Next.js App Router**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Sanity** for editable content
- **next-intl** or equivalent for i18n
- **next/image** for responsive images
- **Zod** for form validation
- **React Hook Form** for forms

### Suggested folder shape

```txt
src/
  app/
    [locale]/
      page.tsx
      historie/page.tsx
      rod/page.tsx
      svatby/page.tsx
      akce/page.tsx
      galerie/page.tsx
      kontakt/page.tsx
  components/
    layout/
    sections/
    ui/
    motion/
  lib/
    sanity/
    i18n/
    seo/
    utils/
  content/
    copy/
  types/
```

---

## 12. Sanity Modeling

At minimum, define schemas for:

- `siteSettings`
- `navigation`
- `homePage`
- `historyPage`
- `familyPage`
- `weddingsPage`
- `galleryPage`
- `contactPage`
- `event`
- `venue`
- `faqItem`
- `person`
- `timelineEvent`
- `galleryImage`

### Localization approach
Either:
- field-level localization for compact content, or
- document-level localization for long editorial pages

Recommended:
- document-level localization for long pages
- field-level for repeated content snippets and settings

---

## 13. Performance + Accessibility

### Performance rules
- hero must still load fast despite layered visuals
- lazy-load below-the-fold media
- do not autoplay heavy video by default
- ensure image sizes are tightly controlled
- keep animation GPU-friendly

### Accessibility rules
- strong contrast on all overlaid text
- keyboard-friendly navigation
- timeline must remain usable without pointer interactions
- lightbox must be accessible and escapable
- reduced motion mode must disable parallax depth and major transforms

---

## 14. SEO + Metadata

Each page should have:
- localized title
- localized meta description
- OG image
- canonical handling per locale
- structured data where relevant

Potential schema:
- `HistoricPlace`
- `Event`
- `Organization`
- `LocalBusiness` where appropriate

---

## 15. Design Do / Don’t

### Do
- design with atmosphere first
- use big editorial typography
- create spatial depth
- make conversion feel natural
- let history and landscape lead the experience
- keep cards and sections clean and intentional

### Don’t
- do not make it look like a hotel booking portal
- do not copy the reference site literally
- do not overdecorate with fake vintage motifs
- do not use gold gradients, fake marble, or heavy skeuomorphism
- do not cram too much historical data above the fold
- do not use generic corporate event visuals

---

## 16. Suggested Homepage Content Skeleton

```txt
Hero
  Eyebrow
  H1
  Lead
  Primary CTA
  Secondary CTA

Estate Intro
  Short narrative
  Scenic image pair

Key Journeys
  Historie
  Rod
  Svatby
  Akce

Story Strip
  1728 / Park / Letní sídlo / Současnost

Featured Events
  1 featured + grid

Wedding Teaser
  Ceremony settings + CTA

Gallery Teaser
  Curated image strip

Contact / Inquiry
  Contact summary + form CTA
```

---

## 17. Suggested Route Metadata Keys

```ts
export const routes = [
  { href: "/", key: "home" },
  { href: "/historie", key: "history" },
  { href: "/rod", key: "family" },
  { href: "/svatby", key: "weddings" },
  { href: "/akce", key: "events" },
  { href: "/galerie", key: "gallery" },
  { href: "/kontakt", key: "contact" },
] as const;
```

Suggested translation namespaces:

```txt
common
nav
home
history
family
weddings
events
gallery
contact
seo
forms
```

---

## 18. First Build Priorities

If building incrementally, follow this order:

1. global layout, typography, colors, header/footer
2. homepage hero + section system
3. history page with interactive timeline
4. weddings page with strong inquiry path
5. events architecture + Sanity integration
6. gallery lightbox experience
7. contact page and forms
8. family page and genealogical storytelling
9. SEO, accessibility, and performance pass

---

## 19. Final Quality Bar

Before considering the project successful, verify:

- the homepage feels immersive within 3 seconds
- the site clearly communicates place + family + present-day use
- weddings and events are easy to understand and inquire about
- Czech and German versions both feel intentional
- the motion adds depth, not distraction
- the overall impression is calm, distinguished, and memorable
