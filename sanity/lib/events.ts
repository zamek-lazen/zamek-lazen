import { groq } from 'next-sanity'
import type { LocalizedEvent } from '@/types'
import { client } from './client'

type Locale = 'cs' | 'de'

const EVENT_PROJECTION = `
  _id,
  date,
  image,
  "slug": slug.current,
  smsticketEmbedCode,
  "title": select($locale == "de" => coalesce(title.de, title.cs), coalesce(title.cs, title.de)),
  "description": select($locale == "de" => coalesce(description.de, description.cs), coalesce(description.cs, description.de))
`

const UPCOMING_EVENTS_QUERY = groq`
  *[_type == "event" && defined(date) && defined(slug.current) && date >= $today]
  | order(date asc) {
    ${EVENT_PROJECTION}
  }[$offset...$end]
`

const EVENT_BY_SLUG_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0] {
    ${EVENT_PROJECTION}
  }
`

function getTodayInPrague() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Prague',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  const parts = formatter.formatToParts(new Date())
  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const day = parts.find((part) => part.type === 'day')?.value

  return `${year}-${month}-${day}`
}

function mapEvent(event: {
  _id: string
  date: string
  description: string
  image?: LocalizedEvent['image']
  slug: string
  smsticketEmbedCode?: string
  title: string
}): LocalizedEvent {
  return {
    id: event._id,
    slug: event.slug,
    title: event.title,
    description: event.description,
    date: event.date,
    image: event.image,
    smsticketEmbedCode: event.smsticketEmbedCode
  }
}

export async function getUpcomingEvents(locale: Locale, limit?: number) {
  const today = getTodayInPrague()
  const safeLimit = typeof limit === 'number' ? Math.max(limit, 0) : undefined
  const offset = 0
  const end = safeLimit === undefined ? 100 : safeLimit
  const events = await client.fetch<
    Array<{
      _id: string
      date: string
      description: string
      image?: LocalizedEvent['image']
      slug: string
      smsticketEmbedCode?: string
      title: string
    }>
  >(
    UPCOMING_EVENTS_QUERY,
    { end, locale, offset, today },
    { next: { revalidate: 60 } }
  )

  return events.map(mapEvent)
}

export async function getNearestEvent(
  locale: Locale
): Promise<LocalizedEvent | null> {
  const [event] = await getUpcomingEvents(locale, 1)
  return event ?? null
}

export async function getEventBySlug(
  locale: Locale,
  slug: string
): Promise<LocalizedEvent | null> {
  const event = await client.fetch<{
    _id: string
    date: string
    description: string
    image?: LocalizedEvent['image']
    slug: string
    smsticketEmbedCode?: string
    title: string
  } | null>(EVENT_BY_SLUG_QUERY, { locale, slug }, { next: { revalidate: 60 } })

  return event ? mapEvent(event) : null
}

export function formatEventDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(`${date}T00:00:00`))
}

type ParsedSmsTicketEmbed = {
  height: number
  src: string
  title: string
}

export function parseSmsTicketEmbedCode(
  embedCode?: string | null,
  fallbackTitle?: string
): ParsedSmsTicketEmbed | null {
  if (!embedCode) {
    return null
  }

  const iframeMatch = embedCode.match(
    /<iframe\b[^>]*\bsrc=(["'])(.*?)\1[^>]*>/i
  )
  const src = iframeMatch?.[2]

  if (!src) {
    return null
  }

  let parsedUrl: URL

  try {
    parsedUrl = new URL(src)
  } catch {
    return null
  }

  if (
    parsedUrl.protocol !== 'https:' ||
    !parsedUrl.hostname.toLowerCase().includes('smsticket')
  ) {
    return null
  }

  const titleMatch = embedCode.match(/\btitle=(["'])(.*?)\1/i)
  const heightMatch = embedCode.match(/\bheight=(["']?)(\d{2,4})\1/i)

  return {
    height: heightMatch ? Number(heightMatch[2]) : 720,
    src: parsedUrl.toString(),
    title: titleMatch?.[2] ?? fallbackTitle ?? 'smsticket'
  }
}
