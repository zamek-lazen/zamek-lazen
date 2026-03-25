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
    <section className='editorial-surface-dark px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
      <div className='mx-auto w-full max-w-376'>
        <p className='editorial-eyebrow editorial-eyebrow-dark'>
          {eyebrow}
        </p>
        <div className='mt-6 grid gap-5 lg:grid-cols-2'>
          <article className='editorial-card-dark rounded-[1.25rem] p-7 md:p-9'>
            <span className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem]'>
              Historie
            </span>
            <h2 className='editorial-title editorial-title-dark mt-4 max-w-[13ch] text-[clamp(2.4rem,4.6vw,4.2rem)]'>
              {historyTitle}
            </h2>
            <p className='editorial-body editorial-body-dark mt-5 max-w-[56ch]'>
              {historyBody}
            </p>
            <Link
              href='/historie'
              className='editorial-button editorial-button-secondary mt-8'
            >
              {historyCta}
            </Link>
          </article>

          <article className='editorial-card-dark rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(29,85,73,0.22),rgba(254,252,232,0.04))] p-7 md:p-9'>
            <span className='editorial-eyebrow editorial-eyebrow-dark text-[0.75rem]'>
              Rod Czerninů
            </span>
            <h2 className='editorial-title editorial-title-dark mt-4 max-w-[13ch] text-[clamp(2.4rem,4.6vw,4.2rem)]'>
              {familyTitle}
            </h2>
            <p className='editorial-body editorial-body-dark mt-5 max-w-[56ch]'>
              {familyBody}
            </p>
            <Link
              href='/rod'
              className='editorial-button editorial-button-secondary mt-8'
            >
              {familyCta}
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
