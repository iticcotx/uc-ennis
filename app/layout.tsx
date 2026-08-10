import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
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
  title: {
    default: `${site.name} — Walk-In Clinic & Urgent Care | Ennis, TX`,
    template: `%s | ${site.name}`,
  },
  description:
    "Urgent Care of Ennis — walk-in urgent care, family medicine, on-site X-ray and lab, pediatric care, and occupational medicine in Ennis, TX. Open Monday–Saturday, 7 AM–7 PM. Little-to-no wait times.",
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
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
