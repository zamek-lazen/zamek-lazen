import type { ReactNode } from 'react'
import type { HomepageCopy } from './types'

type HeroProps = {
  children: ReactNode
} & Pick<HomepageCopy, 'scrollPrompt' | 'sideLeft' | 'sideRight'>

export function Hero({ children, scrollPrompt, sideLeft, sideRight }: HeroProps) {
  const sideOverlayClassName =
    'absolute top-1/2 z-[5] hidden -translate-y-1/2 font-serif text-[clamp(1.1rem,2.1vw,1.65rem)] uppercase tracking-[0.12em] text-[rgba(230,236,231,0.94)] md:block'

  return (
    <section className='relative min-h-[86svh] overflow-hidden bg-[#082019] md:min-h-svh md:min-h-dvh'>
      <div aria-hidden='true' className='pointer-events-none absolute inset-[-10%] saturate-[1.05]'>
        <div
          className='absolute inset-0 mix-blend-screen blur-[32px]'
          style={{
            background:
              'radial-gradient(circle at 6% 12%, rgba(140, 228, 123, 0.46), transparent 18%), radial-gradient(circle at 94% 14%, rgba(118, 214, 116, 0.4), transparent 19%), radial-gradient(circle at 96% 58%, rgba(158, 226, 138, 0.47), transparent 22%), radial-gradient(circle at 4% 83%, rgba(124, 214, 116, 0.42), transparent 22%), radial-gradient(circle at 89% 86%, rgba(156, 226, 138, 0.5), transparent 26%)',
            opacity: 0.38,
          }}
        />
        <div
          className='absolute inset-0'
          style={{
            background:
              'radial-gradient(circle at 50% 28%, rgba(6, 29, 23, 0), rgba(3, 15, 12, 0.28) 56%), linear-gradient(180deg, rgba(2, 9, 8, 0.18) 0%, rgba(2, 9, 8, 0.66) 100%)',
          }}
        />
      </div>

      {children}

      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(circle at 50% 22%, transparent 43%, rgba(0, 7, 5, 0.22) 76%), linear-gradient(180deg, rgba(1, 9, 7, 0.2) 0%, rgba(1, 9, 7, 0.02) 30%, rgba(1, 9, 7, 0.56) 100%)',
        }}
      />

      <div className={`${sideOverlayClassName} left-[clamp(0.8rem,2.2vw,2rem)]`}>{sideLeft}</div>
      <div className={`${sideOverlayClassName} right-[clamp(0.8rem,2.2vw,2rem)]`}>
        {sideRight}
      </div>

      <div className='absolute bottom-[1.4rem] left-1/2 z-[5] -translate-x-1/2 font-sans text-[0.64rem] uppercase tracking-[0.23em] text-[rgba(214,229,220,0.8)]'>
        <span className='inline-flex items-center gap-2 motion-safe:animate-pulse'>
          <span>{scrollPrompt}</span>
          <span className='h-px w-[1.45rem] bg-[rgba(214,229,220,0.58)]' />
        </span>
      </div>
    </section>
  )
}
