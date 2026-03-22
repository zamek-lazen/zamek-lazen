import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/shared/page-hero";

export default async function WeddingsPage() {
  const t = await getTranslations("WeddingsPage");

  return (
    <div className="-mt-28 md:-mt-32">
      <PageHero eyebrow="Svatby" title={t("title")} lead={t("lead")} />

      <section className="bg-[linear-gradient(180deg,#f4efe4,#ece4d8)] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-forest-900)] md:px-8">
        <div className="mx-auto grid w-full max-w-[94rem] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="max-w-[58ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">{t("p1")}</p>
            <p className="mt-5 max-w-[58ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">{t("p2")}</p>
            <p className="mt-5 max-w-[58ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">{t("p3")}</p>
            <p className="mt-5 max-w-[58ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">{t("p4")}</p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.25rem] border border-[rgba(19,52,45,0.08)] bg-white/56 p-7 shadow-[0_18px_48px_rgba(15,33,28,0.08)] md:p-8">
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(19,52,45,0.56)]">{t("processTitle")}</p>
              <ol className="mt-5 grid gap-3">
                {[t("step1Title"), t("step2Title"), t("step3Title"), t("step4Title")].map((step, index) => (
                  <li key={step} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-[rgba(19,52,45,0.08)] pb-3">
                    <span className="font-sans text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(19,52,45,0.46)]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-[1.2rem] leading-[1.2] text-[rgba(19,52,45,0.92)]">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[1.25rem] border border-[rgba(19,52,45,0.08)] bg-white/56 p-7 shadow-[0_18px_48px_rgba(15,33,28,0.08)] md:p-8">
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(19,52,45,0.56)]">{t("venueTitle")}</p>
              <p className="mt-5 font-serif text-[1.5rem] leading-[1.2] text-[rgba(19,52,45,0.92)]">{t("venueOne")}</p>
              <p className="mt-3 font-serif text-[1.5rem] leading-[1.2] text-[rgba(19,52,45,0.92)]">{t("venueTwo")}</p>
              <Link href="/kontakt" className="mt-6 inline-flex min-h-11 items-center justify-center border border-[rgba(19,52,45,0.16)] px-6 py-3 font-sans text-[0.75rem] uppercase tracking-[0.18em] transition-transform duration-200 hover:-translate-y-0.5">Kontakt</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
