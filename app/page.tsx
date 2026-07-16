import Reveal from "@/components/Reveal";
import AutoVideo from "@/components/AutoVideo";
import HeroMontage from "@/components/HeroMontage";
import StatusCard from "@/components/StatusCard";
import SymptomExplorer from "@/components/SymptomExplorer";
import Faq from "@/components/Faq";
import { site } from "@/lib/site";
import { media } from "@/lib/media";

const insurers = [
  "Medicare",
  "Aetna",
  "Cigna",
  "UnitedHealthcare",
  "BCBS Texas",
  "Humana",
  "Superior / Ambetter",
  "Baylor Scott & White",
  "Multiplan / PHCS",
  "Meridian",
  "Aetna CVS",
  "My Blue Health",
];

export default function Home() {
  return (
    <>
      {/* ── Hero: split layout with live status card ─────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-ivory">
        <HeroMontage clips={media.heroMontage} className="absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(16,31,56,0.97) 0%, rgba(16,31,56,0.88) 55%, rgba(16,31,56,0.62) 100%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.25fr_1fr] lg:px-8 lg:pb-24 lg:pt-40">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-lg bg-red px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ivory">
                <span className="h-1.5 w-1.5 rounded-full bg-ivory" aria-hidden="true" />
                Now open in Ennis — walk-ins welcome
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-display mt-6 max-w-2xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.6rem]">
                Urgent care,{" "}
                <span className="text-sky">without the wait.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/85">
                Illness, injuries, X-ray, and lab — treated the same day for
                the whole family, at a fraction of emergency room cost.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["7a–7p", "Mon – Sat"],
                  ["Fast", "little-to-no wait"],
                  ["X-Ray", "& lab on site"],
                  ["All ages", "kids to seniors"],
                ].map(([big, small]) => (
                  <div
                    key={big}
                    className="rounded-xl border border-ivory/15 bg-ivory/5 px-4 py-3 backdrop-blur-sm"
                  >
                    <p className="font-display text-xl font-bold text-sky">{big}</p>
                    <p className="mt-0.5 text-xs text-ivory/70">{small}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="justify-self-center lg:justify-self-end">
            <StatusCard />
          </Reveal>
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────────── */}
      <section className="border-y-2 border-navy-950 bg-red">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-ivory/20 px-5 py-4 text-ivory sm:grid-cols-4 sm:divide-x lg:px-8">
          {[
            ["✚", "Walk-ins welcome"],
            ["✚", "On-site X-ray & lab"],
            ["✚", "Most insurance accepted"],
            ["✚", "Little-to-no wait"],
          ].map(([mark, label]) => (
            <p key={label} className="flex items-center justify-center gap-2 px-2 py-1 text-center text-xs font-bold uppercase tracking-wide sm:text-sm">
              <span aria-hidden="true" className="text-ivory/60">{mark}</span>
              {label}
            </p>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-24 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">
            How It Works
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
            Three steps to feeling better.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["Walk in or call", "Come in any time we're open — no appointment needed. Call ahead if you'd like us to expect you."],
            ["Get seen fast", "A provider evaluates you quickly, with on-site X-ray and lab for same-visit answers."],
            ["Leave feeling better", "Treatment, prescriptions, and a clear care plan — all in one visit."],
          ].map(([title, text], i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="relative h-full rounded-2xl border-2 border-navy-900/10 bg-white/70 p-8 transition-colors hover:border-red/40">
                <span className="font-display absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-xl bg-red text-xl font-black text-ivory shadow-lg">
                  {i + 1}
                </span>
                <h3 className="font-display mt-4 text-xl font-bold text-navy-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Services: interactive symptom explorer ───────────── */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-ivory">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50rem 26rem at 85% 0%, rgba(157,180,216,0.14), transparent 60%), radial-gradient(40rem 22rem at 0% 100%, rgba(179,40,45,0.16), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
              Our Services
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              What brings you in today?
            </h2>
            <p className="mt-4 max-w-xl text-ivory/70">
              Tap what&apos;s bothering you and see exactly how we&apos;ll take
              care of it.
            </p>
          </Reveal>
          <div className="mt-10">
            <SymptomExplorer />
          </div>
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────────── */}
      <section className="py-24">
        <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">
                Why Urgent Care of Ennis
              </p>
              <h2 className="font-display mt-3 text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
                Built for Ennis. Ready every day.
              </h2>
              <p className="mt-6 leading-relaxed text-ink-soft">
                One simple promise: fast, professional medical care without
                the long waits — delivered by a patient-first team, six days
                a week, right here in Ellis County.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  ["Board-certified", "expert providers"],
                  ["One visit", "exam, imaging, lab & treatment"],
                  ["Fair pricing", "fraction of ER cost"],
                  ["Family care", "toddlers to grandparents"],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-xl border-2 border-navy-900/10 bg-white/70 p-4 transition-colors hover:border-red/40">
                    <p className="font-display font-bold text-navy-900">{title}</p>
                    <p className="mt-1 text-xs text-ink-soft">{text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="overflow-hidden rounded-2xl border border-ivory/10 shadow-2xl">
                <AutoVideo
                  className="h-full w-full object-cover"
                  src={media.teamVideo.mp4}
                  poster={media.teamVideo.poster}
                  label="A medical care team standing together in a hospital hallway"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Insurance & pricing ──────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">
              Insurance & Pricing
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
              Transparent care. No surprises.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <div className="h-full rounded-2xl border-2 border-navy-900/10 bg-white/70 p-8">
                <h3 className="font-display text-xl font-bold text-navy-900">
                  Insurance we accept
                </h3>
                <p className="mt-2 text-sm text-ink-soft">
                  Most major plans accepted — coverage varies by policy. We&apos;ll
                  verify your benefits before treatment.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {insurers.map((p) => (
                    <li
                      key={p}
                      className="rounded-lg border border-navy-900/15 bg-ivory px-4 py-2 text-sm font-semibold text-navy-900"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-ink-soft">
                  Don&apos;t see your plan?{" "}
                  <a href={site.phoneHref} className="font-bold text-red hover:underline">
                    Call us to check: {site.phone}
                  </a>
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex h-full flex-col rounded-2xl bg-navy-950 p-8 text-ivory">
                <h3 className="font-display text-xl font-bold text-sky">
                  Self-pay pricing
                </h3>
                <p className="mt-2 text-sm text-ivory/70">
                  No insurance? Quality care stays affordable.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-ivory/15 bg-ivory/5 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky">
                      New office visit
                    </p>
                    <p className="font-display mt-1 text-4xl font-black">$100</p>
                    <p className="mt-1 text-xs text-ivory/60">Full evaluation & treatment</p>
                  </div>
                  <div className="rounded-xl border border-ivory/15 bg-ivory/5 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky">
                      Follow-up visit
                    </p>
                    <p className="font-display mt-1 text-4xl font-black">$50</p>
                    <p className="mt-1 text-xs text-ivory/60">Follow-up & ongoing care</p>
                  </div>
                </div>
                <p className="mt-auto pt-5 text-[11px] leading-relaxed text-ivory/50">
                  Additional services like X-ray, labs, or procedures may have
                  separate fees — always quoted before treatment.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Map / find us ────────────────────────────────────── */}
      <section className="bg-ivory-soft py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">
              Find Us
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
              Right here in Ennis.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative mt-10 overflow-hidden rounded-2xl border-2 border-navy-900/10 shadow-xl">
              <iframe
                title="Map to Urgent Care of Ennis — 108 Chamber of Commerce Dr, Ennis, TX 75119"
                src="https://www.google.com/maps?q=108+Chamber+of+Commerce+Dr+Ennis+TX+75119&output=embed"
                className="h-115 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:inset-auto sm:right-6 sm:top-6 sm:w-80 sm:p-0">
                <div className="pointer-events-auto rounded-2xl bg-navy-950/95 p-6 text-ivory shadow-2xl backdrop-blur">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky">
                    Urgent Care of Ennis
                  </p>
                  <p className="font-display mt-2 text-lg font-bold leading-snug">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                  </p>
                  <p className="mt-2 text-sm text-ivory/70">{site.hours}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <a
                      href={site.phoneHref}
                      className="rounded-lg bg-red px-3 py-2.5 text-center text-xs font-bold text-ivory transition-colors hover:bg-red-deep"
                    >
                      Call Now
                    </a>
                    <a
                      href={site.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-ivory/30 px-3 py-2.5 text-center text-xs font-bold text-ivory transition-colors hover:border-sky hover:text-sky"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">
              Common Questions
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
              Before you visit.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <Faq />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className="pb-24 bg-ivory">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-navy-950">
              <AutoVideo
                className="absolute inset-0 h-full w-full object-cover"
                src={media.nurseCheckVideo.mp4}
                poster={media.nurseCheckVideo.poster}
              />
              <div className="absolute inset-0 bg-navy-950/85" />
              <div className="relative px-8 py-16 text-center text-ivory sm:px-16">
                <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
                  Feeling bad? Don&apos;t wait it out.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-ivory/80">
                  Walk in today — Monday through Saturday, 7 AM to 7 PM.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href={site.phoneHref}
                    className="rounded-xl bg-red px-7 py-3.5 text-sm font-bold text-ivory shadow-lg transition-all hover:bg-red-deep"
                  >
                    Call {site.phone}
                  </a>
                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-ivory/40 px-7 py-3.5 text-sm font-bold text-ivory transition-colors hover:border-sky hover:text-sky"
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
