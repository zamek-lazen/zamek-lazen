import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/shared/json-ld'
import { RevealOnScroll } from '@/components/motion'
import { galleryImages } from '@/components/pages/gallery/gallery-images'
import { GalleryMasonry } from '@/components/pages/gallery/gallery-masonry'
import { PageHero } from '@/components/shared/page-hero'
import type { AppLocale } from '@/lib/seo/constants'
import { buildPageMetadata, getStaticPageUrl } from '@/lib/seo/metadata'
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  createJsonLdId
} from '@/lib/seo/schema'

type GalleryPageProps = {
  params: Promise<{
    locale: AppLocale
  }>
}

export async function generateMetadata({
  params
}: GalleryPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'GalleryPage' })

  return buildPageMetadata({
    locale,
    page: 'gallery',
    title: t('title'),
    description: t('lead')
  })
}

export default async function GalleryPage({
  params
}: GalleryPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'GalleryPage' })
  const images = galleryImages.map((image) => ({
    ...image,
    alt: t(`images.${image.altKey}`)
  }))
  const pageUrl = getStaticPageUrl(locale, 'gallery')
  const pageSchema = [
    buildWebPageSchema({
      locale,
      name: t('title'),
      description: t('lead'),
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
        id={createJsonLdId(`gallery-${locale}`)}
        data={pageSchema}
      />
      <div className='-mt-28 md:-mt-32'>
        <PageHero
          eyebrow={t('eyebrow')}
          title={t('title')}
          lead={t('lead')}
        />

        <RevealOnScroll
          as='section'
          className='editorial-surface-light px-[1.2rem] py-[clamp(3rem,7vw,5.5rem)] md:px-8'
        >
          <div className='mx-auto w-full max-w-376'>
            <GalleryMasonry
              images={images}
              ui={{
                closeImageLabel: t('closeImageLabel'),
                imageDialogLabel: t('imageDialogLabel'),
                openImageLabel: t('openImageLabel')
              }}
            />
          </div>
        </RevealOnScroll>
      </div>
    </>
  )
}
