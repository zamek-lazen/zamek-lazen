import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  SITE_ADDRESS,
  SITE_URL,
  type AppLocale
} from '@/lib/seo/constants'

export type SchemaNode = Readonly<Record<string, unknown>>

type ContactPointInput = {
  name: string
  telephone: string
}

type WebPageSchemaInput = {
  description: string
  locale: AppLocale
  name: string
  url: string
}

type EventSchemaInput = {
  description: string
  endDate?: string
  imageUrl?: string
  isPast: boolean
  locale: AppLocale
  name: string
  startDate: string
  url: string
}

type BreadcrumbItem = {
  name: string
  url: string
}

export function createJsonLdId(id: string) {
  return `jsonld-${id}`
}

function buildPostalAddress() {
  return {
    '@type': 'PostalAddress',
    ...SITE_ADDRESS
  }
}

export function buildWebsiteSchema({
  description,
  locale,
  name,
  url
}: WebPageSchemaInput): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    inLanguage: locale,
    name,
    description,
    url
  }
}

export function buildOrganizationSchema({
  contactPoints,
  locale,
  name,
  url
}: {
  contactPoints: ContactPointInput[]
  locale: AppLocale
  name: string
  url: string
}): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name,
    url,
    email: CONTACT_EMAIL,
    inLanguage: locale,
    sameAs: [FACEBOOK_URL],
    address: buildPostalAddress(),
    contactPoint: contactPoints.map((contactPoint) => ({
      '@type': 'ContactPoint',
      contactType: 'customer support',
      name: contactPoint.name,
      telephone: contactPoint.telephone
    }))
  }
}

export function buildCastleSchema({
  description,
  imageUrl,
  locale,
  name,
  url
}: WebPageSchemaInput & { imageUrl?: string }): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'LandmarksOrHistoricalBuildings',
    '@id': `${SITE_URL}/#castle`,
    name,
    description,
    url,
    inLanguage: locale,
    image: imageUrl,
    address: buildPostalAddress(),
    email: CONTACT_EMAIL,
    sameAs: [FACEBOOK_URL]
  }
}

export function buildWebPageSchema({
  description,
  locale,
  name,
  url
}: WebPageSchemaInput): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    isPartOf: {
      '@id': `${SITE_URL}/#website`
    },
    about: {
      '@id': `${SITE_URL}/#castle`
    },
    inLanguage: locale,
    name,
    description,
    url
  }
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function buildEventSchema({
  description,
  endDate,
  imageUrl,
  isPast,
  locale,
  name,
  startDate,
  url
}: EventSchemaInput): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${url}#event`,
    name,
    description,
    url,
    image: imageUrl ? [imageUrl] : undefined,
    inLanguage: locale,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus:
      isPast ?
        'https://schema.org/EventCompleted'
      : 'https://schema.org/EventScheduled',
    startDate,
    endDate: endDate ?? startDate,
    organizer: {
      '@id': `${SITE_URL}/#organization`
    },
    location: {
      '@type': 'Place',
      name: locale === 'de' ? 'Schloss Lázeň' : 'Zámek Lázeň',
      address: buildPostalAddress()
    }
  }
}
