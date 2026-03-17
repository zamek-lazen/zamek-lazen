# Design systém webu Zámek Lázeň

## 1. Účel dokumentu a role design systému

Tento dokument je centrální návrhový blueprint pro veřejný web Zámku Lázeň. Neslouží jako brand manuál pro tisk ani jako čistě technický seznam CSS hodnot. Jeho role je propojit identitu místa, obsahové priority a frontend implementaci do jednoho konzistentního systému.

Design systém je postavený jako evoluce současného směru webu:

- zachovává editorial-historický charakter
- zachovává kontrast mezi tmavými immersivními scénami a světlými čtecími plochami
- zachovává dvojici fontů `Bodoni Moda` a `Syne`
- zpřesňuje pravidla, aby nové sekce a komponenty nevznikaly ad hoc

Tento dokument je autoritativní podklad pro:

- budoucí refaktor globálních tokenů v [app/globals.css](/Users/baudysdev/Coding/www/zamek-lazen/app/globals.css)
- sjednocení komponent v [components/pages/home/page.tsx](/Users/baudysdev/Coding/www/zamek-lazen/components/pages/home/page.tsx) a souvisejících sekcích
- návrh dalších stránek bez vizuální divergence

## 2. Design principles

### 2.1 Editorial heritage

Web má působit jako současná kulturní prezentace historického místa. Nadpisy nesou noblesu, paměť a ceremonii. Informační vrstva musí zůstat současná, přesná a dobře orientovaná.

Do:

- používat serif vrstvu pro titulky, výrokové věty a klíčové kontaktní odkazy
- používat sans vrstvu pro navigaci, metadata, CTA a čtecí text
- držet vysokou míru typografického kontrastu mezi atmosférou a orientací

Avoid:

- startupový nebo SaaS vizuální jazyk
- utilitární dashboardové komponenty bez kulturního tónu
- dekorativnost bez obsahové funkce

### 2.2 Landscape before interface

Primární dojem musí vytvářet krajina, hloubka, světlo a rytmus obrazu. Rozhraní má scénu rámovat, ne ji překrývat.

Do:

- používat vrstvené pozadí, jemné průsvity a velkorysé rozestupy
- nechat hlavní vizuální momenty dýchat
- navigaci a ovládací prvky držet subtilní, ale čitelné

Avoid:

- přetížení obrazových sekcí badgei, kartami a přebytečnými UI prvky
- tvrdé kontejnery přes hero scény
- soutěžení UI s fotografií nebo parallax vrstvou

### 2.3 Dark-to-light dramaturgy

Web používá vědomou dramaturgii povrchů: tmavé lesní a noční plochy pro vstup a emoci, světlejší parchment/ivory plochy pro četbu, informace a kontakt.

Do:

- komponovat stránky jako rytmus `dark -> editorial deep -> warm light`
- používat světlé plochy jako odlehčení a čtecí reset
- držet přechody mezi povrchy jako systémový motiv

Avoid:

- nahodilé střídání barevných sekcí bez dramaturgie
- ostré skoky mezi nesouvisejícími tóny
- dlouhé bloky náročného čtení na nejtmavším povrchu bez důvodu

### 2.4 Ceremonial restraint

Komponenty mají být důstojné, přesné a klidné. Systém nesmí působit sterilně, ale ani efektně za každou cenu.

Do:

- preferovat jemný pohyb, přesnou typografii a rytmus linií
- nechat CTA působit slavnostně, ne agresivně
- používat stíny a efekty úsporně

Avoid:

- bounce animace, tvrdé scale hovory, glassmorphism bez kontextu
- přehnanou dekorativnost tlačítek a karet
- výrazné “produktové” mikrostavy

### 2.5 Readable storytelling

Historie, rod a kontext místa jsou obsahově těžké vrstvy. Design musí podporovat dlouhé čtení, orientaci a paměť.

Do:

- omezit šířku čtecího sloupce
- držet jasnou titulkovou hierarchii
- pracovat s mezibloky, fakty, citacemi a rytmickými obrazovými přestávkami

Avoid:

- dlouhé stěny textu bez orientačních kotev
- čtení přes příliš dekorativní pozadí
- příliš malý text nebo úzký řádkový proklad

### 2.6 Bilingual by default

Čeština a němčina jsou součást produktu, ne pozdější doplněk. Design systém musí fungovat pro delší německé fráze bez ručních výjimek.

Do:

- počítat s delšími navigačními labely a CTA
- držet flexibilní layouty a wrap-friendly komponenty
- testovat titulky a metadata v obou jazycích

Avoid:

- fixní šířky v navigaci a CTA bez rezervy
- layouty závislé na konkrétní délce českého textu
- jazykové verze řešené jako vizuální výjimky

## 3. Core color tokens

Barvy se mají používat přes sémantické tokeny. Přímé hexy v komponentách jsou dočasný stav a při refaktoru mají ustoupit pojmenovaným rolím.

### 3.1 Základní tokeny

| Token | Hodnota | Role |
| --- | --- | --- |
| `bg.canvas` | `#061611` | hlavní temné pozadí webu |
| `bg.section-deep` | `#0d3129` | tmavé sekce, deep overlaye |
| `bg.section-rich` | `#12463c` | bohatší tmavé plochy, loader, akcentní povrch |
| `bg.surface-ivory` | `#f2f0e8` | světlé čtecí a kontaktní plochy |
| `bg.surface-parchment` | `#e8e3d6` | teplejší archivní/sběratelská plocha |
| `text.primary-on-dark` | `#dde7df` | hlavní text na tmavém podkladu |
| `text.muted-on-dark` | `#b8c9bf` | sekundární text na tmavém podkladu |
| `text.primary-on-light` | `#14342d` | hlavní text na světlém podkladu |
| `text.muted-on-light` | `rgba(20,52,45,0.76)` | sekundární text na světlém podkladu |
| `border.soft` | `rgba(185,212,197,0.34)` | jemné linky na tmavých plochách |
| `border.ink-soft` | `rgba(20,52,45,0.14)` | jemné linky na světlých plochách |
| `accent.moss-glow` | `rgba(140,228,123,0.46)` | atmosférický glow v hero scénách |

### 3.2 Použití barev

`accent.moss-glow` není funkční akcent pro tlačítka nebo badge. Slouží pouze pro světelné vrstvy, glow a atmosférické highlighty v hlubokých scénách.

Světlé povrchy se mají dělit na dvě nálady:

- `bg.surface-ivory` pro čistší, informativní, čitelnější sekce
- `bg.surface-parchment` pro teplejší, archivnější nebo slavnostnější bloky

### 3.3 Do / Avoid

Do:

- navazovat utility a komponentové varianty na sémantické tokeny
- vnímat barvu jako součást dramaturgie celé stránky
- u světlých povrchů zachovat teplý podtón, ne čistě bílou technickou plochu

Avoid:

- přímé hex hodnoty v JSX jako dlouhodobé řešení
- nové akcentní barvy bez systémové role
- výrazně saturované CTA barvy, které rozbijí kultivovaný tón

## 4. Typography system

### 4.1 Fontové role

- `Bodoni Moda`: display/editorial vrstva
- `Syne`: interface/orientační vrstva i základní čtecí sans text

Tento pár je povinný základ. Náhrady se nepřidávají bez změny celého design systému.

### 4.2 Typografické role

| Role | Doporučení |
| --- | --- |
| `display-hero` | `clamp(3rem, 8vw, 6rem)`, line-height `0.9–0.95`, serif |
| `display-section` | `clamp(2.2rem, 6vw, 4.5rem)`, line-height `0.9–0.98`, serif |
| `lead-editorial` | `1.15rem–1.6rem`, line-height `1.22–1.34`, serif |
| `body-reading` | `0.98rem–1.08rem`, line-height `1.75–1.85`, sans |
| `label-overline` | `0.68rem–0.76rem`, uppercase, tracking `0.16em–0.24em`, sans |
| `micro-nav` | `0.55rem–0.66rem`, uppercase, tracking `0.16em–0.22em`, sans |

### 4.3 Typografická pravidla

- Serif vrstva slouží pro význam, ceremonii a rytmus.
- Sans vrstva slouží pro orientaci, navigaci, doprovodné informace a delší čtení.
- Uppercase se používá jen pro navigaci, metadata, overline a drobné orientační signály.
- Delší informační odstavec se nevede v uppercase.
- CTA nemají míchat serif a sans v rámci jedné krátké akce.

### 4.4 Délka řádku a hierarchie

- Dlouhé odstavce: max `58–64ch`
- Lead texty: kratší šířka než běžné čtení
- Hero titulky mohou být výrazně užší pro siluetu a důraz
- H1/H2/H3 musí držet jasnou sémantickou i vizuální hierarchii

### 4.5 Do / Avoid

Do:

- využívat kontrast serif vs sans jako základ identity
- držet nadpisy vzdušné a rytmické
- používat tracking u nav/meta pouze tam, kde pomáhá orientaci

Avoid:

- přehnaně utažené serif titulky
- příliš malé body copy na tmavých plochách
- nahodilé přepínání mezi fonty bez role

## 5. Layout and spacing system

### 5.1 Kontejnery

- standardní obsahový kontejner: `max-width: 70rem–72rem`
- široký kontejner pro header a hero: `max-width: 94rem`
- mobilní horizontální padding: `1.2rem`
- desktop padding: `2rem–3rem` podle hustoty sekce

### 5.2 Vertikální rytmus

Výchozí vertikální spacing sekcí: `clamp(3.2rem, 8vw, 6.8rem)`.

Tento rytmus se může zvýšit u hero, image breaků a závěrečných kontaktních sekcí, ale nemá se rozpadnout na náhodné hodnoty v jednotlivých komponentách.

### 5.3 Grid systém

- mobile-first: 1 sloupec
- desktop: preferovaný pattern je asymetrický 2sloupcový layout
- 3 a více sloupců jen tam, kde je obsah skutečně fragmentovaný
- stejnoměrný grid není default, ale výjimka

### 5.4 Kompoziční pravidla

- důležité textové bloky mají dostat negativní prostor
- sekce mají působit komponovaně, ne “vyplněně”
- overlap a vrstvení je povolené pouze tam, kde podporuje scénu nebo orientaci

### 5.5 Do / Avoid

Do:

- používat asymetrii jako hlavní desktop pattern
- držet čtecí blok oddělený od doprovodného seznamu nebo média
- škálovat spacing přes systém, ne ručně per komponenta

Avoid:

- univerzální 12-col grid mentalitu bez vztahu k obsahu
- stejnou šířku všech sloupců u editorial sekcí
- přepjatě husté layouty bez dechového prostoru

## 6. Surface and imagery rules

### 6.1 Povrchová logika

Web pracuje se třemi hlavními povrchovými rodinami:

- `deep dark`: atmosférický vstup, hero, overlaye, dramatické přechody
- `editorial dark`: čitelnější tmavé plochy pro storytelling a sekční text
- `warm light`: kontakty, přehledy, výzvy k akci, odlehčení po tmavých blocích

### 6.2 Obrazový styl

Preferovaný obrazový směr:

- krajina, park, průhledy, sezónnost
- historické archivní materiály
- architektonické detaily a průčelí
- kompozice se světlem, mlhou, hloubkou a vegetací

Obraz nesmí působit jako generická katalogová fotobanka. Má podporovat pocit místa.

### 6.3 Media transitions

Image breaky a přechodové obrazové sekce jsou systémový nástroj. Slouží k:

- rytmizaci dlouhých textových bloků
- přepnutí dramaturgie mezi povrchy
- vytvoření pocitu cesty místem

### 6.4 Do / Avoid

Do:

- používat fotografie jako výrazné momenty mezi textem
- u archivních materiálů držet klidný rámec a důstojný caption systém
- respektovat, že obraz je nositel atmosféry

Avoid:

- používat obraz jen jako tapetu bez role
- přeplácat media overlays silnou UI vrstvou
- míchat nesourodé vizuální styly fotografie v jedné sekci

## 7. Component families

Každá komponentová rodina musí mít jasný účel, povinné prvky a variantovou logiku. Komponenty se nebudují jako jednorázové sekční výjimky, pokud to není výslovně zdůvodněné.

### 7.1 Site chrome

Účel:

- orientace napříč webem
- jazykové přepnutí
- značka a znak v subtilní roli

Povinné prvky:

- značka se znakem
- globální navigace
- jazykový přepínač
- čitelný aktivní stav

Varianty:

- tmavá/translucent varianta pro hero a dark surfaces
- čitelná pevnější varianta pro světlé nebo méně kontrastní pozadí

Do:

- držet navigaci jemnou a přesnou
- používat uppercase micro-nav styl
- zachovat viditelný, ale ne agresivní active state

Avoid:

- robustní app header
- masivní pozadí přes hero, pokud není nutné kvůli kontrastu
- přehnaně dekorativní jazykový přepínač

### 7.2 Hero systems

Účel:

- vytvořit první emotivní dojem
- okamžitě definovat místo, tón a hloubku

Povinné prvky:

- display titul
- prostor pro parallax nebo vícevrstvou scénu
- loader nebo intro mechanismus pouze pokud má dramaturgickou roli
- scroll prompt

Varianty:

- immersive hero s atmosférickou hloubkou
- jednodušší page hero pro sekundární stránky

Do:

- nechat hero dýchat
- využít moss glow jen jako atmosférický highlight
- držet text v siluetě, ne přes celý horizont

Avoid:

- přetížení hero CTA, badgei a boxy
- product-style hero s několika tlačítky a card gridem
- efekty bez vztahu k místu

### 7.3 Story blocks

Účel:

- nést hlavní příběh, kontext a hodnotovou větu stránky

Povinné prvky:

- overline/eyebrow
- display nadpis
- lead
- čtecí odstavec
- 1 až 2 CTA

Varianty:

- dark editorial
- warm light editorial

Do:

- držet dvojici CTA jako primární + sekundární
- zachovat jasný typografický sestup od nadpisu k body
- oddělovat lead a body text

Avoid:

- více než dvě rovnocenné CTA v jednom story bloku
- příliš technický tón
- husté boxové kompozice

### 7.4 Spotlight lists

Účel:

- navigovat uživatele do hlavních tematických sekcí
- fungovat jako kurátorsky číslovaný rozcestník

Povinné prvky:

- pořadové číslo
- název cíle
- krátký vysvětlující popis

Varianty:

- tmavá linková varianta
- světlá inková varianta

Do:

- používat jasné dělení linkami a rytmem
- pracovat s lehkým horizontálním pohybem na hoveru

Avoid:

- měnit spotlight list na běžný card grid
- přehlcené ikony
- sekundární metadata soutěžící s titulkem

### 7.5 Fact strips

Účel:

- rychle předat měřitelné nebo paměťové body

Povinné prvky:

- stručná hodnota nebo fakt
- konzistentní rytmus

Varianty:

- samostatný strip
- integrovaná řada v story sekci

Do:

- držet fakta krátká a dobře skenovatelná
- používat jako dechový meziblok

Avoid:

- přetížení vysvětlujícím textem
- stylizaci do data vizualizace

### 7.6 Editorial cards

Účel:

- prezentovat akce, galerie, svatební místa, rodové motivy nebo související obsah

Povinné prvky:

- jasný titul
- krátký popis nebo stav
- jednoznačný click target

Varianty:

- textově orientovaná karta
- karta s obrazovým leadem

Do:

- chápat je jako editorial blocks, ne SaaS cards
- používat linky, povrchy a typografii místo těžkých shadow efektů

Avoid:

- univerzální produktové karty
- masivní radius a lesklé efekty
- přehnanou hustotu obsahu

### 7.7 Contact blocks

Účel:

- dát důstojnou a okamžitě čitelnou kontaktní cestu

Povinné prvky:

- název subjektu
- adresa
- telefon
- e-mail
- CTA do detailní kontaktní stránky

Varianty:

- světlá závěrečná varianta
- kompaktnější inline varianta pro sekundární stránky

Do:

- zvýraznit telefon a e-mail větší serif rolí tam, kde to pomáhá
- držet kontaktní blok přehledný a klidný

Avoid:

- přemíru ikon
- tmavý kontaktní blok bez důvodu po světlé závěrečné dramaturgii

### 7.8 Media transitions

Účel:

- oddělit dlouhé tematické celky
- změnit rytmus stránky bez ztráty atmosféry

Povinné prvky:

- silná fotografie nebo obrazová kompozice
- jasná role v toku stránky

Varianty:

- full-width image break
- parallax transition

Do:

- používat jako vědomý předěl
- zachovat dostatečný kontrast proti okolním sekcím

Avoid:

- náhodné vkládání dekorativních obrazů
- několik obrazových breaků za sebou bez textového resetu

### 7.9 Timeline patterns

Účel:

- vést historií, časovými milníky a kapitolami

Povinné prvky:

- časová kotva
- název kapitoly
- vysvětlující text
- navigace nebo přeskok mezi kapitolami

Varianty:

- full scrollytelling kapitoly
- kompaktní lineární timeline

Do:

- posilovat orientaci roky a stručnými navigačními labely
- kombinovat text, obraz a mezivěty

Avoid:

- timeline jako dekorativní seznam bez navigační logiky
- příliš hustý časový strom

## 8. Page pattern rules

### 8.1 Homepage

Primární dramaturgie:

`immersive dark -> editorial deep -> warm light -> formal contact`

Povinné vrstvy:

- emotivní hero
- story block s hlavní identitou místa
- navigační spotlighty
- tematické sekce pro historii, rod, svatby, akce a galerii
- zakončení kontaktem

### 8.2 Historie

Pattern:

- page hero
- orientační úvod
- timeline navigace
- kapitoly se střídáním textu a obrazu
- closing statement

Priorita:

- orientace v čase
- vysoká čitelnost
- důstojná práce s archivním materiálem

### 8.3 Rod

Pattern:

- klidnější editorial page hero
- delší čtecí bloky
- důraz na linii, kontinuitu a kontext

Priorita:

- čitelnost a důvěryhodnost
- méně scénické efekty než u homepage

### 8.4 Svatby

Pattern:

- slavnostní hero
- srozumitelný proces
- místa obřadu
- kontaktní cesta

Priorita:

- spojit ceremonii a praktičnost
- neupadnout do generického wedding-webu

### 8.5 Akce

Pattern:

- kulturní editorial přehled
- stavové informace o programu
- možnost budoucího rozšíření na seznam událostí

Priorita:

- kultivovaný informační tón
- dobrá škálovatelnost pro budoucí event cards

### 8.6 Galerie

Pattern:

- úvodní rámec
- výrazná obrazová mřížka nebo kurátorovaný proud
- minimální rušení mezi fotografiemi

Priorita:

- nechat vyniknout materiál
- držet konzistentní caption systém

### 8.7 Kontakt

Pattern:

- silná informační dostupnost
- méně atmosféry, více jasnosti
- stále však v kulturně-editorial tónu

Priorita:

- rychlý přístup k telefonu, e-mailu a adrese
- jasná orientace bez chaosu

## 9. Interaction and motion

### 9.1 Princip motion systému

Pohyb je atmosférický, ne produktový. Má posílit pocit místa, světla a cesty stránkou.

### 9.2 Povolené vzory

- pomalý parallax
- fade reveal
- jemný vertical drift
- decentní translate hover
- staggered reveal u sekčních prvků, pokud nepůsobí teatrálně

### 9.3 Zakázané vzory

- bounce animace
- agresivní scale-in/out
- těžké spring efekty
- výrazné produktové mikrointerakce

### 9.4 Motion fallback

Všechny dramatické pohyby musí mít fallback pro `prefers-reduced-motion`. U intro a parallax scén se musí degradace řešit plnohodnotně, ne jen vypnutím části animace bez náhradního stavu.

## 10. Accessibility and localization

### 10.1 Kontrast a čitelnost

- tmavé povrchy musí mít dostatečný kontrast pro textové role
- světlé povrchy nesmí spadnout do nízkého kontrastu kvůli “archivní” náladě
- jemné muted texty lze použít jen u sekundární informace

### 10.2 Sémantika

- dekorativní vrstvy musí být `aria-hidden`
- titulky musí respektovat skutečnou dokumentovou hierarchii
- linky a CTA musí mít čitelné focus stavy

### 10.3 Interakce

- hover nesmí být jediný nositel významu
- navigační stavy musí být čitelné i bez animace
- touch cíle musí zůstat pohodlné i při subtilní vizuální estetice

### 10.4 Lokalizace

- německá verze se bere jako delší default
- komponenty musí umět zalomení bez rozbití rytmu
- textové lockupy nesmí stát na fixním počtu znaků

## 11. Implementation notes pro Next.js + Tailwind

### 11.1 Tokenizace

Budoucí refaktor má přesunout většinu barevných a typografických rozhodnutí do sémantických CSS custom properties. Komponenty mají sahat na roli, ne na konkrétní hex.

Doporučený směr:

```css
:root {
  --bg-canvas: #061611;
  --bg-section-deep: #0d3129;
  --bg-surface-ivory: #f2f0e8;
  --text-primary-on-dark: #dde7df;
  --text-primary-on-light: #14342d;
}
```

### 11.2 Tailwind vrstva

V Tailwindu se mají používat:

- sémantické utility navázané na custom properties
- stabilní typografické role
- povrchové varianty místo lokálních kombinací utility tříd

Směr:

- omezit inline hex utility v JSX
- omezit jednorázové barvy typu `bg-[#...]` a `text-[#...]`
- pokud je potřeba výjimka, zdůvodnit ji jako page-specific exception

### 11.3 Variantový model komponent

Komponenty se mají navrhovat kolem variant:

- `surface`: `dark | deep | light | parchment`
- `tone`: `default | muted | ceremonial`
- `density`: `comfortable | compact`

Varianty mají být preferované rozhraní systému. Nemají vznikat nové komponenty jen kvůli jiné barevné kombinaci.

### 11.4 Core reusable vs page-specific exception

`Core reusable`:

- site header
- page hero
- story block
- CTA páry
- spotlight list
- fact strip
- contact block

`Page-specific exception`:

- unikátní home intro loader
- specifické parallax vrstvy
- jedinečné historické kapitoly s custom obrazovou dramaturgií

Výjimka je přípustná pouze tehdy, pokud podporuje jedinečnou stránkovou scénu a nelze ji rozumně abstrahovat bez ztráty kvality.

### 11.5 Praktické zásady implementace

- upřednostnit konzistenci před rychlým lokálním stylingem
- nové sekce stavět z existujících rodin a variant
- při refaktoru nejprve přesunout tokeny, potom sjednotit komponenty
- zachovat designový tón i při technickém zjednodušování

## 12. Shrnutí rozhodnutí

Tento design systém uzamyká následující směr:

- kulturně-editorial web s důrazem na krajinu, historii a ceremonii
- dvojice fontů `Bodoni Moda` + `Syne`
- temný lesní základ a teplé světlé čtecí plochy
- asymetrická, vzdušná kompozice
- komponenty navržené jako důstojné obsahové bloky, ne produktový UI kit
- bilingvní návrh jako výchozí podmínka

Při jakékoliv budoucí změně je priorita zachovat atmosféru místa a konzistenci systému před lokální efektností.
