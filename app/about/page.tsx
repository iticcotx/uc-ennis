import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import AutoVideo from "@/components/AutoVideo";
import CoverflowCarousel from "@/components/CoverflowCarousel";
import CompareInfographic from "@/components/CompareInfographic";
import { promises } from "@/lib/content";
import { site } from "@/lib/site";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Urgent Care of Ennis brings fast, professional, walk-in medical care to Ennis and Ellis County, TX — on-site X-ray and lab, five days a week.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy-950 text-ivory">
        <AutoVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={media.aboutHeaderVideo.mp4}
          poster={media.aboutHeaderVideo.poster}
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
              Great care, close to home.
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-ivory/80">
              Fast, professional medical care for Ennis and Ellis County —
              without the long waits, and without the ER bill. Because your
              health matters.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Promise cards (auto coverflow carousel) */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">
              Our Promises
            </p>
            <h2 className="font-display mt-3 text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
              What you can count on.
            </h2>
          </div>
        </Reveal>
        <div className="mt-12">
          <CoverflowCarousel items={promises} />
        </div>
      </section>

      {/* How we compare (animated infographic) */}
      <section className="bg-ivory-soft py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">
                How We Compare
              </p>
              <h2 className="font-display mt-3 text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
                The fast, affordable middle path.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink-soft">
                For everyday illness and injury, urgent care gets you seen faster
                than a primary-care appointment and for far less than the ER.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <CompareInfographic />
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-block rounded-xl bg-red px-7 py-3.5 text-sm font-bold text-ivory transition-all hover:bg-red-deep"
            >
              See Everything We Treat
            </Link>
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
