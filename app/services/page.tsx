import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import AutoVideo from "@/components/AutoVideo";
import ServiceGrid from "@/components/ServiceGrid";
import { site } from "@/lib/site";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Walk-in urgent care, on-site X-ray and lab, family medicine, physicals, pediatric and women's health, and occupational medicine at Urgent Care of Ennis in Ennis, TX.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy-950 text-ivory">
        <AutoVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={media.servicesHeaderVideo.mp4}
          poster={media.servicesHeaderVideo.poster}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(16,31,56,0.97) 0%, rgba(16,31,56,0.88) 50%, rgba(16,31,56,0.6) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-32 lg:px-8 lg:pt-40">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
              Our Services
            </p>
            <h1 className="font-display mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
              Everything handled in one visit.
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-ivory/80">
              Illness, injuries, imaging, lab work, physicals, and workplace
              medicine — walk in six days a week.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services: cross (+) collage with zoom popups */}
      <ServiceGrid />


      {/* Note */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center lg:px-8">
        <Reveal>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-ink-soft">
            Not sure if we can help? Call{" "}
            <a href={site.phoneHref} className="font-bold text-red hover:underline">
              {site.phone}
            </a>{" "}
            — if it&apos;s a life-threatening emergency, call 911 or go to the
            nearest ER.
          </p>
        </Reveal>
      </section>
    </>
  );
}
