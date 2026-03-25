import Image from 'next/image'

import { Link } from '@/i18n/navigation'

type HistoryFamilyPreviewProps = {
  eyebrow: string
  historyEyebrow: string
  historyTitle: string
  historyBody: string
  historyCta: string
  familyEyebrow: string
  familyTitle: string
  familyBody: string
  familyCta: string
  familyCrestAlt: string
}

export function HistoryFamilyPreview({
  eyebrow,
  familyBody,
  familyCrestAlt,
  familyCta,
  familyEyebrow,
  familyTitle,
  historyBody,
  historyCta,
  historyEyebrow,
  historyTitle
}: HistoryFamilyPreviewProps) {
  return (
    <section className='editorial-surface-light px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
      <div className='mx-auto w-full max-w-376'>
        <p className='editorial-eyebrow editorial-eyebrow-light'>
          {eyebrow}
        </p>
        <div className='mt-6 grid gap-5 lg:grid-cols-2'>
          <article className='editorial-card rounded-[1.25rem] p-7 md:p-9'>
            <span className='editorial-eyebrow editorial-eyebrow-light text-[0.75rem]'>
              {historyEyebrow}
            </span>
            <h2 className='editorial-title editorial-title-light mt-4 max-w-[20ch]'>
              {historyTitle}
            </h2>
            <p className='editorial-body editorial-body-light mt-5 max-w-[56ch]'>
              {historyBody}
            </p>
            <Link
              href='/historie'
              className='editorial-button editorial-button-forest mt-8'
            >
              {historyCta}
            </Link>
          </article>

          <article className='editorial-card rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(185,212,197,0.18),transparent)] p-7 md:p-9'>
            <div className='flex items-start gap-5 md:gap-6'>
              <div className='min-w-0 flex-1'>
                <span className='editorial-eyebrow editorial-eyebrow-light text-[0.75rem]'>
                  {familyEyebrow}
                </span>
                <h2 className='editorial-title editorial-title-light mt-4 max-w-[20ch]'>
                  {familyTitle}
                </h2>
              </div>
              <Image
                src='/images/erb.webp'
                alt={familyCrestAlt}
                width={96}
                height={96}
                className='h-16 w-16 shrink-0 object-contain opacity-95 md:h-[5.25rem] md:w-[5.25rem]'
                sizes='(max-width: 768px) 64px, 84px'
              />
            </div>
            <p className='editorial-body editorial-body-light mt-5 max-w-[56ch]'>
              {familyBody}
            </p>
            <Link
              href='/rod'
              className='editorial-button editorial-button-forest mt-8'
            >
              {familyCta}
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
