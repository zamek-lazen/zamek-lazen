'use client'

import { motion, useReducedMotion } from 'motion/react'
import { REVEAL_DURATION, REVEAL_EASE, REVEAL_Y } from '@/components/motion/constants'

type RevealOnScrollProps = {
  as?: 'div' | 'section'
  className?: string
  children: React.ReactNode
  /** Extra delay after entering view (seconds) */
  delay?: number
  y?: number
}

export function RevealOnScroll({
  as = 'div',
  className,
  children,
  delay = 0,
  y = REVEAL_Y
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
        initial={{ opacity: 0, y }}
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
      initial={{ opacity: 0, y }}
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
