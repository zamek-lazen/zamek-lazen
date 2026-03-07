import { getTranslations } from "next-intl/server";

export default async function EventsPage() {
  const t = await getTranslations("EventsPage");

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{t("title")}</h1>
      <p className="mt-3 text-zinc-700">{t("lead")}</p>
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-zinc-700">
        {t("notice")}
      </div>
    </section>
  );
}
