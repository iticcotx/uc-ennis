import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

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
  title: {
    default: `${site.name} — Walk-In Clinic & Urgent Care | Ennis, TX`,
    template: `%s | ${site.name}`,
  },
  description:
    "Urgent Care of Ennis — walk-in urgent care, family medicine, on-site X-ray and lab, pediatric care, and occupational medicine in Ennis, TX. Open Monday–Friday, 9 AM–5 PM. Little-to-no wait times.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: site.name,
  url: "https://www.urgentcareofennis.com",
  telephone: site.phone,
  address: { "@type": "PostalAddress", streetAddress: site.address.line1, addressLocality: "Ennis", addressRegion: "TX", postalCode: "75119", addressCountry: "US" },
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
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-BRRVBZ2TSP" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BRRVBZ2TSP');`}
        </Script>
      </body>
    </html>
  );
}
