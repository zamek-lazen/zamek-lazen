# Lokalizované stránky Zámek Lázeň Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Připravit vícejazyčné stránky zámku s českými i německými slugs tak, aby přepnutí jazyka zachovalo aktuální podstránku.

**Architecture:** Použít `next-intl` `pathnames` mapování pro externí URL podle locale, interní routy držet v `app/[locale]` a obsah stránek načítat z překladových JSON souborů. Přepínač jazyka bude linkovat na aktuální `pathname` s jiným locale.

**Tech Stack:** Next.js 16, React 19, TypeScript, next-intl, Tailwind CSS, Bun

---

### Task 1: Nakonfigurovat lokalizované slugy v routingu

**Files:**
- Modify: `/Users/baudysdev/Coding/www/zamek-lazen/i18n/routing.ts`

**Step 1: Upravit `defineRouting` o `pathnames`**

Doplnit mapování interních cest na locale slugy:
- `/kontakt` => `cs:/kontakt`, `de:/kontakt`
- `/historie` => `cs:/historie`, `de:/geschichte`
- `/galerie` => `cs:/galerie`, `de:/galerie`
- `/akce` => `cs:/akce`, `de:/veranstaltungen`
- `/rod` => `cs:/rod`, `de:/familie`
- `/svatby` => `cs:/svatby`, `de:/hochzeiten`

**Step 2: Ověřit typy**

Run: `bun run lint`
Expected: Žádná TypeScript/ESLint chyba v routing konfiguraci.

### Task 2: Připravit layout, navigaci a přepínač jazyka

**Files:**
- Create: `/Users/baudysdev/Coding/www/zamek-lazen/components/site-header.tsx`
- Create: `/Users/baudysdev/Coding/www/zamek-lazen/components/language-switch.tsx`
- Modify: `/Users/baudysdev/Coding/www/zamek-lazen/app/[locale]/layout.tsx`

**Step 1: Vytvořit hlavičku s navigací**

Přidat odkazy na homepage + všech 6 podstránek přes `Link` z `@/i18n/navigation`.

**Step 2: Vytvořit přepínač jazyka**

Použít `usePathname()` a `Link` s opačným locale (`cs`/`de`) tak, aby přepnutí jazyka měnilo slug a zůstalo na stejné stránce.

**Step 3: Zapojit hlavičku do locale layoutu**

Layout renderuje společný shell stránky a v `<main>` vykreslí obsah podstránek.

### Task 3: Doplnit překladové zprávy podle klientských podkladů

**Files:**
- Modify: `/Users/baudysdev/Coding/www/zamek-lazen/messages/cs.json`
- Modify: `/Users/baudysdev/Coding/www/zamek-lazen/messages/de.json`

**Step 1: Přidat klíče pro navigaci a společné sekce**

Např. `Nav`, `Common`, `HomePage`.

**Step 2: Přidat texty jednotlivých stránek**

Např. `ContactPage`, `HistoryPage`, `GalleryPage`, `EventsPage`, `FamilyPage`, `WeddingsPage`.

**Step 3: Validovat JSON**

Run: `bun run lint`
Expected: Bez chyb v importu překladů i bez neplatného JSON.

### Task 4: Vytvořit stránky v App Routeru

**Files:**
- Modify: `/Users/baudysdev/Coding/www/zamek-lazen/app/[locale]/page.tsx`
- Create: `/Users/baudysdev/Coding/www/zamek-lazen/app/[locale]/kontakt/page.tsx`
- Create: `/Users/baudysdev/Coding/www/zamek-lazen/app/[locale]/historie/page.tsx`
- Create: `/Users/baudysdev/Coding/www/zamek-lazen/app/[locale]/galerie/page.tsx`
- Create: `/Users/baudysdev/Coding/www/zamek-lazen/app/[locale]/akce/page.tsx`
- Create: `/Users/baudysdev/Coding/www/zamek-lazen/app/[locale]/rod/page.tsx`
- Create: `/Users/baudysdev/Coding/www/zamek-lazen/app/[locale]/svatby/page.tsx`

**Step 1: Reprezentativní homepage**

Přidat hero + stručný intro text + odkazy na klíčové sekce.

**Step 2: Implementovat 6 podstránek**

Každá stránka načte překlady přes `getTranslations` a vykreslí obsah z příslušné sekce.

**Step 3: Přidat placeholder pro galerii/akce**

Zachovat informaci, že program/galerie se průběžně doplňuje.

### Task 5: Ověřit funkčnost a build

**Files:**
- Modify (if needed): `/Users/baudysdev/Coding/www/zamek-lazen/README.md`

**Step 1: Lint**

Run: `bun run lint`
Expected: PASS.

**Step 2: Build**

Run: `bun run build`
Expected: PASS, vygenerované locale routy včetně německých slugů.

**Step 3: Ruční kontrola přepínače jazyka**

Zkontrolovat, že přepnutí nevrací na homepage a mění správně slugy mezi `cs`/`de`.
