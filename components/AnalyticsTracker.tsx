"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function AnalyticsTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a") as HTMLAnchorElement | null;
      if (!link) return;

      const sendEvent = (name: string, parameters: Record<string, unknown>) => {
        if (window.gtag) {
          window.gtag("event", name, parameters);
          return;
        }

        // Keep the event in the existing GA4 queue if gtag is still loading.
        // This does not create another tag or configuration.
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(["event", name, parameters]);
      };

      const linkUrl = link.href;
      const common = {
        link_url: linkUrl,
        link_text: (link.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100),
        page_location: window.location.href,
        page_path: window.location.pathname,
      };

      if (linkUrl.startsWith("tel:")) {
        sendEvent("phone_call_click", {
          ...common,
          // Single source of truth — keeps the event in sync if the line changes.
          phone_number: site.phoneHref.replace("tel:", ""),
        });
      } else {
        const url = new URL(linkUrl, window.location.href);
        const hostname = url.hostname.toLowerCase();
        const isGoogleMaps =
          hostname === "maps.google.com" ||
          (hostname.endsWith(".google.com") && url.pathname.startsWith("/maps"));

        if (isGoogleMaps) {
          const isUnmodifiedLeftClick =
            event.button === 0 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.shiftKey &&
            !event.altKey;
          const opensNewTab = link.target === "_blank";

          if (!isUnmodifiedLeftClick || opensNewTab) {
            sendEvent("get_directions_click", common);
            return;
          }

          let navigated = false;
          const navigate = () => {
            if (navigated) return;
            navigated = true;
            window.location.assign(link.href);
          };

          event.preventDefault();
          sendEvent("get_directions_click", {
            ...common,
            transport_type: "beacon",
            event_callback: navigate,
            event_timeout: 1000,
          });
          window.setTimeout(navigate, 1200);
        }
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
