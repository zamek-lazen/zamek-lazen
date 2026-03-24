import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

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
      titleCs: 'title.cs',
      titleDe: 'title.de',
      media: 'image'
    },
    prepare({ date, media, titleCs, titleDe }) {
      const formattedDate =
        date ?
          new Intl.DateTimeFormat('cs-CZ', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).format(new Date(`${date}T00:00:00`))
        : 'Bez data'

      return {
        title: titleCs ?? titleDe ?? 'Bez názvu',
        subtitle: titleDe ? `${formattedDate} • DE: ${titleDe}` : formattedDate,
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
