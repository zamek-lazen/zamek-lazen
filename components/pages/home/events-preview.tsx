import { Link } from '@/i18n/navigation'
import type { HomepageEventPreview } from '@/types'

type EventsPreviewProps = {
  eyebrow: string
  title: string
  body: string
  featuredLabel: string
  featuredTitle: string
  featuredBody: string
  cta: string
  events: HomepageEventPreview[]
}

export function EventsPreview({
  body,
  cta,
  events,
  eyebrow,
  featuredBody,
  featuredLabel,
  featuredTitle,
  title
}: EventsPreviewProps) {
  const [featuredEvent, ...remainingEvents] = events

  return (
    <section className='editorial-surface-dark px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
      <div className='mx-auto w-full max-w-376'>
        <div className='grid gap-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:items-start'>
          <div className='max-w-136'>
            <p className='editorial-eyebrow editorial-eyebrow-dark'>
              {eyebrow}
            </p>
            <h2 className='editorial-title editorial-title-dark mt-4 max-w-[11ch]'>
              {title}
            </h2>
            <p className='editorial-body editorial-body-dark mt-5 max-w-[58ch]'>
              {body}
            </p>
            <Link
              href='/akce'
              className='editorial-button editorial-button-secondary mt-8'
            >
              {cta}
            </Link>
          </div>

          <div className='border-t border-[rgba(185,212,197,0.18)] pt-5'>
            {featuredEvent ?
              <div className='grid'>
                <Link
                  href={featuredEvent.href}
                  className='group grid gap-4 border-b border-[rgba(185,212,197,0.16)] pb-7 transition-colors duration-200 hover:border-[rgba(216,229,219,0.28)] md:grid-cols-[minmax(0,0.24fr)_minmax(0,1fr)] md:gap-8'
                >
                  <div>
                    <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem] transition-colors duration-200 group-hover:text-[rgba(255,253,242,0.86)]'>
                      {featuredLabel}
                    </p>
                    <p className='editorial-eyebrow editorial-eyebrow-dark mt-4 text-[0.76rem] transition-colors duration-200 group-hover:text-[rgba(255,253,242,0.92)]'>
                      {featuredEvent.label}
                    </p>
                  </div>

                  <div>
                    <p className='editorial-title editorial-title-dark max-w-[18ch] text-[clamp(2.1rem,3.4vw,3.4rem)] transition-colors duration-200 group-hover:text-[rgba(255,253,242,1)]'>
                      {featuredEvent.title || featuredTitle}
                    </p>
                    <p className='editorial-body editorial-body-dark mt-4 max-w-[46ch] transition-colors duration-200 group-hover:text-[rgba(255,253,242,0.86)]'>
                      {featuredBody}
                    </p>
                  </div>
                </Link>

                {remainingEvents.length > 0 ?
                  <div className='grid'>
                    {remainingEvents.map((event, index) => (
                      <Link
                        key={`${event.title}-${index}`}
                        href={event.href}
                        className='grid gap-3 border-b border-[rgba(185,212,197,0.16)] py-4 transition-colors duration-200 hover:border-[rgba(216,229,219,0.24)] md:grid-cols-[minmax(0,0.24fr)_minmax(0,1fr)] md:items-start md:gap-8'
                      >
                        <span className='editorial-eyebrow editorial-eyebrow-dark text-[0.74rem]'>
                          {event.label}
                        </span>
                        <p className='editorial-card-title editorial-card-title-dark max-w-[24ch]'>
                          {event.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                : null}
              </div>
            : <div className='grid gap-6'>
                <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem]'>
                  {featuredLabel}
                </p>
                <p className='editorial-title editorial-title-dark max-w-[18ch] text-[clamp(2.1rem,3.4vw,3.4rem)]'>
                  {featuredTitle}
                </p>
                <p className='editorial-body editorial-body-dark max-w-[46ch]'>
                  {featuredBody}
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  )
}
