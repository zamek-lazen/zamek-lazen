import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { formatEventDate, getUpcomingEvents } from "@/sanity/lib/events";
import { urlFor } from "@/sanity/lib/image";

export default async function EventsPage() {
  const locale = (await getLocale()) as "cs" | "de";
  const t = await getTranslations("EventsPage");
  const events = await getUpcomingEvents(locale);
  const [featuredEvent, ...otherEvents] = events;

  return (
    <div className="-mt-28 md:-mt-32">
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      <section className="bg-[linear-gradient(180deg,#f4efe4,#ece4d8)] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-forest-900)] md:px-8">
        <div className="mx-auto flex w-full max-w-[94rem] flex-col gap-6">
          {featuredEvent ? (
            <>
              <Link
                href={{
                  pathname: "/akce/[slug]",
                  params: { slug: featuredEvent.slug },
                }}
                className="group block overflow-hidden rounded-[1.35rem] border border-[rgba(185,212,197,0.18)] bg-[linear-gradient(180deg,rgba(10,37,31,0.96),rgba(15,54,46,0.94))] shadow-[0_18px_48px_rgba(15,33,28,0.14)] transition-transform duration-200 hover:border-[rgba(216,229,219,0.3)]"
              >
                <div
                  className={
                    featuredEvent.image
                      ? "grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]"
                      : "block"
                  }
                >
                  <div className="p-7 md:p-10">
                    <p className="font-sans text-[0.68rem] uppercase tracking-[0.22em] text-[rgba(191,211,201,0.56)]">
                      {t("upcomingLabel")}
                    </p>
                    <p className="mt-4 font-sans text-[0.82rem] uppercase tracking-[0.18em] text-[rgba(220,230,224,0.7)]">
                      {formatEventDate(featuredEvent.date, locale)}
                    </p>
                    <h2 className="mt-4 max-w-[14ch] font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.96] tracking-[-0.025em] text-[rgba(241,245,239,0.96)]">
                      {featuredEvent.title}
                    </h2>
                    <p className="mt-6 max-w-[60ch] whitespace-pre-line font-sans text-[1rem] leading-[1.9] text-[rgba(203,218,209,0.78)]">
                      {featuredEvent.description}
                    </p>
                    <span className="mt-8 inline-flex min-h-11 items-center justify-center border border-[rgba(193,215,204,0.28)] px-6 py-3 font-sans text-[0.75rem] uppercase tracking-[0.18em] text-[rgba(231,238,232,0.94)] transition-colors duration-200 group-hover:border-[rgba(223,234,226,0.52)]">
                      {t("detailCta")}
                    </span>
                  </div>

                  {featuredEvent.image ? (
                    <div className="relative min-h-[18rem] lg:min-h-full">
                      <Image
                        src={urlFor(featuredEvent.image).width(1400).height(1200).url()}
                        alt={featuredEvent.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,22,17,0.04),rgba(6,22,17,0.28))]" />
                    </div>
                  ) : null}
                </div>
              </Link>

              {otherEvents.length > 0 ? (
                <div className="grid gap-5 lg:grid-cols-2">
                  {otherEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={{
                        pathname: "/akce/[slug]",
                        params: { slug: event.slug },
                      }}
                      className="group overflow-hidden rounded-[1.2rem] border border-[rgba(185,212,197,0.16)] bg-[linear-gradient(180deg,rgba(10,37,31,0.95),rgba(15,54,46,0.92))] shadow-[0_18px_48px_rgba(15,33,28,0.12)] transition-transform duration-200 hover:-translate-y-1 hover:border-[rgba(216,229,219,0.3)]"
                    >
                      {event.image ? (
                        <div className="relative h-56">
                          <Image
                            src={urlFor(event.image).width(1200).height(800).url()}
                            alt={event.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,22,17,0.06),rgba(6,22,17,0.4))]" />
                        </div>
                      ) : null}

                      <div className="p-7">
                        <p className="font-sans text-[0.74rem] uppercase tracking-[0.18em] text-[rgba(214,225,217,0.62)]">
                          {formatEventDate(event.date, locale)}
                        </p>
                        <h3 className="mt-4 font-serif text-[clamp(1.8rem,2.8vw,2.5rem)] leading-[1.02] text-[rgba(241,245,239,0.94)]">
                          {event.title}
                        </h3>
                        <p className="mt-5 whitespace-pre-line font-sans text-[0.98rem] leading-[1.85] text-[rgba(196,211,202,0.76)]">
                          {event.description}
                        </p>
                        <span className="mt-6 inline-flex min-h-11 items-center justify-center border border-[rgba(193,215,204,0.24)] px-5 py-3 font-sans text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(231,238,232,0.9)] transition-colors duration-200 group-hover:border-[rgba(223,234,226,0.48)]">
                          {t("detailCta")}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-[1.25rem] border border-[rgba(185,212,197,0.18)] bg-[linear-gradient(180deg,rgba(10,37,31,0.96),rgba(15,54,46,0.94))] p-8 shadow-[0_18px_48px_rgba(15,33,28,0.14)]">
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(201,218,208,0.64)]">
                {t("emptyLabel")}
              </p>
              <p className="mt-5 max-w-[24ch] font-serif text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.12] text-[rgba(241,245,239,0.96)]">
                {t("emptyTitle")}
              </p>
              <p className="mt-5 max-w-[58ch] font-sans text-[1rem] leading-[1.8] text-[rgba(194,211,201,0.76)]">
                {t("emptyBody")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
