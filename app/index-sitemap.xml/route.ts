import { getSitemapEntries, serializeSitemapXml } from '@/lib/sitemap'

export const revalidate = 60

export async function GET() {
  const entries = await getSitemapEntries()
  const xml = serializeSitemapXml(entries)
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  })
}
