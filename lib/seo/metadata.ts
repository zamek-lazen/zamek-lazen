import type { Metadata } from 'next'
import {
  APP_LOCALES,
  BRAND_NAME,
  DEFAULT_LOCALE,
  OG_IMAGE_PATH,
  ROUTE_PATHS,
  SITE_URL,
  type AppLocale,
  type StaticRouteKey
} from '@/lib/seo/constants'

type BuildMetadataInput = {
  locale: AppLocale
  page: StaticRouteKey
  title: string
  description: string
  imageUrl?: string
  keywords?: string[]
}

type BuildEventMetadataInput = {
  locale: AppLocale
  slug: string
  title: string
  description: string
  imageUrl?: string
  keywords?: string[]
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function truncateText(value: string, maxLength = 160) {
  const normalized = normalizeWhitespace(value)

  if (normalized.length <= maxLength) {
    return normalized
  }

  const candidate = normalized.slice(0, maxLength - 3)
  const lastSpace = candidate.lastIndexOf(' ')

  if (lastSpace < 80) {
    return `${candidate.trim()}...`
  }

  return `${candidate.slice(0, lastSpace).trim()}...`
}

export function getBrandName(locale: AppLocale) {
  return BRAND_NAME[locale]
}

export function getLocalePrefix(locale: AppLocale) {
  return `/${locale}` as const
}

export function getStaticPagePath(locale: AppLocale, page: StaticRouteKey) {
  return `${getLocalePrefix(locale)}${ROUTE_PATHS[page][locale]}` || '/'
}

export function getEventDetailPath(locale: AppLocale, slug: string) {
  return `${getLocalePrefix(locale)}${ROUTE_PATHS.events[locale]}/${slug}`
}

export function getAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export function getStaticPageUrl(locale: AppLocale, page: StaticRouteKey) {
  return getAbsoluteUrl(getStaticPagePath(locale, page))
}

export function getEventDetailUrl(locale: AppLocale, slug: string) {
  return getAbsoluteUrl(getEventDetailPath(locale, slug))
}

export function getAlternateLanguageUrls(page: StaticRouteKey) {
  const languages = Object.fromEntries(
    APP_LOCALES.map((locale) => [locale, getStaticPageUrl(locale, page)])
  )

  return {
    ...languages,
    'x-default': getStaticPageUrl(DEFAULT_LOCALE, page)
  }
}

export function getEventAlternateLanguageUrls(slug: string) {
  const languages = Object.fromEntries(
    APP_LOCALES.map((locale) => [locale, getEventDetailUrl(locale, slug)])
  )

  return {
    ...languages,
    'x-default': getEventDetailUrl(DEFAULT_LOCALE, slug)
  }
}

export function getOpenGraphLocale(locale: AppLocale) {
  return locale === 'de' ? 'de_DE' : 'cs_CZ'
}

export function getDefaultOgImageUrl() {
  return getAbsoluteUrl(OG_IMAGE_PATH)
}

function createMetadataTitle(locale: AppLocale, title: string) {
  const normalizedTitle = normalizeWhitespace(title)
  const brand = getBrandName(locale)

  return normalizedTitle === brand ? normalizedTitle : `${normalizedTitle} | ${brand}`
}

function createSharedMetadata({
  canonicalUrl,
  description,
  imageUrl,
  keywords,
  locale,
  title
}: {
  canonicalUrl: string
  description: string
  imageUrl?: string
  keywords?: string[]
  locale: AppLocale
  title: string
}): Pick<Metadata, 'description' | 'keywords' | 'openGraph' | 'robots' | 'twitter'> {
  const normalizedDescription = truncateText(description)
  const finalTitle = createMetadataTitle(locale, title)
  const finalImageUrl = imageUrl ?? getDefaultOgImageUrl()

  return {
    description: normalizedDescription,
    keywords,
    openGraph: {
      type: 'website',
      title: finalTitle,
      description: normalizedDescription,
      url: canonicalUrl,
      siteName: getBrandName(locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: APP_LOCALES.filter((item) => item !== locale).map(
        getOpenGraphLocale
      ),
      images: [
        {
          url: finalImageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle
        }
      ]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
      }
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: normalizedDescription,
      images: [finalImageUrl]
    }
  }
}

export function buildPageMetadata({
  locale,
  page,
  title,
  description,
  imageUrl,
  keywords
}: BuildMetadataInput): Metadata {
  const canonicalUrl = getStaticPageUrl(locale, page)

  return {
    title: createMetadataTitle(locale, title),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguageUrls(page)
    },
    ...createSharedMetadata({
      canonicalUrl,
      description,
      imageUrl,
      keywords,
      locale,
      title
    })
  }
}

export function buildEventMetadata({
  locale,
  slug,
  title,
  description,
  imageUrl,
  keywords
}: BuildEventMetadataInput): Metadata {
  const canonicalUrl = getEventDetailUrl(locale, slug)

  return {
    title: createMetadataTitle(locale, title),
    alternates: {
      canonical: canonicalUrl,
      languages: getEventAlternateLanguageUrls(slug)
    },
    ...createSharedMetadata({
      canonicalUrl,
      description,
      imageUrl,
      keywords,
      locale,
      title
    })
  }
}
