"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { lenisStore, markRevealed } from "@/lib/stores";
import { Mark } from "@/components/ui/Logo";

const WORDS = ["Movement", "Community", "Experience", "Culture"];
const BARS = 6;

/**
 * First-visit intro, cut like the brand film: the four title cards flash,
 * the mark assembles bar by bar, the counter runs, then the screen
 * splits into slanted bars and lifts. Skipped for the rest of the session.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const html = document.documentElement;
      const skip = html.classList.contains("preloaded") || prefersReducedMotion();

      if (skip) {
        el.style.display = "none";
        document.fonts.ready.then(() => requestAnimationFrame(() => markRevealed()));
        return;
      }

      try {
        sessionStorage.setItem("bounc:intro", "1");
      } catch {}

      const lenis = lenisStore.get();
      lenis?.stop();
      const q = gsap.utils.selector(el);
      const count = { v: 0 };
      const counter = q("[data-count]")[0] as HTMLElement;

      gsap.set(q("[data-panel]"), { skewX: -17 });
      gsap.set(q("[data-bar]"), { yPercent: 140, opacity: 0 });
      gsap.set(q("[data-word]"), { yPercent: 110 });

      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(count, {
        v: 100,
        duration: 2.4,
        ease: "power2.inOut",
        onUpdate: () => {
          counter.textContent = String(Math.round(count.v)).padStart(3, "0");
        },
      })
        .fromTo(q("[data-progress]"), { scaleX: 0 }, { scaleX: 1, duration: 2.4, ease: "power2.inOut" }, 0);

      // title cards
      WORDS.forEach((_, i) => {
        const w = q(`[data-word="${i}"]`);
        tl.to(w, { yPercent: 0, duration: 0.32, ease: "power3.out" }, 0.1 + i * 0.36).to(
          w,
          { yPercent: -110, duration: 0.28, ease: "power3.in" },
          0.1 + i * 0.36 + 0.3,
        );
      });

      // mark assembles
      tl.to(q("[data-bar]"), { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "bounc" }, 1.55)
        .to(q("[data-mark]"), { scale: 1.08, duration: 0.25, ease: "power2.out" }, 2.45)
        .to(q("[data-mark]"), { scale: 0.001, rotate: -8, opacity: 0, duration: 0.6, ease: "power4.in" }, 2.7)
        .to(q("[data-chrome]"), { opacity: 0, duration: 0.3 }, 2.7)
        .to(q("[data-panel]"), { yPercent: -110, duration: 1.05, stagger: 0.055, ease: "bouncInOut" }, 2.9)
        .add(() => {
          lenis?.start();
          markRevealed();
        }, 3.15)
        .set(el, { display: "none" });

      const skipIntro = () => tl.progress() < 0.85 && tl.seek(2.7);
      el.addEventListener("click", skipIntro);
      return () => el.removeEventListener("click", skipIntro);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="preloader fixed inset-0 z-[200] overflow-hidden" aria-hidden>
      <div className="absolute inset-y-0 -left-[20%] -right-[20%] flex">
        {Array.from({ length: BARS }).map((_, i) => (
          <div key={i} className="relative h-full flex-1">
            <div data-panel className="absolute -inset-x-px -inset-y-4 bg-ink" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid place-items-center">
          <div data-mark className="w-[clamp(5rem,11vw,9rem)] text-orange [&_[data-bar]]:will-change-transform">
            <Mark />
          </div>
          <div data-chrome className="absolute top-[calc(100%+2.5rem)] h-[1.3em] w-[80vw] max-w-[40rem] overflow-hidden text-center text-[clamp(1.2rem,2.2vw,1.9rem)]">
            {WORDS.map((w, i) => (
              <span key={w} data-word={i} className="display-wide absolute inset-x-0 block tracking-[0.12em] text-bone">
                {w}
              </span>
            ))}
            <span className="invisible display-wide block tracking-[0.12em]">Experience</span>
          </div>
        </div>
      </div>

      <div data-chrome className="absolute inset-x-0 bottom-0 flex items-end justify-between px-[var(--gutter)] pb-6">
        <span className="eyebrow text-mute">Buckshaw Village · Padel club</span>
        <span data-count className="display text-[clamp(3rem,7vw,6rem)] leading-none text-bone">
          000
        </span>
      </div>
      <div data-chrome className="absolute inset-x-0 bottom-0 h-[2px] bg-line">
        <div data-progress className="h-full origin-left bg-orange" />
      </div>
    </div>
  );
}
