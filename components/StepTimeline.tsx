"use client";

import { useEffect, useRef, useState } from "react";

export type Step = { n: string; title: string; text: string };

// The strip animates itself once it scrolls into view: the connecting line
// draws, the nodes pop in one after another, then the highlight cycles
// through the steps on its own. Reduced motion is handled in globals.css,
// which pins everything to its finished state.
export default function StepTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // setInterval rather than rAF — rAF stalls in a backgrounded tab.
    const id = setInterval(
      () => setActive((a) => (a + 1) % steps.length),
      2800
    );
    return () => clearInterval(id);
  }, [started, steps.length]);

  // Nodes land first, each card just behind its node.
  const nodeDelay = (i: number) => ({ transitionDelay: `${i * 190}ms` });
  const cardDelay = (i: number) => ({ transitionDelay: `${i * 190 + 130}ms` });

  return (
    <div ref={ref} className={started ? "tl-in relative" : "relative"}>
      {/* Horizontal line from small up; phones get a connector per gap below,
          so the line stops at the last node instead of dangling past it. */}
      <div
        aria-hidden="true"
        className="absolute left-[16.667%] right-[16.667%] top-6 hidden h-0.5 overflow-hidden rounded-full bg-navy-900/12 sm:block"
      >
        <div className="tl-fill h-full w-full bg-red" />
      </div>

      <ol className="relative grid gap-7 sm:grid-cols-3 sm:gap-8">
        {steps.map((s, i) => {
          const isActive = i === active;
          return (
            <li
              key={s.n}
              className="relative flex items-start gap-5 sm:flex-col sm:items-center sm:gap-0 sm:text-center"
            >
              {/* Phone-only connector down to the next node (gap-7 = 1.75rem) */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-7 left-[23px] top-12 w-0.5 overflow-hidden rounded-full bg-navy-900/12 sm:hidden"
                >
                  <span
                    style={{ transitionDelay: `${i * 190 + 220}ms` }}
                    className="tl-fill tl-fill-v block h-full w-full bg-red"
                  />
                </span>
              )}
              <span
                style={nodeDelay(i)}
                className={`tl-node font-display z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-ivory ring-4 ring-ivory-soft ${
                  isActive ? "tl-node-active bg-red" : "bg-navy-900"
                }`}
              >
                {s.n}
              </span>
              <div
                style={cardDelay(i)}
                className={`tl-card w-full rounded-2xl border-2 bg-white p-6 sm:mt-7 ${
                  isActive
                    ? "tl-card-active border-red/40 shadow-lg"
                    : "border-navy-900/10 shadow-sm"
                }`}
              >
                <p className="font-display text-lg font-bold text-navy-900">
                  {s.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {s.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
