import { getTranslations } from "next-intl/server";
import type { HomepageEventPreview, HomepageSpotlightLink } from "@/types";
import {
  EstatePreview,
  EventsPreview,
  GalleryPreview,
  Hero,
  HistoryFamilyPreview,
  Story,
  WeddingsPreview,
} from "@/components/pages/home";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const nav = await getTranslations("Nav");

  const spotlightLinks: HomepageSpotlightLink[] = [
    {
      href: "/historie",
      title: nav("history"),
      description: t("storyHistoryDescription"),
    },
    {
      href: "/rod",
      title: nav("family"),
      description: t("storyFamilyDescription"),
    },
    {
      href: "/svatby",
      title: nav("weddings"),
      description: t("storyWeddingsDescription"),
    },
    {
      href: "/akce",
      title: nav("events"),
      description: t("storyEventsDescription"),
    },
  ];

  const eventPreviews: HomepageEventPreview[] = [
    {
      href: "/akce",
      title: t("eventsCardOneTitle"),
      status: t("eventsCardOneStatus"),
    },
    {
      href: "/akce",
      title: t("eventsCardTwoTitle"),
      status: t("eventsCardTwoStatus"),
    },
    {
      href: "/akce",
      title: t("eventsCardThreeTitle"),
      status: t("eventsCardThreeStatus"),
    },
  ];

  return (
    <div className="-mt-28 md:-mt-32">
      <Hero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        lead={t("heroLead")}
        description={t("heroDescription")}
        ctaPrimary={t("heroPrimaryCta")}
        ctaSecondary={t("heroSecondaryCta")}
        scrollPrompt={t("scrollPrompt")}
        sideLeft={t("sideLeft")}
        sideRight={t("sideRight")}
      />

      <Story
        eyebrow={t("storyEyebrow")}
        title={t("storyTitle")}
        lead={t("storyLead")}
        description={t("storyDescription")}
        highlightsTitle={t("storyHighlightsTitle")}
        ctaHistory={t("storyCtaHistory")}
        ctaContact={t("storyCtaContact")}
        spotlightLinks={spotlightLinks}
      />

      <EstatePreview
        eyebrow={t("estateEyebrow")}
        title={t("estateTitle")}
        lead={t("estateLead")}
        body={t("estateBody")}
        cta={t("estateCta")}
      />

      <HistoryFamilyPreview
        eyebrow={t("historyFamilyEyebrow")}
        historyTitle={t("historyPreviewTitle")}
        historyBody={t("historyPreviewBody")}
        historyCta={t("historyPreviewCta")}
        familyTitle={t("familyPreviewTitle")}
        familyBody={t("familyPreviewBody")}
        familyCta={t("familyPreviewCta")}
      />

      <WeddingsPreview
        eyebrow={t("weddingsEyebrow")}
        title={t("weddingsTitle")}
        lead={t("weddingsLead")}
        body={t("weddingsBody")}
        steps={[
          t("weddingsStepOne"),
          t("weddingsStepTwo"),
          t("weddingsStepThree"),
          t("weddingsStepFour"),
        ]}
        cta={t("weddingsCta")}
      />

      <EventsPreview
        eyebrow={t("eventsEyebrow")}
        title={t("eventsTitle")}
        body={t("eventsBody")}
        featuredLabel={t("eventsFeaturedLabel")}
        featuredTitle={t("eventsFeaturedTitle")}
        featuredBody={t("eventsFeaturedBody")}
        cta={t("eventsCta")}
        events={eventPreviews}
      />

      <GalleryPreview
        eyebrow={t("galleryEyebrow")}
        title={t("galleryTitle")}
        body={t("galleryBody")}
        cta={t("galleryCta")}
      />
    </div>
  );
}
