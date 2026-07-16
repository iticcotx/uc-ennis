"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Over the dark hero the bar is transparent with light text; once the page
  // scrolls (or the mobile menu opens) it becomes solid ivory with dark text.
  const dark = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        dark
          ? "bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(29,34,48,0.08)]"
          : "bg-gradient-to-b from-navy-950/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" aria-label="Urgent Care of Ennis home" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-navy-900/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/monogram.webp" alt="" className="h-8 w-8" />
          </span>
          <span className="leading-tight">
            <span
              className={`font-display block text-lg font-semibold tracking-tight sm:text-xl ${
                dark ? "text-navy-900" : "text-ivory"
              }`}
            >
              Urgent Care <span className={dark ? "text-red" : "text-sky"}>of Ennis</span>
            </span>
            <span
              className={`hidden text-[10px] font-medium uppercase tracking-[0.18em] sm:block ${
                dark ? "text-ink-soft" : "text-sky"
              }`}
            >
              Your Health Matters
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                dark
                  ? pathname === l.href
                    ? "text-navy-800"
                    : "text-ink-soft hover:text-navy-800"
                  : pathname === l.href
                    ? "text-sky"
                    : "text-ivory hover:text-sky"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md ${
              dark
                ? "bg-red text-ivory hover:bg-red-deep"
                : "bg-red text-ivory hover:bg-red-deep"
            }`}
          >
            Call {site.phone}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className={`flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
            dark ? "text-navy-900" : "text-ivory"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-navy-900/10 bg-ivory px-5 pb-6 pt-2 md:hidden"
          aria-label="Mobile"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block py-3 text-base font-medium ${
                pathname === l.href ? "text-navy-800" : "text-ink-soft"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-3">
            <a
              href={site.phoneHref}
              className="rounded-full bg-red px-5 py-3 text-center text-sm font-semibold text-ivory"
            >
              Call {site.phone}
            </a>
            <a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-navy-900/20 px-5 py-3 text-center text-sm font-semibold text-navy-900"
            >
              Get Directions
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
