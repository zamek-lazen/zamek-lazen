import { cache } from 'react'
import { groq } from 'next-sanity'

import type { SiteContactPerson } from '@/types'

import { client } from './client'

type Locale = 'cs' | 'de'

const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    "contacts": contacts[] {
      "name": select(
        $locale == "de" => coalesce(name.de, name.cs),
        coalesce(name.cs, name.de)
      ),
      phone
    }
  }
`

type RawSettings = {
  contacts: { name?: string | null; phone?: string | null }[] | null
} | null

const fetchSiteSettings = cache(async (locale: Locale) => {
  return client.fetch<RawSettings>(
    SITE_SETTINGS_QUERY,
    { locale },
    { next: { revalidate: 60 } }
  )
})

function normalizeContacts(
  raw: { name?: string | null; phone?: string | null }[] | null | undefined
): SiteContactPerson[] {
  if (!Array.isArray(raw)) {
    return []
  }

  return raw
    .map((row) => ({
      name: typeof row.name === 'string' ? row.name.trim() : '',
      phone: typeof row.phone === 'string' ? row.phone.trim() : ''
    }))
    .filter((row) => row.name.length > 0 && row.phone.length > 0)
}

/** Kontaktní osoby z dokumentu `siteSettings` v Sanity. */
export async function getSiteContactPeople(
  locale: Locale
): Promise<SiteContactPerson[]> {
  const settings = await fetchSiteSettings(locale)
  return normalizeContacts(settings?.contacts)
}
