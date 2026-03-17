import type { RefObject, ReactNode } from 'react'
import type { HomepageCopy, IntroPhase } from './types'

type HeroProps = {
  children: ReactNode
  heroRef: RefObject<HTMLElement | null>
  phase: IntroPhase
  progress: number
} & Pick<
  HomepageCopy,
  'loaderHint' | 'loaderLabel' | 'scrollPrompt' | 'sideLeft' | 'sideRight'
>

export function Hero({
  children,
  heroRef,
  loaderHint,
  loaderLabel,
  phase,
  progress,
  scrollPrompt,
  sideLeft,
  sideRight,
}: HeroProps) {
  const loaderComplete = phase !== 'loading'
  const revealTintOpacity =
    phase === 'loading' ? 0.94 : phase === 'unfold' ? 'calc(0.1 + (var(--intro-reverse) * 0.5))' : 0
  const sideOverlayClassName = [
    'absolute top-1/2 z-[5] hidden -translate-y-1/2 font-serif text-[clamp(1.1rem,2.1vw,1.65rem)] uppercase tracking-[0.12em] text-[rgba(230,236,231,0.94)] transition-opacity duration-700 md:block',
    phase === 'loading' ? 'opacity-0' : 'opacity-100',
  ].join(' ')

  return (
    <>
      <div
        aria-hidden={loaderComplete}
        className={[
          'fixed inset-0 z-[140] grid grid-rows-[1fr_auto] items-center justify-items-center bg-[#123f39] text-[#cfdad1] transition-[opacity,visibility] duration-500',
          loaderComplete ? 'pointer-events-none invisible opacity-0' : 'opacity-100',
        ].join(' ')}
      >
        <div className='w-[min(31rem,92vw)] -translate-y-[8vh] text-center max-md:-translate-y-[12vh]'>
          <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.44em] text-[rgba(219,234,226,0.9)]'>
            ZAMEK LAZEN
          </p>
          <p className='mt-4 font-serif text-[clamp(2.5rem,8vw,4.8rem)] leading-[0.92] text-[rgba(238,245,239,0.97)]'>
            {loaderLabel}
          </p>
          <p className='mx-auto mt-3 max-w-72 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(208,226,216,0.82)] max-md:leading-[1.4]'>
            {loaderHint}
          </p>
        </div>

        <div className='w-[min(29rem,88vw)] pb-[clamp(1.4rem,4vh,3.4rem)]'>
          <div className='relative h-px w-full overflow-hidden bg-[rgba(198,217,206,0.24)]'>
            <div
              className='absolute inset-0 origin-left bg-[linear-gradient(90deg,rgba(236,243,236,0.74),#f1f5ee)] transition-transform duration-[120ms] ease-linear motion-reduce:transition-none'
              style={{ transform: `scaleX(${(progress / 100).toFixed(4)})` }}
            />
          </div>
          <p className='mt-3 text-right font-sans text-[0.74rem] font-black tracking-[0.14em] text-[rgba(210,228,218,0.82)]'>
            {progress}%
          </p>
        </div>
      </div>

      <section
        ref={heroRef}
        className='relative min-h-[86svh] overflow-hidden bg-[#082019] md:min-h-svh md:min-h-dvh'
      >
        <div className='pointer-events-none absolute inset-[-10%] saturate-[1.12]'>
          <div
            className='absolute inset-0 mix-blend-screen blur-[32px]'
            style={{
              background:
                'radial-gradient(circle at 6% 12%, rgba(140, 228, 123, 0.46), transparent 18%), radial-gradient(circle at 94% 14%, rgba(118, 214, 116, 0.4), transparent 19%), radial-gradient(circle at 96% 58%, rgba(158, 226, 138, 0.47), transparent 22%), radial-gradient(circle at 4% 83%, rgba(124, 214, 116, 0.42), transparent 22%), radial-gradient(circle at 89% 86%, rgba(156, 226, 138, 0.5), transparent 26%)',
              opacity: phase === 'loading' ? 0.76 : 'calc(0.32 + (var(--intro-reverse) * 0.33))',
              transform: 'translate3d(calc(var(--mx) * 24px), calc(var(--my) * 14px), 0)',
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
          className='pointer-events-none absolute inset-0 bg-[#123f39]'
          style={{ opacity: revealTintOpacity }}
        />
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

        <div
          className={[
            'absolute bottom-[1.4rem] left-1/2 z-[5] -translate-x-1/2 font-sans text-[0.64rem] uppercase tracking-[0.23em] text-[rgba(214,229,220,0.8)] transition-opacity duration-700',
            phase === 'loading' ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
        >
          <span className='inline-flex items-center gap-2 motion-safe:animate-pulse'>
            <span>{scrollPrompt}</span>
            <span className='h-px w-[1.45rem] bg-[rgba(214,229,220,0.58)]' />
          </span>
        </div>
      </section>
    </>
  )
}
