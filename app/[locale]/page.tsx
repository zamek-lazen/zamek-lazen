import { getLocale, getTranslations } from 'next-intl/server'
import Script from 'next/script'
import type { HomepageEventPreview, HomepageSpotlightLink } from '@/types'
import {
  EventsPreview,
  GalleryPreview,
  Hero,
  HomeIntroLoader,
  HistoryFamilyPreview,
  Story,
  WeddingsPreview
} from '@/components/pages/home'
import {
  formatEventDate,
  getNearestEvent,
  getUpcomingEvents
} from '@/sanity/lib/events'

export default async function HomePage() {
  const locale = (await getLocale()) as 'cs' | 'de'
  const t = await getTranslations('HomePage')
  const nav = await getTranslations('Nav')
  const [nearestEvent, upcomingEvents] = await Promise.all([
    getNearestEvent(locale),
    getUpcomingEvents(locale, 3)
  ])

  const spotlightLinks: HomepageSpotlightLink[] = [
    {
      href: '/historie',
      title: nav('history'),
      description: t('storyHistoryDescription')
    },
    {
      href: '/rod',
      title: nav('family'),
      description: t('storyFamilyDescription')
    },
    {
      href: '/svatby',
      title: nav('weddings'),
      description: t('storyWeddingsDescription')
    },
    {
      href: '/akce',
      title: nav('events'),
      description: t('storyEventsDescription')
    },
    {
      href: '/galerie',
      title: nav('gallery'),
      description: t('storyGalleryDescription')
    }
  ]

  const eventPreviews: HomepageEventPreview[] =
    upcomingEvents.length > 0 ?
      upcomingEvents.map((event) => ({
        href: {
          pathname: '/akce/[slug]',
          params: { slug: event.slug }
        },
        title: event.title,
        label: formatEventDate(event.date, locale)
      }))
    : [
        {
          href: '/akce',
          title: t('eventsCardOneTitle'),
          label: t('eventsCardOneStatus')
        },
        {
          href: '/akce',
          title: t('eventsCardTwoTitle'),
          label: t('eventsCardTwoStatus')
        },
        {
          href: '/akce',
          title: t('eventsCardThreeTitle'),
          label: t('eventsCardThreeStatus')
        }
      ]

  const featuredEvent = upcomingEvents[0]

  return (
    <div className='-mt-28 md:-mt-32'>
      <Script
        id='home-intro-bootstrap'
        strategy='beforeInteractive'
      >
        {`(() => {
  try {
    const seen = window.sessionStorage.getItem("zamek-home-intro-seen") === "1";
    if (!seen || document.getElementById("home-intro-repeat-style")) return;
    const style = document.createElement("style");
    style.id = "home-intro-repeat-style";
    style.textContent = ".home-intro-loader{display:none!important}";
    document.head.appendChild(style);
  } catch {
    // Ignore storage access issues and allow the intro to play.
  }
})();`}
      </Script>

      <HomeIntroLoader />

      <Hero
        eyebrow={t('heroEyebrow')}
        title={t('heroTitle')}
        lead={t('heroLead')}
        description={t('heroDescription')}
        ctaPrimary={t('heroPrimaryCta')}
        ctaSecondary={t('heroSecondaryCta')}
        scrollPrompt={t('scrollPrompt')}
        sideLeft={t('sideLeft')}
        sideRight={t('sideRight')}
        nextEvent={
          nearestEvent ?
            {
              cta: t('heroUpcomingCta'),
              date: formatEventDate(nearestEvent.date, locale),
              href: {
                pathname: '/akce/[slug]',
                params: { slug: nearestEvent.slug }
              },
              label: t('heroUpcomingLabel'),
              title: nearestEvent.title
            }
          : null
        }
      />

      <Story
        eyebrow={t('storyEyebrow')}
        title={t('storyTitle')}
        lead={t('storyLead')}
        description={t('storyDescription')}
        highlightsTitle={t('storyHighlightsTitle')}
        ctaHistory={t('storyCtaHistory')}
        ctaContact={t('storyCtaContact')}
        spotlightLinks={spotlightLinks}
      />

      <HistoryFamilyPreview
        eyebrow={t('historyFamilyEyebrow')}
        historyTitle={t('historyPreviewTitle')}
        historyBody={t('historyPreviewBody')}
        historyCta={t('historyPreviewCta')}
        familyTitle={t('familyPreviewTitle')}
        familyBody={t('familyPreviewBody')}
        familyCta={t('familyPreviewCta')}
      />

      <WeddingsPreview
        eyebrow={t('weddingsEyebrow')}
        title={t('weddingsTitle')}
        lead={t('weddingsLead')}
        body={t('weddingsBody')}
        steps={[
          t('weddingsStepOne'),
          t('weddingsStepTwo'),
          t('weddingsStepThree'),
          t('weddingsStepFour')
        ]}
        cta={t('weddingsCta')}
      />

      <EventsPreview
        eyebrow={t('eventsEyebrow')}
        title={t('eventsTitle')}
        body={t('eventsBody')}
        featuredLabel={
          featuredEvent ?
            t('eventsFeaturedUpcomingLabel')
          : t('eventsFeaturedLabel')
        }
        featuredTitle={featuredEvent?.title ?? t('eventsFeaturedTitle')}
        featuredBody={featuredEvent?.description ?? t('eventsFeaturedBody')}
        cta={t('eventsCta')}
        events={eventPreviews}
      />

      <GalleryPreview
        eyebrow={t('galleryEyebrow')}
        title={t('galleryTitle')}
        body={t('galleryBody')}
        cta={t('galleryCta')}
      />
    </div>
  )
}
