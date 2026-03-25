import { getTranslations } from 'next-intl/server'
import { galleryImages } from '@/components/pages/gallery/gallery-images'
import { GalleryMasonry } from '@/components/pages/gallery/gallery-masonry'
import { PageHero } from '@/components/shared/page-hero'

export default async function GalleryPage() {
  const t = await getTranslations('GalleryPage')
  const images = galleryImages.map((image) => ({
    ...image,
    alt: t(`images.${image.altKey}`)
  }))

  return (
    <div className='-mt-28 md:-mt-32'>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        lead={t('lead')}
      />

      <section className='editorial-surface-light px-[1.2rem] py-[clamp(3rem,7vw,5.5rem)] md:px-8'>
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
      </section>
    </div>
  )
}
