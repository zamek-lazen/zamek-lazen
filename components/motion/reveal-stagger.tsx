'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Children, isValidElement } from 'react'
import { REVEAL_DURATION, REVEAL_EASE, REVEAL_Y } from '@/components/motion/constants'

type RevealStaggerProps = {
  className?: string
  children: React.ReactNode
  /** Delay between each child (seconds) */
  stagger?: number
  /** Delay before first child animates */
  delayChildren?: number
}

export function RevealStagger({
  className,
  children,
  stagger = 0.07,
  delayChildren = 0.04
}: RevealStaggerProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren
      }
    }
  }

  // Y-only stagger: avoid nested opacity with parent RevealOnScroll (would compound
  // or leave cards stuck invisible when whileInView timing differs).
  const itemVariants = {
    hidden: { y: REVEAL_Y * 0.75 },
    visible: {
      y: 0,
      transition: {
        duration: REVEAL_DURATION * 0.92,
        ease: REVEAL_EASE
      }
    }
  }

  return (
    <motion.div
      className={className}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-40px 0px -12% 0px', amount: 0.01 }}
      variants={containerVariants}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child
        }

        return (
          <motion.div
            key={child.key ?? `stagger-${index}`}
            className='min-h-0 min-w-0 h-full w-full self-stretch'
            variants={itemVariants}
          >
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
