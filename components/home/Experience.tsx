"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { IMG, type ImgKey } from "@/lib/media";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ArrowUpRight } from "@/components/ui/Icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";

const ITEMS: { title: string; text: string; img: ImgKey; href: string; tag: string }[] = [
  {
    title: "Super-panoramic courts",
    text: "International-standard courts designed for year-round play, performance and enjoyment — whatever the weather.",
    img: "courtRally",
    href: "/facilities",
    tag: "4 indoor courts",
  },
  {
    title: "CUBE café",
    text: "Our in-house café serving great coffee, fresh food and post-match rituals worth staying for. Designed as a social hub, not an add-on.",
    img: "waffleCaramel",
    href: "/cafe",
    tag: "Coffee & desserts",
  },
  {
    title: "Social & lounge spaces",
    text: "Comfortable, considered spaces to watch games, catch up, work remotely or unwind after a session.",
    img: "cheers",
    href: "/cafe",
    tag: "Watch · Work · Unwind",
  },
  {
    title: "Events, leagues & community sessions",
    text: "From casual socials to competitive leagues, coaching and events — BOUNC is built around shared moments, not just bookings.",
    img: "stillHighfive",
    href: "/community",
    tag: "Americanos & leagues",
  },
  {
    title: "Warm-up & movement area",
    text: "Dedicated areas to prep your body, recover properly and move well — before and after play.",
    img: "warmupSide",
    href: "/journal/padel-warm-up",
    tag: "Prep · Recover",
  },
];

export function Experience() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const t = track.current!;
        const distance = () => t.scrollWidth - window.innerWidth;
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-exp-img]", root.current).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -10 },
            {
              xPercent: 10,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-exp-card]", root.current).forEach((card) => {
          gsap.from(card, {
            yPercent: 12,
            rotate: 2,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 100%", end: "left 55%", scrub: true },
          });
        });

        gsap.to("[data-exp-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-ink-2" aria-labelledby="exp-title">
      <div
        ref={track}
        className="flex h-auto snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] py-20 [scrollbar-width:none] md:h-[100svh] md:snap-none md:items-center md:gap-8 md:overflow-visible md:py-0"
      >
        {/* intro panel */}
        <div className="flex w-[85vw] shrink-0 snap-start flex-col justify-center md:w-[40vw] md:pr-10">
          <SectionLabel index="03" className="mb-8">
            The BOUNC experience
          </SectionLabel>
          <SplitReveal as="h2" type="words" className="display text-[clamp(3rem,6.4vw,7.5rem)] text-bone" id="exp-title">
            Inspired by real people, whoever you are, <span className="text-orange">however you play.</span>
          </SplitReveal>
          <p className="mt-8 max-w-sm text-bone/70">
            Five spaces, one club. Courts built for performance, and everything around them built for people.
          </p>
          <p className="eyebrow mt-10 hidden items-center gap-3 text-bone/50 md:flex">
            Keep scrolling
            <span className="block h-px w-16 bg-line-2" />
          </p>
        </div>

        {ITEMS.map((item, i) => (
          <TransitionLink
            key={item.title}
            href={item.href}
            data-exp-card
            data-cursor="Explore"
            className="group relative flex w-[78vw] shrink-0 snap-start flex-col md:h-[76svh] md:w-[min(32vw,30rem)]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-ink-3 md:aspect-auto md:flex-1">
              <div data-exp-img className="absolute inset-y-0 -inset-x-[12%]">
                <Image
                  src={IMG[item.img].src}
                  alt={IMG[item.img].alt}
                  fill
                  sizes="(min-width: 768px) 36vw, 80vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-[1.08]"
                  placeholder="blur"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
              <div className="absolute inset-0 bg-orange opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-60" />
              <span className="display absolute left-5 top-4 text-[clamp(3rem,5vw,4.5rem)] leading-none text-bone/90">0{i + 1}</span>
              <span className="eyebrow absolute right-5 top-5 rounded-full bg-ink/50 px-3 py-1.5 text-bone backdrop-blur">{item.tag}</span>
              <span className="absolute bottom-5 right-5 grid size-12 place-items-center rounded-full bg-bone text-ink transition-all duration-700 ease-[var(--ease-expo)] group-hover:rotate-45 group-hover:bg-orange group-hover:text-bone">
                <ArrowUpRight className="size-5 -rotate-45 transition-transform duration-700 group-hover:rotate-0" />
              </span>
            </div>
            <div className="pt-6">
              <h3 className="font-display text-[clamp(1.4rem,1.9vw,1.9rem)] font-bold leading-tight tracking-[-0.02em] text-bone [font-stretch:105%]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[0.98rem] leading-relaxed text-bone/65">{item.text}</p>
            </div>
          </TransitionLink>
        ))}
        <div className="w-[10vw] shrink-0 md:w-[8vw]" aria-hidden />
      </div>

      <div className="pointer-events-none absolute inset-x-[var(--gutter)] bottom-8 hidden h-px bg-line md:block" aria-hidden>
        <div data-exp-progress className="h-full origin-left scale-x-0 bg-orange" />
      </div>
    </section>
  );
}
