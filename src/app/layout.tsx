import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/contact/floating-whatsapp";
import { MobileActionBar } from "@/components/contact/mobile-action-bar";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { JsonLd } from "@/components/json-ld";
import { HideOnAdmin } from "@/components/layout/site-chrome";
import { localBusinessLd, organizationLd, websiteLd } from "@/lib/seo";
import { site } from "@/lib/site";
import CursorGlowWrapper from "@/components/ui/cursor-glow-wrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "computer shop Bhiwadi",
    "laptop shop Bhiwadi",
    "CCTV installation Bhiwadi",
    "printer dealer Bhiwadi",
    "custom PC build Bhiwadi",
    "IT services Bhiwadi",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={[localBusinessLd(), organizationLd(), websiteLd()]} />
        <HideOnAdmin>
          <CursorGlowWrapper />
          <ScrollProgress />
          <Navbar />
        </HideOnAdmin>
        <main className="flex-1">{children}</main>
        <HideOnAdmin>
          <Footer />
          <FloatingWhatsApp />
          <MobileActionBar />
        </HideOnAdmin>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
