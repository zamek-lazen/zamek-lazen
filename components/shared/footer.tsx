import { getTranslations } from 'next-intl/server'
import { FacebookLink } from '@/components/shared/facebook-link'
import { Link } from '@/i18n/navigation'
import { FooterLocaleSwitch } from '@/components/shared/footer-locale-switch'
import { navItems } from '@/components/shared/nav-items'

const MAP_EMBED_SRC =
  'https://maps.google.com/maps?width=600&height=400&hl=en&q=Z%C3%A1mek%20L%C3%A1ze%C5%88%20sv.%20Wolfganga%20339%2001%20Chudenice-Klatovy%201&t=&z=15&ie=UTF8&iwloc=B&output=embed'

function toTelHref(value: string) {
  const phone = value.match(/\+?[\d\s]+$/)?.[0]?.replace(/\s+/g, '') ?? ''
  return phone ? `tel:${phone}` : null
}

export async function Footer() {
  const [tFooter, tNav, tContact] = await Promise.all([
    getTranslations('Footer'),
    getTranslations('Nav'),
    getTranslations('ContactPage')
  ])

  const phoneItems = [tContact('phonePouza'), tContact('phoneTrdlicova')]
  const email = tContact('email')

  return (
    <footer className='editorial-surface-dark w-full border-t border-[rgba(185,212,197,0.12)]'>
      <div className='mx-auto grid w-full max-w-376 gap-10 px-[1.2rem] py-[clamp(3.5rem,8vw,5.5rem)] md:px-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(22rem,0.92fr)] lg:gap-14'>
        <div className='space-y-10'>
          <div className='max-w-160'>
            <h2 className='editorial-title editorial-title-dark max-w-[30ch]'>
              {tFooter('headline')}
            </h2>
            <p className='editorial-body editorial-body-dark mt-5 max-w-[58ch]'>
              {tFooter('body')}
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] md:gap-10'>
            <div>
              <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.74rem]'>
                {tFooter('linksLabel')}
              </p>
              <nav className='mt-4 grid gap-3 text-[0.85rem] tracking-[0.14em] text-mist-200 uppercase md:text-[0.78rem]'>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='w-fit border-b border-transparent pb-1 transition hover:border-[rgba(221,231,223,0.42)] hover:text-mist-50'
                  >
                    {tNav(item.key)}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.74rem]'>
                {tFooter('contactLabel')}
              </p>
              <div className='mt-4 space-y-5'>
                <div>
                  <p className='editorial-card-title editorial-card-title-dark'>
                    {tContact('company')}
                  </p>
                </div>

                <div>
                  <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.7rem]'>
                    {tContact('phoneLabel')}
                  </p>
                  <div className='editorial-body editorial-body-dark mt-2 space-y-2'>
                    {phoneItems.map((phone) => {
                      const href = toTelHref(phone)

                      if (!href) {
                        return <p key={phone}>{phone}</p>
                      }

                      return (
                        <a
                          key={phone}
                          href={href}
                          className='block transition hover:text-mist-50'
                        >
                          {phone}
                        </a>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.7rem]'>
                    {tContact('emailLabel')}
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className='editorial-body editorial-body-dark mt-2 inline-flex'
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-4 lg:pt-2'>
          <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.74rem]'>
            {tFooter('mapLabel')}
          </p>
          <div className='overflow-hidden rounded-2xl border border-[rgba(185,212,197,0.16)] bg-[rgba(13,49,41,0.44)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.18)]'>
            <div className='h-56 overflow-hidden rounded-xl md:h-72 lg:h-88'>
              <iframe
                title={tFooter('mapTitle')}
                src={MAP_EMBED_SRC}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className='h-full w-full border-0'
              />
            </div>
          </div>
          <div>
            <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.7rem]'>
              {tContact('addressLabel')}
            </p>
            <p className='editorial-body editorial-body-dark mt-2 max-w-[28ch]'>
              {tContact('address')}
            </p>
          </div>
        </div>
      </div>

      <div className='border-t border-[rgba(185,212,197,0.12)]'>
        <div className='mx-auto flex w-full max-w-376 flex-col gap-4 px-[1.2rem] py-5 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8'>
          <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-5'>
            <p className='inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 font-sans text-[1rem] leading-[1.45] tracking-[-0.02em] text-mist-200'>
              <span>
                &copy; {new Date().getFullYear()} {tFooter('copyright')}
              </span>
              <span className='opacity-65'>-</span>
              <span>{tFooter('rightsReserved')}.</span>
              <span>{tFooter('creatorPrefix')}</span>
              <a
                href='https://www.baudys.dev'
                target='_blank'
                rel='noreferrer'
                className='underline decoration-[rgba(185,212,197,0.35)] underline-offset-[0.18em] transition hover:decoration-[rgba(185,212,197,0.65)]'
              >
                Daniel Anthony Baudyš
              </a>
            </p>
          </div>

          <div className='flex items-center justify-start gap-4 lg:justify-end'>
            <FacebookLink
              className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(185,212,197,0.18)] text-mist-300 transition hover:border-[rgba(221,231,223,0.42)] hover:text-mist-50'
            />
            <FooterLocaleSwitch />
          </div>
        </div>
      </div>
    </footer>
  )
}
