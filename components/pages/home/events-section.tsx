import { Link } from '@/i18n/navigation'
import type { HomepageCopy } from './types'

type EventsSectionProps = Pick<HomepageCopy, 'eventsLead' | 'eventsNotice' | 'eventsTitle'>

export function EventsSection({ eventsLead, eventsNotice, eventsTitle }: EventsSectionProps) {
  return (
    <div className='grid gap-[1.4rem] border-b border-[rgba(20,52,45,0.14)] pb-[clamp(2rem,5vw,3rem)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end'>
      <article className='grid content-start gap-4'>
        <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(20,52,45,0.52)]'>
          {eventsTitle}
        </p>
        <h2 className='max-w-[7ch] text-balance font-serif text-[clamp(2.8rem,5.7vw,5.8rem)] leading-[0.94] tracking-[-0.02em] text-[rgba(20,52,45,0.52)]'>
          {eventsLead}
        </h2>
        <p className='m-0 max-w-[34ch] font-sans text-[clamp(0.95rem,1.9vw,1.05rem)] leading-[1.78] text-[rgba(20,52,45,0.76)]'>
          {eventsNotice}
        </p>
        <Link
          href='/akce'
          className='inline-flex w-fit items-center gap-[0.8rem] font-sans text-[0.76rem] uppercase tracking-[0.18em] text-[rgba(20,52,45,0.84)] transition-[opacity,transform] duration-200 hover:translate-x-1 hover:opacity-100'
        >
          <span>{eventsTitle}</span>
          <span className='h-px w-[2.1rem] bg-current opacity-40' />
        </Link>
      </article>

      <div
        aria-hidden='true'
        className='min-h-64 bg-cover bg-center bg-no-repeat md:min-h-[clamp(14rem,28vw,20rem)]'
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(247, 242, 232, 0.06), rgba(20, 30, 25, 0.16)), url("/images/estate/castle-front-winter-garden.webp")',
        }}
      />
    </div>
  )
}
