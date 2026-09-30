"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = { to: number; pad?: number; suffix?: string; prefix?: string; duration?: number; className?: string };

export function Counter({ to, pad = 2, suffix = "", prefix = "", duration = 2.2, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => `${prefix}${String(Math.round(n)).padStart(pad, "0")}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const obj = { v: 0 };
      el.textContent = format(0);
      gsap.to(obj, {
        v: to,
        duration,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = format(obj.v);
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
