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
import Image from 'next/image'
import { Fragment } from 'react'

type FamilyPageProps = {
  params: Promise<{
    locale: AppLocale
  }>
}

const URL_PATTERN = /(https?:\/\/[^\s]+)/g
const TRAILING_PUNCTUATION = /[),.;!?]+$/

function renderTextWithLinks(text: string) {
  return text.split(URL_PATTERN).map((part, index) => {
    if (!part.startsWith('http')) {
      return <Fragment key={`text-${index}`}>{part}</Fragment>
    }

    const trailing = part.match(TRAILING_PUNCTUATION)?.[0] ?? ''
    const href = trailing ? part.slice(0, -trailing.length) : part

    return (
      <Fragment key={`link-${index}`}>
        <a
          href={href}
          target='_blank'
          rel='noreferrer noopener'
          className='underline underline-offset-4 transition-colors hover:text-[var(--color-forest)]'
        >
          {href}
        </a>
        {trailing}
      </Fragment>
    )
  })
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

export default async function FamilyPage({ params }: FamilyPageProps) {
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
          <div className='mx-auto grid w-full max-w-376 items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.15fr)]'>
            <div>
              <p className='editorial-body editorial-body-light max-w-[60ch]'>
                {renderTextWithLinks(t('p1'))}
              </p>
              <p className='editorial-body editorial-body-light mt-5 max-w-[60ch]'>
                {renderTextWithLinks(t('p2'))}
              </p>
              <p className='editorial-body editorial-body-light mt-5 max-w-[60ch]'>
                {renderTextWithLinks(t('p3'))}
              </p>
            </div>

            <aside className='editorial-card self-start rounded-[1.25rem] p-7 md:p-8'>
              <p className='editorial-eyebrow editorial-eyebrow-light'>
                {t('currentHeadLabel')}
              </p>
              <h2 className='editorial-title editorial-title-light mt-4'>
                {t('currentHeadTitle')}
              </h2>
              <p className='editorial-body editorial-body-light mt-5'>
                {t('currentHeadBody')}
              </p>
            </aside>
          </div>

          <div className='relative mt-8 aspect-video overflow-hidden rounded-[1.25rem] shadow-[0_24px_64px_rgba(15,33,28,0.14)]'>
            <Image
              src='/images/rodina.webp'
              alt={t('familyPortraitAlt')}
              fill
              sizes='(max-width: 1024px) 100vw, 60vw'
              className='object-cover'
            />
          </div>
        </RevealOnScroll>
      </div>
    </>
  )
}
