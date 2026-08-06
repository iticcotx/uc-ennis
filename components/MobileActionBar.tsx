import { site } from "@/lib/site";

export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/15 bg-ivory/95 p-3 shadow-[0_-6px_24px_rgba(16,31,56,0.16)] backdrop-blur md:hidden">
      <p className="mb-2 text-center text-[11px] font-semibold text-ink-soft">Open Monday-Friday, 9 AM-5 PM</p>
      <div className="grid grid-cols-2 gap-2">
        <a href={site.phoneHref} className="rounded-lg bg-red px-3 py-3 text-center text-sm font-bold text-ivory">Call Now</a>
        <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border-2 border-navy-900/20 px-3 py-3 text-center text-sm font-bold text-navy-900">Get Directions</a>
      </div>
    </div>
  );
}

