"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AutoVideo from "@/components/AutoVideo";
import { media, type Video } from "@/lib/media";
import { site } from "@/lib/site";

type Slide = {
  eyebrow: string;
  title: string;
  text: string;
  video: Video;
  alt: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Diagnostics on site",
    title: "X-ray & lab under one roof",
    text: "Fractures, infections, flu, and strep — diagnosed during your visit, with answers before you leave.",
    video: media.servicesHeaderVideo,
    alt: "A laboratory scientist analyzing a sample",
  },
  {
    eyebrow: "No appointment needed",
    title: "Walk in, get seen fast",
    text: "Just come in — our goal is little-to-no wait, so you're seen in minutes, not hours.",
    video: media.aboutHeaderVideo,
    alt: "A medic caring for a patient",
  },
  {
    eyebrow: "For the whole family",
    title: "Care for every age",
    text: "From toddlers to grandparents, our providers treat illness and injury for everyone.",
    video: media.contactHeaderVideo,
    alt: "A provider caring for a patient",
  },
  {
    eyebrow: "Honest pricing",
    title: "A fraction of ER cost",
    text: "Quality treatment for non-emergencies — most major insurance accepted, plus affordable self-pay.",
    video: media.employersVideo,
    alt: "Lab testing in progress",
  },
];

const INTERVAL = 6000;

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    if (paused || reduce.current) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl border border-ivory/10 bg-navy-900 shadow-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Clinic highlights"
        >
          <div className="relative h-[26rem] sm:h-[28rem]">
            {slides.map((s, i) => (
              <div
                key={s.title}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
                aria-hidden={i !== index}
              >
                {i === index && (
                  <AutoVideo
                    className="absolute inset-0 h-full w-full object-cover"
                    src={s.video.mp4}
                    poster={s.video.poster}
                    label={s.alt}
                  />
                )}
                {i !== index && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.video.poster} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(16,31,56,0.94) 0%, rgba(16,31,56,0.82) 42%, rgba(16,31,56,0.35) 100%)",
                  }}
                />
                <div className="relative flex h-full max-w-xl flex-col justify-center p-8 sm:p-14">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky">
                    {s.eyebrow}
                  </p>
                  <h3 className="font-display mt-3 text-3xl font-black leading-tight text-ivory sm:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80 sm:text-base">
                    {s.text}
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-red px-6 py-3.5 text-sm font-bold text-ivory shadow-lg transition-all hover:bg-red-deep"
                  >
                    Call {site.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous highlight"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/60 text-ivory backdrop-blur transition-colors hover:bg-red sm:left-5"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next highlight"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/60 text-ivory backdrop-blur transition-colors hover:bg-red sm:right-5"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-8 flex items-center gap-2 sm:left-14">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to highlight ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-red" : "w-2 bg-ivory/40 hover:bg-ivory/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
