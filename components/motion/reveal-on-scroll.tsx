'use client'

import { motion, useReducedMotion } from 'motion/react'
import { REVEAL_DURATION, REVEAL_EASE } from '@/components/motion/constants'

type RevealOnScrollProps = {
  as?: 'div' | 'section'
  className?: string
  children: React.ReactNode
  /** Extra delay after entering view (seconds) */
  delay?: number
}

export function RevealOnScroll({
  as = 'div',
  className,
  children,
  delay = 0
}: RevealOnScrollProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  if (as === 'section') {
    return (
      <motion.section
        className={className}
        // Keep SSR content visible. Hiding entire sections until whileInView fires
        // leaves real content invisible when hydration or intersection is delayed.
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-56px 0px -10% 0px', amount: 0.12 }}
        transition={{
          duration: REVEAL_DURATION,
          delay,
          ease: REVEAL_EASE
        }}
      >
        {children}
      </motion.section>
    )
  }

  return (
    <motion.div
      className={className}
      // Keep SSR content visible. Hiding entire sections until whileInView fires
      // leaves real content invisible when hydration or intersection is delayed.
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-56px 0px -10% 0px', amount: 0.12 }}
      transition={{
        duration: REVEAL_DURATION,
        delay,
        ease: REVEAL_EASE
      }}
    >
      {children}
    </motion.div>
  )
}
