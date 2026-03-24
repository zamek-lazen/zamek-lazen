import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {eventType} from './eventType'
import {localizedStringType} from './localizedStringType'
import {localizedTextType} from './localizedTextType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    localizedStringType,
    localizedTextType,
    eventType,
  ],
}
