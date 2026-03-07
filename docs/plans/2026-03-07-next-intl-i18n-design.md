# Next-intl i18n Design (cs/de)

## Scope
- Enable internationalization with `next-intl`.
- Support only two locales: `cs` and `de`.
- Use locale-prefixed URLs (`/cs/...`, `/de/...`).
- Use `proxy.ts` (Next.js 16) for locale detection and redirects.

## Architecture
- Central routing config in `i18n/routing.ts` with `defaultLocale = "cs"`.
- Request-time config in `i18n/request.ts` to load locale messages.
- `proxy.ts` created with `next-intl/middleware` + routing config.
- App routes moved to `app/[locale]/...` and wrapped in `NextIntlClientProvider`.
- Messages stored in `messages/cs.json` and `messages/de.json`.

## Data Flow
1. Request hits `proxy.ts`.
2. Proxy resolves/redirects locale and routes to `/[locale]/*`.
3. `app/[locale]/layout.tsx` validates locale and provides i18n context.
4. Page/components read translations via `useTranslations`.

## Validation
- Run `bun run lint`.
- Run `bun run build`.

