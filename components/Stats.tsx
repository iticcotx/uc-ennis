"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 12, suffix: "", label: "Hours open every day, Mon–Sat" },
  { value: 6, suffix: "", label: "Days a week, 7 AM to 7 PM" },
  { value: 18, suffix: "+", label: "Conditions treated on site" },
  { value: 0, suffix: "", label: "Appointments needed — just walk in" },
];

function Counter({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1400;
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="font-display text-5xl font-semibold text-sky sm:text-6xl">
            <Counter target={s.value} suffix={s.suffix} start={visible} />
          </div>
          <p className="mx-auto mt-3 max-w-45 text-sm leading-snug text-ivory/70">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
