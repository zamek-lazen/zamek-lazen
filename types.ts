import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export type HomepageSpotlightLink = {
  href: '/historie' | '/rod' | '/svatby' | '/akce' | '/galerie'
  title: string
  description: string
}

export type EventDetailHref = {
  pathname: '/akce/[slug]'
  params: {
    slug: string
  }
}

export type HomepageEventPreview = {
  title: string
  label: string
  href: '/akce' | EventDetailHref
}

export type HomepageCopy = {
  eyebrow: string
  title: string
  lead: string
  description: string
  highlightsTitle: string
  ctaHistory: string
  ctaContact: string
}

export type LocalizedEvent = {
  id: string
  slug: string
  title: string
  description: string
  date: string
  image?: SanityImageSource
  smsticketEmbedCode?: string
}

export type HeroUpcomingEvent = {
  label: string
  title: string
  date: string
  href: EventDetailHref
  cta: string
}
