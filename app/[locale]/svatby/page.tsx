import { getTranslations } from "next-intl/server";

const paragraphKeys = ["p1", "p2", "p3", "p4"] as const;

export default async function WeddingsPage() {
  const t = await getTranslations("WeddingsPage");

  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-8">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{t("title")}</h1>
      <p className="mt-3 text-zinc-700">{t("lead")}</p>

      <div className="mt-8 space-y-5 text-zinc-700">
        {paragraphKeys.map((key) => (
          <p key={key} className="leading-8">
            {t(key)}
          </p>
        ))}
      </div>
    </article>
  );
}
