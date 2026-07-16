"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import AutoVideo from "@/components/AutoVideo";
import { media, type Video } from "@/lib/media";
import { site } from "@/lib/site";

type Service = {
  key: string;
  label: string;
  tagline: string;
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

const services: Service[] = [
  {
    key: "fever",
    label: "Fever or flu",
    tagline: "Rapid tests, fast relief",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...iconProps} aria-hidden="true">
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
    tagline: "Strep testing on site",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...iconProps} aria-hidden="true">
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
    tagline: "Stitches without the ER",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...iconProps} aria-hidden="true">
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
    tagline: "X-ray answers today",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...iconProps} aria-hidden="true">
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
    tagline: "Labs & IV fluids on site",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...iconProps} aria-hidden="true">
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
    tagline: "Bites, breakouts & reactions",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...iconProps} aria-hidden="true">
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
    tagline: "School, sports & work forms",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...iconProps} aria-hidden="true">
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
    tagline: "Workers' comp handled",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...iconProps} aria-hidden="true">
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

export default function ServiceGrid() {
  const [active, setActive] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const originRef = useRef<DOMRect | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const open = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    originRef.current = e.currentTarget.getBoundingClientRect();
    setClosing(false);
    setActive(i);
  };

  const close = useCallback(() => setClosing(true), []);

  // Zoom the panel out of the clicked card (FLIP-style), and back on close.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const origin = originRef.current;
    if (active === null || !panel || !origin) return;

    const target = panel.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (target.left + target.width / 2);
    const dy = origin.top + origin.height / 2 - (target.top + target.height / 2);
    const scale = Math.max(0.2, Math.min(origin.width / target.width, 0.6));

    if (!closing) {
      panel.style.transition = "none";
      panel.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      panel.style.opacity = "0.3";
      void panel.offsetWidth;
      panel.style.transition =
        "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease";
      panel.style.transform = "translate(0, 0) scale(1)";
      panel.style.opacity = "1";
    } else {
      panel.style.transition =
        "transform 0.32s cubic-bezier(0.55, 0, 0.55, 0.2), opacity 0.28s ease";
      panel.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      panel.style.opacity = "0";
      const t = setTimeout(() => {
        setActive(null);
        setClosing(false);
      }, 320);
      return () => clearTimeout(t);
    }
  }, [active, closing]);

  // Escape to close + scroll lock while open
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close]);

  const s = active !== null ? services[active] : null;

  return (
    <>
      {/* Card grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {services.map((sv, i) => (
          <button
            key={sv.key}
            type="button"
            onClick={(e) => open(i, e)}
            aria-haspopup="dialog"
            className="group relative overflow-hidden rounded-2xl border-2 border-navy-900/10 bg-navy-950 text-left shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-red/60 hover:shadow-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sv.video.poster}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-75"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/15"
            />
            <div className="relative flex h-44 flex-col justify-end p-5 sm:h-52">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ivory/15 text-ivory backdrop-blur-sm transition-colors duration-300 group-hover:bg-red group-hover:text-ivory">
                {sv.icon}
              </span>
              <span className="font-display mt-3 block text-base font-black leading-tight text-ivory sm:text-lg">
                {sv.label}
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-sky transition-colors group-hover:text-ivory">
                {sv.tagline}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Zoom-in popup */}
      {s && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 ${
            closing ? "pointer-events-none" : ""
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={s.headline}
        >
          <div
            onClick={close}
            aria-hidden="true"
            className={`absolute inset-0 bg-navy-950/70 backdrop-blur-md transition-opacity duration-300 ${
              closing ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            ref={panelRef}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-ivory/15 bg-navy-900 shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy-950/70 text-ivory backdrop-blur transition-colors hover:bg-red"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="grid md:grid-cols-[1fr_1.1fr]">
              <div className="relative h-56 md:h-auto">
                <AutoVideo
                  key={s.video.mp4}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={s.video.mp4}
                  poster={s.video.poster}
                  label={s.alt}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-navy-900/60"
                />
              </div>
              <div className="p-7 text-ivory sm:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-sky">
                  How we&apos;ll take care of it
                </p>
                <h3 className="font-display mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  {s.headline}
                </h3>
                <ol className="mt-6 space-y-4">
                  {s.plan.map((step, i) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red text-sm font-black text-ivory">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
