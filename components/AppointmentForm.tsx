"use client";

import { useMemo, useState } from "react";
import { site } from "@/lib/site";

// Drawn from the services this clinic actually offers (components/ServiceGrid).
const reasons = [
  "Illness — fever, flu, cough or sore throat",
  "Ear, sinus or throat infection",
  "Injury — cut, wound, sprain or possible fracture",
  "Minor burn, rash, allergy or bite",
  "Stomach trouble, UTI or bladder",
  "Physical — school, sports or annual",
  "X-ray or lab work",
  "COVID-19 test or vaccination",
  "Work injury or employer screening",
  "Pediatric care",
  "Women's health",
  "Follow-up on a previous visit",
  "Something else",
];

// Half-hour slots across clinic hours (7:00 AM – 7:00 PM), e.g. "1:00 – 1:30 PM".
// Slots that straddle noon read "11:30 AM – 12:00 PM".
const slots = (() => {
  const label = (mins: number) => {
    const h24 = Math.floor(mins / 60);
    const h = h24 % 12 === 0 ? 12 : h24 % 12;
    return `${h}:${String(mins % 60).padStart(2, "0")}`;
  };
  const suffix = (mins: number) => (Math.floor(mins / 60) < 12 ? "AM" : "PM");
  const out: string[] = [];
  for (let m = 7 * 60; m < 19 * 60; m += 30) {
    const end = m + 30;
    out.push(
      suffix(m) === suffix(end)
        ? `${label(m)} – ${label(end)} ${suffix(end)}`
        : `${label(m)} ${suffix(m)} – ${label(end)} ${suffix(end)}`
    );
  }
  return out;
})();

const NO_PREFERENCE = "No preference — any time works";

const field =
  "mt-2 w-full rounded-xl border-2 border-navy-900/10 bg-ivory/50 px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-soft/60 focus:border-red focus:outline-none";
const label =
  "block text-[11px] font-bold uppercase tracking-[0.2em] text-red";

type State = "idle" | "sending" | "sent" | "error";

export default function AppointmentForm() {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    reason: reasons[0],
    preferredDate: "",
    timeWindow: NO_PREFERENCE,
    notes: "",
    botField: "",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  // The clinic is open Monday through Saturday — flag a Sunday without blocking it.
  const sundayPicked = useMemo(() => {
    if (!form.preferredDate) return false;
    return new Date(`${form.preferredDate}T12:00:00`).getDay() === 0;
  }, [form.preferredDate]);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // Used if the email service is unreachable, so a request is never lost.
  const mailtoFallback = useMemo(() => {
    const lines = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Reason: ${form.reason}`,
      `Preferred day: ${form.preferredDate}`,
      `Preferred time: ${form.timeWindow}`,
      `Notes: ${form.notes}`,
    ].join("\n");
    return `mailto:${site.frontDeskEmail}?subject=${encodeURIComponent(
      `Appointment request — ${form.name || "new patient"}`
    )}&body=${encodeURIComponent(lines)}`;
  }, [form]);

  // FormSubmit refuses calls from datacenter IPs (403), so when the server has
  // no mail credentials of its own the relay has to happen from right here, in
  // the patient's browser.
  const relayFromBrowser = async (payload: {
    recipient: string;
    subject: string;
    rows: [string, string][];
  }) => {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(payload.recipient)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(payload.rows),
          _subject: payload.subject,
          _template: "table",
          _captcha: "false",
          ...(form.email ? { _replyto: form.email } : {}),
        }),
      }
    );
    const data = await res.json().catch(() => null);
    return res.ok && String(data?.success) === "true";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState("sent");
        return;
      }
      const data = await res.json().catch(() => null);
      if (data?.error === "use-client-relay" && data.recipient && data.rows) {
        setState((await relayFromBrowser(data)) ? "sent" : "error");
        return;
      }
      setState("error");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="rounded-3xl border-2 border-navy-900/10 bg-white p-8 text-center shadow-xl sm:p-12">
        <span
          aria-hidden="true"
          className="font-display mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red text-3xl font-black text-ivory"
        >
          ✚
        </span>
        <h3 className="font-display mt-6 text-2xl font-black tracking-tight text-navy-900 sm:text-3xl">
          Request received.
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
          Our front desk will call you at{" "}
          <strong className="text-navy-900">{form.phone}</strong> to confirm your
          time. If you need care sooner, please come visit us — walk-ins are
          always welcome during clinic hours.
        </p>
        <p className="mt-6 text-sm text-ink-soft">
          Need to reach us right away?{" "}
          <a
            href={site.phoneHref}
            className="font-bold text-navy-900 underline decoration-red decoration-2 underline-offset-4"
          >
            Call {site.phone}
          </a>
        </p>
      </div>
    );
  }

  const failed = state === "error";

  return (
    <form
      onSubmit={submit}
      className="relative rounded-3xl border-2 border-navy-900/10 bg-white p-7 shadow-xl sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="ap-name">
            Full name <span className="text-red">*</span>
          </label>
          <input
            id="ap-name"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            className={field}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className={label} htmlFor="ap-phone">
            Phone <span className="text-red">*</span>
          </label>
          <input
            id="ap-phone"
            required
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value)}
            className={field}
            placeholder="(469) 555-0123"
          />
        </div>
        <div>
          <label className={label} htmlFor="ap-email">
            Email
          </label>
          <input
            id="ap-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            className={field}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className={label} htmlFor="ap-reason">
            Reason for visit <span className="text-red">*</span>
          </label>
          <select
            id="ap-reason"
            required
            value={form.reason}
            onChange={(e) => set("reason")(e.target.value)}
            className={field}
          >
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="ap-date">
            Preferred day <span className="text-red">*</span>
          </label>
          <input
            id="ap-date"
            required
            type="date"
            min={today}
            value={form.preferredDate}
            onChange={(e) => set("preferredDate")(e.target.value)}
            className={field}
          />
          {sundayPicked && (
            <p className="mt-2 text-xs font-semibold text-red">
              We are closed on Sunday — please choose Monday through Saturday.
            </p>
          )}
        </div>
        <div>
          <label className={label} htmlFor="ap-time">
            Preferred time
          </label>
          <select
            id="ap-time"
            value={form.timeWindow}
            onChange={(e) => set("timeWindow")(e.target.value)}
            className={field}
          >
            <option value={NO_PREFERENCE}>{NO_PREFERENCE}</option>
            {slots.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="ap-notes">
            Anything else we should know?
          </label>
          <textarea
            id="ap-notes"
            rows={4}
            value={form.notes}
            onChange={(e) => set("notes")(e.target.value)}
            className={field}
            placeholder="Forms you need signed, an employer requirement, or a preferred provider."
          />
        </div>
      </div>

      {/* Honeypot — hidden from patients, filled in by bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="ap-bot">Leave this empty</label>
        <input
          id="ap-bot"
          tabIndex={-1}
          autoComplete="off"
          value={form.botField}
          onChange={(e) => set("botField")(e.target.value)}
        />
      </div>

      <p className="mt-7 text-xs leading-relaxed text-ink-soft">
        Please do not include medical details, insurance numbers, or any other
        sensitive information in this form. This is a request, not a confirmed
        appointment — our front desk will call you to confirm. For anything
        urgent, come visit us or call {site.phone}. In an emergency, dial 911.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-xl bg-red px-8 py-4 text-sm font-bold text-ivory shadow-sm transition-all hover:bg-red-deep hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : "Request appointment"}
        </button>
        <a
          href={site.phoneHref}
          className="text-sm font-bold text-navy-900 underline decoration-red decoration-2 underline-offset-4"
        >
          Or call {site.phone}
        </a>
      </div>

      {failed && (
        <div
          role="alert"
          className="mt-6 rounded-2xl border-2 border-navy-900/10 bg-ivory-soft p-6 text-sm leading-relaxed text-navy-900"
        >
          <p className="font-display text-base font-bold">
            One more step to send it.
          </p>
          <p className="mt-1.5 text-ink-soft">
            Your details are ready to go — we just need your email app to send
            them. Press the button and your message opens already filled in;
            send it and our front desk has everything.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href={mailtoFallback}
              className="rounded-xl bg-red px-7 py-3.5 text-sm font-bold text-ivory shadow-sm transition-all hover:bg-red-deep hover:shadow-md"
            >
              Open my email to send
            </a>
            <a
              href={site.phoneHref}
              className="text-sm font-bold text-navy-900 underline decoration-red decoration-2 underline-offset-4"
            >
              Or just call {site.phone}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
