import Image from 'next/image'
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
  return (
    <section className='bg-[linear-gradient(180deg,#f4efe4,#ece4d8)] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-(--color-forest-900) md:px-8'>
      <div className='mx-auto w-full max-w-376'>
        <div className='grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end'>
          <div className='max-w-136'>
            <p className='font-sans text-[0.72rem] tracking-[0.2em] text-[rgba(19,52,45,0.56)] uppercase'>
              {eyebrow}
            </p>
            <h2 className='mt-4 max-w-[12ch] font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.025em] text-balance'>
              {title}
            </h2>
            <p className='mt-5 max-w-[56ch] font-sans text-[1rem] leading-[1.85] text-[rgba(19,52,45,0.74)]'>
              {body}
            </p>
            <Link
              href='/galerie'
              className='mt-8 inline-flex min-h-11 items-center justify-center border border-[rgba(19,52,45,0.16)] bg-[rgba(255,255,255,0.48)] px-6 py-3 font-sans text-[0.75rem] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-white'
            >
              {cta}
            </Link>
          </div>

          <div className='grid gap-3 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
            <div className='group relative min-h-100 overflow-hidden rounded-2xl'>
              <Image
                src='/images/estate/castle-front-summer-path.webp'
                alt=''
                fill
                sizes='(max-width: 1024px) 100vw, 54vw'
                className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
              />
            </div>
            <div className='grid gap-3'>
              <div className='group relative min-h-48 overflow-hidden rounded-[0.9rem]'>
                <Image
                  src='/images/estate/castle-park-lawn.webp'
                  alt=''
                  fill
                  sizes='(max-width: 1024px) 100vw, 28vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                />
              </div>
              <div className='group relative min-h-48 overflow-hidden rounded-[0.9rem]'>
                <Image
                  src='/images/flora/magnolia-bloom-closeup.webp'
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
