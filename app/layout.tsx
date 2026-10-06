import type { Metadata } from "next";
import { Rubik, Onest, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

const display = Rubik({ subsets: ["latin", "cyrillic"], weight: ["500", "700", "800", "900"], variable: "--font-display", display: "swap" });
const body = Onest({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const georgian = Noto_Sans_Georgian({ subsets: ["georgian"], weight: ["400", "600", "800"], variable: "--font-georgian", display: "swap" });

export const metadata: Metadata = {
  title: "MA NA VAN TOURS — Daily van tours from Batumi",
  description: "Group and private day tours from Batumi in a comfortable van: Adjara waterfalls, Mtirala, Martvili canyon, Prometheus cave, Kutaisi, highland Adjara. Hotel pickup, driver-guide, 105 five-star reviews on Google.",
  openGraph: {
    title: "MA NA VAN TOURS — Daily van tours from Batumi",
    description: "Hop in. Waterfalls, canyons, caves and mountain villages, by van from Batumi. Rated 5.0 by 105 guests on Google.",
    url: "https://manavan.vercel.app",
    siteName: "MA NA VAN TOURS",
    locale: "en_US",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${georgian.variable}`}>{children}</body>
    </html>
  );
}
