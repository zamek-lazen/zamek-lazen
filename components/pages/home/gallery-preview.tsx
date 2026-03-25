import Image from 'next/image'
import { galleryImages } from '@/components/pages/gallery/gallery-images'
import { Link } from '@/i18n/navigation'

type GalleryPreviewProps = {
  eyebrow: string
  title: string
  body: string
  cta: string
}

export function GalleryPreview({
  body,
  cta,
  eyebrow,
  title
}: GalleryPreviewProps) {
  const [primaryImage, secondaryImage, tertiaryImage] = galleryImages

  return (
    <section className='editorial-surface-dark px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
      <div className='mx-auto w-full max-w-376'>
        <div className='grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end'>
          <div className='max-w-136'>
            <p className='editorial-eyebrow editorial-eyebrow-dark'>
              {eyebrow}
            </p>
            <h2 className='editorial-title editorial-title-dark mt-4 max-w-[12ch]'>
              {title}
            </h2>
            <p className='editorial-body editorial-body-dark mt-5 max-w-[56ch]'>
              {body}
            </p>
            <Link
              href='/galerie'
              className='editorial-button editorial-button-primary mt-8'
            >
              {cta}
            </Link>
          </div>

          <div className='grid gap-3 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
            <div className='group relative min-h-100 overflow-hidden rounded-2xl border border-[rgba(254,252,232,0.12)]'>
              <Image
                src={primaryImage.src}
                alt=''
                fill
                sizes='(max-width: 1024px) 100vw, 54vw'
                className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
              />
            </div>
            <div className='grid gap-3'>
              <div className='group relative min-h-48 overflow-hidden rounded-[0.9rem] border border-[rgba(254,252,232,0.12)]'>
                <Image
                  src={secondaryImage.src}
                  alt=''
                  fill
                  sizes='(max-width: 1024px) 100vw, 28vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                />
              </div>
              <div className='group relative min-h-48 overflow-hidden rounded-[0.9rem] border border-[rgba(254,252,232,0.12)]'>
                <Image
                  src={tertiaryImage.src}
                  alt=''
                  fill
                  sizes='(max-width: 1024px) 100vw, 28vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
