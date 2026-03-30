import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/shared/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import type { AppLocale } from '@/lib/seo/constants'
import { buildPageMetadata, getStaticPageUrl } from '@/lib/seo/metadata'
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  createJsonLdId
} from '@/lib/seo/schema'

type ContactPageProps = {
  params: Promise<{
    locale: AppLocale
  }>
}

export async function generateMetadata({
  params
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ContactPage' })

  return buildPageMetadata({
    locale,
    page: 'contact',
    title: t('title'),
    description: `${t('lead')} ${t('address')}`
  })
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ContactPage' })
  const pageUrl = getStaticPageUrl(locale, 'contact')
  const pageSchema = [
    buildWebPageSchema({
      locale,
      name: t('title'),
      description: `${t('lead')} ${t('address')}`,
      url: pageUrl
    }),
    buildBreadcrumbSchema([
      {
        name: locale === 'de' ? 'Start' : 'Úvod',
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
        id={createJsonLdId(`contact-${locale}`)}
        data={pageSchema}
      />
      <div className='-mt-28 md:-mt-32'>
        <PageHero
          eyebrow={t('eyebrow')}
          title={t('title')}
          lead={t('lead')}
        />
      </div>
    </>
  )
}
