"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CoverflowItem = { title: string; text: string };

// Auto-advancing coverflow: the active card sits centered and enlarged while
// the previous/next cards peek in from the sides, scaled down and faded.
export default function CoverflowCarousel({
  items,
  intervalMs = 5000,
}: {
  items: CoverflowItem[];
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
    >
      <div className="relative h-72 sm:h-80" style={{ perspective: "1200px" }}>
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
              className="absolute left-1/2 top-1/2 w-[82%] cursor-pointer text-left sm:w-[48%]"
              style={{
                transform: `translate(calc(-50% + ${o * 64}%), -50%) scale(${active ? 1 : 0.84})`,
                opacity: visible ? (active ? 1 : 0.4) : 0,
                zIndex: active ? 30 : 20 - Math.abs(o),
                pointerEvents: visible ? "auto" : "none",
                transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease",
              }}
            >
              <div
                className={`h-full rounded-3xl border-2 bg-white p-8 sm:p-10 ${
                  active ? "border-red/40 shadow-2xl" : "border-navy-900/10 shadow-lg"
                }`}
              >
                <span className="font-display block text-5xl font-black text-red sm:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-2xl font-black tracking-tight text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
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
              i === index ? "w-8 bg-red" : "w-2 bg-navy-900/20 hover:bg-navy-900/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
