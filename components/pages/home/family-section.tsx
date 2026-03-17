import { Link } from '@/i18n/navigation'
import type { HomepageCopy } from './types'

type FamilySectionProps = Pick<HomepageCopy, 'familyProfile' | 'familySection'>

export function FamilySection({ familyProfile, familySection }: FamilySectionProps) {
  const familyHighlights = familySection.paragraphs.slice(0, 2)

  return (
    <section className='relative z-[3] bg-[linear-gradient(180deg,rgba(247,243,233,0.98),rgba(239,234,221,0.98))] px-[1.2rem] py-[clamp(3.2rem,8vw,6rem)]'>
      <div className='mx-auto grid w-full max-w-[72rem] gap-[clamp(1.35rem,3.5vw,2.6rem)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start'>
        <div className='grid content-start gap-4 pt-2'>
          <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(20,52,45,0.52)]'>
            {familySection.eyebrow}
          </p>
          <h2 className='max-w-[8ch] text-balance font-serif text-[clamp(2.7rem,6.8vw,5.9rem)] leading-[0.88] tracking-[-0.02em] text-[#14342d]'>
            {familySection.title}
          </h2>
          <p className='m-0 max-w-[28ch] font-serif text-[clamp(1.14rem,2.5vw,1.62rem)] leading-[1.2] text-[rgba(20,52,45,0.82)]'>
            {familySection.lead}
          </p>

          <div className='grid max-w-[36rem] gap-4'>
            {familyHighlights.map(paragraph => (
              <p
                key={paragraph}
                className='m-0 font-sans text-[clamp(0.95rem,1.9vw,1.05rem)] leading-[1.78] text-[rgba(20,52,45,0.76)]'
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Link
            href='/rod'
            className='inline-flex w-fit items-center gap-[0.8rem] font-sans text-[0.76rem] uppercase tracking-[0.18em] text-[rgba(20,52,45,0.84)] transition-[opacity,transform] duration-200 hover:translate-x-1 hover:opacity-100'
          >
            <span>{familySection.eyebrow}</span>
            <span className='h-px w-[2.1rem] bg-current opacity-40' />
          </Link>
        </div>

        <figure className='m-0 grid content-start gap-4'>
          <div
            aria-hidden='true'
            className='min-h-[22rem] border border-[rgba(20,52,45,0.14)] bg-cover bg-center bg-no-repeat md:min-h-[clamp(22rem,42vw,32rem)]'
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(247, 242, 232, 0.04), rgba(20, 30, 25, 0.16)), url("/images/historical/lazen-estate-hillside-1927.webp")',
            }}
          />
          <figcaption className='max-w-[28rem] border-t border-[rgba(20,52,45,0.14)] pt-4'>
            <p className='m-0 font-sans text-[clamp(0.95rem,1.9vw,1.05rem)] leading-[1.78] text-[rgba(20,52,45,0.74)]'>
              {familySection.paragraphs[2]}
            </p>
          </figcaption>
        </figure>
      </div>

      <aside className='mx-auto mt-[clamp(1.5rem,3vw,2.2rem)] grid w-full max-w-[72rem] content-start gap-[0.85rem] border-t border-[rgba(20,52,45,0.14)] pt-4'>
        <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(20,52,45,0.52)]'>
          {familyProfile.eyebrow}
        </p>
        <h3 className='font-serif text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[0.96] text-[#14342d]'>
          {familyProfile.title}
        </h3>
        <p className='m-0 max-w-[48rem] font-sans leading-[1.72] text-[rgba(20,52,45,0.76)]'>
          {familyProfile.body}
        </p>
      </aside>
    </section>
  )
}
