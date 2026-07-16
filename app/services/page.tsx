import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import AutoVideo from "@/components/AutoVideo";
import SymptomExplorer from "@/components/SymptomExplorer";
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
      {/* Header */}
      <section className="relative overflow-hidden bg-navy-950 text-ivory">
        <AutoVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={media.doctorPatientVideo.mp4}
          poster={media.doctorPatientVideo.poster}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(16,31,56,0.97) 0%, rgba(16,31,56,0.88) 50%, rgba(16,31,56,0.6) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-32 lg:px-8 lg:pt-40">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
              Our Services
            </p>
            <h1 className="font-display mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
              Everything handled in one visit.
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-ivory/80">
              Illness, injuries, imaging, lab work, physicals, and workplace
              medicine — walk in six days a week.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Interactive symptom explorer */}
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
              Start Here
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

      {/* Pediatric & family highlight */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative mx-auto h-115 w-full max-w-sm overflow-hidden rounded-2xl border-2 border-navy-900/10 bg-navy-950 shadow-xl">
                <AutoVideo
                  className="absolute inset-0 h-full w-full object-cover"
                  src={media.pediatricVideo.mp4}
                  poster={media.pediatricVideo.poster}
                  label="A mother caring for her sick child"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">
                Pediatric & Family Care
              </p>
              <h2 className="font-display mt-3 text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
                When your kiddo spikes a fever at 6 PM.
              </h2>
              <p className="mt-6 leading-relaxed text-ink-soft">
                No pediatric appointment for days? We see children of all ages
                for illness, injuries, school physicals, and vaccinations —
                with gentle providers and evening-friendly hours, six days a
                week.
              </p>
              <ul className="mt-6 grid gap-3">
                {[
                  "Pediatric illness & injury care",
                  "School & sports physicals",
                  "Vaccinations & immunizations",
                  "Women's health services",
                ].map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-red">
                      <path d="M3.5 9.5l3.5 3.5L14.5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
              <a
                href={site.phoneHref}
                className="mt-8 inline-block rounded-xl bg-navy-900 px-6 py-3 text-sm font-bold text-ivory transition-all hover:bg-navy-800"
              >
                Call {site.phone}
              </a>
            </Reveal>
          </div>
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
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
                For Ennis Employers
              </p>
              <h2 className="font-display mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Keep your team healthy and on the job.
              </h2>
              <p className="mt-6 leading-relaxed text-ivory/75">
                From pre-employment physicals and drug screening to work injury
                treatment and workers&apos; compensation care — we partner with
                local businesses to get employees seen fast and back to work
                safely.
              </p>
              <a
                href={site.phoneHref}
                className="mt-8 inline-block rounded-xl bg-red px-7 py-3.5 text-sm font-bold text-ivory transition-all hover:bg-red-deep"
              >
                Set Up an Employer Account
              </a>
            </Reveal>
            <Reveal delay={150}>
              <div className="mx-auto h-96 w-full max-w-sm overflow-hidden rounded-2xl border border-ivory/10 shadow-2xl">
                <AutoVideo
                  className="h-full w-full object-cover"
                  src={media.labVideo.mp4}
                  poster={media.labVideo.poster}
                  label="Blood sample tubes being processed in a laboratory analyzer"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center lg:px-8">
        <Reveal>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-ink-soft">
            Not sure if we can help? Call{" "}
            <a href={site.phoneHref} className="font-bold text-red hover:underline">
              {site.phone}
            </a>{" "}
            — if it&apos;s a life-threatening emergency, call 911 or go to the
            nearest ER.
          </p>
        </Reveal>
      </section>
    </>
  );
}
