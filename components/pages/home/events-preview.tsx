import { RevealStagger } from '@/components/motion'
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
          <RevealStagger className='mt-10 grid gap-4 md:grid-cols-3'>
            {events.map((event, index) => (
              <Link
                key={`${event.title}-${index}`}
                href={event.href}
                className='group block h-full w-full rounded-2xl border border-[rgba(254,252,232,0.14)] bg-[var(--color-forest-900)] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition-[transform,background-color,border-color] duration-200 hover:border-[rgba(254,252,232,0.22)] hover:bg-[var(--color-forest-800)]'
              >
                <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.74rem]'>
                  {event.label}
                </p>
                <h3 className='editorial-card-title editorial-card-title-dark mt-3 max-w-[18ch]'>
                  {event.title}
                </h3>
              </Link>
            ))}
          </RevealStagger>
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
