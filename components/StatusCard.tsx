"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// Live open/closed card computed from the clinic's real hours
// (Mon–Sat, 7:00 AM – 7:00 PM Central Time).
function getStatus() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "12", 10);
  const openDay = weekday !== "Sun";
  const open = openDay && hour >= 7 && hour < 19;
  return { open, openDay, hour, weekday };
}

export default function StatusCard() {
  const [status, setStatus] = useState<ReturnType<typeof getStatus> | null>(null);

  useEffect(() => {
    setStatus(getStatus());
    const t = setInterval(() => setStatus(getStatus()), 60_000);
    return () => clearInterval(t);
  }, []);

  const open = status?.open ?? true;

  return (
    <div className="w-full max-w-sm rounded-2xl border border-ivory/15 bg-navy-900/80 p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky">
          We&apos;re Ready
        </span>
        <span
          aria-live="polite"
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            open ? "bg-green-500/15 text-green-400" : "bg-red/20 text-ivory/80"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${open ? "pulse-dot bg-green-400" : "bg-ivory/50"}`}
            aria-hidden="true"
          />
          {status ? (open ? "Open now" : "Closed") : "…"}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.15em] text-ivory/50">
          {status?.weekday === "Sun" ? "Closed Sundays" : "Today's hours"}
        </p>
        <p className="font-display mt-1 text-3xl font-bold text-ivory">
          {status?.weekday === "Sun" ? "See you Monday" : "7 AM – 7 PM"}
        </p>
      </div>

      <div className="mt-5 border-t border-ivory/10 pt-5 text-sm text-ivory/75">
        <p className="font-semibold text-ivory">{site.address.line1}</p>
        <p>{site.address.line2}</p>
      </div>

      <div className="mt-5 grid gap-3">
        <a
          href={site.phoneHref}
          className="rounded-xl bg-red px-5 py-3.5 text-center text-sm font-bold text-ivory shadow-lg transition-all hover:bg-red-deep"
        >
          Call {site.phone}
        </a>
        <a
          href={site.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-ivory/25 px-5 py-3 text-center text-sm font-semibold text-ivory transition-colors hover:border-sky hover:text-sky"
        >
          Get Directions →
        </a>
      </div>

      <p className="mt-4 text-center text-[11px] text-ivory/50">
        Walk-ins welcome — no appointment needed
      </p>
    </div>
  );
}
