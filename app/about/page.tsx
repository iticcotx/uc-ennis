import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import AutoVideo from "@/components/AutoVideo";
import { promises } from "@/lib/content";
import { site } from "@/lib/site";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Urgent Care of Ennis is the newest clinic from the team behind Urgent Care of Plano — bringing fast, professional, walk-in medical care to Ennis and Ellis County, TX.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy-950 text-ivory">
        <AutoVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={media.teamVideo.mp4}
          poster={media.teamVideo.poster}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(16,31,56,0.97) 0%, rgba(16,31,56,0.9) 55%, rgba(16,31,56,0.7) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-32 lg:px-8 lg:pt-40">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
              About Us
            </p>
            <h1 className="font-display mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
              Ennis deserves great care, close to home.
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-ivory/80">
              We&apos;re the team behind Urgent Care of Plano — now proudly
              serving Ennis and Ellis County.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink-soft">
            <p>
              For too many families in Ellis County, getting medical care has
              meant a choice between waiting days for an appointment or hours
              in an emergency room — often with an ER bill at the end of it.
              We believe there&apos;s a better way.
            </p>
            <p>
              Urgent Care of Ennis carries the standard set by{" "}
              <a
                href={site.sister.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-navy-800 underline decoration-red/40 underline-offset-2 hover:text-red"
              >
                Urgent Care of Plano
              </a>
              , where the promise is simple:{" "}
              <strong className="text-navy-900">
                fast, professional medical care without the long waits
              </strong>
              . Walk in six days a week and find experienced providers, on-site
              digital X-ray and laboratory, and treatment for the whole family
              — from stitches and sprains to flu, physicals, and workplace
              injuries.
            </p>
            <p>
              We&apos;re proud to join the Ennis community and honored to care
              for it. Because here, just like at every clinic in our family —{" "}
              <strong className="text-navy-900">your health matters</strong>.
            </p>
          </div>
        </Reveal>

        {/* Promise cards */}
        <Reveal>
          <h2 className="font-display mt-16 text-2xl font-black text-navy-900">
            Our promises to you
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <div className="h-full rounded-2xl border-2 border-navy-900/10 bg-white/70 p-6 transition-colors hover:border-red/40">
                <span className="font-display text-4xl font-black text-navy-100">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-lg font-bold text-navy-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Video band */}
      <section className="grain relative overflow-hidden bg-navy-950 py-24 text-ivory">
        <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
                Our Standard of Care
              </p>
              <h2 className="font-display mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Treated like family, every visit.
              </h2>
              <p className="mt-6 leading-relaxed text-ivory/75">
                Our providers take the time to listen, explain, and treat you
                right the first time — the same patient-first approach that
                earned our Plano clinic its reputation.
              </p>
              <Link
                href="/services"
                className="mt-8 inline-block rounded-xl bg-red px-7 py-3.5 text-sm font-bold text-ivory transition-all hover:bg-red-deep"
              >
                See Everything We Treat
              </Link>
            </Reveal>
            <Reveal delay={150}>
              <div className="overflow-hidden rounded-2xl border border-ivory/10 shadow-2xl">
                <AutoVideo
                  className="h-full w-full object-cover"
                  src={media.doctorPatientVideo.mp4}
                  poster={media.doctorPatientVideo.poster}
                  label="A doctor talking warmly with a smiling patient"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-24 text-center lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
            Come see us — no appointment needed.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            {site.address.line1}, {site.address.line2} · {site.hours}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={site.phoneHref}
              className="rounded-xl bg-red px-8 py-4 text-sm font-bold text-ivory shadow-lg transition-all hover:bg-red-deep"
            >
              Call {site.phone}
            </a>
            <a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border-2 border-navy-900/20 px-8 py-4 text-sm font-bold text-navy-900 transition-colors hover:border-red hover:text-red"
            >
              Get Directions
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
