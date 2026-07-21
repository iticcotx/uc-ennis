"use client";

import { useEffect, useRef, useState } from "react";

type Metric = { label: string; pct: number };
type Column = {
  name: string;
  highlight?: boolean;
  wait: Metric;
  cost: Metric;
  access: string;
  best: string;
};

// Bars are illustrative (relative magnitude, honestly labeled) — shorter is
// better, so Urgent Care reads as the fast, affordable middle path.
const columns: Column[] = [
  {
    name: "Urgent Care of Ennis",
    highlight: true,
    wait: { label: "Little-to-no wait", pct: 18 },
    cost: { label: "$150 self-pay · most insurance", pct: 26 },
    access: "Walk in — no appointment",
    best: "Everyday illness & minor injuries",
  },
  {
    name: "Emergency Room",
    wait: { label: "Often several hours", pct: 94 },
    cost: { label: "$$$$ hospital ER bill", pct: 96 },
    access: "Walk in — open 24/7",
    best: "Life-threatening emergencies",
  },
  {
    name: "Primary Care Doctor",
    wait: { label: "Days for an appointment", pct: 66 },
    cost: { label: "$$ office copay", pct: 46 },
    access: "By appointment only",
    best: "Ongoing & preventive care",
  },
];

function Meter({ label, pct, tone, show }: { label: string; pct: number; tone: string; show: boolean }) {
  return (
    <div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-navy-900/10">
        <div
          className={`h-full rounded-full ${tone}`}
          style={{
            width: show ? `${pct}%` : "0%",
            transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
      <p className="mt-2 text-sm font-semibold text-navy-900">{label}</p>
    </div>
  );
}

export default function CompareInfographic() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    // Fallback: if the observer hasn't fired shortly after mount, reveal anyway.
    const fallback = setTimeout(() => setShow(true), 1400);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className="grid gap-5 md:grid-cols-3">
      {columns.map((c, i) => (
        <div
          key={c.name}
          className={`rounded-3xl border-2 bg-white p-7 transition-all duration-700 ${
            c.highlight ? "border-red shadow-2xl md:-translate-y-3" : "border-navy-900/10 shadow-lg"
          }`}
          style={{
            opacity: show ? 1 : 0,
            transform: show ? undefined : "translateY(28px)",
            transitionDelay: `${i * 140}ms`,
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-lg font-black leading-tight text-navy-900">
              {c.name}
            </h3>
            {c.highlight && (
              <span className="shrink-0 rounded-full bg-red px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ivory">
                You&apos;re here
              </span>
            )}
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                Typical wait
              </p>
              <div className="mt-2">
                <Meter label={c.wait.label} pct={c.wait.pct} tone={c.highlight ? "bg-red" : "bg-navy-700"} show={show} />
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                Typical cost
              </p>
              <div className="mt-2">
                <Meter label={c.cost.label} pct={c.cost.pct} tone={c.highlight ? "bg-red" : "bg-navy-700"} show={show} />
              </div>
            </div>
          </div>

          <dl className="mt-6 space-y-3 border-t border-navy-900/10 pt-5 text-sm">
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">Access</dt>
              <dd className="mt-0.5 font-semibold text-navy-900">{c.access}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">Best for</dt>
              <dd className="mt-0.5 font-semibold text-navy-900">{c.best}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}
