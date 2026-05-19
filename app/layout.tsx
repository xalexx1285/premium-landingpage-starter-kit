import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { CSSProperties } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/lib/content/site";
import { getThemeById, themeToCssProperties } from "@/lib/themes";
import { ThemeProvider } from "@/lib/themes/ThemeProvider";
import "./globals.css";

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const displayFont = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const activeTheme = getThemeById(site.theme);
const activeThemeStyle = themeToCssProperties(activeTheme) as CSSProperties;

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    images: [site.meta.ogImage],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      data-theme={activeTheme.id}
      data-signature-variant={activeTheme.motion.signatureVariant}
      style={activeThemeStyle}
      suppressHydrationWarning
    >
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <ThemeProvider initialThemeId={activeTheme.id}>
          <SmoothScroll />
          <Navbar content={site.navbar} />
          {children}
          <Footer content={site.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
