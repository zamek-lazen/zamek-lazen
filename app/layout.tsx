import type { Metadata } from "next";
import { Bodoni_Moda, Syne } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const primaryFont = Syne({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const titleFont = Bodoni_Moda({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Zámek Lázeň",
  description: "Webová prezentace Zámku Lázeň v Chudenicích",
  icons: {
    icon: "/images/branding/castle-crest.png",
    shortcut: "/images/branding/castle-crest.png",
    apple: "/images/branding/castle-crest.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${primaryFont.variable} ${titleFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
