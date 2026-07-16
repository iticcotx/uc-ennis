import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import AutoVideo from "@/components/AutoVideo";
import { site } from "@/lib/site";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description:
    "Visit Urgent Care of Ennis at 108 Chamber of Commerce Dr, Ennis, TX 75119. Walk-ins welcome Monday–Saturday, 7 AM–7 PM. Call (469) 442-4325.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-ivory">
        <AutoVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={media.ptSessionVideo.mp4}
          poster={media.ptSessionVideo.poster}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(16,31,56,0.97) 0%, rgba(16,31,56,0.88) 50%, rgba(16,31,56,0.65) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-36 lg:px-8 lg:pt-44">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky">
              Contact &amp; Directions
            </p>
            <h1 className="font-display mt-5 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
              Walk in — we&apos;re ready for you.
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-ivory/80">
              No appointment needed. Find us just off the highway in Ennis,
              with easy parking at the door.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-navy-900/10">
              <iframe
                title="Map to Urgent Care of Ennis — 108 Chamber of Commerce Dr, Ennis, TX 75119"
                src="https://www.google.com/maps?q=108+Chamber+of+Commerce+Dr+Ennis+TX+75119&output=embed"
                className="h-130 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="space-y-6">
              <div className="rounded-3xl bg-navy-950 p-8 text-ivory">
                <h2 className="font-display text-xl font-semibold text-sky">
                  Call us
                </h2>
                <a
                  href={site.phoneHref}
                  className="font-display mt-3 block text-3xl font-medium tracking-tight transition-colors hover:text-sky"
                >
                  {site.phone}
                </a>
                <p className="mt-3 text-sm text-ivory/70">{site.hours}</p>
                <p className="mt-4 rounded-xl bg-red/20 px-4 py-3 text-xs leading-relaxed text-ivory/85">
                  If this is a medical emergency, call 911 or go to the
                  nearest emergency room.
                </p>
              </div>

              <div className="rounded-3xl border border-navy-900/10 bg-white/70 p-8">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-red">
                  Visit Us
                </h2>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-medium text-navy-900 transition-colors hover:text-red"
                >
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </a>
                <div className="mt-6">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-red">
                    Hours
                  </h2>
                  <p className="mt-3 font-medium text-navy-900">
                    {site.hoursShort[0]}
                    <br />
                    {site.hoursShort[1]}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">Closed Sunday</p>
                </div>
                <div className="mt-6">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-red">
                    Walk-Ins
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    Always welcome — no appointment needed. Bring a photo ID,
                    your insurance card if you have one, and a list of current
                    medications.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
