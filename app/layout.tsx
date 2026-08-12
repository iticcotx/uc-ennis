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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.urgentcareofennis.com"),
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
    default: `${site.name} - Walk-In Clinic & Urgent Care | Ennis, TX`,
    template: `%s | ${site.name}`,
  },
  description:
    "Urgent Care of Ennis provides walk-in urgent care, family and pediatric care, on-site X-ray and lab services, physicals, and occupational medicine. Open Monday–Saturday, 7 AM – 7 PM.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: site.name,
  url: "https://www.urgentcareofennis.com",
  telephone: site.phone,
  address: { "@type": "PostalAddress", streetAddress: site.address.line1, addressLocality: "Ennis", addressRegion: "TX", postalCode: "75119", addressCountry: "US" },
  hasMap: site.address.mapsUrl,
  image: "https://www.urgentcareofennis.com/brand/monogram.webp",
  areaServed: [{ "@type": "City", name: "Ennis" }, { "@type": "AdministrativeArea", name: "Ellis County" }],
  openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "19:00" },
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-BRRVBZ2TSP" strategy="beforeInteractive" />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BRRVBZ2TSP');
`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <AnalyticsTracker />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}

