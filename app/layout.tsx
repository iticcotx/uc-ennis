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
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  verification: { google: "YZVYzNamFR2DyiUewnofvAmYBduAC09nW-yRZ7puvn0" },
  title: {
    default: `${site.name} â€” Walk-In Clinic & Urgent Care | Ennis, TX`,
    template: `%s | ${site.name}`,
  },
  description:
    "Urgent Care of Ennis provides walk-in urgent care, family and pediatric care, on-site X-ray and lab services, physicals, and occupational medicine. Open Mondayâ€“Friday, 9 AMâ€“5 PM.",
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
  openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
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

