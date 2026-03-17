# Global Google Fonts Typography Design

## Goal

Nahradit lokální referenční fonty `GrafierRef` a `NeueMachinaRef` podobně působícími Google Fonts a používat je globálně napříč projektem přes `next/font/google`.

## Decision

- Sans vrstva: `Syne` jako náhrada za `NeueMachinaRef`
- Serif vrstva: `Bodoni Moda` jako náhrada za `GrafierRef`

Tato dvojice zachovává současný kontrast mezi technickým sans písmem a výrazným editorial serif titulkem, ale odstraňuje závislost na lokálních `.woff2` souborech v `public/reference`.

## Scope

- upravit globální načítání fontů v `app/layout.tsx`
- zachovat stávající CSS proměnné `--font-outfit` a `--font-cormorant`
- odstranit lokální `@font-face` definice z homepage modulu
- sjednotit homepage i zbytek webu na stejné globální fonty

## Risks

- `Bodoni Moda` může lehce změnit zalomení velkých nadpisů
- `Syne` může zúžit některé uppercase labely a CTA

## Validation

- spustit lint
- ověřit, že v `app` a `components` nezůstaly reference na `GrafierRef` a `NeueMachinaRef`
