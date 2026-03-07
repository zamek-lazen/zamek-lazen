import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{t("title")}</h1>
      <p className="mt-3 text-zinc-700">{t("lead")}</p>

      <div className="mt-8 space-y-6 text-zinc-800">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{t("company")}</h2>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{t("addressLabel")}</h3>
          <p className="mt-2">{t("address")}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{t("icoLabel")}</h3>
          <p className="mt-2">{t("ico")}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{t("phoneLabel")}</h3>
          <p className="mt-2">{t("phonePouza")}</p>
          <p>{t("phoneTrdlicova")}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{t("emailLabel")}</h3>
          <a
            href={`mailto:${t("email")}`}
            className="mt-2 inline-block underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-900"
          >
            {t("email")}
          </a>
        </div>
      </div>
    </section>
  );
}
