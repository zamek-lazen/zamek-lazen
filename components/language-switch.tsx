"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";

type StaticPathname =
  | "/"
  | "/kontakt"
  | "/historie"
  | "/galerie"
  | "/akce"
  | "/rod"
  | "/svatby";

export function LanguageSwitch() {
  const t = useTranslations("LanguageSwitch");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();
  const nextLocale = locale === "de" ? "cs" : "de";
  const targetLanguage = nextLocale === "cs" ? t("czech") : t("german");
  const href: StaticPathname | { pathname: "/akce/[slug]"; params: { slug: string } } =
    pathname === "/akce/[slug]" && typeof params.slug === "string"
      ? {
          pathname: "/akce/[slug]" as const,
          params: { slug: params.slug },
        }
      : pathname === "/akce/[slug]"
        ? "/akce"
        : pathname;

  return (
    <Link
      href={href}
      locale={nextLocale}
      className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
    >
      {t("switchTo", { language: targetLanguage })}
    </Link>
  );
}
