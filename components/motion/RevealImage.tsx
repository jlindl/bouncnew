"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onRevealed } from "@/lib/stores";
import { cn } from "@/lib/cn";

type Props = {
  src: StaticImageData | string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  preload?: boolean;
  /** up: wipe from bottom · slant: diagonal wipe at the logo angle · none: parallax only */
  reveal?: "up" | "slant" | "none";
  parallax?: number;
  trigger?: "scroll" | "reveal";
  delay?: number;
  cursor?: string;
  overlay?: boolean;
};

const CLIP = {
  up: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  slant: ["polygon(0% 0%, 0% 0%, -32% 100%, -32% 100%)", "polygon(0% 0%, 132% 0%, 100% 100%, -32% 100%)"],
};

export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload,
  reveal = "up",
  parallax = 7,
  trigger = "scroll",
  delay = 0,
  cursor,
  overlay,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const img = inner.current;
      if (!el || !img || prefersReducedMotion()) return;

      if (parallax) {
        gsap.fromTo(
          img,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }

      if (reveal !== "none") {
        const [from, to] = CLIP[reveal];
        const tl = gsap.timeline({
          paused: true,
          delay,
          defaults: { duration: 1.5, ease: "bouncInOut" },
        });
        tl.fromTo(el, { clipPath: from }, { clipPath: to }).fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.9, ease: "bounc" }, 0.1);

        gsap.set(el, { clipPath: from });
        if (trigger === "reveal") return onRevealed(() => tl.play());
        ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => tl.play() });
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("media-mask bg-ink-3", className)} data-cursor={cursor} data-clip={reveal}>
      <div ref={inner} className="media-inner">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder={typeof src === "string" ? "empty" : "blur"}
          className={cn("object-cover", imgClassName)}
        />
      </div>
      {overlay && <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />}
    </div>
  );
}
