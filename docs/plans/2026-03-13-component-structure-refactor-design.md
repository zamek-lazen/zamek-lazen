# Component Structure Refactor Design

**Date:** 2026-03-13

**Goal:** Rozdělit velké page-specific komponenty do složek podle stránek, odstranit `*.module.css`, převést page-specific styling na Tailwind a přejmenovat font tokeny na generické názvy.

## Confirmed Decisions

- Struktura komponent bude po stránkách: `components/pages/<page>/...`
- Sdílené komponenty budou jen v `components/shared/...`
- Page-specific soubory nebudou mít redundantní prefixy typu `home-` nebo `history-`
- Styling bude čistě přes Tailwind utility v TSX
- `*.module.css` budou odstraněny
- Font tokeny budou přejmenované na generické názvy:
  - `--font-primary`
  - `--font-secondary`
  - `--font-title`

## Target Structure

```text
components/
  pages/
    home/
      page.tsx
      hero.tsx
      parallax-scene.tsx
      highlights.tsx
      family-section.tsx
      weddings-section.tsx
      events-section.tsx
      gallery-section.tsx
      contact-section.tsx
      index.ts
      types.ts
    history/
      page.tsx
      hero.tsx
      timeline-nav.tsx
      chapter.tsx
      gallery.tsx
      closing.tsx
      index.ts
      types.ts
  shared/
    site-header.tsx
```

## Architecture

Homepage a historie budou mít vlastní page-level entry komponentu v příslušné složce. Tyto entry komponenty budou skládat menší sekční komponenty a držet jen orchestrace, nikoliv dlouhé bloky JSX nebo interní CSS modulovou logiku.

Three.js část homepage zůstane izolovaná v samostatné komponentě `parallax-scene.tsx`, protože má odlišný lifecycle, práci s WebGL rendererem a preload assetů. Ostatní sekce budou čistě prezentační React komponenty napojené na přijatý copy model.

`components/shared` zůstane úzké. Přesune se tam pouze to, co se skutečně opakuje napříč podstránkami. V aktuálním rozsahu je jistým kandidátem jen `site-header.tsx`; další sdílení bude vznikat až podle reálného opakování, ne preventivně.

## Styling Strategy

Veškerý page-specific styling se přesune z `components/homepage-vibe.module.css` přímo do Tailwind className řetězců v nových TSX souborech. Tím zmizí vazba mezi velkou komponentou a jedním masivním CSS modulem.

Opakované kombinace utility tříd budou drženy jako lokální konstanty uvnitř konkrétní komponenty, pokud by jinak className řetězce výrazně zhoršovaly čitelnost. Nevznikne ale nová globální styling abstraction layer.

V `app/globals.css` zůstanou pouze globální tokeny a skutečné globální styly:

- barvy
- font tokeny
- reset pro `html`, `body`, `a`
- případně minimum globálních utility pravidel, pokud budou opravdu sdílená

## Font Token Renaming

V `app/layout.tsx` budou proměnné přejmenované z názvů odvozených od konkrétních fontů na generické tokeny:

- `--font-outfit` -> `--font-primary`
- `--font-cormorant` -> `--font-title`

`--font-secondary` bude připraven jako generický token pro případné další odlišení textových rolí. Pokud nebude hned použitý odlišně od `primary`, zůstane definovaný konzistentně bez zavádění další font family do UI logiky.

V `app/globals.css` bude mapování na Tailwind theme tokeny odpovídat rolím:

- `--font-sans: var(--font-primary)`
- `--font-serif: var(--font-title)`

## Migration Order

1. Přesunout `components/site-header.tsx` do `components/shared/site-header.tsx` a upravit importy.
2. Rozdělit homepage do `components/pages/home/*`.
3. Převést homepage styling z CSS modulu do Tailwind utility tříd.
4. Rozdělit historii do `components/pages/history/*`.
5. Převést historii na finální page-level importy z nových složek.
6. Přejmenovat font tokeny v `app/layout.tsx`, `app/globals.css` a všech komponentách.
7. Smazat původní ploché komponenty a `components/homepage-vibe.module.css`.

## Risks

- Největší riziko je přepis rozsáhlého vizuálního layoutu homepage z CSS modulu do Tailwindu bez vizuální regrese.
- Three.js hero má kombinaci DOM overlaye a canvas vrstvy; při rozpadu je potřeba zachovat stávající načasování intro animace a preload assetů.
- Font token rename je mechanický, ale musí být dotažený přes všechny Tailwind a CSS reference, jinak se snadno rozpadne typografie.

## Validation

- `bunx eslint` nad změněnými TS/TSX soubory
- repo-wide vyhledání zbytků `homepage-vibe.module.css`, `homepage-vibe.tsx`, `history-story.tsx`, `site-header.tsx` ve starých cestách
- rychlá vizuální kontrola homepage a historie v browseru
