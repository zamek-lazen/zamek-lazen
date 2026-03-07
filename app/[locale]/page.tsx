import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const sectionLinks = [
  { href: "/historie" as const, navKey: "history", descKey: "historyDescription" },
  { href: "/rod" as const, navKey: "family", descKey: "familyDescription" },
  { href: "/svatby" as const, navKey: "weddings", descKey: "weddingsDescription" },
  { href: "/akce" as const, navKey: "events", descKey: "eventsDescription" },
  { href: "/galerie" as const, navKey: "gallery", descKey: "galleryDescription" }
] as const;

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const nav = await getTranslations("Nav");

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-8 text-zinc-100 md:p-12">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-300">
          {t("eyebrow")}
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-200">{t("lead")}</p>
        <p className="mt-3 max-w-3xl text-zinc-300">{t("description")}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/historie"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            {t("ctaHistory")}
          </Link>
          <Link
            href="/kontakt"
            className="rounded-full border border-zinc-400 px-5 py-2 text-sm font-semibold text-zinc-100 transition hover:border-zinc-100"
          >
            {t("ctaContact")}
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900">{t("highlightsTitle")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {sectionLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-400"
            >
              <h3 className="text-lg font-semibold text-zinc-900">{nav(item.navKey)}</h3>
              <p className="mt-2 text-sm text-zinc-600">{t(item.descKey)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
