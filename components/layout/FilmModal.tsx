"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { film, lenisStore } from "@/lib/stores";
import { VIDEO } from "@/lib/media";
import { Close } from "@/components/ui/Icons";

/** Full-screen player for the BOUNC brand film. */
export function FilmModal() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => film.subscribe(setOpen), []);

  useEffect(() => {
    const el = root.current;
    const v = video.current;
    if (!el || !v) return;
    const lenis = lenisStore.get();
    if (open) {
      lenis?.stop();
      gsap.set(el, { visibility: "visible" });
      gsap.fromTo(
        el,
        { clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease: "bouncInOut" },
      );
      gsap.fromTo(v, { scale: 1.2 }, { scale: 1, duration: 1.4, ease: "bounc" });
      v.currentTime = 0;
      v.play().catch(() => {});
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && film.close();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    if (el.style.visibility === "visible") {
      gsap.to(el, {
        clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
        duration: 0.8,
        ease: "bouncInOut",
        onComplete: () => {
          v.pause();
          gsap.set(el, { visibility: "hidden" });
          lenis?.start();
        },
      });
    }
  }, [open]);

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="BOUNC brand film"
      className="fixed inset-0 z-[160] grid place-items-center bg-ink"
      style={{ visibility: "hidden" }}
      data-lenis-prevent
    >
      <video
        ref={video}
        src={VIDEO.film.mp4}
        poster={VIDEO.film.poster}
        className="h-full w-full object-contain"
        playsInline
        muted
        controls
        preload="none"
        onEnded={() => film.close()}
      />
      <button
        type="button"
        onClick={() => film.close()}
        className="absolute right-4 top-4 flex items-center gap-3 rounded-full bg-bone py-2 pl-5 pr-2 text-sm font-medium text-ink transition hover:bg-orange hover:text-bone sm:right-8 sm:top-8"
      >
        Close
        <span className="grid size-9 place-items-center rounded-full bg-ink/10">
          <Close className="size-4" />
        </span>
      </button>
    </div>
  );
}
