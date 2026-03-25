import { getTranslations } from 'next-intl/server'
import { PageHero } from '@/components/shared/page-hero'
import { HistoryInteractiveTimeline } from '@/components/pages/history/interactive-timeline'

export default async function HistoryPage() {
  const t = await getTranslations('HistoryPage')
  const imageT = await getTranslations('GalleryPage.images')

  const paragraphs = [t('p1'), t('p2'), t('p3')]

  const chapters = [
    {
      id: 'timeline-pramen',
      navLabel: t('chapter1Nav'),
      year: t('chapter1Year'),
      title: t('chapter1Title'),
      body: t('chapter1Body'),
      note: t('chapter1Note'),
      detail: t('chapter1Detail'),
      images: [
        {
          src: '/images/historical/lazen-estate-park-view-archive.webp',
          alt: imageT('imageArchiveParkView'),
          caption: imageT('imageArchiveParkView'),
          objectPosition: '50% 46%'
        },
        {
          src: '/images/historical/lazen-estate-front-path-archive.webp',
          alt: imageT('imageArchiveFrontPath'),
          caption: imageT('imageArchiveFrontPath'),
          objectPosition: '50% 46%'
        }
      ] as const
    },
    {
      id: 'timeline-promena',
      navLabel: t('chapter2Nav'),
      year: t('chapter2Year'),
      title: t('chapter2Title'),
      body: t('chapter2Body'),
      note: t('chapter2Note'),
      detail: t('chapter2Detail'),
      images: [
        {
          src: '/images/historical/lazen-estate-illustration.webp',
          alt: imageT('imageArchiveIllustration'),
          caption: imageT('imageArchiveIllustration'),
          objectPosition: '50% 42%'
        },
        {
          src: '/images/historical/lazen-estate-frontage-archive.webp',
          alt: imageT('imageArchiveFrontage'),
          caption: imageT('imageArchiveFrontage'),
          objectPosition: '50% 45%'
        }
      ] as const
    },
    {
      id: 'timeline-park',
      navLabel: t('chapter3Nav'),
      year: t('chapter3Year'),
      title: t('chapter3Title'),
      body: t('chapter3Body'),
      note: t('chapter3Note'),
      detail: t('chapter3Detail'),
      images: [
        {
          src: '/images/historical/lazen-estate-hillside-1927.webp',
          alt: imageT('imageArchiveHillside1927'),
          caption: imageT('imageArchiveHillside1927'),
          objectPosition: '50% 48%'
        },
        {
          src: '/images/historical/lazen-estate-side-facade-archive.webp',
          alt: imageT('imageArchiveSideFacade'),
          caption: imageT('imageArchiveSideFacade'),
          objectPosition: '50% 44%'
        }
      ] as const
    },
    {
      id: 'timeline-zvrat',
      navLabel: t('chapter4Nav'),
      year: t('chapter4Year'),
      title: t('chapter4Title'),
      body: t('chapter4Body'),
      note: t('chapter4Note'),
      detail: t('chapter4Detail'),
      images: [
        {
          src: '/images/historical/lazen-pioneer-center-archive.webp',
          alt: imageT('imageArchivePioneerCenter'),
          caption: imageT('imageArchivePioneerCenter'),
          objectPosition: '50% 44%'
        },
        {
          src: '/images/historical/lazen-estate-main-facade-archive.webp',
          alt: imageT('imageArchiveMainFacade'),
          caption: imageT('imageArchiveMainFacade'),
          objectPosition: '50% 45%'
        }
      ] as const
    },
    {
      id: 'timeline-dnes',
      navLabel: t('chapter5Nav'),
      year: t('chapter5Year'),
      title: t('chapter5Title'),
      body: t('chapter5Body'),
      note: t('chapter5Note'),
      detail: t('chapter5Detail'),
      images: [
        {
          src: '/images/castle-front-flower.webp',
          alt: imageT('imageCastleFrontSummerPath'),
          caption: imageT('imageCastleFrontSummerPath'),
          objectPosition: '50% 48%'
        },
        {
          src: '/images/gallery/8.webp',
          alt: imageT('imageCastleFrontPark'),
          caption: imageT('imageCastleFrontPark'),
          objectPosition: '50% 50%'
        }
      ] as const
    }
  ]

  return (
    <div className='-mt-28 md:-mt-32'>
      <PageHero
        eyebrow={t('introLabel')}
        title={t('title')}
        lead={t('lead')}
      />
      <HistoryInteractiveTimeline
        chapters={chapters}
        introLabel={t('introLabel')}
        paragraphs={paragraphs}
        timelineLabel={t('timelineLabel')}
      />
    </div>
  )
}
