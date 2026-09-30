"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onRevealed } from "@/lib/stores";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** lines: masked line rise · words: word rise · chars: slanted char rise (brand angle) */
  type?: "lines" | "words" | "chars";
  /** scroll: when it enters the viewport · reveal: when the page curtain lifts */
  trigger?: "scroll" | "reveal";
  delay?: number;
  stagger?: number;
  start?: string;
  id?: string;
};

export function SplitReveal({
  as: Tag = "div",
  children,
  className,
  type = "lines",
  trigger = "scroll",
  delay = 0,
  stagger,
  start = "top 88%",
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { visibility: "visible" });
        return;
      }

      let cancelled = false;
      let unsubscribe: (() => void) | undefined;

      const build = contextSafe!(() => {
        if (cancelled) return;
        const split = SplitText.create(el, {
          type: type === "chars" ? "lines,words,chars" : type === "words" ? "lines,words" : "lines",
          mask: "lines",
          linesClass: "split-line",
        });
        gsap.set(el, { visibility: "visible" });
        const targets = type === "chars" ? split.chars : type === "words" ? split.words : split.lines;

        const tween = gsap.from(targets, {
          yPercent: type === "lines" ? 105 : 118,
          skewX: type === "chars" ? -14 : 0,
          rotate: type === "lines" ? 1.5 : 0,
          transformOrigin: "0% 100%",
          duration: type === "chars" ? 1.15 : 1.3,
          ease: "bounc",
          stagger: stagger ?? (type === "chars" ? 0.024 : type === "words" ? 0.04 : 0.1),
          delay,
          paused: true,
          onComplete: () => split.revert(),
        });

        if (trigger === "reveal") {
          unsubscribe = onRevealed(() => tween.play());
        } else {
          ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => tween.play() });
        }
      });

      document.fonts.ready.then(build);
      return () => {
        cancelled = true;
        unsubscribe?.();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} data-split="" id={id}>
      {children}
    </Tag>
  );
}
