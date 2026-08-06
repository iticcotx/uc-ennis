"use client";

import { useEffect } from "react";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

export default function AnalyticsTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a") as HTMLAnchorElement | null;
      if (!link || !window.gtag) return;
      if (link.href.startsWith("tel:")) {
        window.gtag("event", "phone_link_click", { link_url: link.href, page_path: window.location.pathname });
      } else if (link.href.includes("google.com/maps")) {
        window.gtag("event", "directions_click", { link_url: link.href, page_path: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

