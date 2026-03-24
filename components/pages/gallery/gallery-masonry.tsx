'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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
          <button
            key={image.src}
            type='button'
            onClick={() => setActiveIndex(index)}
            className='group mb-4 inline-block w-full break-inside-avoid text-left transition-transform duration-300 hover:-translate-y-1'
            aria-label={`${ui.openImageLabel}: ${image.alt}`}
          >
            <span className='block overflow-hidden rounded-[0.95rem] border border-[rgba(185,212,197,0.14)] bg-[rgba(7,24,19,0.36)]'>
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
          </button>
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
            className='absolute top-4 right-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(221,232,223,0.24)] bg-[rgba(7,24,19,0.72)] text-[1.4rem] leading-none text-[var(--color-mist-50)] transition-colors duration-200 hover:bg-[rgba(11,39,31,0.9)] md:top-6 md:right-6'
            aria-label={ui.closeImageLabel}
          >
            <span aria-hidden>×</span>
          </button>

          <div
            className='flex max-h-full w-full max-w-[92rem] flex-col gap-4'
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

            <p className='text-center font-sans text-[0.92rem] leading-[1.7] text-[rgba(221,232,223,0.82)]'>
              {activeImage.alt}
            </p>
          </div>
        </div>
      : null}
    </>
  )
}
