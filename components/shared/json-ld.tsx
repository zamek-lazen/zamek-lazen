import Script from 'next/script'
import type { SchemaNode } from '@/lib/seo/schema'

type JsonLdProps = {
  data: SchemaNode | SchemaNode[]
  id: string
}

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <Script
      id={id}
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c')
      }}
    />
  )
}
