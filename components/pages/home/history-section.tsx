import { Link } from '@/i18n/navigation'
import type { HomepageCopy } from './types'

type HistorySectionProps = Pick<
  HomepageCopy,
  'ctaHistory' | 'factFour' | 'factOne' | 'factThree' | 'factTwo' | 'historySection'
>

export function HistorySection({
  ctaHistory,
  factFour,
  factOne,
  factThree,
  factTwo,
  historySection,
}: HistorySectionProps) {
  return (
    <section className='relative z-[3] bg-[linear-gradient(180deg,rgba(248,245,236,0.98),rgba(235,232,220,0.98))] px-[1.2rem] py-[clamp(3.2rem,8vw,6rem)]'>
      <div className='mx-auto grid w-full max-w-[72rem] gap-[clamp(1.35rem,3.5vw,2.8rem)]'>
        <div className='grid items-center gap-4 border-b border-[rgba(20,52,45,0.14)] pb-4 md:grid-cols-[1fr_auto]'>
          <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(201,218,208,0.64)]'>
            {historySection.eyebrow}
          </p>
          <Link
            href='/historie'
            className='inline-flex w-fit items-center gap-[0.8rem] font-sans text-[0.76rem] uppercase tracking-[0.18em] text-[rgba(204,221,212,0.82)] transition-[opacity,transform] duration-200 hover:translate-x-1 hover:opacity-100'
          >
            <span>{ctaHistory}</span>
            <span className='h-px w-[2.1rem] bg-current opacity-65' />
          </Link>
        </div>

        <div className='grid gap-[clamp(1.2rem,3vw,2rem)] pt-[1.4rem] md:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.78fr)] md:items-start'>
          <h2 className='max-w-[8ch] text-balance font-serif text-[clamp(3rem,8vw,7.4rem)] leading-[0.88] tracking-[-0.02em] text-[#14342d]'>
            {historySection.title}
          </h2>
          <div className='grid max-w-[34rem] content-start gap-4'>
            <p className='m-0 max-w-[28ch] font-serif text-[clamp(1.14rem,2.5vw,1.62rem)] leading-[1.2] text-[rgba(19,52,45,0.84)]'>
              {historySection.lead}
            </p>
            <p className='m-0 font-sans text-[clamp(0.95rem,1.9vw,1.05rem)] leading-[1.78] text-[rgba(20,52,45,0.76)]'>
              {historySection.paragraphs[0]}
            </p>
          </div>
        </div>

        <div className='grid gap-2 border-t border-[rgba(20,52,45,0.14)] pt-4 md:flex md:flex-wrap md:gap-x-[1.2rem] md:gap-y-[0.7rem]'>
          {[factOne, factTwo, factThree, factFour].map(fact => (
            <p
              key={fact}
              className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(20,52,45,0.52)]'
            >
              {fact}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
