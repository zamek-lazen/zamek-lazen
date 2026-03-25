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
    <section className='bg-[linear-gradient(180deg,rgba(10,37,31,0.98),rgba(18,70,60,0.98))] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-(--color-mist-100) md:px-8'>
      <div className='mx-auto w-full max-w-376'>
        <div className='grid gap-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:items-start'>
          <div className='max-w-136'>
            <p className='font-sans text-[0.72rem] tracking-[0.2em] text-[rgba(201,218,208,0.64)] uppercase'>
              {eyebrow}
            </p>
            <h2 className='mt-4 max-w-[11ch] font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.025em] text-balance text-[rgba(241,245,239,0.96)]'>
              {title}
            </h2>
            <p className='mt-5 max-w-[58ch] font-sans text-[1rem] leading-[1.85] text-[rgba(194,211,201,0.78)]'>
              {body}
            </p>
            <Link
              href='/akce'
              className='mt-8 inline-flex min-h-11 items-center justify-center border border-[rgba(193,215,204,0.28)] px-6 py-3 font-sans text-[0.75rem] tracking-[0.18em] text-[rgba(231,238,232,0.94)] uppercase transition-colors duration-200 hover:border-[rgba(223,234,226,0.52)]'
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
                    <p className='font-sans text-[0.68rem] tracking-[0.22em] text-[rgba(191,211,201,0.54)] uppercase transition-colors duration-200 group-hover:text-[rgba(221,233,223,0.76)]'>
                      {featuredLabel}
                    </p>
                    <p className='mt-4 font-sans text-[0.78rem] tracking-[0.18em] text-[rgba(220,230,224,0.72)] uppercase transition-colors duration-200 group-hover:text-[rgba(236,241,236,0.86)]'>
                      {featuredEvent.label}
                    </p>
                  </div>

                  <div>
                    <p className='max-w-[18ch] font-serif text-[clamp(2rem,3.2vw,3rem)] leading-[1.02] text-[rgba(241,245,239,0.96)] transition-colors duration-200 group-hover:text-[rgba(248,251,247,1)]'>
                      {featuredEvent.title || featuredTitle}
                    </p>
                    <p className='mt-4 max-w-[46ch] font-sans text-[0.98rem] leading-[1.8] text-[rgba(194,211,201,0.76)] transition-colors duration-200 group-hover:text-[rgba(212,224,215,0.86)]'>
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
                        <span className='font-sans text-[0.72rem] tracking-[0.18em] text-[rgba(220,230,224,0.68)] uppercase'>
                          {event.label}
                        </span>
                        <p className='max-w-[24ch] font-serif text-[1.45rem] leading-[1.12] text-[rgba(241,245,239,0.94)]'>
                          {event.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                : null}
              </div>
            : <div className='grid gap-6'>
                <p className='font-sans text-[0.68rem] tracking-[0.22em] text-[rgba(191,211,201,0.54)] uppercase'>
                  {featuredLabel}
                </p>
                <p className='max-w-[18ch] font-serif text-[clamp(2rem,3.2vw,3rem)] leading-[1.02] text-[rgba(241,245,239,0.96)]'>
                  {featuredTitle}
                </p>
                <p className='max-w-[46ch] font-sans text-[0.98rem] leading-[1.8] text-[rgba(194,211,201,0.76)]'>
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
