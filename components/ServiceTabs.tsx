"use client";

import { useState } from "react";
import AutoVideo from "@/components/AutoVideo";
import { media, type Video } from "@/lib/media";
import { site } from "@/lib/site";

type Category = {
  key: string;
  label: string;
  icon: React.ReactNode;
  headline: string;
  text: string;
  items: string[];
  video: Video;
  alt: string;
};

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const categories: Category[] = [
  {
    key: "illness",
    label: "Illness & Infections",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...iconProps} aria-hidden="true">
        <path d="M15 3h-6M12 3v4M12 7a7 7 0 1 0 .01 0z" />
      </svg>
    ),
    headline: "Sick today? Seen today.",
    text: "Flu, strep, infections, and the everyday illnesses that can't wait days for an opening — diagnosed with on-site rapid tests and treated on the spot.",
    items: [
      "Flu, cold, cough & sore throat",
      "Strep, ear & sinus infections",
      "UTIs & stomach ailments",
      "Rashes, pink eye & allergies",
      "COVID-19 testing & treatment",
      "Asthma & breathing trouble",
    ],
    video: media.illnessVideo,
    alt: "A mother checking her sick son's temperature at home",
  },
  {
    key: "injuries",
    label: "Injuries",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...iconProps} aria-hidden="true">
        <rect x="2" y="9" width="20" height="6" rx="3" transform="rotate(-45 12 12)" />
        <path d="M10 10.5v0M13.5 13.5v0" />
      </svg>
    ),
    headline: "Stitches, splints & sprains — handled here.",
    text: "Skip the ER for minor injuries. We clean, close, splint, and treat on site, with digital X-ray down the hall to rule out fractures.",
    items: [
      "Cuts & lacerations needing stitches",
      "Sprains, strains & minor fractures",
      "Sports & playground injuries",
      "Minor burns & wounds",
      "Bug bites & minor animal bites",
      "Work injuries & workers' comp",
    ],
    video: media.injuryVideo,
    alt: "A clinician bandaging a patient's injured hand",
  },
  {
    key: "diagnostics",
    label: "Diagnostics & Testing",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...iconProps} aria-hidden="true">
        <path d="M9 3v7l-4.5 8A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-3L15 10V3M7 3h10" />
      </svg>
    ),
    headline: "Answers before you leave.",
    text: "On-site digital X-ray, laboratory, and rapid testing mean most diagnoses happen during your visit — no referrals, no second trip, no waiting days for results.",
    items: [
      "Digital X-ray imaging",
      "On-site laboratory testing",
      "Rapid flu, strep & COVID tests",
      "EKG",
      "Drug & alcohol screening",
      "Results explained the same visit",
    ],
    video: media.diagnosticsVideo,
    alt: "A laboratory scientist examining a blood sample tube",
  },
  {
    key: "prevention",
    label: "Physicals & Prevention",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...iconProps} aria-hidden="true">
        <path d="M12 21S4 16 4 10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z" />
      </svg>
    ),
    headline: "Stay ahead of it.",
    text: "Quick visits for checkups, vaccines, and paperwork — school and sports physicals, immunizations, and employer requirements, all without an appointment.",
    items: [
      "Annual, school & sports physicals",
      "Vaccinations & immunizations",
      "Pre-employment physicals",
      "Women's health services",
      "Pediatric care, all ages",
      "IV fluids for dehydration",
    ],
    video: media.physicalsVideo,
    alt: "A clinician preparing a patient's arm for a vaccination",
  },
];

export default function ServiceTabs() {
  const [active, setActive] = useState(0);
  const cat = categories[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Service categories">
        {categories.map((c, i) => (
          <button
            key={c.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`inline-flex items-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-bold transition-all duration-200 ${
              i === active
                ? "border-red bg-red text-ivory shadow-lg"
                : "border-navy-900/15 bg-white/70 text-navy-900 hover:border-red/50"
            }`}
          >
            {c.icon}
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[1fr_1.05fr]">
        <div className="rounded-2xl border-2 border-navy-900/10 bg-white/80 p-8 sm:p-10">
          <h3 className="font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
            {cat.headline}
          </h3>
          <p className="mt-4 leading-relaxed text-ink-soft">{cat.text}</p>
          <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {cat.items.map((d) => (
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
        </div>
        <div className="relative min-h-72 overflow-hidden rounded-2xl border-2 border-navy-900/10 bg-navy-950">
          <AutoVideo
            key={cat.video.mp4}
            className="absolute inset-0 h-full w-full object-cover"
            src={cat.video.mp4}
            poster={cat.video.poster}
            label={cat.alt}
          />
        </div>
      </div>
    </div>
  );
}
