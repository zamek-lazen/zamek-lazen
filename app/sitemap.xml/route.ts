import type { MetadataRoute } from 'next'
import { getEventDetailUrl, getStaticPageUrl } from '@/lib/seo/metadata'
import { APP_LOCALES, type StaticRouteKey } from '@/lib/seo/constants'
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

export const revalidate = 3600

type SitemapEntry = {
  url: string
  lastModified?: string
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']
  priority?: number
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function isIsoDate(value: string): boolean {
  // Expected: YYYY-MM-DD (Sitemap lastmod format)
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function buildUrlNode(entry: SitemapEntry): string {
  const parts: string[] = []
  parts.push(`<url>`)
  parts.push(`<loc>${escapeXml(entry.url)}</loc>`)

  if (entry.lastModified && isIsoDate(entry.lastModified)) {
    parts.push(`<lastmod>${escapeXml(entry.lastModified)}</lastmod>`)
  }

  if (entry.changeFrequency) {
    parts.push(
      `<changefreq>${escapeXml(entry.changeFrequency.toLowerCase())}</changefreq>`
    )
  }

  if (typeof entry.priority === 'number' && Number.isFinite(entry.priority)) {
    parts.push(`<priority>${entry.priority}</priority>`)
  }

  parts.push(`</url>`)
  return parts.join('')
}

function buildStaticEntries(): SitemapEntry[] {
  return APP_LOCALES.flatMap((locale) =>
    STATIC_ROUTES.map((page) => ({
      url: getStaticPageUrl(locale, page),
      changeFrequency: page === 'home' ? 'weekly' : 'monthly',
      priority: page === 'home' ? 1 : 0.8
    }))
  )
}

export async function GET(): Promise<Response> {
  const staticEntries = buildStaticEntries()

  // Hard fallback: even if Sanity fails, we still return a valid sitemap.
  let eventEntries: Awaited<ReturnType<typeof getEventSitemapEntries>> = []
  try {
    eventEntries = await getEventSitemapEntries()
  } catch (error) {
    console.error('Failed to fetch event sitemap entries', error)
  }

  const localizedEventEntries: SitemapEntry[] = eventEntries.flatMap(
    (event) =>
      APP_LOCALES.map((locale) => ({
        url: getEventDetailUrl(locale, event.slug),
        lastModified: event.date,
        changeFrequency: 'weekly',
        priority: 0.7
      }))
  )

  const entriesXml = [...staticEntries, ...localizedEventEntries]
    .map(buildUrlNode)
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entriesXml}</urlset>\n`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}

