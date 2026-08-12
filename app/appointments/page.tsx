import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import AutoVideo from "@/components/AutoVideo";
import StatusCard from "@/components/StatusCard";
import AppointmentForm from "@/components/AppointmentForm";
import { site } from "@/lib/site";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Request an Appointment",
  alternates: { canonical: "/appointments" },
  description:
    "Request an appointment online at Urgent Care of Ennis. Pick your day and time and our front desk will call to confirm. Walk-ins always welcome, Monday–Saturday, 7 AM – 7 PM.",
};

const steps = [
  {
    n: "1",
    title: "Send your request",
    text: "Tell us who you are, why you're coming in, and the day that works best.",
  },
  {
    n: "2",
    title: "We call to confirm",
    text: "Our front desk reaches out to lock in your time and answer any questions.",
  },
  {
    n: "3",
    title: "Come visit us",
    text: `Arrive at ${site.address.line1} and we'll be expecting you.`,
  },
];

export default function AppointmentsPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-ivory">
        <AutoVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={media.appointmentsHeaderVideo.mp4}
          poster={media.appointmentsHeaderVideo.poster}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(16,31,56,0.97) 0%, rgba(16,31,56,0.88) 50%, rgba(16,31,56,0.65) 100%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.25fr_1fr] lg:px-8 lg:pt-40">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
                Appointments
              </p>
              <h1 className="font-display mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                Book your visit online.
              </h1>
              <p className="mt-6 max-w-xl leading-relaxed text-ivory/80">
                Pick a day and time that suits you and our front desk will call
                to confirm. Walk-ins are always welcome — an appointment simply
                means we&apos;re expecting you.
              </p>
              <p className="mt-6 inline-block rounded-xl bg-red/20 px-5 py-3 text-sm leading-relaxed text-ivory/90 backdrop-blur-sm">
                If this is a medical emergency, call 911 or go to the nearest
                emergency room.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200} className="justify-self-center lg:justify-self-end">
            <StatusCard />
          </Reveal>
        </div>
      </section>

      {/* ── Three steps ──────────────────────────────────────── */}
      <section className="bg-ivory-soft py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 110} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border-2 border-navy-900/10 bg-white/70 p-7">
                  <span className="font-display flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-lg font-black text-ivory">
                    {s.n}
                  </span>
                  <p className="font-display text-lg font-bold text-navy-900">
                    {s.title}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The form ─────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">
              Request a Time
            </p>
            <h2 className="font-display mt-3 text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">
              Tell us when to expect you.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
              We&apos;re open {site.hours}, closed Sunday. Requests sent outside
              those hours are answered the next morning we&apos;re open.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-10">
              <AppointmentForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Walk-in reassurance ──────────────────────────────── */}
      <section className="bg-ivory pb-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="grain relative overflow-hidden rounded-3xl bg-navy-950 p-8 text-center text-ivory shadow-xl sm:p-14">
              <h2 className="font-display relative text-2xl font-black tracking-tight sm:text-4xl">
                Would rather just walk in?
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl leading-relaxed text-ivory/80">
                No appointment is ever required. Come visit us Monday through
                Saturday, 7 AM to 7 PM, at {site.address.line1}.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-5">
                <a
                  href={site.phoneHref}
                  className="rounded-xl bg-red px-8 py-4 text-sm font-bold text-ivory shadow-sm transition-all hover:bg-red-deep hover:shadow-md"
                >
                  Call {site.phone}
                </a>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border-2 border-ivory/30 px-8 py-4 text-sm font-bold text-ivory transition-colors hover:border-ivory/60"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
