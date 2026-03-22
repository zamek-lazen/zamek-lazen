"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function FooterLocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "de" ? "cs" : "de";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-mist-300 transition hover:text-mist-50"
    >
      <span className={locale === "cs" ? "text-mist-50" : "opacity-60"}>
        CS
      </span>
      <span>/</span>
      <span className={locale === "de" ? "text-mist-50" : "opacity-60"}>
        DE
      </span>
    </Link>
  );
}
