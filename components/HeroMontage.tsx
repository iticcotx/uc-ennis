"use client";

import { useEffect, useRef } from "react";
import type { Video } from "@/lib/media";

// Background montage: cycles through several clips with a crossfade so the
// hero plays continuously for much longer than any single stock clip. Two
// stacked <video> layers alternate: while one plays, the other preloads the
// next clip; shortly before the current clip ends the layers crossfade.
export default function HeroMontage({
  clips,
  className = "",
}: {
  clips: Video[];
  className?: string;
}) {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const a = refA.current;
    const b = refB.current;
    if (!a || !b) return;
    const videos: HTMLVideoElement[] = [a, b];

    let layer = 0; // which layer is currently visible
    let clip = 0; // index of the clip on the visible layer
    let fading = false;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;

    videos[0].src = clips[0].mp4;
    videos[1].src = clips[1 % clips.length].mp4;
    videos[0].style.opacity = "1";
    videos[1].style.opacity = "0";
    videos[0].play().catch(() => {});

    const tick = () => {
      const cur = videos[layer];
      if (fading || !cur.duration || cur.paused) return;
      if (cur.duration - cur.currentTime < 0.9) {
        fading = true;
        const next = videos[1 - layer];
        next.currentTime = 0;
        next.play().catch(() => {});
        next.style.opacity = "1";
        cur.style.opacity = "0";
        layer = 1 - layer;
        clip = (clip + 1) % clips.length;
        // Once the fade finishes, recycle the hidden layer as the preloader
        // for the clip after this one.
        fadeTimer = setTimeout(() => {
          const hidden = videos[1 - layer];
          hidden.pause();
          hidden.src = clips[(clip + 1) % clips.length].mp4;
          hidden.load();
          fading = false;
        }, 900);
      }
    };
    const interval = setInterval(tick, 250);

    // Autoplay-blocked environments: retry on first interaction / visibility.
    const retry = () => videos[layer].play().catch(() => {});
    const opts = { passive: true } as const;
    window.addEventListener("pointerdown", retry, opts);
    window.addEventListener("keydown", retry, opts);
    window.addEventListener("touchstart", retry, opts);
    document.addEventListener("visibilitychange", retry);

    return () => {
      clearInterval(interval);
      if (fadeTimer) clearTimeout(fadeTimer);
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("keydown", retry);
      window.removeEventListener("touchstart", retry);
      document.removeEventListener("visibilitychange", retry);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <video
        ref={refA}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        poster={clips[0].poster}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={refB}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
