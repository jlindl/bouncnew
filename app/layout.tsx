import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PageTransition } from "@/components/providers/PageTransition";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/layout/Cursor";
import { StickyBook } from "@/components/layout/StickyBook";
import { FilmModal } from "@/components/layout/FilmModal";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "BOUNC — Indoor Padel Club, Buckshaw Village, Chorley",
    template: "%s — BOUNC Padel",
  },
  description: SITE.description,
  keywords: ["padel", "padel Chorley", "padel Lancashire", "Buckshaw Village", "indoor padel", "super panoramic padel courts", "CUBE café"],
  openGraph: {
    type: "website",
    siteName: "BOUNC",
    locale: "en_GB",
    url: SITE.url,
    title: "BOUNC — Move together. Play your way.",
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark",
};

// Runs before first paint: flags JS (so reveal states apply), skips the intro
// for returning visitors this session, and un-hides everything if the app never boots.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('bounc:intro'))d.classList.add('preloaded')}catch(e){}setTimeout(function(){if(!window.__bouncBooted){d.classList.remove('js');d.classList.add('preloaded')}},5000)})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "BOUNC",
  description: SITE.description,
  url: SITE.url,
  email: SITE.email,
  telephone: "+441257444145",
  image: `${SITE.url}/opengraph-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
    addressLocality: SITE.address.town,
    addressRegion: "Lancashire",
    postalCode: SITE.address.postcode,
    addressCountry: "GB",
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "06:00", closes: "02:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "05:00", closes: "03:00" },
  ],
  sameAs: [SITE.socials.instagram, SITE.socials.tiktok, SITE.playtomicClub],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[400] -translate-y-24 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <PageTransition>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StickyBook />
          <FilmModal />
        </PageTransition>
        <Preloader />
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
