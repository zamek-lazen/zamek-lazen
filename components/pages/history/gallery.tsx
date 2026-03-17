import Image from 'next/image'
import type { HistoryPageCopy } from './types'

type GalleryProps = Pick<
  HistoryPageCopy,
  'galleryCaption1' | 'galleryCaption2' | 'galleryCaption3' | 'galleryLabel'
>

export function Gallery({
  galleryCaption1,
  galleryCaption2,
  galleryCaption3,
  galleryLabel,
}: GalleryProps) {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <div className='mb-1 text-[0.82rem] uppercase tracking-[0.2em] text-[rgba(221,231,223,0.58)] md:col-span-2'>
        {galleryLabel}
      </div>

      <figure className='relative min-h-[24rem] overflow-hidden border border-[rgba(221,231,223,0.16)] bg-[rgba(9,19,15,0.62)] md:row-span-2 md:min-h-[37rem]'>
        <Image
          src='/images/estate/castle-front-park.webp'
          alt={galleryCaption1}
          fill
          sizes='(max-width: 900px) 100vw, 46vw'
          className='object-cover'
        />
        <figcaption className='absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(6,13,11,0.86))] px-4 pb-[1.1rem] pt-4 text-[0.92rem] leading-[1.5] text-[rgba(245,247,244,0.9)]'>
          {galleryCaption1}
        </figcaption>
      </figure>

      <figure className='relative min-h-[18rem] overflow-hidden border border-[rgba(221,231,223,0.16)] bg-[rgba(9,19,15,0.62)]'>
        <Image
          src='/images/estate/castle-front-winter-garden.webp'
          alt={galleryCaption2}
          fill
          sizes='(max-width: 900px) 100vw, 24vw'
          className='object-cover'
        />
        <figcaption className='absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(6,13,11,0.86))] px-4 pb-[1.1rem] pt-4 text-[0.92rem] leading-[1.5] text-[rgba(245,247,244,0.9)]'>
          {galleryCaption2}
        </figcaption>
      </figure>

      <figure className='relative min-h-[18rem] overflow-hidden border border-[rgba(221,231,223,0.16)] bg-[rgba(9,19,15,0.62)]'>
        <Image
          src='/images/estate/winter-park-tree.webp'
          alt={galleryCaption3}
          fill
          sizes='(max-width: 900px) 100vw, 24vw'
          className='object-cover'
        />
        <figcaption className='absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(6,13,11,0.86))] px-4 pb-[1.1rem] pt-4 text-[0.92rem] leading-[1.5] text-[rgba(245,247,244,0.9)]'>
          {galleryCaption3}
        </figcaption>
      </figure>
    </div>
  )
}
