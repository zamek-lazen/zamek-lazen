"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitch() {
  const t = useTranslations("LanguageSwitch");
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "de" ? "cs" : "de";
  const targetLanguage = nextLocale === "cs" ? t("czech") : t("german");

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
    >
      {t("switchTo", { language: targetLanguage })}
    </Link>
  );
}
