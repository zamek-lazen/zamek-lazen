import { getTranslations } from "next-intl/server";
import {
  HistoryPageContent,
  type HistoryPageCopy,
} from "@/components/pages/history";

export default async function HistoryPage() {
  const t = await getTranslations("HistoryPage");

  const copy: HistoryPageCopy = {
    title: t("title"),
    lead: t("lead"),
    introLabel: t("introLabel"),
    introQuote: t("introQuote"),
    scrollLabel: t("scrollLabel"),
    timelineLabel: t("timelineLabel"),
    timelineHint: t("timelineHint"),
    facts: [
      { value: t("fact1Value"), label: t("fact1Label") },
      { value: t("fact2Value"), label: t("fact2Label") },
      { value: t("fact3Value"), label: t("fact3Label") },
      { value: t("fact4Value"), label: t("fact4Label") },
    ],
    chapters: [
      {
        id: "pramen",
        year: t("chapter1Year"),
        navLabel: t("chapter1Nav"),
        title: t("chapter1Title"),
        body: t("chapter1Body"),
        note: t("chapter1Note"),
        detail: t("chapter1Detail"),
        image: "/images/historical/lazen-estate-hillside-1927.webp",
        imageAlt: t("chapter1ImageAlt"),
        tone: "sepia",
      },
      {
        id: "promena",
        year: t("chapter2Year"),
        navLabel: t("chapter2Nav"),
        title: t("chapter2Title"),
        body: t("chapter2Body"),
        note: t("chapter2Note"),
        detail: t("chapter2Detail"),
        image: "/images/historical/lazen-estate-illustration.webp",
        imageAlt: t("chapter2ImageAlt"),
        tone: "stone",
      },
      {
        id: "park-a-hoste",
        year: t("chapter3Year"),
        navLabel: t("chapter3Nav"),
        title: t("chapter3Title"),
        body: t("chapter3Body"),
        note: t("chapter3Note"),
        detail: t("chapter3Detail"),
        image: "/images/historical/lazen-estate-park-view-archive.webp",
        imageAlt: t("chapter3ImageAlt"),
        tone: "forest",
      },
      {
        id: "zvrat",
        year: t("chapter4Year"),
        navLabel: t("chapter4Nav"),
        title: t("chapter4Title"),
        body: t("chapter4Body"),
        note: t("chapter4Note"),
        detail: t("chapter4Detail"),
        image: "/images/historical/lazen-estate-side-facade-archive.webp",
        imageAlt: t("chapter4ImageAlt"),
        tone: "ember",
      },
    ],
    closingLabel: t("closingLabel"),
    closingTitle: t("closingTitle"),
    closingBody: t("closingBody"),
    closingDetail: t("closingDetail"),
    galleryLabel: t("galleryLabel"),
    galleryCaption1: t("galleryCaption1"),
    galleryCaption2: t("galleryCaption2"),
    galleryCaption3: t("galleryCaption3"),
    jumps: [
      { href: "/rod", label: t("jumpFamily") },
      { href: "/kontakt", label: t("jumpContact") },
    ],
  };

  return <HistoryPageContent copy={copy} />;
}
