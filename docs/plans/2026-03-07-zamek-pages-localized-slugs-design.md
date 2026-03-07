# Lokalizované URL a obsah webu zámku Lázeň (Design)

## Cíl
Připravit reprezentativní úvodní stránku a podstránky `/kontakt`, `/historie`, `/galerie`, `/akce`, `/rod`, `/svatby` s plnou lokalizací pro `cs` a `de`, kde německá verze používá přeložené slugy a přepnutí jazyka zachová aktuální stránku.

## Rozsah
- Locale prefix routing: `/cs/...`, `/de/...`
- České slugy:
  - `/kontakt`, `/historie`, `/galerie`, `/akce`, `/rod`, `/svatby`
- Německé slugy:
  - `/kontakt`, `/geschichte`, `/galerie`, `/veranstaltungen`, `/familie`, `/hochzeiten`
- Přepínač jazyka musí měnit i slug (bez redirectu na homepage).
- Obsah stránek se naplní z klientských podkladů v `public/web c.doc` a `public/web n.doc`.

## Architektura
- Zachová se `next-intl` s `app/[locale]`.
- V `i18n/routing.ts` se doplní `pathnames` mapování interních rout na lokalizované slugy.
- Interní routy budou vedeny pod českými slugs (`/historie`, `/akce`, `/rod`, `/svatby`), německé se obslouží mapováním.
- Přepínač jazyka bude používat `Link` + `usePathname` z `@/i18n/navigation`, aby cílová URL odpovídala stejné stránce v druhém jazyce.

## Struktura stránek
- Homepage (`/`): reprezentativní úvod, stručné představení zámku, rychlé odkazy na podstránky.
- `/kontakt`: kontaktní údaje správce a spojení.
- `/historie`: historický text o zámku a parku.
- `/galerie`: připravená galerie sekce (placeholder pro média).
- `/akce`: kulturní a společenské akce (aktuálně připravujeme).
- `/rod`: informace o rodu Czerninů.
- `/svatby`: proces domluvy svatby a místa obřadu.

## Překlady
- Překladové klíče budou v `messages/cs.json` a `messages/de.json`.
- Jazykové mutace budou obsahovat:
  - navigaci
  - texty homepage
  - texty jednotlivých podstránek
  - label přepínače jazyka

## Chybové stavy
- Neplatný locale zůstane řešen přes `hasLocale(...)` + `notFound()`.
- Chybějící překladový klíč se zachytí při buildu/lintu a opraví v JSON zprávách.

## Validace
- `bun run lint`
- `bun run build`
- Ruční kontrola, že přepínač jazyka převádí URL mezi páry:
  - `/cs/historie` <-> `/de/geschichte`
  - `/cs/akce` <-> `/de/veranstaltungen`
  - `/cs/rod` <-> `/de/familie`
  - `/cs/svatby` <-> `/de/hochzeiten`
