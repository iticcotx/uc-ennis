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

      const linkUrl = link.href;
      const common = {
        link_url: linkUrl,
        link_text: (link.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100),
        page_location: window.location.href,
        page_path: window.location.pathname,
      };

      if (linkUrl.startsWith("tel:")) {
        window.gtag("event", "phone_call_click", {
          ...common,
          phone_number: "+14699403431",
        });
      } else {
        const url = new URL(linkUrl, window.location.href);
        const hostname = url.hostname.toLowerCase();
        const isGoogleMaps =
          hostname === "maps.google.com" ||
          (hostname.endsWith(".google.com") && url.pathname.startsWith("/maps"));

        if (isGoogleMaps) {
        window.gtag("event", "get_directions_click", common);
        }
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

