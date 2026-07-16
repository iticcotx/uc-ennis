"use client";

import { useMemo, useState } from "react";
import AutoVideo from "@/components/AutoVideo";
import { media, type Video } from "@/lib/media";
import { conditions } from "@/lib/content";
import { site } from "@/lib/site";

type Symptom = {
  key: string;
  label: string;
  icon: React.ReactNode;
  headline: string;
  plan: string[];
  caps: string[];
  video: Video;
  alt: string;
};

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const symptoms: Symptom[] = [
  {
    key: "fever",
    label: "Fever or flu",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" {...iconProps} aria-hidden="true">
        <path d="M10 3v9.3a4 4 0 1 0 4 0V3zM10 7h4" />
      </svg>
    ),
    headline: "Fever, flu & feeling awful",
    plan: [
      "Rapid flu, strep & COVID tests with results in minutes",
      "Provider exam and same-visit treatment plan",
      "Medications prescribed before you walk out",
    ],
    caps: ["Rapid tests", "On-site lab", "All ages"],
    video: media.illnessVideo,
    alt: "A mother checking her sick son's temperature",
  },
  {
    key: "throat",
    label: "Cough or sore throat",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" {...iconProps} aria-hidden="true">
        <path d="M12 4a4 4 0 0 1 4 4v3a4 4 0 0 1-8 0V8a4 4 0 0 1 4-4z" />
        <path d="M6 11a6 6 0 0 0 12 0M12 17v3" />
      </svg>
    ),
    headline: "Cough, cold & sore throat",
    plan: [
      "Strep and respiratory testing on site",
      "Ear, nose & throat exam by an experienced provider",
      "Relief plan — from prescriptions to home-care guidance",
    ],
    caps: ["Strep testing", "Respiratory care", "Same-day"],
    video: media.nurseCheckVideo,
    alt: "A nurse checking on a patient",
  },
  {
    key: "cut",
    label: "Cut or wound",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" {...iconProps} aria-hidden="true">
        <rect x="2" y="9" width="20" height="6" rx="3" transform="rotate(-45 12 12)" />
        <path d="M10.5 10.5v0M13.5 13.5v0" />
      </svg>
    ),
    headline: "Cuts, wounds & burns",
    plan: [
      "Wound cleaning and numbing for comfort",
      "Stitches, skin glue, or dressing — whatever heals best",
      "Tetanus updates and follow-up care included",
    ],
    caps: ["Stitches on site", "Burn care", "Tetanus shots"],
    video: media.injuryVideo,
    alt: "A clinician bandaging an injured hand",
  },
  {
    key: "sprain",
    label: "Sprain or fracture",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" {...iconProps} aria-hidden="true">
        <path d="M7 3l-4 4 3 3M17 21l4-4-3-3M6.5 6.5l11 11" />
        <path d="M9 6l1.5 1.5M6 9l1.5 1.5M15 16.5L16.5 18M16.5 15l1.5 1.5" />
      </svg>
    ),
    headline: "Sprains, strains & fractures",
    plan: [
      "Digital X-ray on site — know if it's broken today",
      "Splinting and injury care in the same visit",
      "Referral coordination if you need a specialist",
    ],
    caps: ["Digital X-ray", "Splinting", "Sports injuries"],
    video: media.nurseCareVideo,
    alt: "A nurse providing attentive care to a patient",
  },
  {
    key: "stomach",
    label: "Stomach trouble",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" {...iconProps} aria-hidden="true">
        <path d="M12 21c-4.5 0-8-3-8-8 0-4 3-9 8-9s8 5 8 9c0 5-3.5 8-8 8z" />
        <path d="M9 12c1-1 2-1 3 0s2 1 3 0" />
      </svg>
    ),
    headline: "Stomach pain, nausea & UTIs",
    plan: [
      "On-site lab work to find the cause fast",
      "IV fluids for dehydration when you need them",
      "Treatment and prescriptions the same visit",
    ],
    caps: ["On-site lab", "IV fluids", "UTI testing"],
    video: media.doctorPatientVideo,
    alt: "A doctor talking with a patient at the bedside",
  },
  {
    key: "rash",
    label: "Rash or allergy",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" {...iconProps} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 9.5v0M12 8v0M16 10v0M9.5 14v0M14 15v0" />
      </svg>
    ),
    headline: "Rashes, allergies & bites",
    plan: [
      "Skin exam to identify the reaction",
      "Allergic reaction treatment, including bug & animal bites",
      "Care plan to calm it down and keep it down",
    ],
    caps: ["Allergy care", "Bite treatment", "Pediatric-friendly"],
    video: media.pediatricVideo,
    alt: "A mother caring for her child at home",
  },
  {
    key: "physical",
    label: "Need a physical",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" {...iconProps} aria-hidden="true">
        <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
        <path d="M9 13l3 3L22 6M14 3h7v7" />
      </svg>
    ),
    headline: "Physicals & vaccines",
    plan: [
      "School, sports & annual physicals — walk in, walk out",
      "Vaccinations and immunization records handled",
      "Forms signed and ready the same day",
    ],
    caps: ["School forms", "Sports physicals", "Vaccines"],
    video: media.physicalsVideo,
    alt: "A clinician preparing a vaccination",
  },
  {
    key: "work",
    label: "Work injury",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" {...iconProps} aria-hidden="true">
        <rect x="3" y="8" width="18" height="12" rx="2" />
        <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
      </svg>
    ),
    headline: "Work injuries & workers' comp",
    plan: [
      "Injury care with proper workers' comp documentation",
      "Drug & alcohol screening and pre-employment physicals",
      "Return-to-work evaluations your employer can trust",
    ],
    caps: ["Workers' comp", "Drug screening", "Employer accounts"],
    video: media.labVideo,
    alt: "Lab samples being processed for screening",
  },
];

export default function SymptomExplorer() {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState("");
  const s = symptoms[active];

  const filtered = useMemo(
    () =>
      filter.trim()
        ? conditions.filter((c) => c.toLowerCase().includes(filter.toLowerCase()))
        : conditions,
    [filter]
  );

  return (
    <div>
      {/* Symptom tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="tablist" aria-label="What brings you in">
        {symptoms.map((sym, i) => (
          <button
            key={sym.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
              i === active
                ? "border-sky/70 bg-sky/10 shadow-[0_0_32px_rgba(157,180,216,0.25)]"
                : "border-ivory/10 bg-ivory/5 hover:border-sky/40 hover:bg-ivory/10"
            }`}
          >
            <span
              className={`inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                i === active
                  ? "bg-sky text-navy-950"
                  : "bg-ivory/10 text-sky group-hover:bg-ivory/15"
              }`}
            >
              {sym.icon}
            </span>
            <span className="mt-3 block font-display text-sm font-bold leading-snug text-ivory sm:text-base">
              {sym.label}
            </span>
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-sky to-transparent transition-opacity duration-300 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/5 backdrop-blur-sm">
        <div className="grid items-stretch lg:grid-cols-[1.15fr_1fr]">
          <div className="p-8 sm:p-10">
            <h3 className="font-display text-2xl font-black tracking-tight text-ivory sm:text-3xl">
              {s.headline}
            </h3>
            <ol className="mt-6 space-y-4">
              {s.plan.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-sky/40 bg-sky/10 text-sm font-black text-sky">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-ivory/85">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.caps.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-sky/30 bg-navy-950/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-sky"
                >
                  {c}
                </span>
              ))}
            </div>
            <a
              href={site.phoneHref}
              className="mt-8 inline-block rounded-xl bg-red px-6 py-3.5 text-sm font-bold text-ivory shadow-lg transition-all hover:bg-red-deep"
            >
              Walk in or call {site.phone}
            </a>
          </div>
          <div className="relative min-h-64 lg:min-h-full">
            <AutoVideo
              key={s.video.mp4}
              className="absolute inset-0 h-full w-full object-cover"
              src={s.video.mp4}
              poster={s.video.poster}
              label={s.alt}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 lg:bg-gradient-to-r lg:from-navy-950/40 lg:to-transparent"
            />
          </div>
        </div>
      </div>

      {/* Everything else — searchable */}
      <div className="mt-10">
        <label htmlFor="condition-search" className="text-xs font-bold uppercase tracking-[0.2em] text-sky">
          Something else? Search what we treat
        </label>
        <div className="relative mt-3 max-w-md">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id="condition-search"
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Try “rash”, “fever”, “stitches”…"
            className="w-full rounded-xl border border-ivory/15 bg-navy-950/60 py-3 pl-11 pr-4 text-sm text-ivory placeholder:text-ivory/35 outline-none backdrop-blur-sm transition-colors focus:border-sky/60"
          />
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {filtered.map((c) => (
            <li
              key={c}
              className="rounded-full border border-ivory/15 bg-ivory/5 px-4 py-2 text-sm font-medium text-ivory/85"
            >
              {c}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="text-sm text-ivory/60">
              Not listed — call{" "}
              <a href={site.phoneHref} className="font-bold text-sky hover:underline">
                {site.phone}
              </a>{" "}
              and we&apos;ll tell you if we can help.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
