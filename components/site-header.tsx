"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitch } from "@/components/language-switch";

const navItems = [
  { href: "/" as const, key: "home" },
  { href: "/historie" as const, key: "history" },
  { href: "/rod" as const, key: "family" },
  { href: "/svatby" as const, key: "weddings" },
  { href: "/akce" as const, key: "events" },
  { href: "/galerie" as const, key: "gallery" },
  { href: "/kontakt" as const, key: "contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Zamek Lazen
          </span>
          <span className="text-zinc-300">/</span>
          <span className="text-sm text-zinc-700">Chudenice</span>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <LanguageSwitch />
      </div>
    </header>
  );
}
