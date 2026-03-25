export type AppLocale = 'cs' | 'de'

export type StaticRouteKey =
  | 'home'
  | 'history'
  | 'family'
  | 'weddings'
  | 'events'
  | 'gallery'
  | 'contact'

export const SITE_URL = 'https://zameklazen.eu'
export const DEFAULT_LOCALE: AppLocale = 'cs'
export const APP_LOCALES: readonly AppLocale[] = ['cs', 'de']

export const BRAND_NAME: Record<AppLocale, string> = {
  cs: 'Zámek Lázeň',
  de: 'Schloss Lázeň'
}

export const OG_IMAGE_PATH = '/images/castle-front-flower.webp'
export const FACEBOOK_URL =
  'https://www.facebook.com/profile.php?id=100076194634170'

export const CONTACT_EMAIL = 'zameklazen@kecz.at'

export const SITE_ADDRESS = {
  addressCountry: 'CZ',
  addressLocality: 'Chudenice',
  postalCode: '339 01',
  streetAddress: 'Chudenice 60'
} as const

export const ROUTE_PATHS: Record<
  StaticRouteKey,
  Record<AppLocale, `/${string}` | ''>
> = {
  home: {
    cs: '',
    de: ''
  },
  history: {
    cs: '/historie',
    de: '/geschichte'
  },
  family: {
    cs: '/rod',
    de: '/familie'
  },
  weddings: {
    cs: '/svatby',
    de: '/hochzeiten'
  },
  events: {
    cs: '/akce',
    de: '/veranstaltungen'
  },
  gallery: {
    cs: '/galerie',
    de: '/galerie'
  },
  contact: {
    cs: '/kontakt',
    de: '/kontakt'
  }
}
