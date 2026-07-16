import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import AutoVideo from "@/components/AutoVideo";
import { services, conditions } from "@/lib/content";
import { site } from "@/lib/site";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Walk-in urgent care, on-site X-ray and lab, family medicine, physicals, pediatric and women's health, and occupational medicine at Urgent Care of Ennis in Ennis, TX.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header with video */}
      <section className="relative overflow-hidden bg-navy-950 text-ivory">
        <AutoVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={media.ultrasoundVideo.mp4}
          poster={media.ultrasoundVideo.poster}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(16,31,56,0.97) 0%, rgba(16,31,56,0.88) 50%, rgba(16,31,56,0.6) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-36 lg:px-8 lg:pt-44">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky">
              Our Services
            </p>
            <h1 className="font-display mt-5 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
              Total care, under one roof.
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-ivory/80">
              Illness, injury, imaging, lab work, physicals, and workplace
              medicine — walk in six days a week and get it handled.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service detail sections */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="space-y-16">
          {services.map((s, i) => (
            <Reveal key={s.title}>
              <div
                className={`grid items-stretch gap-8 overflow-hidden rounded-3xl border border-navy-900/8 bg-white/60 lg:grid-cols-[1.1fr_1fr] ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="p-8 sm:p-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-sky [&>svg]:h-7 [&>svg]:w-7">
                    {s.icon}
                  </div>
                  <h2 className="font-display mt-6 text-2xl font-semibold text-navy-900 sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-soft">{s.blurb}</p>
                  <h3 className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-red">
                    Includes
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {s.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-ink">
                        <span className="mt-1 text-red" aria-hidden="true">✦</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={site.phoneHref}
                    className="mt-8 inline-block rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-ivory transition-all hover:bg-navy-800"
                  >
                    Call {site.phone}
                  </a>
                </div>
                <div className="relative min-h-64 lg:min-h-full">
                  <AutoVideo
                    className="absolute inset-0 h-full w-full object-cover"
                    src={s.video.mp4}
                    poster={s.video.poster}
                    label={s.alt}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Employers band */}
      <section className="grain relative overflow-hidden bg-navy-950 py-24 text-ivory">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/monogram.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-105 w-105 select-none opacity-6"
        />
        <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky">
                For Ennis Employers
              </p>
              <h2 className="font-display mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                Keep your team healthy and on the job.
              </h2>
              <p className="mt-6 leading-relaxed text-ivory/75">
                From pre-employment physicals and drug screens to work injury
                treatment and workers&apos; compensation care — we partner with
                local businesses to get employees seen fast and back to work
                safely.
              </p>
              <a
                href={site.phoneHref}
                className="mt-8 inline-block rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-ivory transition-all hover:bg-red-deep"
              >
                Set Up an Employer Account
              </a>
            </Reveal>
            <Reveal delay={150}>
              <div className="overflow-hidden rounded-3xl border border-ivory/10 shadow-2xl">
                <AutoVideo
                  className="h-full w-full object-cover"
                  src={media.rehabVideo.mp4}
                  poster={media.rehabVideo.poster}
                  label="A therapist helping a worker recover from an injury"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="bg-ivory-soft py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-navy-900">
              Conditions we treat
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {conditions.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-navy-900/15 bg-ivory px-5 py-2.5 text-sm font-medium text-navy-900"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Not sure if we can help? Call{" "}
              <a href={site.phoneHref} className="font-semibold text-navy-800 hover:text-red">
                {site.phone}
              </a>{" "}
              — if it&apos;s an emergency, call 911 or go to the nearest ER.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
