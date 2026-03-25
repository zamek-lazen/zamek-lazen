import { getLocale, getTranslations } from 'next-intl/server'
import { PageHero } from '@/components/shared/page-hero'
import { SiteContactPeopleBlock } from '@/components/shared/site-contact-people'
import { getSiteContactPeople } from '@/sanity/lib/site-settings'

export default async function ContactPage() {
  const locale = (await getLocale()) as 'cs' | 'de'
  const t = await getTranslations('ContactPage')

  const contactPeople = await getSiteContactPeople(locale)

  return (
    <div className='-mt-28 md:-mt-32'>
      <PageHero
        eyebrow={t('company')}
        title={t('title')}
        lead={t('lead')}
      />

      <section className='border-t border-[rgba(18,70,60,0.08)] bg-mist-50 px-[1.2rem] py-[clamp(3rem,7vw,5rem)] md:px-8'>
        <div className='mx-auto grid w-full max-w-376 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16'>
          <div>
            <p className='editorial-eyebrow text-[0.74rem] text-forest-800'>
              {t('addressLabel')}
            </p>
            <p className='editorial-body mt-3 max-w-[32ch] text-forest-900'>
              {t('address')}
            </p>
            <p className='editorial-eyebrow mt-8 text-[0.7rem] text-forest-800'>
              {t('icoLabel')}
            </p>
            <p className='editorial-body mt-2 text-forest-900'>{t('ico')}</p>
          </div>

          <div>
            <p className='editorial-eyebrow text-[0.74rem] text-forest-800'>
              {t('phoneLabel')}
            </p>
            <div className='mt-3'>
              <SiteContactPeopleBlock people={contactPeople} variant='light' />
            </div>

            <p className='editorial-eyebrow mt-8 text-[0.7rem] text-forest-800'>
              {t('emailLabel')}
            </p>
            <a
              href={`mailto:${t('email')}`}
              className='editorial-body mt-2 inline-block text-forest-900 transition hover:text-forest-700'
            >
              {t('email')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
