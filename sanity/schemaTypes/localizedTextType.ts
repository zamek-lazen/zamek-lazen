import {defineField, defineType} from 'sanity'

export const localizedTextType = defineType({
  name: 'localizedText',
  title: 'Lokalizovaný delší text',
  type: 'object',
  fields: [
    defineField({
      name: 'cs',
      title: 'Čeština',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'de',
      title: 'Deutsch',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required(),
    }),
  ],
})
