"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AutoVideo from "@/components/AutoVideo";
import type { Video } from "@/lib/media";

export type VideoSlide = {
  title: string;
  text: string;
  video: Video;
  alt: string;
};

// Coverflow of video cards: the active card is centered, enlarged, and plays
// its video; the neighbors peek in from the sides as faded posters.
export default function VideoCoverflow({
  items,
  intervalMs = 5000,
}: {
  items: VideoSlide[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(false);
  const n = items.length;

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reduce.current || n <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % n), intervalMs);
    return () => clearInterval(t);
  }, [paused, intervalMs, n]);

  const offset = useCallback(
    (i: number) => {
      let o = i - index;
      if (o > n / 2) o -= n;
      if (o < -n / 2) o += n;
      return o;
    },
    [index, n]
  );

  return (
    <div
      className="relative overflow-x-clip"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Why choose us"
    >
      <div className="relative h-[24rem] sm:h-[30rem]" style={{ perspective: "1400px" }}>
        {items.map((item, i) => {
          const o = offset(i);
          const visible = Math.abs(o) <= 1;
          const active = o === 0;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setIndex(i)}
              tabIndex={active ? 0 : -1}
              aria-hidden={!active}
              className="absolute left-1/2 top-1/2 w-[74%] overflow-hidden rounded-3xl border border-ivory/10 text-left shadow-2xl sm:w-[52%]"
              style={{
                transform: `translate(calc(-50% + ${o * 58}%), -50%) scale(${active ? 1 : 0.82})`,
                opacity: visible ? (active ? 1 : 0.45) : 0,
                zIndex: active ? 30 : 20 - Math.abs(o),
                pointerEvents: visible ? "auto" : "none",
                transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease",
                aspectRatio: "16 / 11",
              }}
            >
              {active ? (
                <AutoVideo
                  key={item.video.mp4}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={item.video.mp4}
                  poster={item.video.poster}
                  label={item.alt}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.video.poster} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(16,31,56,0.92) 0%, rgba(16,31,56,0.45) 45%, rgba(16,31,56,0.15) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="font-display text-2xl font-black leading-tight text-ivory sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ivory/80 sm:text-base">
                  {item.text}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-red" : "w-2 bg-ivory/30 hover:bg-ivory/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
