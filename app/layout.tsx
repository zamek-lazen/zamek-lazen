import type { Metadata } from 'next'
import { Bodoni_Moda, Arizonia, Cormorant_Garamond } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'Zámek Lázeň',
  description: 'Webová prezentace Zámku Lázeň v Chudenicích',
  icons: {
    icon: '/images/branding/castle-crest.png',
    shortcut: '/images/branding/castle-crest.png',
    apple: '/images/branding/castle-crest.png'
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

        {children}
      </body>
    </html>
  )
}
