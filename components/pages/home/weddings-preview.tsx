import Image from 'next/image'
import { Link } from '@/i18n/navigation'

type WeddingsPreviewProps = {
  eyebrow: string
  title: string
  lead: string
  body: string
  cta: string
  imageAlt1: string
  imageAlt2: string
}

export function WeddingsPreview({
  body,
  cta,
  eyebrow,
  imageAlt1,
  imageAlt2,
  lead,
  title
}: WeddingsPreviewProps) {
  return (
    <section className='editorial-surface-dark px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
      <div className='mx-auto grid w-full max-w-376 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16'>
        <div className='max-w-136'>
          <p className='editorial-eyebrow editorial-eyebrow-dark'>{eyebrow}</p>
          <h2 className='editorial-title editorial-title-dark mt-4'>{title}</h2>
          <p className='editorial-lead editorial-lead-dark mt-5 max-w-[30ch]'>
            {lead}
          </p>
          <p className='editorial-body editorial-body-dark mt-5 max-w-[56ch]'>
            {body}
          </p>

          <Link
            href='/svatby'
            className='editorial-button editorial-button-primary mt-8'
          >
            {cta}
          </Link>
        </div>

        <div className='grid grid-cols-[1fr_0.85fr] gap-3 sm:gap-4 lg:gap-5'>
          <div className='translate-y-4 sm:translate-y-6 lg:translate-y-8'>
            <div className='relative aspect-[3/4] overflow-hidden rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.3)]'>
              <Image
                src='/images/wedding/1.webp'
                alt={imageAlt1}
                fill
                sizes='(max-width: 1024px) 45vw, 22vw'
                className='object-cover'
              />
            </div>
          </div>
          <div className='-translate-y-4 sm:-translate-y-6 lg:-translate-y-8'>
            <div className='relative aspect-[3/4] overflow-hidden rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.3)]'>
              <Image
                src='/images/wedding/2.webp'
                alt={imageAlt2}
                fill
                sizes='(max-width: 1024px) 40vw, 20vw'
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
