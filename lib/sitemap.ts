import type { MetadataRoute } from 'next'
import { APP_LOCALES, type StaticRouteKey } from '@/lib/seo/constants'
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

/** Same entries as the former `app/sitemap.ts` metadata route. */
export async function getSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = buildStaticEntries()
  let eventEntries: Awaited<ReturnType<typeof getEventSitemapEntries>> = []

  try {
    eventEntries = await getEventSitemapEntries()
  } catch (error) {
    console.error('Failed to fetch event sitemap entries', error)
  }

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

/** Mirrors Next.js sitemap XML for url / lastmod / changefreq / priority. */
export function serializeSitemapXml(data: MetadataRoute.Sitemap): string {
  let content = ''
  content += '<?xml version="1.0" encoding="UTF-8"?>\n'
  content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  for (const item of data) {
    content += '<url>\n'
    content += `<loc>${item.url}</loc>\n`
    if (item.lastModified) {
      const serializedDate =
        item.lastModified instanceof Date ?
          item.lastModified.toISOString()
        : item.lastModified
      content += `<lastmod>${serializedDate}</lastmod>\n`
    }
    if (item.changeFrequency) {
      content += `<changefreq>${item.changeFrequency}</changefreq>\n`
    }
    if (typeof item.priority === 'number') {
      content += `<priority>${item.priority}</priority>\n`
    }
    content += '</url>\n'
  }
  content += '</urlset>\n'
  return content
}
