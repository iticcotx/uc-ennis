import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-navy-950 text-ivory">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-sky/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/monogram.webp" alt="" className="h-9 w-9" />
              </span>
              <div className="leading-tight">
                <span className="font-display block text-2xl font-semibold">
                  Urgent Care <span className="text-sky">of Ennis</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sky">
                  Your Health Matters
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/70">
              Walk-in urgent care, family medicine, and on-site X-ray &amp; lab
              for Ennis and Ellis County — quality treatment at a fraction of
              emergency room cost, six days a week.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ivory/80">
              <li><Link href="/" className="transition-colors hover:text-sky">Home</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-sky">Services</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-sky">About Us</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-sky">Contact &amp; Directions</Link></li>
              <li>
                <a
                  href={site.sister.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-sky"
                >
                  {site.sister.name}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">
              Visit Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ivory/80">
              <li>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-sky"
                >
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-sky">
                  {site.phone}
                </a>
              </li>
              <li className="text-ivory/60">{site.hours}</li>
            </ul>
          </div>
        </div>

        <div className="red-rule mt-14 opacity-40" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-ivory/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <p>If this is a medical emergency, call 911.</p>
        </div>
      </div>
    </footer>
  );
}
