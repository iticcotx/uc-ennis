"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import AutoVideo from "@/components/AutoVideo";
import { media, type Video } from "@/lib/media";
import { site } from "@/lib/site";

type Service = {
  key: string;
  label: string;
  tagline: string;
  headline: string;
  plan: string[];
  caps: string[];
  video: Video;
  alt: string;
};

const svc = (
  key: string,
  label: string,
  tagline: string,
  headline: string,
  plan: string[],
  caps: string[],
  video: Video,
  alt: string
): Service => ({ key, label, tagline, headline, plan, caps, video, alt });

// 24 services, laid out as a medical-cross (+) collage of video tiles.
const SERVICES: Service[] = [
  svc("fever", "Fever or flu", "Rapid tests, fast relief", "Fever, flu & feeling awful",
    ["Rapid flu, strep & COVID tests with results in minutes", "Provider exam and same-visit treatment plan", "Medications prescribed before you walk out"],
    ["Rapid tests", "On-site lab", "All ages"], media.svcFever, "A mother checking her sick son's temperature"),
  svc("throat", "Cough or sore throat", "Strep testing on site", "Cough, cold & sore throat",
    ["Strep and respiratory testing on site", "Ear, nose & throat exam by an experienced provider", "Relief plan — from prescriptions to home-care guidance"],
    ["Strep testing", "Respiratory care", "Same-day"], media.svcThroat, "A nurse checking on a patient"),
  svc("cut", "Cut or wound", "Stitches without the ER", "Cuts, wounds & burns",
    ["Wound cleaning and numbing for comfort", "Stitches, skin glue, or dressing — whatever heals best", "Tetanus updates and follow-up care included"],
    ["Stitches on site", "Burn care", "Tetanus shots"], media.svcCut, "A clinician bandaging an injured hand"),
  svc("sprain", "Sprain or fracture", "X-ray answers today", "Sprains, strains & fractures",
    ["Digital X-ray on site — know if it's broken today", "Splinting and injury care in the same visit", "Referral coordination if you need a specialist"],
    ["Digital X-ray", "Splinting", "Sports injuries"], media.svcSprain, "A nurse providing attentive care to a patient"),
  svc("stomach", "Stomach trouble", "Labs & IV fluids on site", "Stomach pain, nausea & more",
    ["On-site lab work to find the cause fast", "IV fluids for dehydration when you need them", "Treatment and prescriptions the same visit"],
    ["On-site lab", "IV fluids", "Same-day"], media.svcStomach, "A doctor talking with a patient at the bedside"),
  svc("rash", "Rash or allergy", "Bites, breakouts & reactions", "Rashes, allergies & bites",
    ["Skin exam to identify the reaction", "Allergic reaction treatment, including bug & animal bites", "Care plan to calm it down and keep it down"],
    ["Allergy care", "Bite treatment", "Kid-friendly"], media.svcRash, "A mother caring for her child at home"),
  svc("physical", "Need a physical", "School, sports & work forms", "Physicals & vaccines",
    ["School, sports & annual physicals — walk in, walk out", "Vaccinations and immunization records handled", "Forms signed and ready the same day"],
    ["School forms", "Sports physicals", "Vaccines"], media.svcPhysical, "A clinician preparing a vaccination"),
  svc("work", "Work injury", "Workers' comp handled", "Work injuries & workers' comp",
    ["Injury care with proper workers' comp documentation", "Drug & alcohol screening and pre-employment physicals", "Return-to-work evaluations your employer can trust"],
    ["Workers' comp", "Drug screening", "Documentation"], media.svcWork, "Lab samples being processed for screening"),
  svc("ear", "Ear or sinus infection", "Pressure, pain & congestion", "Ear & sinus infections",
    ["Ear and sinus exam to pinpoint the infection", "Treatment to relieve pressure and pain fast", "Antibiotics prescribed when they're truly needed"],
    ["All ages", "Same-day", "ENT exam"], media.svcEar, "A nurse examining a patient"),
  svc("uti", "UTI or bladder", "Discreet, same-day testing", "UTIs & bladder infections",
    ["On-site urine testing with fast results", "Provider consult — discreet and judgment-free", "Prescription sent before you leave"],
    ["On-site lab", "Women's health", "Fast results"], media.svcUti, "A doctor consulting with a patient"),
  svc("pinkeye", "Pink eye", "Contagious? Find out now", "Pink eye & eye irritation",
    ["Eye exam to tell infection from allergy", "Drops or ointment prescribed on the spot", "School and work return guidance included"],
    ["Kid-friendly", "Same-day", "School notes"], media.svcPinkeye, "A parent comforting a child"),
  svc("asthma", "Asthma or breathing", "Breathe easier today", "Asthma & breathing trouble",
    ["Breathing assessment and oxygen check", "Nebulizer treatment on site when needed", "Inhaler prescriptions and action plan"],
    ["Nebulizer", "Respiratory care", "All ages"], media.svcAsthma, "A parent caring for a sick child"),
  svc("burn", "Minor burns", "Cool it, treat it, heal it", "Minor burn care",
    ["Burn assessment and professional cleaning", "Dressing to protect and speed healing", "Follow-up plan and scar prevention guidance"],
    ["Burn care", "Wound dressing", "Follow-up"], media.svcBurn, "A clinician dressing a wound"),
  svc("bite", "Bug or animal bite", "From itchy to serious", "Bug bites & minor animal bites",
    ["Wound cleaning and infection check", "Tetanus and treatment as needed", "Clear signs-to-watch-for instructions"],
    ["Bite care", "Tetanus shots", "Infection check"], media.svcBite, "A nurse tending to a patient"),
  svc("covid", "COVID-19 testing", "Know in minutes", "COVID-19 testing & care",
    ["Rapid COVID testing with same-visit results", "Symptom treatment and recovery guidance", "Work and school documentation provided"],
    ["Rapid tests", "Same-day", "Documentation"], media.svcCovid, "Test samples being processed in a lab"),
  svc("xray", "X-ray imaging", "Digital, on site, today", "Digital X-ray imaging",
    ["Digital X-ray taken during your visit", "Images read quickly — answers before you leave", "Copies available for specialists if needed"],
    ["On-site imaging", "Fast reads", "No referral"], media.svcXray, "A lab professional reviewing samples"),
  svc("lab", "Lab & rapid tests", "Results in minutes", "On-site lab & rapid testing",
    ["Blood, urine, and swab testing under one roof", "Rapid flu, strep & COVID results in minutes", "Results explained face to face"],
    ["Full lab", "Rapid tests", "Same-visit"], media.svcLab, "Test tubes in a laboratory analyzer"),
  svc("vaccine", "Vaccinations", "For school, work & travel", "Vaccines & immunizations",
    ["Routine and required immunizations on site", "Records updated and copies provided", "Kid-friendly, quick appointments"],
    ["All ages", "Records", "Walk-in"], media.svcVaccine, "A clinician administering a vaccine"),
  svc("womens", "Women's health", "Care built around you", "Women's health services",
    ["Discreet, respectful care for women's health needs", "UTI and infection testing on site", "Referrals coordinated when specialty care helps"],
    ["Discreet care", "On-site lab", "Same-day"], media.svcWomens, "A doctor talking with a patient"),
  svc("peds", "Pediatric care", "Gentle care for little ones", "Pediatric urgent care",
    ["Kid-first providers for illness and injuries", "Gentle exams with parents in the room", "School notes and follow-up guidance"],
    ["All ages", "Kid-friendly", "Mon–Fri"], media.svcPeds, "A mother caring for her child"),
];

// Balanced Greek-cross (+) mask over a 6-col × 6-row grid. '#' = a tile.
// 20 tiles total — a big, readable medical cross.
const MASK = [
  "..##..",
  "..##..",
  "######",
  "######",
  "..##..",
  "..##..",
];

// Grid cells (1-based col/row) that form the cross, in reading order.
const CELLS: { col: number; row: number }[] = [];
MASK.forEach((rowStr, r) =>
  rowStr.split("").forEach((ch, c) => {
    if (ch === "#") CELLS.push({ col: c + 1, row: r + 1 });
  })
);

export default function ServiceGrid() {
  const [active, setActive] = useState<Service | null>(null);
  const [closing, setClosing] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const originRef = useRef<DOMRect | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const open = (s: Service, e: React.MouseEvent<HTMLButtonElement>) => {
    originRef.current = e.currentTarget.getBoundingClientRect();
    setClosing(false);
    setActive(s);
  };
  const close = useCallback(() => setClosing(true), []);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const origin = originRef.current;
    if (!active || !panel || !origin) return;
    if (reduceMotion.current) {
      panel.style.transform = "none";
      panel.style.opacity = "1";
      if (closing) {
        setActive(null);
        setClosing(false);
      }
      return;
    }
    const target = panel.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (target.left + target.width / 2);
    const dy = origin.top + origin.height / 2 - (target.top + target.height / 2);
    const scale = Math.max(0.15, Math.min(origin.width / target.width, 0.6));
    if (!closing) {
      panel.style.transition = "none";
      panel.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      panel.style.opacity = "0.3";
      void panel.offsetWidth;
      panel.style.transition = "transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease";
      panel.style.transform = "translate(0,0) scale(1)";
      panel.style.opacity = "1";
    } else {
      panel.style.transition = "transform 0.32s cubic-bezier(0.55,0,0.55,0.2), opacity 0.28s ease";
      panel.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      panel.style.opacity = "0";
      const t = setTimeout(() => {
        setActive(null);
        setClosing(false);
      }, 320);
      return () => clearTimeout(t);
    }
  }, [active, closing]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close]);

  return (
    <section className="bg-ivory-soft py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">
            Our Services
          </p>
          <h2 className="font-display mt-3 text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
            What brings you in today?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Tap any tile in the cross to see exactly how we&apos;ll take care of it.
          </p>
        </div>

        {/* Big balanced cross (+) collage on desktop; 2-col grid on mobile */}
        <div
          className="mx-auto mt-14 grid max-w-5xl gap-3 sm:gap-4"
          style={{
            gridTemplateColumns: desktop ? "repeat(6, 1fr)" : "repeat(2, 1fr)",
          }}
        >
          {SERVICES.map((s, i) => {
            const cell = CELLS[i];
            return (
              <button
                key={s.key}
                type="button"
                onClick={(e) => open(s, e)}
                aria-haspopup="dialog"
                style={
                  desktop && cell
                    ? { gridColumn: cell.col, gridRow: cell.row }
                    : undefined
                }
                className="group relative aspect-square overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-950 text-left shadow-[0_22px_40px_-6px_rgba(16,31,56,0.85)] transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:scale-[1.04] hover:border-red/60 hover:shadow-[0_36px_60px_-8px_rgba(16,31,56,0.95)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.video.poster}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition-all duration-500 group-hover:scale-110 group-hover:opacity-75"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/15" />
                <div className="relative flex h-full flex-col justify-end p-4 sm:p-5">
                  <span className="font-display block text-base font-black leading-tight text-ivory sm:text-lg">
                    {s.label}
                  </span>
                  <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-sky transition-colors group-hover:text-ivory">
                    {s.tagline}
                  </span>
                </div>
                {/* corner + mark reinforcing the medical-cross theme */}
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-3 text-sky/70 transition-colors group-hover:text-red"
                >
                  <svg width="15" height="15" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zoom-in video popup */}
      {active && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 ${closing ? "pointer-events-none" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={active.headline}
        >
          <div
            onClick={close}
            aria-hidden="true"
            className={`absolute inset-0 bg-navy-950/70 backdrop-blur-md transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100"}`}
          />
          <div
            ref={panelRef}
            className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden overflow-y-auto rounded-3xl border border-ivory/15 bg-navy-900 shadow-2xl"
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
            <div className="grid md:min-h-[36rem] md:grid-cols-[1.05fr_1fr]">
              <div className="relative h-64 sm:h-80 md:h-auto">
                <AutoVideo
                  key={active.video.mp4}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={active.video.mp4}
                  poster={active.video.poster}
                  label={active.alt}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-navy-900/60" />
              </div>
              <div className="flex flex-col justify-center p-8 text-ivory sm:p-12">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-sky">
                  How we&apos;ll take care of it
                </p>
                <h3 className="font-display mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  {active.headline}
                </h3>
                <ol className="mt-6 space-y-4">
                  {active.plan.map((step, i) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red text-sm font-black text-ivory">
                        {i + 1}
                      </span>
                      <p className="pt-1 text-sm leading-relaxed text-ivory/85">{step}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.caps.map((c) => (
                    <span key={c} className="rounded-full border border-sky/30 bg-navy-950/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-sky">
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
    </section>
  );
}
