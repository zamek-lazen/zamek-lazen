# Footer design - 2026-03-20

## Goal

Create a shared footer for the multilingual public website of Zamek Lazen that closes each page with the same calm, editorial tone as the rest of the site while improving practical orientation and contact conversion.

The footer should feel like a composed final scene rather than a technical afterthought. It should support both Czech and German content, include a Google Maps embed, and fit the current typography, palette, and spacing system.

## Context

- The site already uses `Bodoni Moda` for display typography and `Syne` for interface and body text.
- The current visual system combines deep forest backgrounds with soft mist text and restrained borders.
- `app/[locale]/layout.tsx` currently renders the global shell with `Navbar` and page content but no footer.
- Navigation labels and content already exist in Czech and German under `messages/cs.json` and `messages/de.json`.
- The footer must align with the hospitality-first brief in `AGENTS.md`: clear inquiry paths, strong sense of place, and an elegant but human tone.

## Chosen direction

Use a balanced editorial footer with a two-column desktop layout and a single-column mobile stack.

Why this direction:

- It preserves atmosphere without sacrificing practical utility.
- It gives the map enough presence to be useful while keeping the text side as the narrative anchor.
- It naturally supports both long-form German labels and the shorter Czech version.
- It fits the existing dark-shell structure in the app layout better than a wide utility footer or a full-width map band.

## Information architecture

### Primary composition

- Left column: editorial closing statement, short descriptive paragraph, quick links, and contact details.
- Right column: embedded Google Map in a restrained framed container.
- Bottom bar: lightweight utility row with address or ownership note, language cue, legal placeholders, and copyright.

### Content blocks

1. Editorial headline
   - Short, calm closing sentence in display serif.
   - Should speak about the place as a living estate, not a venue catalog.

2. Supporting paragraph
   - One short paragraph explaining that Lazen is a summer residence of the Czernin family and a place for weddings, cultural events, and visits.

3. Quick links
   - Home-level wayfinding to `Historie`, `Rod`, `Svatby`, `Akce`, `Galerie`, `Kontakt`.

4. Contact block
   - Management label, address, phone, email.
   - Email should be clickable.
   - Both phone numbers should render as `tel:` links.

5. Map block
   - Google Maps iframe using the user-supplied embed.
   - The embed should be visually integrated through cropping, border treatment, and consistent radius.

6. Utility row
   - Compact meta line for locale awareness and legal/footer support.
   - Can include neutral placeholders such as privacy/legal links if the project adds those routes later.

## Layout behavior

### Desktop

- Use an asymmetrical two-column grid.
- Text column should remain the dominant narrative side.
- Map column should be slightly narrower but still large enough to feel intentional and usable.
- Keep generous vertical spacing so the footer reads as a composed section, not compressed metadata.

### Mobile

- Stack in this order: editorial text, contact and links, map, utility row.
- The map becomes full width within the content container.
- Spacing between blocks should remain generous but the footer should avoid becoming excessively tall.

## Visual language

### Surfaces

- Base background stays in the deep forest family already used by the site.
- Add only subtle tonal variation, not a new decorative theme.
- Borders should remain soft and low-contrast.

### Typography

- Editorial statement uses `Bodoni Moda`.
- Supporting copy, labels, links, and metadata use `Syne`.
- Small uppercase labels are allowed sparingly for block headings.

### Motion and interaction

- No strong entrance animation is required for the first implementation.
- Link hover states should be understated and consistent with the existing navigation language.
- The map container should not animate beyond subtle visual feedback, if any.

## Accessibility and usability

- Map iframe must have a descriptive `title`.
- Text contrast must stay readable on the dark background.
- Footer links should be keyboard reachable and visually clear.
- Layout must tolerate longer German copy without collapsing or clipping.
- The map should not be the only way to understand the location; the address remains visible in text.

## Technical design

### Content source of truth

To avoid drift, shared factual data should not be duplicated across multiple translation namespaces.

- Reuse factual contact data from `ContactPage` for address, phone, email, and the visible contact-block title.
- Reuse route labels from `Nav` for quick links.
- Do not reuse the sentence-style `LanguageSwitch` CTA in the footer.
- Add only editorial and footer-specific microcopy to the new `Footer` namespace.
- Store the Google Maps iframe `src` as a local component constant in the first pass, because it is integration data rather than translated prose.

Exact ownership split:

- Contact block title comes from `ContactPage.company`.
- Address, phones, and email come from `ContactPage` factual keys.
- Utility-row ownership note comes from new `Footer.ownershipNote`, because it is editorial/meta copy rather than the main contact heading.

Location rule:

- The visible text address in the contact block uses `ContactPage.address` as the canonical postal/contact address.
- The Google Maps iframe uses the user-supplied visitor destination query as-is for the first pass.
- These may differ intentionally if the contact address and visitor map query are not identical; implementation should not try to auto-derive one from the other.

### New component

Create a shared footer component, likely at `components/shared/footer.tsx`.

Responsibilities:

- Read footer copy from translations.
- Render navigation links using the existing localized navigation helpers.
- Render contact details and the embedded Google Map.
- Provide a single reusable footer for all locale routes.

Implementation boundary:

- The footer itself may remain a server component.
- The pathname-preserving locale control should be implemented as a small client subcomponent inside the footer, or by reusing an equivalent client-side pattern already present in the project.
- The full footer does not need to become a client component just to support locale switching.

### App shell integration

Update `app/[locale]/layout.tsx` to render the footer under the page `main` content.

### Translations

Add a new translation namespace such as `Footer` to both:

- `messages/cs.json`
- `messages/de.json`

Suggested content ownership:

- `Nav`
  - quick-link item labels
- `ContactPage`
  - `company`
  - `addressLabel`
  - `address`
  - `phoneLabel`
  - `phonePouza`
  - `phoneTrdlicova`
  - `emailLabel`
  - `email`
- `LanguageSwitch`
  - not reused in the footer first pass
- `Footer`
  - `headline`
  - `body`
  - `linksLabel`
  - `contactLabel`
  - `mapLabel`
  - `mapTitle`
  - `ownershipNote`
  - `legalLabel`
  - `privacyLabel`
  - `copyright`

Suggested `Footer` keys:

- `headline`
- `body`
- `linksLabel`
- `contactLabel`
- `mapLabel`
- `mapTitle`
- `ownershipNote`
- `legalLabel`
- `privacyLabel`
- `copyright`

This keeps factual contact content centralized while allowing footer-specific narrative copy to stay local to the component.

### Navigation reuse

For the first implementation pass, the footer may reuse the same route list as `components/shared/navbar.tsx` either by:

- extracting the route array into a shared constant, which is preferred, or
- duplicating the current route list in the footer if that keeps the change smaller

The preferred outcome is one shared route constant, but duplication is acceptable if refactoring would expand the scope too much.

### Utility row behavior

- The locale item should be a real compact `CS / DE` switch that preserves the current pathname, matching the behavior already used in the header.
- `Legal` and `Privacy` should render as non-link text labels in the first pass unless real routes already exist.
- The utility row should not contain dead links; if those text labels feel unnecessary in design review during implementation, the legal block may be hidden entirely.

### Map embed handling

Use the supplied Google Maps iframe source directly.

Embed source for first pass:

`https://maps.google.com/maps?width=600&height=400&hl=en&q=Zámek Lázeň sv. Wolfganga 339 01 Chudenice-Klatovy 1&t=&z=15&ie=UTF8&iwloc=B&output=embed`

Locale note:

- The iframe chrome language parameter is out of scope for the first pass.
- Footer text around the map remains fully localized, but the Google Maps embed may keep the supplied `hl=en` value until a later refinement.

Implementation requirements:

- Wrap iframe in a container with `overflow-hidden`.
- Apply a restrained radius and soft border.
- Give it a stable height across breakpoints.
- Use `loading="lazy"`.
- Avoid decorative overlays that reduce legibility or interactivity.
- The visible postal address in the contact block serves as the non-iframe fallback for location clarity. An additional `Open in Google Maps` link is optional, not required in the first pass.

## Rejected alternatives

### Practical three-column footer

Rejected because it would solve navigation clearly but flatten the editorial tone and make the site ending feel more generic.

### Atmosphere-first oversized footer

Rejected because it would add visual weight and page length without proportionate functional value.

## Verification

After implementation, verify:

- footer appears on all locale pages
- Czech and German labels fit without broken layout
- map loads and remains visually integrated on desktop and mobile
- links route correctly in localized navigation
- contact information remains readable and scannable
- footer complements, rather than competes with, the final homepage contact section

## Out of scope

- Full legal page implementation
- CMS-driven footer content
- Interactive custom map styling
- Additional locale beyond `CS` and `DE`
