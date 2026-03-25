import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Nastavení webu',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'contacts',
      title: 'Kontaktní osoby',
      type: 'array',
      description:
        'Zobrazí se v patičce, na stránce Kontakt a u závěrečného bloku na Svatbách. Pořadí v seznamu určuje pořadí na webu.',
      of: [
        {
          type: 'object',
          name: 'contactPerson',
          title: 'Kontakt',
          fields: [
            defineField({
              name: 'name',
              title: 'Jméno',
              type: 'localizedString',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'phone',
              title: 'Telefon',
              type: 'string',
              description: 'Včetně předvolby, např. +420 731 246 757',
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: {
              nameCs: 'name.cs',
              phone: 'phone'
            },
            prepare({ nameCs, phone }) {
              return {
                title: nameCs ?? 'Bez jména',
                subtitle: phone ?? ''
              }
            }
          }
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return { title: 'Nastavení webu' }
    }
  }
})
