"use client";

import { usePathname } from "@/i18n/navigation";

type MainContentProps = {
  children: React.ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  const pathname = usePathname();

  if (pathname === "/kontakt") {
    return null;
  }

  return <main className="mx-auto w-full flex-1 pt-28 md:pt-32">{children}</main>;
}
