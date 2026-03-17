import Image from 'next/image'
import type { HistoryPageCopy } from './types'

type HeroProps = Pick<
  HistoryPageCopy,
  'facts' | 'introLabel' | 'introQuote' | 'lead' | 'scrollLabel' | 'title'
>

export function Hero({ facts, introLabel, introQuote, lead, scrollLabel, title }: HeroProps) {
  return (
    <section className='relative z-10 grid min-h-svh items-end px-5 pb-16 pt-[5.5rem] md:px-10 md:pb-16 md:pt-24'>
      <div className='absolute inset-0'>
        <Image
          src='/images/flora/magnolia-hero.webp'
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover object-center brightness-[0.5] saturate-[0.85] contrast-[0.95]'
        />
      </div>

      <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(5,14,11,0.2)_0%,rgba(5,14,11,0.58)_42%,rgba(5,14,11,0.95)_100%),linear-gradient(90deg,rgba(4,10,8,0.7),rgba(4,10,8,0.15)_44%,rgba(4,10,8,0.6)_100%)]' />

      <div className='relative z-10 mx-auto grid w-full max-w-[88rem] items-end gap-8 md:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]'>
        <div className='max-w-[42rem]'>
          <p className='mb-4 text-[0.78rem] uppercase tracking-[0.24em] text-[rgba(221,231,223,0.82)]'>
            {introLabel}
          </p>
          <h1 className='max-w-[11ch] font-serif text-[clamp(3.8rem,10vw,7.2rem)] leading-[0.94] font-semibold'>
            {title}
          </h1>
          <p className='mt-6 max-w-[40rem] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.8] text-[rgba(221,231,223,0.72)]'>
            {lead}
          </p>
          <p className='mt-8 max-w-[34rem] border-l border-[rgba(195,171,130,0.42)] pl-5 font-serif text-[clamp(1.25rem,2.6vw,2rem)] leading-[1.35] text-[rgba(245,247,244,0.88)]'>
            {introQuote}
          </p>
        </div>

        <div className='relative mt-4 min-h-[22rem] md:min-h-[27rem] lg:min-h-[34rem]'>
          <figure className='absolute right-0 top-[10%] h-[54%] w-[min(28rem,92%)] rotate-[-2.5deg] overflow-hidden border border-[rgba(244,236,220,0.22)] bg-[rgba(13,22,19,0.48)] shadow-[0_24px_80px_rgba(0,0,0,0.28)] lg:right-[5%] lg:h-[56%] lg:w-[min(32rem,92%)]'>
            <Image
              src='/images/historical/lazen-estate-hillside-1927.webp'
              alt='Archivní pohled na zámek Lázeň v krajině'
              fill
              sizes='(max-width: 900px) 90vw, 42vw'
              className='object-cover grayscale-[0.3] sepia-[0.36] contrast-[0.95]'
            />
          </figure>

          <figure className='absolute bottom-[2%] left-0 aspect-[1/0.74] w-[min(15rem,74%)] rotate-[4deg] overflow-hidden border border-[rgba(244,236,220,0.22)] bg-[rgba(13,22,19,0.48)] shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:w-[min(18rem,72%)] lg:w-[min(22rem,72%)]'>
            <Image
              src='/images/historical/lazen-estate-illustration.webp'
              alt='Historická kresba zámku Lázeň'
              fill
              sizes='(max-width: 900px) 70vw, 26vw'
              className='object-cover grayscale-[0.3] sepia-[0.36] contrast-[0.95]'
            />
          </figure>
        </div>
      </div>

      <div className='relative z-10 mx-auto mt-12 grid w-full max-w-[88rem] gap-4'>
        <span className='text-[0.82rem] uppercase tracking-[0.18em] text-[rgba(221,231,223,0.54)]'>
          {scrollLabel}
        </span>
        <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-4'>
          {facts.map(fact => (
            <div
              key={fact.label}
              className='min-h-[7.5rem] border border-[rgba(221,231,223,0.18)] bg-[linear-gradient(180deg,rgba(8,24,19,0.74),rgba(8,24,19,0.5))] px-5 py-4 backdrop-blur-[14px]'
            >
              <strong className='block font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-none text-[#f4ead7]'>
                {fact.value}
              </strong>
              <span className='mt-2 block max-w-[14ch] text-[0.94rem] leading-6 text-[rgba(221,231,223,0.72)]'>
                {fact.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
