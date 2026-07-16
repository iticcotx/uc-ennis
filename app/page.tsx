import Link from "next/link";
import Reveal from "@/components/Reveal";
import AutoVideo from "@/components/AutoVideo";
import HeroMontage from "@/components/HeroMontage";
import Stats from "@/components/Stats";
import Journey from "@/components/Journey";
import Faq from "@/components/Faq";
import { services, conditions } from "@/lib/content";
import { site } from "@/lib/site";
import { media } from "@/lib/media";

export default function Home() {
  return (
    <>
      {/* ── Hero with background video ───────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-ivory">
        <HeroMontage clips={media.heroMontage} className="absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(16,31,56,0.96) 0%, rgba(16,31,56,0.86) 45%, rgba(16,31,56,0.55) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-48">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-red/50 bg-navy-950/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red" aria-hidden="true" />
              Walk-In Clinic · Now Open · Ennis, TX
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display mt-7 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Feel better today.
              <br />
              <span className="text-sky">Walk in. We&apos;ll handle the rest.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ivory/85">
              Urgent Care of Ennis treats illness and injury for the whole
              family —{" "}
              <strong className="font-semibold text-ivory">
                with on-site X-ray and lab
              </strong>{" "}
              — six days a week, at a fraction of emergency room cost.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={site.phoneHref}
                className="rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-ivory shadow-lg transition-all hover:bg-red-deep hover:shadow-xl"
              >
                Call {site.phone}
              </a>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ivory/40 bg-navy-950/40 px-7 py-3.5 text-sm font-semibold text-ivory backdrop-blur-sm transition-colors hover:border-sky hover:text-sky"
              >
                Get Directions
              </a>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ivory/75">
              {[
                "Walk-Ins Welcome — No Appointment Needed",
                "On-Site X-Ray & Lab",
                "Most Insurance Accepted",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-sky">
                    <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Info bar — location, hours, phone */}
        <div className="relative border-t-2 border-red/60 bg-navy-900/85 backdrop-blur-md">
          <div className="mx-auto grid max-w-6xl divide-y divide-ivory/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
            <a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 py-6 sm:pr-8"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red/20 text-sky transition-colors group-hover:bg-red group-hover:text-ivory">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-sky">
                  Visit Us
                </span>
                <span className="font-display mt-1 block text-lg font-semibold leading-snug text-ivory">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
                <span className="mt-0.5 block text-xs text-ivory/60 transition-colors group-hover:text-sky">
                  Get directions →
                </span>
              </span>
            </a>

            <div className="flex items-center gap-4 py-6 sm:px-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red/20 text-sky">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-sky">
                  Open 6 Days a Week
                </span>
                <span className="font-display mt-1 block text-lg font-semibold leading-snug text-ivory">
                  {site.hoursShort[0]}
                  <br />
                  {site.hoursShort[1]}
                </span>
              </span>
            </div>

            <a href={site.phoneHref} className="group flex items-center gap-4 py-6 sm:pl-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red/20 text-sky transition-colors group-hover:bg-red group-hover:text-ivory">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-sky">
                  Call Us
                </span>
                <span className="font-display mt-1 block text-2xl font-semibold leading-snug text-ivory transition-colors group-hover:text-sky">
                  {site.phone}
                </span>
                <span className="mt-0.5 block text-xs text-ivory/60">
                  Walk-ins always welcome
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center lg:px-8">
        <Reveal>
          <div className="red-rule mx-auto mb-10 w-40" />
          <p className="font-display text-2xl font-medium leading-relaxed text-navy-900 sm:text-[1.7rem]">
            Quality medical care shouldn&apos;t require a long drive, a long
            wait, or an ER bill. We built Urgent Care of Ennis so this
            community gets total care — with little-to-no wait time.
          </p>
          <div className="red-rule mx-auto mt-10 w-40" />
        </Reveal>
      </section>

      {/* ── Services with videos ─────────────────────────────── */}
      <section className="bg-ivory-soft py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red">
              What We Treat
            </p>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
              One clinic. Everything your family needs.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <Link
                  href="/services"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-ivory shadow-[0_2px_16px_rgba(22,41,74,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(22,41,74,0.14)]"
                >
                  <div className="relative h-44 overflow-hidden">
                    <AutoVideo
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={s.cardVideo.mp4}
                      poster={s.cardVideo.poster}
                      label={s.alt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-ivory/90 text-navy-800 backdrop-blur-sm [&>svg]:h-5 [&>svg]:w-5">
                      {s.icon}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold text-navy-900">
                      {s.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                      {s.blurb}
                    </p>
                    <span className="mt-5 text-sm font-semibold text-navy-700 transition-colors group-hover:text-red">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-navy-950 py-20 text-ivory">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/monogram.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/2 h-105 w-105 -translate-y-1/2 select-none opacity-6"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/monogram.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-16 h-105 w-105 select-none opacity-6"
        />
        <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
          <Stats />
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <div className="relative">
                <div className="relative h-105 overflow-hidden rounded-3xl bg-navy-950">
                  <AutoVideo
                    className="absolute inset-0 h-full w-full object-cover"
                    src={media.doctorTalkVideo.mp4}
                    poster={media.doctorTalkVideo.poster}
                    label="A provider talking with a patient during a visit"
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-navy-900 px-6 py-5 text-ivory shadow-xl sm:block">
                  <p className="font-display text-lg font-semibold text-sky">Mon–Sat · 7a–7p</p>
                  <p className="mt-1 text-xs text-ivory/70">Open when you need us</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red">
                Why Urgent Care of Ennis
              </p>
              <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
                ER-level convenience. Neighborhood-clinic care.
              </h2>
              <p className="mt-6 leading-relaxed text-ink-soft">
                We&apos;re part of the family behind{" "}
                <a
                  href={site.sister.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy-800 underline decoration-red/40 underline-offset-2 hover:text-red"
                >
                  Urgent Care of Plano
                </a>
                , bringing the same standard of fast, professional,
                patient-first medicine to Ennis and Ellis County.
              </p>
              <ul className="mt-7 space-y-4">
                {[
                  ["Fast", "walk in and be seen in minutes, not hours"],
                  ["Complete", "exam, X-ray, lab, and treatment in one visit"],
                  ["Affordable", "a fraction of ER pricing, most insurance accepted"],
                  ["For everyone", "pediatric to senior care, illness to injury"],
                ].map(([title, text]) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="mt-1 text-red" aria-hidden="true">✦</span>
                    <p className="text-sm text-ink">
                      <strong className="font-display text-base text-navy-900">{title}</strong>{" "}
                      — {text}.
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="mt-8 inline-block rounded-full bg-navy-900 px-7 py-3 text-sm font-semibold text-ivory transition-all hover:bg-navy-800"
              >
                More About Us
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Your visit (interactive) ─────────────────────────── */}
      <section className="bg-ivory-soft py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red">
              What to Expect
            </p>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
              In, out, and on the mend.
            </h2>
          </Reveal>
          <div className="mt-12">
            <Journey />
          </div>
        </div>
      </section>

      {/* ── Conditions ───────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red">
                Common Visits
              </p>
              <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
                If it can&apos;t wait — but it&apos;s not a 911 — come see us.
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                For life-threatening emergencies, always call 911. For
                everything else, we&apos;re your first stop.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <ul className="flex flex-wrap gap-3">
                {conditions.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-navy-900/15 bg-ivory-soft px-5 py-2.5 text-sm font-medium text-navy-900 transition-colors hover:border-red hover:bg-ivory"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-ivory-soft py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red">
                Common Questions
              </p>
              <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
                Before you visit.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <Faq />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className="pb-24 pt-4 bg-ivory-soft">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-navy-950">
              <AutoVideo
                className="absolute inset-0 h-full w-full object-cover"
                src={media.clinicCoupleVideo.mp4}
                poster={media.clinicCoupleVideo.poster}
              />
              <div className="absolute inset-0 bg-navy-950/85" />
              <div className="relative px-8 py-16 text-center text-ivory sm:px-16">
                <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
                  Feeling bad? Don&apos;t wait it out.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-ivory/80">
                  Walk in today — Monday through Saturday, 7 AM to 7 PM. We&apos;ll
                  take it from there.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href={site.phoneHref}
                    className="rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-ivory shadow-lg transition-all hover:bg-red-deep"
                  >
                    Call {site.phone}
                  </a>
                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-semibold text-ivory transition-colors hover:border-sky hover:text-sky"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
