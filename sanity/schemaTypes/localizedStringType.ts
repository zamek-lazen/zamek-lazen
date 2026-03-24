import { defineField, defineType } from 'sanity'

export const localizedStringType = defineType({
  name: 'localizedString',
  title: 'Lokalizovaný krátký text',
  type: 'object',
  fields: [
    defineField({
      name: 'cs',
      title: 'Čeština',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'de',
      title: 'Deutsch',
      type: 'string',
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      title: 'cs',
      subtitle: 'de'
    },
    prepare({ subtitle, title }: { subtitle?: string; title?: string }) {
      return {
        title: title ?? 'Bez českého názvu',
        subtitle: subtitle ? `DE: ${subtitle}` : 'Chybí německý překlad'
      }
    }
  }
})
