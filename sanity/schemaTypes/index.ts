import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { eventType } from './eventType'
import { siteSettingsType } from './siteSettingsType'
import { localizedBlockContentType } from './localizedBlockContentType'
import { localizedStringType } from './localizedStringType'
import { localizedTextType } from './localizedTextType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    localizedBlockContentType,
    localizedStringType,
    localizedTextType,
    eventType,
    siteSettingsType
  ]
}
