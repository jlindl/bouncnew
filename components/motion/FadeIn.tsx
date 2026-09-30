"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onRevealed } from "@/lib/stores";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate direct children in sequence instead of the wrapper */
  stagger?: number;
  trigger?: "scroll" | "reveal";
  start?: string;
};

export function FadeIn({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  y = 36,
  stagger,
  trigger = "scroll",
  start = "top 90%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : el;
      if (stagger) gsap.set(el, { opacity: 1 });

      if (prefersReducedMotion()) {
        gsap.set([el, targets].flat(), { opacity: 1 });
        return;
      }

      const tween = gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "bounc",
          delay,
          stagger: stagger ?? 0,
          paused: trigger === "reveal",
          scrollTrigger: trigger === "scroll" ? { trigger: el, start, once: true } : undefined,
        },
      );
      if (trigger === "reveal") return onRevealed(() => tween.play());
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} data-fade="">
      {children}
    </Tag>
  );
}
