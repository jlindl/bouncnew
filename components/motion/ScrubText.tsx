"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import type { Media } from "@/lib/media";
import { cn } from "@/lib/cn";

export type ScrubPart = string | { img: Media } | { em: string };

/**
 * Paragraph whose words light up as you scroll through it, with
 * inline image "pills" that grow into the line when reached.
 */
export function ScrubText({ parts, className }: { parts: ScrubPart[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(ref);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 42%", scrub: 0.6 },
      });
      q("[data-w]").forEach((el, i) => {
        if (el.dataset.w === "img") {
          tl.fromTo(el, { width: 0, opacity: 0 }, { width: "1.9em", opacity: 1, ease: "power2.out", duration: 1.2 }, i * 0.35);
        } else {
          tl.fromTo(el, { opacity: 0.14 }, { opacity: 1, ease: "none", duration: 0.6 }, i * 0.35);
        }
      });
    },
    { scope: ref },
  );

  const nodes: ReactNode[] = [];
  parts.forEach((part, pi) => {
    if (typeof part === "string" || "em" in part) {
      const text = typeof part === "string" ? part : part.em;
      text
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w, wi) => {
          nodes.push(
            <span key={`${pi}-${wi}`} data-w className={cn("inline-block", typeof part !== "string" && "text-orange")}>
              {w}
            </span>,
            " ",
          );
        });
    } else {
      nodes.push(
        <span
          key={`img-${pi}`}
          data-w="img"
          aria-hidden
          className="relative mx-[0.08em] inline-block h-[0.78em] w-[1.9em] -skew-x-[17deg] overflow-hidden rounded-[0.18em] align-[-0.04em]"
        >
          <Image src={part.img.src} alt="" fill sizes="160px" className="scale-125 object-cover" />
        </span>,
        " ",
      );
    }
  });

  return (
    <p ref={ref} className={className}>
      {nodes}
    </p>
  );
}
