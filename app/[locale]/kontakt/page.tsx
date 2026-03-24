import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");

  return (
    <div className="-mt-28 md:-mt-32">
      <PageHero eyebrow={t("company")} title={t("title")} lead={t("lead")} />
    </div>
  );
}
