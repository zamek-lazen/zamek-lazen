'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const navItems = [
  { href: '/' as const, key: 'home' },
  { href: '/historie' as const, key: 'history' },
  { href: '/rod' as const, key: 'family' },
  { href: '/svatby' as const, key: 'weddings' },
  { href: '/akce' as const, key: 'events' },
  { href: '/galerie' as const, key: 'gallery' },
  { href: '/kontakt' as const, key: 'contact' },
] as const

export function SiteHeader() {
  const t = useTranslations('Nav')
  const pathname = usePathname()
  const locale = useLocale()
  const nextLocale = locale === 'de' ? 'cs' : 'de'

  return (
    <header className='fixed inset-x-0 top-0 z-50 text-[var(--color-mist-100)]'>
      <div
        className='relative mx-auto w-full max-w-[94rem] px-3 pb-2 pt-3 md:px-8 md:pb-3 md:pt-4'
        style={{ textShadow: '0 1px 10px rgba(0, 0, 0, 0.28)' }}
      >
        <div className='flex items-center justify-between gap-4'>
          <Link
            href='/'
            className='pointer-events-auto flex items-center gap-2.5 text-[var(--color-mist-200)] transition hover:text-[var(--color-mist-50)]'
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
                ZAMEK LAZEN
              </span>
              <span className='mt-1 text-[0.45rem] tracking-[0.28em] text-[var(--color-mist-300)] md:text-[0.5rem]'>
                CHUDENICE
              </span>
            </span>
          </Link>

          <nav className='pointer-events-auto hidden items-center gap-4 text-[0.64rem] uppercase tracking-[0.2em] md:flex lg:gap-6'>
            {navItems.map(item => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b border-transparent pb-1 transition ${
                    isActive
                      ? 'border-[var(--color-mist-100)] text-[var(--color-mist-50)]'
                      : 'text-[var(--color-mist-300)] hover:text-[var(--color-mist-100)]'
                  }`}
                >
                  {t(item.key)}
                </Link>
              )
            })}
          </nav>

          <Link
            href={pathname}
            locale={nextLocale}
            className='pointer-events-auto flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-black/15 px-3 py-1 text-[0.58rem] tracking-[0.16em] text-[var(--color-mist-200)] backdrop-blur-sm transition hover:border-[var(--color-mist-300)] hover:text-[var(--color-mist-50)] md:text-[0.65rem] md:tracking-[0.2em]'
          >
            <span className={locale === 'cs' ? 'text-[var(--color-mist-50)]' : 'opacity-60'}>
              CS
            </span>
            <span>/</span>
            <span className={locale === 'de' ? 'text-[var(--color-mist-50)]' : 'opacity-60'}>
              DE
            </span>
          </Link>
        </div>

        <nav className='pointer-events-auto mt-2 flex items-center gap-3 overflow-x-auto pb-1 pr-6 text-[0.55rem] uppercase tracking-[0.13em] text-[var(--color-mist-300)] [scrollbar-width:none] [-ms-overflow-style:none] md:hidden [&::-webkit-scrollbar]:hidden'>
          {navItems.map(item => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap border-b pb-1 transition ${
                  isActive
                    ? 'border-[var(--color-mist-100)] text-[var(--color-mist-50)]'
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
