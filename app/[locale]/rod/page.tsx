import { getTranslations } from 'next-intl/server'
import { PageHero } from '@/components/shared/page-hero'

export default async function FamilyPage() {
  const t = await getTranslations('FamilyPage')

  return (
    <div className='-mt-28 md:-mt-32'>
      <PageHero
        eyebrow='Rod'
        title={t('title')}
        lead={t('lead')}
      />

      <section className='editorial-surface-light px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'>
        <div className='mx-auto grid w-full max-w-376 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
          <div>
            <p className='editorial-body editorial-body-light max-w-[60ch]'>
              {t('p1')}
            </p>
            <p className='editorial-body editorial-body-light mt-5 max-w-[60ch]'>
              {t('p2')}
            </p>
            <p className='editorial-body editorial-body-light mt-5 max-w-[60ch]'>
              {t('p3')}
            </p>
          </div>

          <aside className='editorial-card rounded-[1.25rem] p-7 md:p-8'>
            <p className='editorial-eyebrow editorial-eyebrow-light'>
              {t('currentHeadLabel')}
            </p>
            <h2 className='editorial-title editorial-title-light mt-4 max-w-[18ch]'>
              {t('currentHeadTitle')}
            </h2>
            <p className='editorial-body editorial-body-light mt-5'>
              {t('currentHeadBody')}
            </p>
          </aside>
        </div>
      </section>
    </div>
  )
}
