import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import MobileActionBar from "@/components/MobileActionBar";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const defaultTitle = `${site.name} - Walk-In Clinic & Urgent Care | Ennis, TX`;
const defaultDescription =
  "Urgent Care of Ennis provides walk-in urgent care, family and pediatric care, on-site X-ray and lab services, physicals, and occupational medicine. Open Monday–Saturday, 7 AM – 7 PM.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: { google: "YZVYzNamFR2DyiUewnofvAmYBduAC09nW-yRZ7puvn0" },
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  // Share previews (Facebook, Nextdoor, iMessage, LinkedIn, X). Pages inherit
  // these; per-page `title`/`description` still override the text.
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — walk-in urgent care, Monday–Saturday 7 AM–7 PM, Ennis TX`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [site.ogImage],
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

// Organization-level structured data, shared by every page. Page-specific
// blocks (FAQPage on the home page) are added where that content lives.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${site.url}/#clinic`,
  name: site.name,
  url: site.url,
  description: defaultDescription,
  telephone: site.phone,
  email: site.frontDeskEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: "Ennis",
    addressRegion: "TX",
    postalCode: "75119",
    addressCountry: "US",
  },
  hasMap: site.address.mapsUrl,
  image: `${site.url}/brand/monogram.webp`,
  logo: `${site.url}/brand/monogram.webp`,
  sameAs: [site.social.instagram],
  areaServed: [
    { "@type": "City", name: "Ennis" },
    { "@type": "AdministrativeArea", name: "Ellis County" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:00",
    closes: "19:00",
  },
  // Self-pay new office visit; insurance also accepted (list on home page).
  priceRange: `$${site.selfPayVisit} self-pay visit · most insurance accepted`,
  paymentAccepted: "Cash, Credit Card, Debit Card, Insurance",
  currenciesAccepted: "USD",
  medicalSpecialty: ["Emergency", "PrimaryCare", "Pediatric"],
  availableService: [
    "Walk-in urgent care",
    "On-site X-ray",
    "On-site laboratory testing",
    "Pediatric and family urgent care",
    "School, sports and annual physicals",
    "Occupational medicine and workers' compensation",
  ].map((name) => ({ "@type": "MedicalProcedure", name })),
  potentialAction: {
    "@type": "ReserveAction",
    target: `${site.url}/appointments`,
    name: "Request an appointment",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {/* Google Analytics 4 — loaded directly (not via GTM) because Google Ads
            imports these events as conversions. Do not move into GTM without
            also updating the Ads import; see lib/site.ts. */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-BRRVBZ2TSP" strategy="beforeInteractive" />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BRRVBZ2TSP');
`}
        </Script>
        {/* Google Tag Manager — container for additional pixels (Meta, call
            tracking, etc.). Intentionally contains no GA4 tag. */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site.gtmId}');`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Nav />
        <AnalyticsTracker />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
