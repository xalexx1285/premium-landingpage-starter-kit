import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Landing Page Starter Kit",
  description: "A reusable premium Next.js landing page template with motion tokens, surface system, QA checklist, and conversion-ready sections.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
