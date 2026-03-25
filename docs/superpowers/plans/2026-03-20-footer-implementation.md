# Footer Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and integrate a shared multilingual footer with editorial copy, practical contact details, a compact locale switch, and a Google Maps embed across all locale pages.

**Architecture:** Add a new shared footer server component to the locale app shell, plus a small client-only locale switch subcomponent for pathname-preserving language changes. Reuse factual contact content from `ContactPage`, reuse route labels from `Nav`, add footer-specific copy under a new `Footer` namespace, and keep the Google Maps embed local to the footer component.

**Tech Stack:** Next.js App Router, TypeScript, React 19, next-intl, Tailwind CSS v4

---

## Working notes

- `package.json` currently exposes `lint` and `build`, but no dedicated test runner. Do not add a test framework in this change.
- Verification for this plan relies on `npm run lint`, `npm run build`, and manual browser checks at the end.
- Keep the footer itself as a server component; only the locale switch needs client-side pathname access.
- Preserve the existing visual language from `app/globals.css` and avoid introducing a new palette or generic SaaS footer treatment.

## File map

- Create: `components/shared/nav-items.ts`
  - Exports the shared localized route list currently duplicated in `components/shared/navbar.tsx`.
- Create: `components/shared/footer-locale-switch.tsx`
  - Client-only compact `CS / DE` pathname-preserving switch for the utility row.
- Create: `components/shared/footer.tsx`
  - Shared footer UI, editorial copy, contact block, quick links, utility row, and embedded map.
- Modify: `components/shared/navbar.tsx`
  - Replace its inline route array with the shared export.
- Modify: `app/[locale]/layout.tsx`
  - Render the footer below `main` and switch the shell to a column layout so the footer sits at the page bottom.
- Modify: `messages/cs.json`
  - Add the `Footer` namespace.
- Modify: `messages/de.json`
  - Add the `Footer` namespace.

## Chunk 1: Shared navigation and translation plumbing

### Task 1: Extract shared route metadata

**Files:**
- Create: `components/shared/nav-items.ts`
- Modify: `components/shared/navbar.tsx`

- [ ] **Step 1: Create the shared route list file**

Create `components/shared/nav-items.ts` with the route list currently embedded in the navbar:

```ts
export const navItems = [
  { href: "/" as const, key: "home" },
  { href: "/historie" as const, key: "history" },
  { href: "/rod" as const, key: "family" },
  { href: "/svatby" as const, key: "weddings" },
  { href: "/akce" as const, key: "events" },
  { href: "/galerie" as const, key: "gallery" },
  { href: "/kontakt" as const, key: "contact" },
] as const;
```

- [ ] **Step 2: Update the navbar to import the shared list**

In `components/shared/navbar.tsx`, remove the local `navItems` constant and import the shared one:

```ts
import { navItems } from "@/components/shared/nav-items";
```

Leave all existing navbar behavior unchanged.

- [ ] **Step 3: Run lint after the extraction**

Run: `npm run lint`

Expected: PASS with no new import/type errors related to `nav-items.ts`.

- [ ] **Step 4: Record progress**

If the execution session explicitly requested commits, create a small commit for the navigation extraction. Otherwise, continue without committing.

### Task 2: Add footer translation keys

**Files:**
- Modify: `messages/cs.json`
- Modify: `messages/de.json`

- [ ] **Step 1: Add Czech footer copy**

Append a new `Footer` namespace to `messages/cs.json` using content in this shape:

```json
"Footer": {
  "headline": "Zámek, park a místo pro setkávání.",
  "body": "Lázeň zůstává letním sídlem rodu Czerninů z Chudenic a místem pro svatby, kulturní akce i klidné návštěvy.",
  "linksLabel": "Cesty webem",
  "contactLabel": "Kontakt",
  "mapLabel": "Kde nás najdete",
  "mapTitle": "Mapa Zámku Lázeň v Chudenicích",
  "ownershipNote": "Zámek Lázeň spravuje Czernínská správa majetku s.r.o.",
  "legalLabel": "Právní informace",
  "privacyLabel": "Soukromí",
  "copyright": "Zámek Lázeň"
}
```

- [ ] **Step 2: Add German footer copy**

Append the matching `Footer` namespace to `messages/de.json`:

```json
"Footer": {
  "headline": "Schloss, Park und ein Ort der Begegnung.",
  "body": "Lázeň bleibt Sommerresidenz der Familie Czernin von Chudenice und ein Ort für Hochzeiten, kulturelle Veranstaltungen und ruhige Besuche.",
  "linksLabel": "Wege durch die Website",
  "contactLabel": "Kontakt",
  "mapLabel": "So finden Sie uns",
  "mapTitle": "Karte von Schloss Lázeň in Chudenice",
  "ownershipNote": "Schloss Lázeň wird von Czernínská správa majetku s.r.o. verwaltet.",
  "legalLabel": "Rechtliches",
  "privacyLabel": "Datenschutz",
  "copyright": "Schloss Lázeň"
}
```

- [ ] **Step 3: Validate translation structure**

Run: `npm run lint`

Expected: PASS with no JSON parse or import errors caused by the new translation blocks.

- [ ] **Step 4: Record progress**

If commits were requested in the execution session, create a small commit for the translation plumbing. Otherwise, continue without committing.

## Chunk 2: Footer UI and app-shell integration

### Task 3: Add the compact locale switch subcomponent

**Files:**
- Create: `components/shared/footer-locale-switch.tsx`

- [ ] **Step 1: Create the client component shell**

Start `components/shared/footer-locale-switch.tsx` as a client component:

```tsx
"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
```

- [ ] **Step 2: Implement pathname-preserving locale switching**

Use the same locale logic as the navbar, but render a compact footer treatment:

```tsx
export function FooterLocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "de" ? "cs" : "de";

  return (
    <Link href={pathname} locale={nextLocale} className="...">
      <span className={locale === "cs" ? "text-mist-50" : "opacity-60"}>CS</span>
      <span>/</span>
      <span className={locale === "de" ? "text-mist-50" : "opacity-60"}>DE</span>
    </Link>
  );
}
```

Use subdued footer-specific classes rather than the rounded button styling from the header.

- [ ] **Step 3: Run lint after adding the client component**

Run: `npm run lint`

Expected: PASS with no client/server boundary issues.

- [ ] **Step 4: Record progress**

If commits were requested in the execution session, create a small commit for the locale switch. Otherwise, continue without committing.

### Task 4: Build the shared footer component

**Files:**
- Create: `components/shared/footer.tsx`
- Modify: `components/shared/nav-items.ts` (only if additional exported typing helps)

- [ ] **Step 1: Create the footer component and imports**

Create `components/shared/footer.tsx` and import the localized link helper, translation hooks, shared route list, and locale switch:

```tsx
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/components/shared/nav-items";
import { FooterLocaleSwitch } from "@/components/shared/footer-locale-switch";
```

- [ ] **Step 2: Add footer-local constants and helpers**

Inside the file, keep the map embed local and add a helper for `tel:` hrefs:

```tsx
const MAP_EMBED_SRC =
  "https://maps.google.com/maps?width=600&height=400&hl=en&q=Z%C3%A1mek%20L%C3%A1ze%C5%88%20sv.%20Wolfganga%20339%2001%20Chudenice-Klatovy%201&t=&z=15&ie=UTF8&iwloc=B&output=embed";

function toTelHref(value: string) {
  const phone = value.match(/\+?[\d\s]+$/)?.[0]?.replace(/\s+/g, "") ?? "";
  return phone ? `tel:${phone}` : null;
}
```

If you prefer a stricter helper, keep it inside this file unless another component needs it. If parsing fails, render the phone value as plain text rather than a dead link.

- [ ] **Step 3: Implement the editorial and practical layout**

Build the footer with these sections:

```tsx
<footer className="border-t border-[rgba(185,212,197,0.12)] bg-[linear-gradient(180deg,rgba(8,27,22,0.98),rgba(6,22,17,1))]">
  <div className="mx-auto grid w-full max-w-376 gap-10 px-[1.2rem] py-[clamp(3.5rem,8vw,5.5rem)] md:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.9fr)]">
    {/* left: headline, body, links, contact */}
    {/* right: map */}
  </div>
  <div className="border-t border-[rgba(185,212,197,0.12)]">
    {/* utility row with ownership note, locale switch, legal/privacy text, copyright */}
  </div>
</footer>
```

Implementation details to include:

- `Footer` translations for `headline`, `body`, `linksLabel`, `contactLabel`, `mapLabel`, `mapTitle`, `ownershipNote`, `legalLabel`, `privacyLabel`, `copyright`
- `Nav` translations for quick-link labels
- `ContactPage` translations for `company`, `addressLabel`, `address`, `phoneLabel`, `phonePouza`, `phoneTrdlicova`, `emailLabel`, `email`
- quick links generated from `navItems`
- email rendered as `mailto:`
- both phone strings rendered as `tel:` links using `toTelHref`, with plain-text fallback if parsing fails
- map wrapper and iframe with a stable responsive height such as `h-72 md:h-88`
- map iframe with `title={tFooter("mapTitle")}`, `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`, and a restrained framed wrapper
- visible address text retained even if the map fails to load
- `legalLabel` and `privacyLabel` rendered as plain text placeholders in the utility row, or the entire legal block omitted if it feels too noisy during implementation

- [ ] **Step 4: Keep the mobile stack intentional**

Ensure the layout collapses to a single column in this order:

1. editorial headline + body
2. quick links
3. contact block
4. map
5. utility row

Do not let the map jump above the text on narrow screens.

- [ ] **Step 5: Run lint after building the footer**

Run: `npm run lint`

Expected: PASS with no JSX, hook, or import issues.

- [ ] **Step 6: Record progress**

If commits were requested in the execution session, create a small commit for the footer component. Otherwise, continue without committing.

### Task 5: Integrate the footer into the locale shell and verify

**Files:**
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Import the new footer**

Add the shared footer import:

```tsx
import { Footer } from "@/components/shared/footer";
```

- [ ] **Step 2: Convert the shell to a column layout**

Update the shell wrapper and `main` so the footer sits at the bottom without collapsing page height:

```tsx
<div className="flex min-h-screen flex-col bg-background text-foreground">
  <Navbar />
  <main className="mx-auto w-full flex-1 pb-20 pt-28 md:pt-32">{children}</main>
  <Footer />
</div>
```

- [ ] **Step 3: Run full project verification**

Run: `npm run lint && npm run build`

Expected: both commands PASS.

- [ ] **Step 4: Manually verify in the browser**

Check these routes in both viewport ranges:

- `http://localhost:3000/cs`
- `http://localhost:3000/de`
- one interior page such as `http://localhost:3000/de/geschichte`

Manual checklist:

- footer renders on every route
- Czech and German text fit cleanly
- quick links navigate correctly
- `CS / DE` switch preserves the current page
- phone and email links are clickable
- map is framed cleanly and does not overflow on mobile
- footer feels visually consistent with the header and dark page sections

- [ ] **Step 5: Record progress**

If commits were requested in the execution session, create a final integration commit. Otherwise, stop after verification.

## Done definition

- Footer exists as a shared component and renders on all locale pages.
- Navigation labels are reused from one shared route list.
- Contact data is reused from `ContactPage` translations.
- Footer-specific narrative copy lives under `Footer` in both locale files.
- The utility row includes the compact locale switch and avoids dead legal links.
- The footer passes `npm run lint` and `npm run build`.
- Manual mobile and desktop checks confirm layout quality in both Czech and German.
