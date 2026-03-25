import Image from 'next/image'
import { Link } from '@/i18n/navigation'

type EstatePreviewProps = {
  eyebrow: string
  title: string
  lead: string
  body: string
  cta: string
}

export function EstatePreview({
  body,
  cta,
  eyebrow,
  lead,
  title
}: EstatePreviewProps) {
  return (
    <section className='editorial-surface-light px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
      <div className='mx-auto grid w-full max-w-376 gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-center'>
        <div className='max-w-152'>
          <p className='editorial-eyebrow editorial-eyebrow-light'>
            {eyebrow}
          </p>
          <h2 className='editorial-title editorial-title-light mt-4 max-w-[10ch]'>
            {title}
          </h2>
          <p className='editorial-lead editorial-lead-light mt-5 max-w-[30ch]'>
            {lead}
          </p>
          <p className='editorial-body editorial-body-light mt-5 max-w-[58ch]'>
            {body}
          </p>

          <Link
            href='/historie'
            className='editorial-button editorial-button-outline mt-8'
          >
            {cta}
          </Link>
        </div>

        <div className='grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]'>
          <div className='relative min-h-84 overflow-hidden rounded-[1.25rem] border border-[rgba(19,52,45,0.08)] bg-[rgba(255,255,255,0.24)] shadow-[0_20px_60px_rgba(15,33,28,0.12)]'>
            <Image
              src='/images/estate/castle-park-lawn.webp'
              alt=''
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-cover'
            />
          </div>
          <div className='grid gap-4'>
            <div className='relative min-h-52 overflow-hidden rounded-2xl border border-[rgba(19,52,45,0.08)] bg-[rgba(255,255,255,0.24)] shadow-[0_20px_60px_rgba(15,33,28,0.12)]'>
              <Image
                src='/images/estate/castle-side-garden-summer.webp'
                alt=''
                fill
                sizes='(max-width: 768px) 100vw, 25vw'
                className='object-cover'
              />
            </div>
            <div className='editorial-card rounded-2xl p-6'>
              <p className='editorial-eyebrow editorial-eyebrow-light'>
                1728 / 12 ha / 2009
              </p>
              <p className='editorial-note editorial-note-light mt-4'>
                Krajina, architektura a klid tvoří charakter místa stejně silně
                jako samotná budova.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
