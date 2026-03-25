import { cache } from 'react'
import { groq } from 'next-sanity'
import type { LocalizedEvent } from '@/types'
import { client } from './client'

type Locale = 'cs' | 'de'

type RawEvent = {
  _id: string
  date: string
  description: string
  image?: LocalizedEvent['image']
  recap?: LocalizedEvent['recap']
  slug: string
  smsticketEmbedCode?: string
  startTime?: string
  title: string
  youtubeUrl?: string
}

type EventSitemapEntry = {
  date: string
  slug: string
}

const EVENT_PROJECTION = `
  _id,
  date,
  startTime,
  image,
  "slug": slug.current,
  smsticketEmbedCode,
  youtubeUrl,
  "title": select($locale == "de" => coalesce(title.de, title.cs), coalesce(title.cs, title.de)),
  "description": select($locale == "de" => coalesce(description.de, description.cs), coalesce(description.cs, description.de)),
  "recap": select($locale == "de" => coalesce(recap.de, recap.cs), coalesce(recap.cs, recap.de))
`

const ALL_EVENTS_QUERY = groq`
  *[_type == "event" && defined(date) && defined(slug.current)]
  | order(date asc) {
    ${EVENT_PROJECTION}
  }
`

const EVENT_BY_SLUG_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0] {
    ${EVENT_PROJECTION}
  }
`

const EVENT_SITEMAP_QUERY = groq`
  *[_type == "event" && defined(date) && defined(slug.current)]
  | order(date asc) {
    date,
    "slug": slug.current
  }
`

function getPragueNow() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Prague',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  })
  const parts = formatter.formatToParts(new Date())
  const year = parts.find((part) => part.type === 'year')?.value ?? '0000'
  const month = parts.find((part) => part.type === 'month')?.value ?? '01'
  const day = parts.find((part) => part.type === 'day')?.value ?? '01'
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? '0')
  const minute = Number(
    parts.find((part) => part.type === 'minute')?.value ?? '0'
  )

  return {
    minutes: hour * 60 + minute,
    today: `${year}-${month}-${day}`
  }
}

function isValidStartTime(startTime?: string) {
  return typeof startTime === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(startTime)
}

function getStartTimeInMinutes(startTime?: string) {
  if (typeof startTime !== 'string' || !isValidStartTime(startTime)) {
    return null
  }

  const [hours, minutes] = startTime.split(':').map(Number)
  return hours * 60 + minutes
}

function isPastEvent(date: string, startTime?: string) {
  const { minutes: nowInMinutes, today } = getPragueNow()

  if (date < today) {
    return true
  }

  if (date > today) {
    return false
  }

  const startTimeInMinutes = getStartTimeInMinutes(startTime)

  return startTimeInMinutes === null ? false : startTimeInMinutes <= nowInMinutes
}

function mapEvent(event: RawEvent): LocalizedEvent {
  return {
    id: event._id,
    slug: event.slug,
    title: event.title,
    description: event.description,
    date: event.date,
    startTime: event.startTime,
    recap: event.recap,
    youtubeUrl: event.youtubeUrl,
    isPast: isPastEvent(event.date, event.startTime),
    image: event.image,
    smsticketEmbedCode: event.smsticketEmbedCode
  }
}

const fetchEvents = cache(async (locale: Locale) => {
  const events = await client.fetch<RawEvent[]>(
    ALL_EVENTS_QUERY,
    { locale },
    { next: { revalidate: 60 } }
  )

  return events.map(mapEvent)
})

function sortUpcomingEvents(events: LocalizedEvent[]) {
  return [...events].sort((left, right) => {
    if (left.date !== right.date) {
      return left.date.localeCompare(right.date)
    }

    const leftTime = getStartTimeInMinutes(left.startTime) ?? Number.MAX_SAFE_INTEGER
    const rightTime =
      getStartTimeInMinutes(right.startTime) ?? Number.MAX_SAFE_INTEGER

    return leftTime - rightTime
  })
}

function sortPastEvents(events: LocalizedEvent[]) {
  return [...events].sort((left, right) => {
    if (left.date !== right.date) {
      return right.date.localeCompare(left.date)
    }

    const leftTime = getStartTimeInMinutes(left.startTime) ?? -1
    const rightTime = getStartTimeInMinutes(right.startTime) ?? -1

    return rightTime - leftTime
  })
}

export async function getUpcomingEvents(locale: Locale, limit?: number) {
  const events = await fetchEvents(locale)
  const upcomingEvents = sortUpcomingEvents(events.filter((event) => !event.isPast))

  return typeof limit === 'number' ? upcomingEvents.slice(0, limit) : upcomingEvents
}

export async function getPastEvents(locale: Locale, limit?: number) {
  const events = await fetchEvents(locale)
  const pastEvents = sortPastEvents(events.filter((event) => event.isPast))

  return typeof limit === 'number' ? pastEvents.slice(0, limit) : pastEvents
}

export async function getEventsByStatus(locale: Locale) {
  const events = await fetchEvents(locale)

  return {
    pastEvents: sortPastEvents(events.filter((event) => event.isPast)),
    upcomingEvents: sortUpcomingEvents(events.filter((event) => !event.isPast))
  }
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
  const event = await client.fetch<RawEvent | null>(
    EVENT_BY_SLUG_QUERY,
    { locale, slug },
    { next: { revalidate: 60 } }
  )

  return event ? mapEvent(event) : null
}

export async function getEventSitemapEntries(): Promise<EventSitemapEntry[]> {
  return client.fetch<EventSitemapEntry[]>(
    EVENT_SITEMAP_QUERY,
    {},
    { next: { revalidate: 60 } }
  )
}

export function formatEventDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(`${date}T00:00:00`))
}

export function formatEventTime(startTime: string, locale: Locale) {
  const [hours, minutes] = startTime.split(':').map(Number)
  const baseDate = new Date(Date.UTC(2020, 0, 1, hours, minutes))

  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'cs-CZ', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC'
  }).format(baseDate)
}

export function formatEventDateTime(
  date: string,
  locale: Locale,
  startTime?: string
) {
  if (typeof startTime !== 'string' || !isValidStartTime(startTime)) {
    return formatEventDate(date, locale)
  }

  return `${formatEventDate(date, locale)} • ${formatEventTime(startTime, locale)}`
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

type ParsedYouTubeEmbed = {
  src: string
  title: string
}

function getYouTubeVideoId(value: string) {
  let url: URL

  try {
    url = new URL(value)
  } catch {
    return null
  }

  const hostname = url.hostname.toLowerCase()

  if (hostname === 'youtu.be' || hostname === 'www.youtu.be') {
    const pathnameId = url.pathname.replace('/', '')
    return /^[A-Za-z0-9_-]{11}$/.test(pathnameId) ? pathnameId : null
  }

  if (
    hostname === 'youtube.com' ||
    hostname === 'www.youtube.com' ||
    hostname === 'm.youtube.com'
  ) {
    if (url.pathname === '/watch') {
      const queryId = url.searchParams.get('v') ?? ''
      return /^[A-Za-z0-9_-]{11}$/.test(queryId) ? queryId : null
    }

    const segments = url.pathname.split('/').filter(Boolean)
    const lastSegment = segments.at(-1) ?? ''

    return /^[A-Za-z0-9_-]{11}$/.test(lastSegment) ? lastSegment : null
  }

  if (
    hostname === 'youtube-nocookie.com' ||
    hostname === 'www.youtube-nocookie.com'
  ) {
    const segments = url.pathname.split('/').filter(Boolean)
    const lastSegment = segments.at(-1) ?? ''

    return /^[A-Za-z0-9_-]{11}$/.test(lastSegment) ? lastSegment : null
  }

  return null
}

export function parseYouTubeEmbedUrl(
  youtubeUrl?: string | null,
  fallbackTitle?: string
): ParsedYouTubeEmbed | null {
  if (!youtubeUrl) {
    return null
  }

  const videoId = getYouTubeVideoId(youtubeUrl)

  if (!videoId) {
    return null
  }

  return {
    src: `https://www.youtube-nocookie.com/embed/${videoId}`,
    title: fallbackTitle ?? 'YouTube video'
  }
}
