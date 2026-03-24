import type { Metadata } from "next";
import { Bodoni_Moda, Syne, Aguafina_Script, Bonheur_Royale, Arizonia, Cormorant_Garamond } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const primaryFont = Cormorant_Garamond({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "700", ],
});

const titleFont = Bodoni_Moda({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});


const scriptFont = Arizonia({
  variable: "--font-script",
  weight: ["400"],
})

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
        className={`${primaryFont.variable} ${titleFont.variable} ${scriptFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
