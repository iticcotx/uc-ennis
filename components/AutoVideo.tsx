"use client";

import { useEffect, useRef } from "react";

// A muted, looping background video that reliably plays whenever it is in
// view and pauses offscreen to save battery. Visibility is computed from the
// element's own bounding rect (IntersectionObserver's isIntersecting flag is
// unreliable in some embedded browsers); the observer and a scroll listener
// just tell us when to re-check.
export default function AutoVideo({
  src,
  poster,
  className = "",
  label,
}: {
  src: string;
  poster: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const update = () => {
      const r = video.getBoundingClientRect();
      const inView = r.bottom > 0 && r.top < window.innerHeight;
      if (inView) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    update();
    const observer = new IntersectionObserver(update, { threshold: 0.1 });
    observer.observe(video);
    window.addEventListener("scroll", update, { passive: true });
    // Some environments block autoplay until the user interacts; retry once
    // on the first interaction (the poster is shown until then).
    const retry = () => update();
    const opts = { passive: true, once: true } as const;
    window.addEventListener("pointerdown", retry, opts);
    window.addEventListener("keydown", retry, opts);
    window.addEventListener("touchstart", retry, opts);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("keydown", retry);
      window.removeEventListener("touchstart", retry);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden={label ? undefined : true}
      aria-label={label}
    />
  );
}
