import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/shared/json-ld'
import { routing } from '@/i18n/routing'
import { getStaticPageUrl } from '@/lib/seo/metadata'
import {
  buildCastleSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
  createJsonLdId
} from '@/lib/seo/schema'
import { getSiteContactPeople } from '@/sanity/lib/site-settings'
import { Footer } from '@/components/shared/footer'
import { MainContent } from '@/components/shared/main-content'
import { Navbar } from '@/components/shared/navbar'

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const [contactPeople, messages, tContact, tFooter] = await Promise.all([
    getSiteContactPeople(locale),
    getMessages(),
    getTranslations('ContactPage'),
    getTranslations('Footer')
  ])
  const homeUrl = getStaticPageUrl(locale, 'home')
  const siteName = locale === 'de' ? 'Schloss Lázeň' : 'Zámek Lázeň'
  const sharedDescription = tFooter('body')
  const sharedSchema = [
    buildWebsiteSchema({
      locale,
      name: siteName,
      description: sharedDescription,
      url: homeUrl
    }),
    buildOrganizationSchema({
      locale,
      name: tContact('company'),
      url: homeUrl,
      contactPoints: contactPeople.map((person) => ({
        name: person.name,
        telephone: person.phone
      }))
    }),
    buildCastleSchema({
      locale,
      name: siteName,
      description: sharedDescription,
      url: homeUrl
    })
  ]

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd
        id={createJsonLdId(`site-${locale}`)}
        data={sharedSchema}
      />
      <div className='bg-background text-foreground flex min-h-screen flex-col'>
        <Navbar />
        <MainContent>{children}</MainContent>
        <Footer />
      </div>
    </NextIntlClientProvider>
  )
}
