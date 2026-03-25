'use client'

import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'
import { REVEAL_EASE } from '@/components/motion/constants'
import { Link } from '@/i18n/navigation'
import type { HeroUpcomingEvent } from '@/types'

type HeroProps = {
  eyebrow: string
  title: string
  lead: string
  description: string
  ctaPrimary: string
  ctaSecondary: string
  scrollPrompt: string
  sideLeft: string
  sideRight: string
  nextEvent?: HeroUpcomingEvent | null
}

export function Hero({
  ctaPrimary,
  ctaSecondary,
  eyebrow,
  scrollPrompt,
  sideLeft,
  sideRight,
  title,
  nextEvent
}: HeroProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const reduceMotion = useReducedMotion() ?? false

  const prefersReducedMotion = reduceMotion

  const imageTransform =
    prefersReducedMotion ? 'scale(1.02)' : (
      `translate3d(${pointer.x * -16}px, ${pointer.y * -12}px, 0) scale(1.06)`
    )
  const copyTransform =
    prefersReducedMotion ?
      'translate3d(0, 0, 0)'
    : `translate3d(${pointer.x * 10}px, ${pointer.y * 8}px, 0)`
  const glowTransform =
    prefersReducedMotion ?
      'translate3d(0, 0, 0)'
    : `translate3d(${pointer.x * 22}px, ${pointer.y * 18}px, 0)`

  const copyContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  }

  const copyItemVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 14
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.58,
        ease: REVEAL_EASE
      }
    }
  }

  return (
    <section
      className='bg-background relative isolate flex h-dvh min-h-0 min-h-svh flex-col overflow-hidden px-[1.2rem] pt-[clamp(6.25rem,10vh,8.5rem)] text-mist-50 lg:px-8 lg:pt-[clamp(6.75rem,10vh,9rem)]'
      onMouseMove={(event) => {
        if (prefersReducedMotion) {
          return
        }

        const bounds = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5
        setPointer({ x, y })
      }}
      onMouseLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute inset-[-3%] transition-transform duration-300 ease-out'
          style={{ transform: imageTransform }}
        >
          <Image
            src='/images/castle-front-flower.webp'
            alt=''
            fill
            priority
            sizes='100vw'
            className='object-cover object-[center_35%]'
          />
        </div>
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(6,22,17,0.02),rgba(6,22,17,0.08)_22%,rgba(6,22,17,0.14)_35%,rgba(6,22,17,0.68)_70%)]' />
        <div
          aria-hidden
          className='absolute top-[16%] left-[8%] h-44 w-44 rounded-full bg-[rgba(169,204,171,0.18)] blur-[90px] transition-transform duration-300 ease-out lg:h-72 lg:w-72'
          style={{ transform: glowTransform }}
        />
      </div>

      <div className='relative z-10 mx-auto flex min-h-0 w-full max-w-376 flex-1 flex-col px-0 pb-[clamp(2.25rem,5vh,4.75rem)]'>
        <div className='flex min-h-0 min-w-0 flex-1 flex-col justify-end'>
          <motion.div
            animate='visible'
            className='max-w-176 transition-transform duration-300 ease-out'
            initial='hidden'
            style={{ transform: copyTransform }}
            variants={copyContainerVariants}
          >
            <motion.h1
              className='editorial-title editorial-title-dark editorial-title-hero mt-4'
              variants={copyItemVariants}
            >
              {title}
            </motion.h1>
            <motion.p
              className='editorial-eyebrow editorial-eyebrow-dark mt-4'
              variants={copyItemVariants}
            >
              {eyebrow}
            </motion.p>

            <motion.div
              className='mt-28 flex flex-wrap gap-3'
              variants={copyItemVariants}
            >
              <Link
                href='/historie'
                className='editorial-button editorial-button-primary'
              >
                {ctaPrimary}
              </Link>
              <Link
                href='/kontakt'
                className='editorial-button editorial-button-secondary'
              >
                {ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className='mt-7 shrink-0 text-left lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:flex lg:justify-end lg:px-8 lg:pb-[clamp(2.25rem,5vh,4.75rem)] lg:text-right'
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.62,
            delay: prefersReducedMotion ? 0 : 0.68,
            ease: REVEAL_EASE
          }}
        >
          <div className='pointer-events-auto w-full max-w-[min(100%,18rem)] lg:max-w-[18rem]'>
            {nextEvent ?
              <Link
                href={nextEvent.href}
                className='group block transition-colors duration-200 hover:border-[rgba(236,241,236,0.72)]'
              >
                <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem] transition-colors duration-200 group-hover:text-[rgba(255,253,242,0.9)]'>
                  {nextEvent.label}
                </p>
                <p className='editorial-card-title editorial-card-title-dark mt-3 max-w-[18ch] transition-colors duration-200 group-hover:text-[rgba(255,253,242,0.98)] lg:ml-auto'>
                  {nextEvent.title}
                </p>
                <p className='editorial-eyebrow editorial-eyebrow-dark mt-2 text-[0.72rem] opacity-80 transition-colors duration-200 group-hover:text-[rgba(255,253,242,0.84)]'>
                  {nextEvent.date}
                </p>
              </Link>
            : <div className='border-t border-[rgba(224,233,225,0.24)] pt-4'>
                <p className='editorial-eyebrow editorial-eyebrow-dark text-[0.72rem] opacity-70'>
                  {scrollPrompt}
                </p>
                <p className='editorial-card-title editorial-card-title-dark mt-3 max-w-[22ch] lg:ml-auto'>
                  {sideLeft}{' '}
                  <span className='text-[rgba(198,216,204,0.66)]'>/</span>{' '}
                  {sideRight}
                </p>
              </div>
            }
          </div>
        </motion.div>
      </div>
    </section>
  )
}
