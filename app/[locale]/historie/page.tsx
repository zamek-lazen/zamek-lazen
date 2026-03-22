import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/shared/page-hero";

export default async function HistoryPage() {
  const t = await getTranslations("HistoryPage");

  return (
    <div className="-mt-28 md:-mt-32">
      <PageHero eyebrow={t("introLabel")} title={t("title")} lead={t("lead")} />

      <section className="bg-[linear-gradient(180deg,#f4efe4,#ece4d8)] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-forest-900)] md:px-8">
        <div className="mx-auto grid w-full max-w-[94rem] gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1rem] border border-[rgba(19,52,45,0.08)] bg-[rgba(255,255,255,0.48)] p-5 shadow-[0_18px_48px_rgba(15,33,28,0.08)]">
              <p className="font-serif text-[2.2rem] leading-none">{t("fact1Value")}</p>
              <p className="mt-3 font-sans text-[0.92rem] uppercase tracking-[0.14em] text-[rgba(19,52,45,0.62)]">{t("fact1Label")}</p>
            </div>
            <div className="rounded-[1rem] border border-[rgba(19,52,45,0.08)] bg-[rgba(255,255,255,0.48)] p-5 shadow-[0_18px_48px_rgba(15,33,28,0.08)]">
              <p className="font-serif text-[2.2rem] leading-none">{t("fact2Value")}</p>
              <p className="mt-3 font-sans text-[0.92rem] uppercase tracking-[0.14em] text-[rgba(19,52,45,0.62)]">{t("fact2Label")}</p>
            </div>
            <div className="rounded-[1rem] border border-[rgba(19,52,45,0.08)] bg-[rgba(255,255,255,0.48)] p-5 shadow-[0_18px_48px_rgba(15,33,28,0.08)]">
              <p className="font-serif text-[2.2rem] leading-none">{t("fact3Value")}</p>
              <p className="mt-3 font-sans text-[0.92rem] uppercase tracking-[0.14em] text-[rgba(19,52,45,0.62)]">{t("fact3Label")}</p>
            </div>
            <div className="rounded-[1rem] border border-[rgba(19,52,45,0.08)] bg-[rgba(255,255,255,0.48)] p-5 shadow-[0_18px_48px_rgba(15,33,28,0.08)]">
              <p className="font-serif text-[2.2rem] leading-none">{t("fact4Value")}</p>
              <p className="mt-3 font-sans text-[0.92rem] uppercase tracking-[0.14em] text-[rgba(19,52,45,0.62)]">{t("fact4Label")}</p>
            </div>
          </div>

          <div>
            <p className="max-w-[58ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">{t("p1")}</p>
            <p className="mt-5 max-w-[58ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">{t("p2")}</p>
            <p className="mt-5 max-w-[58ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">{t("p3")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/rod" className="inline-flex min-h-11 items-center justify-center border border-[rgba(19,52,45,0.16)] bg-white/60 px-6 py-3 font-sans text-[0.75rem] uppercase tracking-[0.18em] transition-transform duration-200 hover:-translate-y-0.5">
                {t("jumpFamily")}
              </Link>
              <Link href="/kontakt" className="inline-flex min-h-11 items-center justify-center border border-[rgba(19,52,45,0.16)] px-6 py-3 font-sans text-[0.75rem] uppercase tracking-[0.18em] transition-transform duration-200 hover:-translate-y-0.5">
                {t("jumpContact")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-[94rem] gap-4 md:grid-cols-3">
          <div className="relative min-h-[15rem] overflow-hidden rounded-[1rem]"><Image src="/images/historical/lazen-estate-main-facade-archive.webp" alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" /></div>
          <div className="relative min-h-[15rem] overflow-hidden rounded-[1rem]"><Image src="/images/historical/lazen-estate-illustration.webp" alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" /></div>
          <div className="relative min-h-[15rem] overflow-hidden rounded-[1rem]"><Image src="/images/historical/lazen-estate-park-view-archive.webp" alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" /></div>
        </div>
      </section>
    </div>
  );
}
