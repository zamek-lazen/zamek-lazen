'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { Link, usePathname } from '@/i18n/navigation'
import { navItems } from '@/components/shared/nav-items'

type StaticPathname =
  | '/'
  | '/kontakt'
  | '/historie'
  | '/galerie'
  | '/akce'
  | '/rod'
  | '/svatby'

export function Navbar() {
  const t = useTranslations('Nav')
  const pathname = usePathname()
  const params = useParams<{ slug?: string }>()
  const locale = useLocale()
  const nextLocale = locale === 'de' ? 'cs' : 'de'
  const isHomePage = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 36)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isFloatingOverHero = isHomePage && !isScrolled
  const headerClassName =
    isFloatingOverHero ?
      'border-transparent bg-transparent shadow-none'
    : 'border-[rgba(185,212,197,0.14)] bg-[linear-gradient(180deg,rgba(6,22,17,0.94),rgba(6,22,17,0.82))] shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-[14px]'
  const localeHref:
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
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b text-mist-100 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${headerClassName}`}
    >
      <div className='relative mx-auto w-full max-w-[94rem] px-3 pt-3 pb-2 md:px-8 md:pt-4 md:pb-3'>
        <div className='flex items-center justify-between gap-4'>
          <Link
            href='/'
            className='pointer-events-auto flex items-center gap-2.5 text-mist-200 transition hover:text-mist-50'
          >
            <Image
              src='/images/branding/castle-crest.webp'
              alt='Erb Zámku Lázeň'
              width={34}
              height={34}
              className='h-8 w-8 rounded-full border border-[rgba(236,241,236,0.28)] bg-[rgba(0,0,0,0.14)] object-cover p-0.5 md:h-9 md:w-9'
              priority
            />
            <span className='flex flex-col leading-none'>
              <span className='text-[0.58rem] tracking-[0.34em] md:text-[0.65rem] md:tracking-[0.42em]'>
                ZÁMEK LÁZEŇ
              </span>
              <span className='mt-1 text-[0.45rem] tracking-[0.28em] text-mist-300 md:text-[0.5rem]'>
                CHUDENICE
              </span>
            </span>
          </Link>

          <nav className='pointer-events-auto hidden items-center gap-4 text-[0.85rem] tracking-[0.2em] uppercase md:flex lg:gap-6'>
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`border-b border-transparent pb-1 transition ${
                    isActive ?
                      'border-mist-100 font-bold text-mist-50'
                    : 'text-mist-300 hover:text-mist-100'
                  }`}
                >
                  {t(item.key)}
                </Link>
              )
            })}
          </nav>

          <Link
            href={localeHref}
            locale={nextLocale}
            className={`pointer-events-auto flex items-center gap-2 rounded-full border px-3 py-1 text-[0.58rem] tracking-[0.16em] text-mist-200 transition md:text-[0.65rem] md:tracking-[0.2em] ${
              isFloatingOverHero ?
                'border-[rgba(255,255,255,0.18)] bg-[rgba(4,17,13,0.16)] backdrop-blur-sm hover:border-mist-300 hover:text-mist-50'
              : 'border-border-soft bg-black/15 backdrop-blur-sm hover:border-mist-300 hover:text-mist-50'
            }`}
          >
            <span className={locale === 'cs' ? 'text-mist-50' : 'opacity-60'}>
              CS
            </span>
            <span>/</span>
            <span className={locale === 'de' ? 'text-mist-50' : 'opacity-60'}>
              DE
            </span>
          </Link>
        </div>

        <nav className='pointer-events-auto mt-2 flex items-center gap-3 overflow-x-auto pr-6 pb-1 text-[0.55rem] tracking-[0.13em] text-mist-300 uppercase [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden'>
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`border-b pb-1 whitespace-nowrap transition ${
                  isActive ?
                    'border-mist-100 font-bold text-mist-50'
                  : 'border-transparent'
                }`}
              >
                {t(item.key)}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
