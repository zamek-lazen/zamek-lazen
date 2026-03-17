import { Link } from '@/i18n/navigation'
import type { HomepageCopy } from './types'

type WeddingsSectionProps = Pick<
  HomepageCopy,
  | 'weddingProcessTitle'
  | 'weddingSteps'
  | 'weddingVenues'
  | 'weddingVenuesTitle'
  | 'weddingsSection'
>

export function WeddingsSection({
  weddingProcessTitle,
  weddingSteps,
  weddingVenues,
  weddingVenuesTitle,
  weddingsSection,
}: WeddingsSectionProps) {
  const previewSteps = weddingSteps.slice(0, 3)

  return (
    <section className='relative z-[3] bg-[linear-gradient(180deg,rgba(10,48,42,0.98),rgba(8,35,31,0.98))] px-[1.2rem] py-[clamp(3.2rem,8vw,6rem)]'>
      <div className='mx-auto grid w-full max-w-[72rem] gap-[clamp(1.35rem,3.5vw,2.6rem)] md:grid-cols-[minmax(22rem,0.95fr)_minmax(0,1.05fr)] md:items-start'>
        <div
          aria-hidden='true'
          className='min-h-64 bg-cover bg-center bg-no-repeat md:min-h-[clamp(22rem,48vw,35rem)]'
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(4, 17, 14, 0.08), rgba(4, 17, 14, 0.28)), url("/images/estate/castle-park-lawn.webp")',
            backgroundPosition: 'center 48%',
          }}
        />

        <div className='grid content-start gap-4 pt-[0.4rem]'>
          <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(196,217,207,0.56)]'>
            {weddingsSection.eyebrow}
          </p>
          <h2 className='max-w-[6ch] text-balance font-serif text-[clamp(3.2rem,8vw,7.8rem)] leading-[0.88] tracking-[-0.02em] text-[rgba(244,247,240,0.96)]'>
            {weddingsSection.title}
          </h2>
          <p className='m-0 max-w-[28ch] font-serif text-[clamp(1.14rem,2.5vw,1.62rem)] leading-[1.2] text-[rgba(224,234,227,0.84)]'>
            {weddingsSection.lead}
          </p>
          <p className='m-0 max-w-[36ch] font-sans text-[clamp(0.95rem,1.9vw,1.05rem)] leading-[1.8] text-[rgba(196,215,206,0.78)]'>
            {weddingsSection.paragraphs[0]}
          </p>

          <div className='grid gap-4 pt-[0.8rem] md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.72fr)] md:items-start'>
            <div className='grid gap-1 border-t border-[rgba(172,197,181,0.16)] pt-4'>
              <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(196,217,207,0.56)]'>
                {weddingProcessTitle}
              </p>
              {previewSteps.map((step, index) => (
                <div
                  key={step.title}
                  className='grid grid-cols-[auto_1fr] items-center gap-4 border-b border-[rgba(172,197,181,0.16)] py-[0.9rem]'
                >
                  <span className='font-sans text-[0.68rem] tracking-[0.16em] text-[rgba(191,214,202,0.46)]'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <strong className='font-sans text-[0.82rem] uppercase tracking-[0.12em] text-[rgba(236,241,236,0.88)]'>
                    {step.title}
                  </strong>
                </div>
              ))}
            </div>

            <div className='grid gap-[0.8rem] border border-[rgba(172,197,181,0.16)] bg-[rgba(240,242,236,0.05)] px-[1.15rem] py-4'>
              <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(196,217,207,0.56)]'>
                {weddingVenuesTitle}
              </p>
              <ul className='m-0 grid list-none gap-[0.7rem] p-0'>
                {weddingVenues.map(venue => (
                  <li
                    key={venue}
                    className='relative pl-4 font-sans text-[0.95rem] leading-[1.6] text-[rgba(226,235,228,0.88)] before:absolute before:left-0 before:top-[0.72rem] before:h-px before:w-[0.4rem] before:bg-[rgba(226,235,228,0.42)] before:content-[""]'
                  >
                    {venue}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href='/svatby'
            className='inline-flex w-fit items-center gap-[0.8rem] font-sans text-[0.76rem] uppercase tracking-[0.18em] text-[rgba(237,243,238,0.92)] transition-[opacity,transform] duration-200 hover:translate-x-1 hover:opacity-100'
          >
            <span>{weddingsSection.eyebrow}</span>
            <span className='h-px w-[2.1rem] bg-current opacity-65' />
          </Link>
        </div>
      </div>
    </section>
  )
}
