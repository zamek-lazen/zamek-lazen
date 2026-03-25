import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/shared/json-ld'
import { RevealOnScroll } from '@/components/motion'
import { PageHero } from '@/components/shared/page-hero'
import type { AppLocale } from '@/lib/seo/constants'
import { buildPageMetadata, getStaticPageUrl } from '@/lib/seo/metadata'
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  createJsonLdId
} from '@/lib/seo/schema'

type FamilyPageProps = {
  params: Promise<{
    locale: AppLocale
  }>
}

export async function generateMetadata({
  params
}: FamilyPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'FamilyPage' })

  return buildPageMetadata({
    locale,
    page: 'family',
    title: t('title'),
    description: t('lead')
  })
}

export default async function FamilyPage({
  params
}: FamilyPageProps) {
  const { locale } = await params
  const [nav, t] = await Promise.all([
    getTranslations({ locale, namespace: 'Nav' }),
    getTranslations({ locale, namespace: 'FamilyPage' })
  ])
  const pageUrl = getStaticPageUrl(locale, 'family')
  const pageSchema = [
    buildWebPageSchema({
      locale,
      name: t('title'),
      description: t('lead'),
      url: pageUrl
    }),
    buildBreadcrumbSchema([
      {
        name: nav('home'),
        url: getStaticPageUrl(locale, 'home')
      },
      {
        name: t('title'),
        url: pageUrl
      }
    ])
  ]

  return (
    <>
      <JsonLd
        id={createJsonLdId(`family-${locale}`)}
        data={pageSchema}
      />
      <div className='-mt-28 md:-mt-32'>
        <PageHero
          eyebrow={nav('family')}
          title={t('title')}
          lead={t('lead')}
        />

        <RevealOnScroll
          as='section'
          className='editorial-surface-light px-[1.2rem] py-[clamp(4rem,8vw,7rem)] md:px-8'
        >
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
        </RevealOnScroll>
      </div>
    </>
  )
}
