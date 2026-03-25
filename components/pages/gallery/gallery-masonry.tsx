'use client'

import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { REVEAL_DURATION, REVEAL_EASE } from '@/components/motion/constants'
import type { GalleryImageDefinition } from '@/components/pages/gallery/gallery-images'

type GalleryMasonryImage = Omit<GalleryImageDefinition, 'altKey'> & {
  alt: string
}

type GalleryMasonryProps = {
  images: GalleryMasonryImage[]
  ui: {
    closeImageLabel: string
    imageDialogLabel: string
    openImageLabel: string
  }
}

export function GalleryMasonry({ images, ui }: GalleryMasonryProps) {
  const reduceMotion = useReducedMotion() ?? false
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeImage = activeIndex === null ? null : images[activeIndex]

  useEffect(() => {
    if (activeImage === null) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImage])

  return (
    <>
      <div className='columns-1 gap-4 md:columns-2 xl:columns-3'>
        {images.map((image, index) => (
          <motion.button
            key={image.src}
            aria-label={`${ui.openImageLabel}: ${image.alt}`}
            className='group mb-4 inline-block w-full break-inside-avoid text-left transition-transform duration-300'
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            transition={{
              duration: reduceMotion ? 0.01 : REVEAL_DURATION * 0.88,
              delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.35),
              ease: REVEAL_EASE
            }}
            type='button'
            viewport={{ once: true, amount: 0.12, margin: '-32px 0px' }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            onClick={() => setActiveIndex(index)}
          >
            <span className='block overflow-hidden rounded-[0.95rem] border border-[rgba(13,49,41,0.08)] bg-[rgba(255,255,255,0.5)] shadow-[0_8px_24px_rgba(15,33,28,0.06)]'>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes='(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw'
                quality={90}
                className='h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]'
              />
            </span>
          </motion.button>
        ))}
      </div>

      {activeImage ?
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(4,14,11,0.86)] p-4 backdrop-blur-md md:p-8'
          role='dialog'
          aria-modal='true'
          aria-label={ui.imageDialogLabel}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type='button'
            onClick={() => setActiveIndex(null)}
            className='absolute top-4 right-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,253,242,0.24)] bg-[rgba(7,24,19,0.72)] text-[1.4rem] leading-none text-[var(--color-paper-50)] transition-colors duration-200 hover:bg-[rgba(11,39,31,0.9)] md:top-6 md:right-6'
            aria-label={ui.closeImageLabel}
          >
            <span aria-hidden>×</span>
          </button>

          <div
            className='flex max-h-full w-full max-w-368 flex-col gap-4'
            onClick={(event) => event.stopPropagation()}
          >
            <div className='relative h-[min(78vh,calc(100dvh-11rem))] w-full overflow-hidden p-3 shadow-[0_32px_100px_rgba(0,0,0,0.45)] md:h-[min(82vh,calc(100dvh-12rem))] md:p-6'>
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes='100vw'
                quality={95}
                priority
                className='object-contain'
              />
            </div>

            <p className='editorial-body editorial-body-dark text-center'>
              {activeImage.alt}
            </p>
          </div>
        </div>
      : null}
    </>
  )
}
