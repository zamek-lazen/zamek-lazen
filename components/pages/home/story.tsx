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
  const ctaClassName =
    'inline-flex items-center justify-center border px-[1.35rem] py-[0.8rem] font-sans text-[0.77rem] uppercase tracking-[0.18em] transition-transform duration-200 hover:-translate-y-0.5'

  return (
    <section className='relative z-[3] bg-[linear-gradient(180deg,rgba(6,22,17,0.98),rgba(10,48,41,0.98))] px-[1.2rem] py-[clamp(3.6rem,8.5vw,6.4rem)]'>
      <div className='mx-auto grid w-full max-w-[94rem] gap-[clamp(1.6rem,4vw,4rem)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-start'>
        <div className='grid content-start'>
          <p className='mb-[0.85rem] font-sans text-[0.72rem] tracking-[0.16em] text-[rgba(201,218,208,0.64)] uppercase'>
            {eyebrow}
          </p>
          <h2 className='font-serif text-[clamp(2.6rem,8vw,5.5rem)] leading-[1.15] tracking-[-0.01em] text-balance text-[rgba(241,245,239,0.97)]'>
            {title}
          </h2>
          <p className='mt-[1.3rem] max-w-[34ch] font-serif text-[clamp(1.06rem,2.9vw,1.52rem)] leading-[1.28] text-[rgba(220,230,224,0.84)]'>
            {lead}
          </p>

          <div className='mt-[1.8rem] flex flex-wrap gap-[0.9rem]'>
            <Link
              href='/historie'
              className={`${ctaClassName} border-[rgba(230,238,230,0.55)] bg-[rgba(227,236,227,0.94)] text-[#0f362e]! hover:bg-[#f1f6f1]`}
            >
              {ctaHistory}
            </Link>
            <Link
              href='/kontakt'
              className={`${ctaClassName} border-[rgba(193,215,204,0.38)] bg-[rgba(8,35,30,0.42)] text-[rgba(223,233,225,0.88)] hover:border-[rgba(221,235,225,0.62)] hover:text-[#ecf3eb]`}
            >
              {ctaContact}
            </Link>
          </div>
        </div>

        <div className='grid content-start gap-[0.9rem]'>
          <p className='mb-[0.85rem] font-sans text-[0.72rem] tracking-[0.16em] text-[rgba(201,218,208,0.64)] uppercase'>
            {highlightsTitle}
          </p>
          <div className='mt-[0.2rem] grid border-t border-[rgba(178,201,190,0.22)]'>
            {spotlightLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className='grid gap-[0.3rem] border-b border-[rgba(178,201,190,0.18)] py-4 transition-[opacity,transform] duration-200 hover:translate-x-1 hover:opacity-100 md:grid-cols-[auto_minmax(0,0.7fr)_minmax(0,1fr)] md:items-start md:gap-4'
              >
                <span className='font-sans text-[0.68rem] tracking-[0.16em] text-[rgba(191,211,201,0.44)] uppercase'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <strong className='font-serif text-[clamp(1.25rem,2.4vw,1.9rem)] leading-none text-[rgba(235,240,234,0.94)]'>
                  {link.title}
                </strong>
                <p className='m-0 font-sans text-[0.9rem] leading-[1.7] text-[rgba(186,206,196,0.72)]'>
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
