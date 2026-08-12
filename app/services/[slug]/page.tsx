import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";

type ServicePage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
};

const pages: ServicePage[] = [
  {
    slug: "walk-in-urgent-care",
    name: "Walk-in urgent care",
    title: "Walk-In Urgent Care in Ennis, TX",
    description:
      "Walk-in urgent care in Ennis, TX for common illnesses, minor injuries, and testing. Open Monday–Saturday, 7 AM – 7 PM.",
    intro:
      "Urgent Care of Ennis provides walk-in care for common illnesses and minor injuries when you need an evaluation outside a primary-care appointment.",
    sections: [
      {
        heading: "Conditions we commonly evaluate",
        body: "Our care team evaluates conditions such as fever, cough, sore throat, ear and sinus concerns, stomach symptoms, rashes, minor burns, cuts, sprains, and other non-life-threatening concerns.",
      },
      {
        heading: "What to expect",
        body: "Bring a photo ID, your insurance card if you have one, and a list of current medications. The care team will evaluate you, explain recommended next steps, and advise when follow-up or emergency care is appropriate.",
      },
    ],
  },
  {
    slug: "x-ray-lab",
    name: "On-site X-ray and lab",
    title: "On-Site X-Ray and Lab Services in Ennis, TX",
    description:
      "On-site X-ray and lab services in Ennis, TX for urgent-care evaluations. Call or walk in Monday–Saturday, 7 AM – 7 PM.",
    intro:
      "On-site X-ray and lab capabilities support your urgent-care evaluation in one location. The provider will determine which testing is appropriate for your concern.",
    sections: [
      {
        heading: "Testing available at the clinic",
        body: "The clinic offers on-site X-ray and lab services, including rapid testing. Availability and clinical suitability depend on the visit and the provider's evaluation.",
      },
      {
        heading: "When to seek emergency care",
        body: "For a life-threatening emergency, call 911 or go to the nearest emergency room. Urgent Care of Ennis is for non-life-threatening concerns during published clinic hours.",
      },
    ],
  },
  {
    slug: "pediatric-family-urgent-care",
    name: "Pediatric and family urgent care",
    title: "Pediatric and Family Urgent Care in Ennis, TX",
    description:
      "Pediatric and family urgent care in Ennis, TX for children and adults. Walk in Monday–Saturday, 7 AM – 7 PM.",
    intro:
      "Urgent Care of Ennis serves patients of all ages, with family-focused visits for common illnesses, minor injuries, and school-related documentation.",
    sections: [
      {
        heading: "Family-focused visits",
        body: "We care for children and adults, including pediatric illness and injury care, school physicals, and common respiratory, skin, and minor-injury concerns.",
      },
      {
        heading: "Before you visit",
        body: "Bring identification and any relevant insurance or medical information. Call the clinic if you are unsure whether your child's concern is appropriate for urgent care.",
      },
    ],
  },
  {
    slug: "physicals",
    name: "School, sports, and work physicals",
    title: "School, Sports, and Work Physicals in Ennis, TX",
    description:
      "School, sports, and work physicals in Ennis, TX. Visit Urgent Care of Ennis Monday–Saturday, 7 AM – 7 PM.",
    intro:
      "Urgent Care of Ennis provides physical evaluations for school, sports, and work needs during published clinic hours.",
    sections: [
      {
        heading: "Bring your forms",
        body: "Bring the required school, sports, employer, or occupational forms and any documentation requested by the organization. Requirements vary, so call ahead if you have questions.",
      },
      {
        heading: "Clear next steps",
        body: "The provider will complete the evaluation and explain any follow-up or additional documentation needed for your situation.",
      },
    ],
  },
  {
    slug: "occupational-medicine",
    name: "Occupational medicine and workers' compensation",
    title: "Occupational Medicine in Ennis, TX",
    description:
      "Occupational medicine and workers' compensation care in Ennis, TX, including work-injury evaluation and physicals. Open Monday–Saturday, 7 AM – 7 PM.",
    intro:
      "Urgent Care of Ennis provides occupational medicine, work-injury care, workers' compensation documentation, screening, and work physicals.",
    sections: [
      {
        heading: "Employer and employee services",
        body: "Services include work-injury evaluation, workers' compensation documentation, pre-employment physicals, drug screening, and return-to-work evaluations when appropriate.",
      },
      {
        heading: "Coordinate with your employer",
        body: "Bring employer instructions, claim information, and any required forms. Requirements and authorization can vary by employer and workers' compensation carrier.",
      },
    ],
  },
];

export function generateStaticParams() {
  return pages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);
  return page
    ? {
        title: page.title,
        description: page.description,
        alternates: { canonical: `/services/${page.slug}` },
      }
    : {};
}

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);
  if (!page) notFound();
  return (
    <article className="bg-ivory">
      <header className="bg-navy-950 px-5 pb-16 pt-36 text-ivory lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
            Urgent Care of Ennis
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/80">
            {page.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="rounded-xl bg-red px-6 py-3 text-sm font-bold text-ivory"
            >
              Call Now: {site.phone}
            </a>
            <a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-ivory/30 px-6 py-3 text-sm font-bold text-ivory"
            >
              Get Directions
            </a>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-4xl gap-10 px-5 py-16 lg:grid-cols-[1fr_260px] lg:px-8">
        <div className="space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-black text-navy-900">
                {section.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{section.body}</p>
            </section>
          ))}
          <p className="rounded-xl border border-red/20 bg-red/5 p-4 text-sm leading-relaxed text-ink-soft">
            This information is general and does not replace medical advice. For a
            life-threatening emergency, call 911 or go to the nearest emergency room.
          </p>
        </div>
        <aside className="h-fit rounded-2xl border-2 border-navy-900/10 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-navy-900">
            Visit the clinic
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {site.address.line1}
            <br />
            {site.address.line2}
          </p>
          <p className="mt-3 text-sm font-semibold text-navy-900">{site.hours}</p>
          <nav
            className="mt-6 grid gap-2 text-sm font-bold"
            aria-label="Related pages"
          >
            <Link href="/services" className="text-red hover:underline">
              All services
            </Link>
            <Link href="/contact" className="text-red hover:underline">
              Contact and directions
            </Link>
            <Link href="/#insurance" className="text-red hover:underline">
              Insurance and pricing
            </Link>
          </nav>
        </aside>
      </div>
    </article>
  );
}
