import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";

export default async function FamilyPage() {
  const t = await getTranslations("FamilyPage");

  return (
    <div className="-mt-28 md:-mt-32">
      <PageHero eyebrow="Rod" title={t("title")} lead={t("lead")} />

      <section className="bg-[linear-gradient(180deg,#f4efe4,#ece4d8)] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-forest-900)] md:px-8">
        <div className="mx-auto grid w-full max-w-[94rem] gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <p className="max-w-[60ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">{t("p1")}</p>
            <p className="mt-5 max-w-[60ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">{t("p2")}</p>
            <p className="mt-5 max-w-[60ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">{t("p3")}</p>
          </div>

          <aside className="rounded-[1.25rem] border border-[rgba(19,52,45,0.08)] bg-white/56 p-7 shadow-[0_18px_48px_rgba(15,33,28,0.08)] md:p-8">
            <p className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(19,52,45,0.56)]">{t("currentHeadLabel")}</p>
            <h2 className="mt-4 max-w-[14ch] font-serif text-[clamp(2rem,4vw,3rem)] leading-[1] tracking-[-0.02em] text-balance">{t("currentHeadTitle")}</h2>
            <p className="mt-5 font-sans text-[1rem] leading-[1.85] text-[rgba(19,52,45,0.74)]">{t("currentHeadBody")}</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
