"use client";

import { useState } from "react";
import AutoVideo from "@/components/AutoVideo";
import { media } from "@/lib/media";

const steps = [
  {
    label: "1 · Walk In",
    title: "No appointment. No gatekeeping. Just come in.",
    text: "Walk in any day Monday through Saturday, 7 AM to 7 PM. Check in at the front desk, and our team will get you back quickly — our goal is little-to-no waiting.",
    video: media.clinicCoupleVideo,
    alt: "Patients arriving and checking in at the clinic",
  },
  {
    label: "2 · Get Answers Fast",
    title: "Exam, X-ray, and lab — all in one visit.",
    text: "A provider evaluates you on the spot. If you need imaging or testing, our on-site digital X-ray and laboratory deliver answers before you leave — no referral, no second trip.",
    video: media.ultrasoundVideo,
    alt: "A clinician performing on-site diagnostic imaging",
  },
  {
    label: "3 · Leave With a Plan",
    title: "Treatment, prescriptions, and clear next steps.",
    text: "You leave treated — stitches placed, splint set, prescription in hand — with clear instructions and follow-up guidance. Most visits cost a fraction of an ER bill.",
    video: media.recoverySd,
    alt: "A patient recovering with guided care",
  },
];

export default function Journey() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col justify-center gap-3">
        {steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`rounded-2xl border p-6 text-left transition-all duration-300 ${
              i === active
                ? "border-red/60 bg-navy-900 shadow-lg"
                : "border-navy-900/10 bg-white/60 hover:border-navy-700/40"
            }`}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                i === active ? "text-sky" : "text-red"
              }`}
            >
              {s.label}
            </span>
            <h3
              className={`font-display mt-2 text-lg font-semibold ${
                i === active ? "text-ivory" : "text-navy-900"
              }`}
            >
              {s.title}
            </h3>
            {i === active && (
              <p className="mt-3 text-sm leading-relaxed text-ivory/75">{s.text}</p>
            )}
          </button>
        ))}
      </div>
      <div className="relative min-h-80 overflow-hidden rounded-3xl bg-navy-950">
        <AutoVideo
          key={step.video.mp4}
          className="absolute inset-0 h-full w-full object-cover"
          src={step.video.mp4}
          poster={step.video.poster}
          label={step.alt}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
      </div>
    </div>
  );
}
