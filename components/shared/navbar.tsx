'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { FacebookLink } from '@/components/shared/facebook-link'
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

type MobileNavOverlayProps = {
  open: boolean
  onClose: () => void
  pathname: string
  localeHref:
    | StaticPathname
    | { pathname: '/akce/[slug]'; params: { slug: string } }
  nextLocale: string
  locale: string
  labelNav: (key: string) => string
  labelClose: string
  menuTitle: string
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden
      className='h-5 w-5'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
    >
      {open ?
        <>
          <path d='M6 6l12 12M18 6L6 18' />
        </>
      : <>
          <path d='M5 7h14M5 12h14M5 17h14' />
        </>
      }
    </svg>
  )
}

function MobileNavOverlay({
  open,
  onClose,
  pathname,
  localeHref,
  nextLocale,
  locale,
  labelNav,
  labelClose,
  menuTitle
}: MobileNavOverlayProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const id = window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus()
    })
    return () => window.cancelAnimationFrame(id)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      id='mobile-nav-dialog'
      className='fixed inset-0 z-[60] bg-[rgba(6,22,17,0.97)] backdrop-blur-md motion-reduce:backdrop-blur-none'
      role='dialog'
      aria-modal='true'
      aria-label={menuTitle}
    >
      <div
        className='absolute inset-0 z-0 cursor-default'
        onClick={onClose}
        role='presentation'
      />
      <div className='pointer-events-none relative z-10 flex min-h-dvh flex-col'>
        <div className='pointer-events-auto flex justify-end px-3 pt-3 pb-2 lg:px-8 lg:pt-4'>
          <button
            ref={closeBtnRef}
            type='button'
            onClick={onClose}
            className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(185,212,197,0.2)] bg-black/20 text-mist-100 transition hover:border-[rgba(185,212,197,0.34)] hover:text-mist-50 motion-reduce:transition-none'
            aria-label={labelClose}
          >
            <MenuGlyph open />
          </button>
        </div>

        <nav
          className='pointer-events-auto flex flex-1 flex-col justify-center gap-1 px-6 pb-12'
          aria-label={menuTitle}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={`font-serif text-[clamp(1.35rem,5vw,2.15rem)] tracking-[0.14em] uppercase transition motion-reduce:transition-none ${
                  isActive ? 'text-mist-50' : 'text-mist-200 hover:text-mist-50'
                }`}
              >
                {labelNav(item.key)}
              </Link>
            )
          })}
        </nav>

        <div className='pointer-events-auto mt-auto flex items-center justify-between gap-4 border-t border-[rgba(185,212,197,0.2)] px-6 py-5'>
          <FacebookLink className='inline-flex h-10 w-10 items-center justify-center text-[rgba(221,231,223,1)] transition hover:text-mist-50' />
          <Link
            href={localeHref}
            locale={nextLocale}
            onClick={onClose}
            className='flex items-center gap-2 rounded-full border border-[rgba(185,212,197,0.2)] bg-black/15 px-3 py-2 text-[0.62rem] tracking-[0.18em] text-mist-200 backdrop-blur-sm transition hover:border-[rgba(185,212,197,0.34)] hover:text-mist-50 motion-reduce:transition-none'
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
      </div>
    </div>
  )
}

export function Navbar() {
  const t = useTranslations('Nav')
  const pathname = usePathname()
  const params = useParams<{ slug?: string }>()
  const locale = useLocale()
  const nextLocale = locale === 'de' ? 'cs' : 'de'
  const isHomePage = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 36)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    queueMicrotask(() => {
      setIsMenuOpen(false)
    })
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isMenuOpen])

  const isFloatingOverHero = isHomePage && !isScrolled
  const headerClassName =
    isFloatingOverHero ?
      'border-transparent bg-transparent shadow-none'
    : 'border-[rgba(185,212,197,0.16)] bg-[linear-gradient(180deg,rgba(9,28,22,0.95),rgba(9,28,22,0.86))] shadow-[0_18px_48px_rgba(0,0,0,0.18)] backdrop-blur-[14px]'
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

  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => {
    setIsMenuOpen(false)
    window.requestAnimationFrame(() => {
      menuBtnRef.current?.focus()
    })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b text-mist-100 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${headerClassName}`}
      >
        <div className='relative mx-auto w-full max-w-376 px-3 pt-3 pb-2 lg:px-8 lg:pt-4 lg:pb-3'>
          <div className='flex items-center justify-between gap-4'>
            <Link
              href='/'
              className='pointer-events-auto flex items-center gap-2.5 text-mist-200 transition hover:text-mist-50'
            >
              <Image
                src='/images/erb.webp'
                alt={t('crestAlt')}
                width={34}
                height={34}
                className='h-8 w-8 rounded-full object-cover p-0.5 lg:h-9 lg:w-9'
                priority
              />
            </Link>

            <nav className='pointer-events-auto hidden items-center gap-4 text-[0.85rem] tracking-[0.2em] uppercase lg:gap-6 xl:flex'>
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

            <div className='pointer-events-auto flex items-center gap-2'>
              <FacebookLink className='inline-flex h-9 w-9 items-center justify-center text-[rgba(221,231,223,1)] transition hover:text-mist-50 lg:h-10 lg:w-10' />
              <Link
                href={localeHref}
                locale={nextLocale}
                className={`flex items-center gap-2 rounded-full border border-[rgba(185,212,197,0.2)] px-3 py-1 text-[0.58rem] tracking-[0.16em] text-mist-200 backdrop-blur-sm transition lg:text-[0.65rem] lg:tracking-[0.2em] ${
                  isFloatingOverHero ?
                    'bg-[rgba(4,17,13,0.2)] hover:border-[rgba(185,212,197,0.34)] hover:text-mist-50'
                  : 'bg-black/15 hover:border-[rgba(185,212,197,0.34)] hover:text-mist-50'
                }`}
              >
                <span
                  className={locale === 'cs' ? 'text-mist-50' : 'opacity-60'}
                >
                  CS
                </span>
                <span>/</span>
                <span
                  className={locale === 'de' ? 'text-mist-50' : 'opacity-60'}
                >
                  DE
                </span>
              </Link>
              <button
                ref={menuBtnRef}
                type='button'
                className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(185,212,197,0.2)] bg-black/15 text-mist-100 backdrop-blur-sm transition hover:border-[rgba(185,212,197,0.34)] hover:text-mist-50 motion-reduce:transition-none xl:hidden'
                aria-expanded={isMenuOpen}
                aria-controls='mobile-nav-dialog'
                onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
                aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
              >
                <MenuGlyph open={isMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNavOverlay
        open={isMenuOpen}
        onClose={closeMenu}
        pathname={pathname}
        localeHref={localeHref}
        nextLocale={nextLocale}
        locale={locale}
        labelNav={t}
        labelClose={t('closeMenu')}
        menuTitle={t('menuTitle')}
      />
    </>
  )
}
