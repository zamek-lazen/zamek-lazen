import { Link } from '@/i18n/navigation'
import type { HomepageCopy, HomepageSpotlightLink } from '@/types'

type StoryProps = {
  spotlightLinks: HomepageSpotlightLink[]
} & Pick<
  HomepageCopy,
  | 'ctaContact'
  | 'ctaHistory'
  | 'description'
  | 'eyebrow'
  | 'highlightsTitle'
  | 'lead'
  | 'title'
>

export function Story({
  ctaContact,
  ctaHistory,
  eyebrow,
  highlightsTitle,
  lead,
  spotlightLinks,
  title
}: StoryProps) {
  const ctaClassName = 'editorial-button'

  return (
    <section className='editorial-surface-dark relative z-3 px-[1.2rem] py-[clamp(3.6rem,8.5vw,6.4rem)]'>
      <div className='mx-auto grid w-full max-w-376 gap-[clamp(1.6rem,4vw,4rem)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-start'>
        <div className='grid content-start'>
          <p className='editorial-eyebrow editorial-eyebrow-dark mb-[0.85rem]'>
            {eyebrow}
          </p>
          <h2 className='editorial-title editorial-title-dark max-w-[10ch]'>
            {title}
          </h2>
          <p className='editorial-lead editorial-lead-dark mt-[1.3rem] max-w-[34ch]'>
            {lead}
          </p>

          <div className='mt-[1.8rem] flex flex-wrap gap-[0.9rem]'>
            <Link
              href='/historie'
              className={`${ctaClassName} editorial-button-primary`}
            >
              {ctaHistory}
            </Link>
            <Link
              href='/kontakt'
              className={`${ctaClassName} editorial-button-secondary`}
            >
              {ctaContact}
            </Link>
          </div>
        </div>

        <div className='grid content-start gap-[0.9rem]'>
          <p className='editorial-eyebrow editorial-eyebrow-dark mb-[0.85rem]'>
            {highlightsTitle}
          </p>
          <div className='mt-[0.2rem] grid border-t border-[rgba(178,201,190,0.22)]'>
            {spotlightLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className='grid gap-[0.3rem] border-b border-[rgba(178,201,190,0.18)] py-4 transition-[opacity,transform] duration-200 hover:translate-x-1 hover:opacity-100 md:grid-cols-[auto_minmax(0,0.7fr)_minmax(0,1fr)] md:items-start md:gap-4'
              >
                <span className='editorial-eyebrow editorial-eyebrow-dark text-[0.72rem] opacity-60'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <strong className='editorial-card-title editorial-card-title-dark text-[clamp(1.4rem,2.5vw,2.1rem)]'>
                  {link.title}
                </strong>
                <p className='editorial-body editorial-body-dark m-0 text-[0.95rem]'>
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
