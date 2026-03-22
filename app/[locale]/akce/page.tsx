import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";

export default async function EventsPage() {
  const t = await getTranslations("EventsPage");

  return (
    <div className="-mt-28 md:-mt-32">
      <PageHero eyebrow="Akce" title={t("title")} lead={t("lead")} />

      <section className="bg-[linear-gradient(180deg,rgba(10,37,31,0.98),rgba(15,54,46,0.98))] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-mist-100)] md:px-8">
        <div className="mx-auto w-full max-w-[94rem] rounded-[1.25rem] border border-[rgba(185,212,197,0.18)] bg-[rgba(255,255,255,0.04)] p-8 shadow-[0_18px_48px_rgba(0,0,0,0.18)]">
          <p className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(201,218,208,0.64)]">Sanity + smsticket</p>
          <p className="mt-5 max-w-[58ch] font-serif text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.12] text-[rgba(241,245,239,0.96)]">{t("notice")}</p>
        </div>
      </section>
    </div>
  );
}
