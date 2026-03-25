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
    <section className='bg-[linear-gradient(180deg,#ebe7dc,#f3efe5)] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-(--color-forest-900) md:px-8'>
      <div className='mx-auto grid w-full max-w-376 gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-center'>
        <div className='max-w-152'>
          <p className='font-sans text-[0.72rem] tracking-[0.2em] text-[rgba(19,52,45,0.56)] uppercase'>
            {eyebrow}
          </p>
          <h2 className='mt-4 max-w-[10ch] font-serif text-[clamp(2.4rem,5.2vw,4.8rem)] leading-[0.95] tracking-[-0.025em] text-balance'>
            {title}
          </h2>
          <p className='mt-5 max-w-[30ch] font-serif text-[clamp(1.1rem,2vw,1.45rem)] leading-[1.3] text-[rgba(19,52,45,0.84)]'>
            {lead}
          </p>
          <p className='mt-5 max-w-[58ch] font-sans text-[1rem] leading-[1.85] text-[rgba(19,52,45,0.74)]'>
            {body}
          </p>

          <Link
            href='/historie'
            className='mt-8 inline-flex min-h-11 items-center justify-center border border-[rgba(19,52,45,0.16)] bg-[rgba(255,255,255,0.48)] px-6 py-3 font-sans text-[0.75rem] tracking-[0.18em] uppercase transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white'
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
            <div className='rounded-2xl border border-[rgba(19,52,45,0.08)] bg-[rgba(255,255,255,0.48)] p-6 shadow-[0_20px_60px_rgba(15,33,28,0.08)]'>
              <p className='font-sans text-[0.72rem] tracking-[0.2em] text-[rgba(19,52,45,0.48)] uppercase'>
                1728 / 12 ha / 2009
              </p>
              <p className='mt-4 font-serif text-[1.55rem] leading-[1.2] text-[rgba(19,52,45,0.92)]'>
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
