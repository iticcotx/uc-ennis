import { conditions } from "@/lib/content";

// Scrolling strip of conditions we treat — pauses on hover.
export default function Ticker() {
  const items = [...conditions, ...conditions];
  return (
    <div className="relative overflow-hidden border-y-2 border-navy-950 bg-red py-3" aria-label="Conditions we treat">
      <div className="marquee-track">
        {items.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="flex shrink-0 items-center gap-3 px-4 text-sm font-bold uppercase tracking-wide text-ivory"
            aria-hidden={i >= items.length / 2}
          >
            {c}
            <span className="text-ivory/50" aria-hidden="true">✚</span>
          </span>
        ))}
      </div>
    </div>
  );
}
