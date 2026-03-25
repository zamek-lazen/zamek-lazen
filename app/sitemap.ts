import type { MetadataRoute } from 'next'
import {
  APP_LOCALES,
  type StaticRouteKey
} from '@/lib/seo/constants'
import { getEventDetailUrl, getStaticPageUrl } from '@/lib/seo/metadata'
import { getEventSitemapEntries } from '@/sanity/lib/events'

const STATIC_ROUTES: StaticRouteKey[] = [
  'home',
  'history',
  'family',
  'weddings',
  'events',
  'gallery',
  'contact'
]

function buildStaticEntries(): MetadataRoute.Sitemap {
  return APP_LOCALES.flatMap((locale) =>
    STATIC_ROUTES.map((page) => ({
      url: getStaticPageUrl(locale, page),
      changeFrequency: page === 'home' ? 'weekly' : 'monthly',
      priority: page === 'home' ? 1 : 0.8
    }))
  )
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = buildStaticEntries()
  const eventEntries = await getEventSitemapEntries()

  const localizedEventEntries = eventEntries.flatMap((event) =>
    APP_LOCALES.map((locale) => ({
      url: getEventDetailUrl(locale, event.slug),
      lastModified: event.date,
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }))
  )

  return [...staticEntries, ...localizedEventEntries]
}
