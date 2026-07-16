import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import AutoVideo from "@/components/AutoVideo";
import StatusCard from "@/components/StatusCard";
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
          src={media.contactHeaderVideo.mp4}
          poster={media.contactHeaderVideo.poster}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(16,31,56,0.97) 0%, rgba(16,31,56,0.88) 50%, rgba(16,31,56,0.65) 100%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.25fr_1fr] lg:px-8 lg:pt-40">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
                Contact &amp; Directions
              </p>
              <h1 className="font-display mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                Walk in — we&apos;re ready for you.
              </h1>
              <p className="mt-6 max-w-xl leading-relaxed text-ivory/80">
                No appointment needed. Easy parking at the door, right off
                Chamber of Commerce Drive.
              </p>
              <p className="mt-6 inline-block rounded-xl bg-red/20 px-5 py-3 text-sm leading-relaxed text-ivory/90 backdrop-blur-sm">
                If this is a medical emergency, call 911 or go to the nearest
                emergency room.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200} className="justify-self-center lg:justify-self-end">
            <StatusCard />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border-2 border-navy-900/10 shadow-xl">
            <iframe
              title="Map to Urgent Care of Ennis — 108 Chamber of Commerce Dr, Ennis, TX 75119"
              src="https://www.google.com/maps?q=108+Chamber+of+Commerce+Dr+Ennis+TX+75119&output=embed"
              className="h-130 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Address", `${site.address.line1}, ${site.address.line2}`, site.address.mapsUrl],
            ["Phone", site.phone, site.phoneHref],
            ["Hours", `${site.hoursShort[0]}, ${site.hoursShort[1]} · Closed Sunday`, null],
          ].map(([label, value, href]) => (
            <Reveal key={label as string}>
              <div className="h-full rounded-2xl border-2 border-navy-900/10 bg-white/70 p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href as string}
                    target={label === "Address" ? "_blank" : undefined}
                    rel={label === "Address" ? "noopener noreferrer" : undefined}
                    className="font-display mt-2 block text-lg font-bold leading-snug text-navy-900 hover:text-red"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-display mt-2 text-lg font-bold leading-snug text-navy-900">
                    {value}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-sm text-ink-soft">
            Bring a photo ID, your insurance card if you have one, and a list
            of current medications.
          </p>
        </Reveal>
      </section>
    </>
  );
}
