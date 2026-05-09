import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyTopBar } from "@/components/layout/StickyTopBar";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { buildLocalBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/data/siteConfig";
import { ChatBubbleWidget } from "@/components/ChatBubbleWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "True Star Contracting LLC | Demolition & Asbestos Removal NJ",
    template: "%s | True Star Contracting LLC",
  },
  description:
    "Licensed demolition, asbestos removal & mold remediation in North Jersey. 25+ years, 60 towns served. Call (201) 790-4530 for a free estimate. Fully insured.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = buildLocalBusinessSchema();

  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {/* GA4 / Plausible — add here when ready */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> */}
      </head>
      <body className="bg-[var(--paper)] text-[var(--ink)]">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <StickyTopBar />
        <Header />
        <main id="main-content" className="lg:mt-0">
          {children}
        </main>
        <Footer />
        <StickyMobileBar />
        <ChatBubbleWidget />
      </body>
    </html>
  );
}
