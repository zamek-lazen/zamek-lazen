import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['cs', 'de'],
  defaultLocale: 'cs',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/kontakt': {
      cs: '/kontakt',
      de: '/kontakt'
    },
    '/historie': {
      cs: '/historie',
      de: '/geschichte'
    },
    '/galerie': {
      cs: '/galerie',
      de: '/galerie'
    },
    '/akce': {
      cs: '/akce',
      de: '/veranstaltungen'
    },
    '/akce/[slug]': {
      cs: '/akce/[slug]',
      de: '/veranstaltungen/[slug]'
    },
    '/rod': {
      cs: '/rod',
      de: '/familie'
    },
    '/svatby': {
      cs: '/svatby',
      de: '/hochzeiten'
    }
  }
})
