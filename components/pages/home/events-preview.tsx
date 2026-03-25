import { Link } from '@/i18n/navigation'
import type { HomepageEventPreview } from '@/types'

type EventsPreviewProps = {
  eyebrow: string
  title: string
  body: string
  cta: string
  events: HomepageEventPreview[]
}

export function EventsPreview({
  body,
  cta,
  events,
  eyebrow,
  title
}: EventsPreviewProps) {
  return (
    <section className='editorial-surface-light px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
      <div className='mx-auto w-full max-w-376'>
        <p className='editorial-eyebrow editorial-eyebrow-light'>{eyebrow}</p>
        <h2 className='editorial-title editorial-title-light mt-4'>{title}</h2>
        <p className='editorial-body editorial-body-light mt-5 max-w-[52ch]'>
          {body}
        </p>

        {events.length > 0 ?
          <div className='mt-10 grid gap-4 md:grid-cols-3'>
            {events.map((event, index) => (
              <Link
                key={`${event.title}-${index}`}
                href={event.href}
                className='editorial-card group rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1'
              >
                <p className='editorial-eyebrow editorial-eyebrow-light text-[0.74rem]'>
                  {event.label}
                </p>
                <h3 className='editorial-card-title editorial-card-title-light mt-3 max-w-[18ch]'>
                  {event.title}
                </h3>
              </Link>
            ))}
          </div>
        : null}

        <Link
          href='/akce'
          className='editorial-button editorial-button-outline mt-10'
        >
          {cta}
        </Link>
      </div>
    </section>
  )
}
