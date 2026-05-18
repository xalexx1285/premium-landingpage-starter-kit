import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { site } from "@/lib/content/site";
import "./globals.css";

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
    <html lang="de">
      <body>
        <Navbar content={site.navbar} />
        {children}
      </body>
    </html>
  );
}
