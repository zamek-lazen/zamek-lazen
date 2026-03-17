'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const HERO_IMAGES = [
  '/images/estate/castle-front-park.webp',
  '/images/estate/castle-front-summer-path.webp',
  '/images/estate/castle-side-garden-summer.webp',
  '/images/estate/castle-park-lawn.webp',
  '/images/estate/castle-lawn-trees-summer.webp',
] as const

const SLIDE_INTERVAL_MS = 5200

export function ParallaxScene() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || HERO_IMAGES.length < 2) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveIndex(previousIndex => (previousIndex + 1) % HERO_IMAGES.length)
    }, SLIDE_INTERVAL_MS)

    return () => {
      window.clearInterval(interval)
    }
  }, [prefersReducedMotion])

  return (
    <div className='pointer-events-none absolute inset-0 h-full w-full overflow-hidden' aria-hidden='true'>
      {HERO_IMAGES.map((imageSrc, index) => {
        const isActive = index === activeIndex

        return (
          <div
            key={imageSrc}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={imageSrc}
              alt=''
              fill
              priority={index === 0}
              sizes='100vw'
              className='object-cover object-center'
            />
          </div>
        )
      })}
    </div>
  )
}
