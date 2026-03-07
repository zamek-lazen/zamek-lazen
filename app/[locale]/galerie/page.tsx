import { getTranslations } from "next-intl/server";

export default async function GalleryPage() {
  const t = await getTranslations("GalleryPage");

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{t("title")}</h1>
      <p className="mt-3 text-zinc-700">{t("lead")}</p>
      <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center text-zinc-600">
        {t("notice")}
      </div>
    </section>
  );
}
