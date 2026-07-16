import { media, type Video } from "@/lib/media";

export type Service = {
  title: string;
  blurb: string;
  details: string[];
  icon: React.ReactNode;
  alt: string;
  video: Video;
  cardVideo: Video;
};

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const services: Service[] = [
  {
    title: "Illness & Infection Care",
    blurb:
      "Feeling rough? Walk in and get treated the same day — flu, strep, infections, and the everyday illnesses that can't wait for a primary care opening.",
    details: [
      "Flu, cold, cough & sore throat",
      "Strep, ear & sinus infections",
      "UTIs & stomach ailments",
      "COVID-19 testing & treatment",
      "Rapid lab tests on site",
    ],
    icon: (
      <svg viewBox="0 0 32 32" {...iconProps} aria-hidden="true">
        <path d="M20 4h-8M16 4v6" />
        <path d="M16 10a9 9 0 1 0 .01 0z" />
        <path d="M12 19c1.3-1.3 2.7-1.3 4 0s2.7 1.3 4 0" />
      </svg>
    ),
    alt: "A clinician talking with a patient about their symptoms",
    video: media.doctorTalkVideo,
    cardVideo: media.doctorTalkSd,
  },
  {
    title: "Injuries & Wound Care",
    blurb:
      "From kitchen cuts to weekend sports injuries — stitches, splints, and burn care handled on site, without the ER bill or the ER wait.",
    details: [
      "Cuts & lacerations requiring stitches",
      "Sprains, strains & minor fractures",
      "Sports injuries",
      "Minor burns",
      "Bug bites & minor animal bites",
    ],
    icon: (
      <svg viewBox="0 0 32 32" {...iconProps} aria-hidden="true">
        <rect x="4" y="12" width="24" height="8" rx="4" transform="rotate(-45 16 16)" />
        <circle cx="14" cy="14" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="18" cy="18" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="18" cy="14" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="14" cy="18" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
    alt: "A clinician examining a patient's injured knee",
    video: media.kneeExamVideo,
    cardVideo: media.kneeExamSd,
  },
  {
    title: "On-Site X-Ray & Lab",
    blurb:
      "Answers before you leave. Digital X-ray and a full lab under our roof mean fractures, infections, and illnesses are diagnosed in one visit.",
    details: [
      "Digital X-ray imaging",
      "On-site laboratory testing",
      "EKG",
      "Rapid flu, strep & COVID tests",
      "Results explained the same visit",
    ],
    icon: (
      <svg viewBox="0 0 32 32" {...iconProps} aria-hidden="true">
        <rect x="5" y="4" width="22" height="24" rx="2" />
        <path d="M16 8v14M11 11h10M12 15h8M13 19h6" />
      </svg>
    ),
    alt: "A clinician performing a diagnostic ultrasound scan",
    video: media.ultrasoundVideo,
    cardVideo: media.ultrasoundSd,
  },
  {
    title: "Family Medicine & Physicals",
    blurb:
      "More than urgent care — we handle checkups, school and sports physicals, vaccinations, and everyday family medicine for all ages.",
    details: [
      "Annual, school & sports physicals",
      "Vaccinations & immunizations",
      "Chronic condition support",
      "Respiratory & cardiovascular care",
      "Allergy care",
    ],
    icon: (
      <svg viewBox="0 0 32 32" {...iconProps} aria-hidden="true">
        <path d="M10 4v6a6 6 0 0 0 12 0V4" />
        <path d="M16 16v4a6 6 0 0 0 6 6h0a6 6 0 0 0 6-6v-1" />
        <circle cx="28" cy="16" r="2.5" />
      </svg>
    ),
    alt: "A physician caring for a patient during a checkup",
    video: media.seniorCareVideo,
    cardVideo: media.seniorCareSd,
  },
  {
    title: "Pediatric & Women's Health",
    blurb:
      "Gentle, family-friendly care for the littlest patients and dedicated women's health services — close to home, six days a week.",
    details: [
      "Pediatric urgent care, all ages",
      "Kid-friendly illness & injury care",
      "Women's health services",
      "Pediatric physicals & vaccines",
      "Same-day appointments",
    ],
    icon: (
      <svg viewBox="0 0 32 32" {...iconProps} aria-hidden="true">
        <path d="M16 27S4 20 4 11.8C4 7.5 7.3 5 10.5 5c2.3 0 4.3 1.2 5.5 3 1.2-1.8 3.2-3 5.5-3C24.7 5 28 7.5 28 11.8 28 20 16 27 16 27z" />
        <path d="M8 15h4l2-4 3 7 2-3h5" />
      </svg>
    ),
    alt: "A caring clinician with a young patient and family",
    video: media.clinicCoupleVideo,
    cardVideo: media.clinicCoupleSd,
  },
  {
    title: "Occupational Medicine",
    blurb:
      "Keeping Ennis working. Employer services, work injury care, and workers' compensation visits — handled quickly and documented properly.",
    details: [
      "Work injury treatment",
      "Workers' compensation care",
      "Pre-employment physicals",
      "Drug & alcohol screening",
      "Return-to-work evaluations",
    ],
    icon: (
      <svg viewBox="0 0 32 32" {...iconProps} aria-hidden="true">
        <rect x="4" y="10" width="24" height="16" rx="2" />
        <path d="M12 10V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M4 17h24M16 15v4" />
      </svg>
    ),
    alt: "A therapist helping a worker recover from an injury",
    video: media.rehabVideo,
    cardVideo: media.rehabSd,
  },
];

export const conditions = [
  "Flu & fever",
  "Cold & cough",
  "Sore throat & strep",
  "Ear & sinus infections",
  "UTIs",
  "Stomach pain & nausea",
  "Cuts needing stitches",
  "Sprains & strains",
  "Minor fractures",
  "Minor burns",
  "Allergic reactions",
  "Asthma & breathing issues",
  "Bug bites & animal bites",
  "Rashes & skin infections",
  "Pink eye",
  "Dehydration",
  "COVID-19",
  "Work injuries",
];

export const promises = [
  {
    title: "Walk-Ins Always Welcome",
    text: "No appointment needed — ever. Walk in any day we're open and be seen quickly.",
  },
  {
    title: "Little-to-No Wait",
    text: "Our goal is to have you seen in minutes, not hours. Most visits are in and out fast.",
  },
  {
    title: "A Fraction of ER Cost",
    text: "Quality treatment for non-emergencies at a fraction of emergency room pricing.",
  },
  {
    title: "Everything Under One Roof",
    text: "X-ray, lab, and treatment in one place — no running across town for answers.",
  },
  {
    title: "Care for Every Age",
    text: "From toddlers to grandparents, our providers treat the whole family.",
  },
  {
    title: "Most Insurance Accepted",
    text: "We accept most major insurance plans, plus affordable self-pay options.",
  },
];
