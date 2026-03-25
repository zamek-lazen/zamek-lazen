'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'zamek-home-intro-seen'
/** Celkem: load + revealDelay + revealDuration = 1500 ms */
const DEFAULT_LOAD_DURATION_MS = 1050
const DEFAULT_REVEAL_DELAY_MS = 100
const DEFAULT_REVEAL_DURATION_MS = 350
/** Celkem reduced: 500 ms */
const REDUCED_LOAD_DURATION_MS = 320
const REDUCED_REVEAL_DELAY_MS = 40
const REDUCED_REVEAL_DURATION_MS = 140

type IntroPhase = 'loading' | 'revealing' | 'done'

type HomeIntroLoaderProps = {
  crestAlt: string
}

function easeOutQuart(value: number) {
  return 1 - (1 - value) ** 4
}

export function HomeIntroLoader({ crestAlt }: HomeIntroLoaderProps) {
  const [phase, setPhase] = useState<IntroPhase>('loading')
  const [progress, setProgress] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reducedMotion = mediaQuery.matches
    const handleMotionChange = () => setPrefersReducedMotion(mediaQuery.matches)

    mediaQuery.addEventListener('change', handleMotionChange)

    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === '1') {
        window.requestAnimationFrame(() => {
          setPhase('done')
        })

        return () =>
          mediaQuery.removeEventListener('change', handleMotionChange)
      }
    } catch {
      // Ignore storage access issues and allow the intro to play.
    }

    const loadDuration =
      reducedMotion ? REDUCED_LOAD_DURATION_MS : DEFAULT_LOAD_DURATION_MS
    const revealDelay =
      reducedMotion ? REDUCED_REVEAL_DELAY_MS : DEFAULT_REVEAL_DELAY_MS
    const revealDuration =
      reducedMotion ? REDUCED_REVEAL_DURATION_MS : DEFAULT_REVEAL_DURATION_MS

    let frameId = 0
    let revealTimeout = 0
    let finishTimeout = 0
    let startedAt: number | null = null

    document.body.classList.add('intro-lock')

    const tick = (timestamp: number) => {
      if (startedAt === null) {
        startedAt = timestamp
      }

      const elapsed = timestamp - startedAt
      const ratio = Math.min(elapsed / loadDuration, 1)
      const easedRatio = reducedMotion ? ratio : easeOutQuart(ratio)
      const nextProgress = Math.max(3, Math.round(easedRatio * 100))

      setProgress(nextProgress)

      if (ratio < 1) {
        frameId = window.requestAnimationFrame(tick)

        return
      }

      try {
        window.sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        // Ignore storage access issues and complete the intro normally.
      }

      revealTimeout = window.setTimeout(() => {
        setPhase('revealing')
      }, revealDelay)

      finishTimeout = window.setTimeout(() => {
        document.body.classList.remove('intro-lock')
        setPhase('done')
      }, revealDelay + revealDuration)
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(revealTimeout)
      window.clearTimeout(finishTimeout)
      document.body.classList.remove('intro-lock')
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  if (phase === 'done') {
    return null
  }

  const progressLabel = `${Math.max(0, Math.min(progress, 100))}%`

  return (
    <div
      aria-hidden
      className={`home-intro-loader ${
        phase === 'revealing' ? 'is-revealing' : ''
      } ${prefersReducedMotion ? 'is-reduced-motion' : ''}`}
    >
      <div className='home-intro-loader__logo'>
        <Image
          src='/images/erb.webp'
          alt={crestAlt}
          width={120}
          height={120}
          className='home-intro-loader__crest'
          priority
          sizes='80px'
        />
      </div>
      <div className='home-intro-loader__content'>
        <p className='editorial-title editorial-title-dark editorial-title-hero'>
          Zámek Lázeň
        </p>
      </div>

      <div className='home-intro-loader__progress'>
        <span className='home-intro-loader__progress-label'>
          {progressLabel}
        </span>
        <div className='home-intro-loader__progress-rail'>
          <span
            className='home-intro-loader__progress-fill'
            style={{ width: progressLabel }}
          />
        </div>
      </div>
    </div>
  )
}
