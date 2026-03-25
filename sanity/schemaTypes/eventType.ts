import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

function isValidStartTime(value: string) {
  return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)
}

function isValidYouTubeUrl(value: string) {
  let url: URL

  try {
    url = new URL(value)
  } catch {
    return false
  }

  const hostname = url.hostname.toLowerCase()

  if (hostname === 'youtu.be' || hostname === 'www.youtu.be') {
    return /^[A-Za-z0-9_-]{11}$/.test(url.pathname.replace('/', ''))
  }

  if (
    hostname === 'youtube.com' ||
    hostname === 'www.youtube.com' ||
    hostname === 'm.youtube.com' ||
    hostname === 'youtube-nocookie.com' ||
    hostname === 'www.youtube-nocookie.com'
  ) {
    if (url.pathname.startsWith('/watch')) {
      return /^[A-Za-z0-9_-]{11}$/.test(url.searchParams.get('v') ?? '')
    }

    const segments = url.pathname.split('/').filter(Boolean)
    const videoId = segments.at(-1)

    return videoId ? /^[A-Za-z0-9_-]{11}$/.test(videoId) : false
  }

  return false
}

export const eventType = defineType({
  name: 'event',
  title: 'Akce',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nadpis',
      type: 'localizedString',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY'
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'startTime',
      title: 'Začátek',
      type: 'string',
      description: 'Volitelný čas začátku ve formátu HH:mm.',
      validation: (rule) =>
        rule.custom((value) => {
          if (typeof value !== 'string' || value.trim().length === 0) {
            return true
          }

          return isValidStartTime(value) ? true : 'Použijte formát HH:mm.'
        })
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Použije se v URL detailu akce.',
      options: {
        source: 'title.cs'
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'localizedText',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'recap',
      title: 'Recap po akci',
      type: 'localizedBlockContent',
      description:
        'Krátké shrnutí proběhlé akce. Zobrazí se hlavně u minulých termínů.'
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube video',
      type: 'url',
      description: 'Volitelný odkaz na recap nebo záznam akce z YouTube.',
      validation: (rule) =>
        rule.custom((value) => {
          if (typeof value !== 'string' || value.trim().length === 0) {
            return true
          }

          return isValidYouTubeUrl(value) ?
              true
            : 'Zadejte platný YouTube odkaz.'
        })
    }),
    defineField({
      name: 'image',
      title: 'Obrázek',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'smsticketEmbedCode',
      title: 'smsticket iframe',
      type: 'text',
      rows: 8,
      validation: (rule) =>
        rule.custom((value) => {
          if (typeof value !== 'string' || value.trim().length === 0) {
            return true
          }

          return value.includes('<iframe') ? true : (
              'Vložte celý iframe kód ze smsticketu.'
            )
        })
    })
  ],
  preview: {
    select: {
      date: 'date',
      startTime: 'startTime',
      titleCs: 'title.cs',
      titleDe: 'title.de',
      media: 'image'
    },
    prepare({ date, media, startTime, titleCs, titleDe }) {
      const formattedDate =
        date ?
          new Intl.DateTimeFormat('cs-CZ', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).format(new Date(`${date}T00:00:00`))
        : 'Bez data'

      const subtitle = startTime ? `${formattedDate} • ${startTime}` : formattedDate

      return {
        title: titleCs ?? titleDe ?? 'Bez názvu',
        subtitle: titleDe ? `${subtitle} • DE: ${titleDe}` : subtitle,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Datum vzestupně',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }]
    },
    {
      title: 'Datum sestupně',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    }
  ]
})
