import type { Metadata } from 'next'
import { Bodoni_Moda, Arizonia, Cormorant_Garamond } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { OG_IMAGE_PATH, SITE_URL } from '@/lib/seo/constants'
import './globals.css'

/** Cormorant Garamond — běžný text (UI, odstavce, navigace) */
const primaryFont = Cormorant_Garamond({
  variable: '--font-primary',
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

/** Bodoni Moda — podnadpisy (.editorial-subheading, .editorial-card-title) */
const titleFont = Bodoni_Moda({
  variable: '--font-title',
  subsets: ['latin'],
  weight: ['400', '500', '600']
})

/** Arizonia — hlavní nadpisy (.editorial-title) */
const scriptFont = Arizonia({
  variable: '--font-script-family',
  subsets: ['latin', 'latin-ext'],
  weight: ['400']
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Zámek Lázeň',
  description:
    'Zámek Lázeň v Chudenicích: historie rodu Czerninů, svatby, kulturní akce, galerie a kontakt.',
  applicationName: 'Zámek Lázeň',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/erb.png'
  },
  openGraph: {
    type: 'website',
    title: 'Zámek Lázeň',
    description:
      'Zámek Lázeň v Chudenicích: historie rodu Czerninů, svatby, kulturní akce, galerie a kontakt.',
    url: SITE_URL,
    siteName: 'Zámek Lázeň',
    locale: 'cs_CZ',
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: 'Zámek Lázeň'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zámek Lázeň',
    description:
      'Zámek Lázeň v Chudenicích: historie rodu Czerninů, svatby, kulturní akce, galerie a kontakt.',
    images: [OG_IMAGE_PATH]
  },
  robots: {
    index: true,
    follow: true
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={`${primaryFont.variable} ${titleFont.variable} ${scriptFont.variable}`}
    >
      <body className='antialiased'>
        <Analytics />
        <SpeedInsights />

        {children}
      </body>
    </html>
  )
}
