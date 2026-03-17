import { Link } from '@/i18n/navigation'
import type { HomepageCopy } from './types'

type GallerySectionProps = Pick<
  HomepageCopy,
  'ctaGallery' | 'galleryLead' | 'galleryNotice' | 'galleryTitle'
>

export function GallerySection({
  ctaGallery,
  galleryLead,
  galleryNotice,
  galleryTitle,
}: GallerySectionProps) {
  return (
    <div className='grid gap-[clamp(1.35rem,3.5vw,2.6rem)] pt-[clamp(2rem,5vw,3rem)] md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:items-start'>
      <div className='grid content-start gap-4'>
        <p className='m-0 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(20,52,45,0.52)]'>
          {galleryTitle}
        </p>
        <h2 className='max-w-[9ch] text-balance font-serif text-[clamp(2.2rem,5.6vw,4.6rem)] leading-[0.94] tracking-[-0.02em] text-[rgba(20,52,45,0.48)]'>
          {galleryLead}
        </h2>
        <p className='m-0 max-w-[32ch] font-sans text-[clamp(0.95rem,1.9vw,1.05rem)] leading-[1.78] text-[rgba(20,52,45,0.76)]'>
          {galleryNotice}
        </p>
        <Link
          href='/galerie'
          className='inline-flex w-fit items-center gap-[0.8rem] font-sans text-[0.76rem] uppercase tracking-[0.18em] text-[rgba(20,52,45,0.84)] transition-[opacity,transform] duration-200 hover:translate-x-1 hover:opacity-100'
        >
          <span>{ctaGallery}</span>
          <span className='h-px w-[2.1rem] bg-current opacity-40' />
        </Link>
      </div>

      <div className='grid gap-4 md:grid-cols-[minmax(0,1.18fr)_minmax(16rem,0.82fr)] md:items-stretch'>
        <div
          aria-hidden='true'
          className='min-h-64 bg-cover bg-center bg-no-repeat md:min-h-[clamp(17rem,28vw,22rem)]'
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(247, 242, 232, 0.04), rgba(20, 30, 25, 0.14)), url("/images/estate/castle-front-park.webp")',
          }}
        />
        <div
          aria-hidden='true'
          className='min-h-64 bg-cover bg-center bg-no-repeat md:min-h-[clamp(17rem,28vw,22rem)]'
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(247, 242, 232, 0.03), rgba(20, 30, 25, 0.1)), url("/images/flora/magnolia-bud-detail.webp")',
          }}
        />
      </div>
    </div>
  )
}
