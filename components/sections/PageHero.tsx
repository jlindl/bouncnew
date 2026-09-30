"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import type { Media } from "@/lib/media";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  media?: Media;
  aside?: ReactNode;
};

/** Inner-page opener: giant title on the curtain lift, then an inset image that opens to full-bleed as you scroll. */
export function PageHero({ eyebrow, title, lede, actions, media, aside }: Props) {
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = mediaRef.current;
      if (!el || prefersReducedMotion()) return;
      const img = el.querySelector("[data-hero-img]");
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 7% 0% 7% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 10%", scrub: true },
        },
      );
      gsap.fromTo(img, { yPercent: -8, scale: 1.15 }, { yPercent: 8, scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: mediaRef },
  );

  return (
    <section className="relative">
      <div className="wrap pb-14 pt-[calc(var(--header-h)+clamp(3rem,9vw,8rem))] md:pb-20">
        <FadeIn trigger="reveal" y={20}>
          <p className="eyebrow flex items-center gap-3 text-bone/60">
            <span aria-hidden className="inline-block h-[2px] w-6 -skew-x-[17deg] bg-orange" />
            {eyebrow}
          </p>
        </FadeIn>
        <SplitReveal as="h1" type="chars" trigger="reveal" className="display mt-8 max-w-[16ch] text-[clamp(3.6rem,11vw,12.5rem)] text-bone">
          {title}
        </SplitReveal>
        {(lede || actions || aside) && (
          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
            {lede && (
              <FadeIn trigger="reveal" delay={0.35} className="md:col-span-6">
                <div className="lede max-w-xl">{lede}</div>
              </FadeIn>
            )}
            {(actions || aside) && (
              <FadeIn trigger="reveal" delay={0.5} className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
                {actions}
                {aside}
              </FadeIn>
            )}
          </div>
        )}
      </div>
      {media && (
        <div ref={mediaRef} className="relative h-[72svh] overflow-hidden md:h-[88svh]">
          <div data-hero-img className="absolute -inset-y-[10%] inset-x-0">
            <Image src={media.src} alt={media.alt} fill preload sizes="100vw" className="object-cover" placeholder="blur" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/60" />
        </div>
      )}
    </section>
  );
}
