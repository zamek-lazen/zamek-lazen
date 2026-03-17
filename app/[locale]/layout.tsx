import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/shared/site-header'
import { routing } from '@/i18n/routing'

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <div className='min-h-screen bg-background text-foreground'>
        <SiteHeader />
        <main className='mx-auto w-full max-w-368 px-4 pb-20 pt-28 md:px-8 md:pt-32'>
          {children}
        </main>
      </div>
    </NextIntlClientProvider>
  )
}
