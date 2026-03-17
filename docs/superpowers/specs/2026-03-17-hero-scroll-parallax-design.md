# Hero Scroll Parallax Design

## Goal

Nahradit současné WebGL hero za jednoduchý scroll-based parallax se třemi DOM vrstvami:

- `sky`
- `castle`
- `flowers`

Zachovat stávající textový overlay hero sekce, ale odstranit:

- pohyb podle myši
- intro zoom / unfold animaci
- loader fázi závislou na render pipeline

Výsledkem má být klidný, realistický hero efekt, kde se vrstvy jemně oddělují pouze při scrollu.

## Scope

V rámci této změny se upraví pouze homepage hero implementace.

In scope:

- zjednodušení `ParallaxScene` z Three.js na DOM vrstvy
- zachování stávajícího overlay textu a layoutu hero
- odstranění mouse parallaxu
- odstranění intro/load state logiky, která už nebude potřeba
- jemný scroll parallax s fallbackem pro `prefers-reduced-motion`

Out of scope:

- změny copy nebo layoutu overlay textů
- redesign dalších homepage sekcí
- nové asset export workflow

## Desired Behavior

Hero bude fungovat takto:

- po načtení je sekce rovnou ve finálním stavu
- `sky` se při scrollu hýbe minimálně
- `castle` se hýbe o něco víc, ale stále jemně
- `flowers` se hýbou nejvíc, aby vytvářely pocit hloubky
- žádná vrstva nereaguje na pozici kurzoru
- při zapnutém `prefers-reduced-motion` zůstávají vrstvy statické

Parallax má působit realisticky a nenápadně, ne jako výrazný efekt.

## Architecture

### `components/pages/home/parallax-scene.tsx`

Komponenta zůstane samostatná, ale interně se změní z canvas/WebGL rendereru na lehkou DOM scénu.

Nová odpovědnost komponenty:

- renderovat tři absolutně pozicované obrazové vrstvy
- počítat scroll progress vůči `heroRef`
- aplikovat na každou vrstvu vlastní `translate3d` podle scrollu
- respektovat `prefers-reduced-motion`

Komponenta už nebude:

- inicializovat `THREE.WebGLRenderer`
- vytvářet plane mesh vrstvy
- preloadovat textury přes `TextureLoader`
- spravovat pointer tilt nebo intro animaci

### `components/pages/home/hero.tsx`

Hero wrapper zachová:

- textový overlay
- boční titulky
- spodní `Prozkoumat`
- overlay gradienty a barevnou atmosféru

Zjednoduší se tím, že už nebude záviset na loader/unfold stavu.

### `components/pages/home/page.tsx`

Stránka si ponechá `heroRef`, ale pokud po odstranění intro pipeline nebude potřeba `phase` a `progress`, odstraní se i tento stav a odpovídající props.

## Layer Model

Pořadí vrstev odspodu:

1. `sky`
2. `castle`
3. `flowers`

Použijí se nové assety z `public/images/hero`.

Předpoklad:

- vrstvy jsou exportované na stejném canvasu
- při skládání není potřeba ruční horizontální nebo vertikální dorovnávání

## Motion Model

Každá vrstva dostane pevný parallax koeficient.

Doporučený směr:

- `sky`: téměř statická vrstva
- `castle`: jemný posun
- `flowers`: největší posun

Implementace bude mít tyto koeficienty explicitně v kódu jako jednoduché konstanty, aby šly snadno doladit bez refactoru.

Scroll progress se bude odvozovat z polohy hero sekce vůči viewportu, typicky v rozsahu omezeném na rozumné minimum a maximum.

## Error Handling and Fallbacks

- Pokud se obrázek nenačte, hero musí zůstat vizuálně stabilní díky základnímu backgroundu wrapperu.
- Při `prefers-reduced-motion` se vypne scroll transform a vrstvy zůstanou v základní poloze.
- Hero nesmí spoléhat na žádný specializovaný render lifecycle, který by blokoval první vykreslení sekce.

## Testing

Ověření po implementaci:

- desktop screenshot
- mobile screenshot
- manuální scroll kontrola v browseru
- kontrola, že `flowers` mají největší pohyb, `castle` mírný a `sky` minimální
- kontrola `prefers-reduced-motion`
- `bun run lint`
- `bun run build`

## Risks

- pokud foreground export (`flowers`) stále obsahuje nežádoucí matte nebo špatnou alfu, bude i DOM verze vizuálně problematická
- příliš silné parallax koeficienty mohou na mobilu působit nepřirozeně
- příliš slabé koeficienty mohou efekt úplně utlumit

## Decision Summary

Schválený směr:

- zahodit Three.js pro hero scénu
- ponechat overlay texty beze změn
- použít pouze scroll-based DOM parallax
- použít tři vrstvy: `sky`, `castle`, `flowers`
- cílit na jemný realistický efekt
