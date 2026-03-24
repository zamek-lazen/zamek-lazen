# Weddings funnel design - 2026-03-23

## Goal

Turn the `/svatby` page from a passive informational block into an editorial conversion funnel that ends in a clear phone-and-email contact decision.

## Approved direction

Use a calm, redakční flow that keeps the château tone but leads the visitor step by step toward personal contact.

The page should:

- feel warmer and more guided than the current version
- explain the offer in short, skimmable sections instead of long paragraphs
- present the booking flow as personal coordination rather than administration
- show both ceremony settings as distinct scenarios
- finish with a large, explicit contact block where phone is the main action and email stands beside it

## Content flow

### Hero

- stronger headline with a more emotional promise
- short lead that says the day starts with personal agreement
- immediate visibility of the two contact paths: call and email

### Why here

- three concise reasons to continue reading
- focus on park setting, interior option, and calm coordination

### How the agreement works

- retain the four existing steps
- reframe them as an easy personal sequence
- keep the user oriented toward "domluvíme se spolu" rather than rules

### Ceremony settings

- split the current venue list into two cards
- give each setting a short atmosphere description

### Final contact

- full-width closing section
- direct invitation to call and discuss options, date, and format of the day
- email remains equally visible as a quieter alternative

## Technical design

- Keep the implementation inside `app/[locale]/svatby/page.tsx` because the page is still self-contained.
- Expand the `WeddingsPage` translation namespace in both locales so the funnel copy stays localized.
- Reuse existing `PageHero`, palette, serif/sans pairing, and spacing scale.
- Add simple helper arrays in the page file for reasons, process steps, and venue cards rather than introducing new components prematurely.

## Accessibility

- keep contact actions as semantic `tel:` and `mailto:` links
- maintain strong contrast on both dark and light sections
- keep section order linear and readable on mobile

## Verification

- the page now reads as a clear top-to-bottom funnel
- phone and email are visible near the top and strongly repeated at the bottom
- the process is easier to scan than the previous paragraph stack
- venue presentation feels editorial rather than list-like
