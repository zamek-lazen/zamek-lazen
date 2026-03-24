'use client'

import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import { Link, usePathname } from '@/i18n/navigation'

type StaticPathname =
  | '/'
  | '/kontakt'
  | '/historie'
  | '/galerie'
  | '/akce'
  | '/rod'
  | '/svatby'

export function FooterLocaleSwitch() {
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams<{ slug?: string }>()
  const nextLocale = locale === 'de' ? 'cs' : 'de'
  const href:
    | StaticPathname
    | { pathname: '/akce/[slug]'; params: { slug: string } } =
    pathname === '/akce/[slug]' && typeof params.slug === 'string' ?
      {
        pathname: '/akce/[slug]',
        params: { slug: params.slug }
      }
    : pathname === '/akce/[slug]' ? '/akce'
    : pathname

  return (
    <Link
      href={href}
      locale={nextLocale}
      className='inline-flex items-center gap-2 text-[0.62rem] tracking-[0.18em] text-mist-300 uppercase transition hover:text-mist-50'
    >
      <span className={locale === 'cs' ? 'text-mist-50' : 'opacity-60'}>
        CS
      </span>
      <span>/</span>
      <span className={locale === 'de' ? 'text-mist-50' : 'opacity-60'}>
        DE
      </span>
    </Link>
  )
}
