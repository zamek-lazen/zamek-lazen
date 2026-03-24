import { Link } from '@/i18n/navigation'

type HistoryFamilyPreviewProps = {
  eyebrow: string
  historyTitle: string
  historyBody: string
  historyCta: string
  familyTitle: string
  familyBody: string
  familyCta: string
}

export function HistoryFamilyPreview({
  eyebrow,
  familyBody,
  familyCta,
  familyTitle,
  historyBody,
  historyCta,
  historyTitle
}: HistoryFamilyPreviewProps) {
  return (
    <section className='bg-[linear-gradient(180deg,rgba(10,37,31,0.98),rgba(7,26,21,1))] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-mist-100)] md:px-8'>
      <div className='mx-auto w-full max-w-[94rem]'>
        <p className='font-sans text-[0.72rem] tracking-[0.2em] text-[rgba(201,218,208,0.64)] uppercase'>
          {eyebrow}
        </p>
        <div className='mt-6 grid gap-5 lg:grid-cols-2'>
          <article className='rounded-[1.25rem] border border-[rgba(185,212,197,0.18)] bg-[rgba(255,255,255,0.02)] p-7 shadow-[0_18px_48px_rgba(0,0,0,0.18)] md:p-9'>
            <span className='font-sans text-[0.68rem] tracking-[0.22em] text-[rgba(188,208,198,0.54)] uppercase'>
              Historie
            </span>
            <h2 className='mt-4 max-w-[13ch] font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.02em] text-balance text-[rgba(241,245,239,0.95)]'>
              {historyTitle}
            </h2>
            <p className='mt-5 max-w-[56ch] font-sans text-[1rem] leading-[1.85] text-[rgba(194,211,201,0.76)]'>
              {historyBody}
            </p>
            <Link
              href='/historie'
              className='mt-8 inline-flex min-h-11 items-center justify-center border border-[rgba(193,215,204,0.28)] px-6 py-3 font-sans text-[0.75rem] tracking-[0.18em] text-[rgba(231,238,232,0.94)] uppercase transition-transform duration-200 hover:-translate-y-0.5 hover:border-[rgba(223,234,226,0.52)]'
            >
              {historyCta}
            </Link>
          </article>

          <article className='rounded-[1.25rem] border border-[rgba(185,212,197,0.18)] bg-[linear-gradient(180deg,rgba(18,70,60,0.34),rgba(255,255,255,0.02))] p-7 shadow-[0_18px_48px_rgba(0,0,0,0.18)] md:p-9'>
            <span className='font-sans text-[0.68rem] tracking-[0.22em] text-[rgba(188,208,198,0.54)] uppercase'>
              Rod Czerninů
            </span>
            <h2 className='mt-4 max-w-[13ch] font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.02em] text-balance text-[rgba(241,245,239,0.95)]'>
              {familyTitle}
            </h2>
            <p className='mt-5 max-w-[56ch] font-sans text-[1rem] leading-[1.85] text-[rgba(194,211,201,0.76)]'>
              {familyBody}
            </p>
            <Link
              href='/rod'
              className='mt-8 inline-flex min-h-11 items-center justify-center border border-[rgba(193,215,204,0.28)] px-6 py-3 font-sans text-[0.75rem] tracking-[0.18em] text-[rgba(231,238,232,0.94)] uppercase transition-transform duration-200 hover:-translate-y-0.5 hover:border-[rgba(223,234,226,0.52)]'
            >
              {familyCta}
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
