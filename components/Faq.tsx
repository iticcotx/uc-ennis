import { site } from "@/lib/site";

const faqs = [
  {
    q: "Do I need an appointment?",
    a: "No — we're a true walk-in clinic. Come in any time Monday through Saturday, 7 AM to 7 PM, and we'll get you seen quickly. You can also call ahead if you'd like us to expect you.",
  },
  {
    q: "Do you take my insurance?",
    a: "We accept most major insurance plans. Affordable self-pay options are also available — call us and we'll confirm your coverage before you come in.",
  },
  {
    q: "When should I go to the ER instead?",
    a: "For life-threatening emergencies — chest pain, stroke symptoms, severe bleeding, or difficulty breathing — call 911 or go to the nearest emergency room. For everything else, we can usually treat you faster and at a fraction of the cost.",
  },
  {
    q: "Can you do X-rays and lab work on site?",
    a: "Yes. We have digital X-ray and a laboratory in the clinic, so fractures, infections, flu, strep, and COVID can be diagnosed during your visit — no second trip needed.",
  },
  {
    q: "Do you see children?",
    a: "Absolutely. Our providers treat patients of all ages, from toddlers to grandparents, including pediatric illness and injury care, school physicals, and vaccinations.",
  },
  {
    q: "Do you handle work injuries and workers' comp?",
    a: `Yes — we provide occupational medicine including work injury treatment, workers' compensation visits, pre-employment physicals, and drug screening. Employers can call ${site.phone} to set up an account.`,
  },
];

export default function Faq() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group rounded-2xl border-2 border-navy-900/10 bg-white/80 px-6 transition-all hover:border-navy-900/25 hover:shadow-md open:border-red/50 open:shadow-lg"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-display text-base font-bold text-navy-900">
              {f.q}
            </span>
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-navy-900/15 text-navy-800 transition-transform duration-300 group-open:rotate-45 group-open:border-red group-open:bg-red group-open:text-ivory"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="pb-6 text-sm leading-relaxed text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
