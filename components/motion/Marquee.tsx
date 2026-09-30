"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { lenisStore } from "@/lib/stores";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** base drift in % of one copy per second */
  speed?: number;
  reverse?: boolean;
  /** skew the band with scroll velocity */
  skew?: boolean;
};

/** Infinite marquee that follows scroll direction and accelerates with scroll velocity. */
export function Marquee({ children, className, speed = 2.2, reverse, skew = true }: Props) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    const wrap = gsap.utils.wrap(-50, 0);
    let x = reverse ? -25 : 0;
    let dir = reverse ? 1 : -1;
    let skewNow = 0;
    const setX = gsap.quickSetter(el, "xPercent");
    const setSkew = gsap.quickSetter(el, "skewX", "deg");

    const tick = (_t: number, delta: number) => {
      const lenis = lenisStore.get();
      const v = lenis?.velocity ?? 0;
      if (lenis && lenis.direction !== 0 && Math.abs(v) > 0.5) dir = (reverse ? -1 : 1) * -lenis.direction;
      const boost = Math.min(Math.abs(v) * 0.06, 3);
      x = wrap(x + dir * (speed / 2 + boost) * (delta / 1000) * 1);
      setX(x);
      if (skew) {
        const target = gsap.utils.clamp(-10, 10, -v * 0.35);
        skewNow += (target - skewNow) * 0.12;
        setSkew(skewNow);
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [reverse, speed, skew]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={track} className="marquee">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
