import { defineField, defineType } from 'sanity'

export const localizedBlockContentType = defineType({
  name: 'localizedBlockContent',
  title: 'Lokalizovaný blokový obsah',
  type: 'object',
  fields: [
    defineField({
      name: 'cs',
      title: 'Čeština',
      type: 'blockContent'
    }),
    defineField({
      name: 'de',
      title: 'Němčina',
      type: 'blockContent'
    })
  ]
})
