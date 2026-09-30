"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { lenisStore } from "@/lib/stores";

declare global {
  interface Window {
    __bouncBooted?: boolean;
  }
}

export function SmoothScroll() {
  useEffect(() => {
    window.__bouncBooted = true;
    const reduced = prefersReducedMotion();

    const lenis = new Lenis({
      lerp: reduced ? 1 : 0.09,
      smoothWheel: !reduced,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      autoRaf: false,
      anchors: { offset: -96 },
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenisStore.set(lenis);

    // Keep triggers in sync when late content (fonts, images) shifts layout
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisStore.set(null);
    };
  }, []);

  return null;
}
