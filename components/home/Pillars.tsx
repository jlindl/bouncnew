"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { IMG, type ImgKey } from "@/lib/media";

type Pillar = { word: string; img: ImgKey; img2: ImgKey; text: string };

const PILLARS: Pillar[] = [
  {
    word: "Movement",
    img: "stillFootwork",
    img2: "stillSmash",
    text: "Fast, social and easy to pick up. A compact court, long rallies and walls that keep the ball alive — you’ll be hooked by the second set.",
  },
  {
    word: "Community",
    img: "stillHighfive",
    img2: "doublesHandshake",
    text: "Americanos, leagues, socials and intro sessions that turn strangers into a regular four. Everyone’s welcome, whatever your level.",
  },
  {
    word: "Experience",
    img: "courtRally",
    img2: "stillOverhead",
    text: "Super-panoramic glass, 360° perimeter lighting, 4K AI cameras, premium turf, showers and changing rooms. Every detail considered.",
  },
  {
    word: "Culture",
    img: "stillTube",
    img2: "latteArt",
    text: "European-inspired, Lancashire-built. Good coffee, CUBE desserts and a lounge worth lingering in — the post-match is part of the game.",
  },
];

const FULL = "polygon(22% 0%, 100% 0%, 78% 100%, 0% 100%)";
const FROM_BOTTOM = "polygon(0% 100%, 78% 100%, 78% 100%, 0% 100%)";
const TO_TOP = "polygon(22% 0%, 100% 0%, 100% 0%, 22% 0%)";

function Word({ text, outline }: { text: string; outline?: boolean }) {
  return (
    <span
      aria-hidden={outline}
      className={`display pointer-events-none block whitespace-nowrap text-center text-[clamp(4.2rem,17.5vw,20rem)] ${outline ? "text-stroke text-bone" : "text-bone"}`}
    >
      {[...text].map((c, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.05em] pr-[0.02em] align-top">
          <span data-c className="inline-block">
            {c}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Pillars() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const reduced = prefersReducedMotion();
      const layers = q("[data-pillar]");
      const counter = q("[data-counter]")[0];

      if (reduced) {
        gsap.set(layers.slice(1), { autoAlpha: 0 });
        return;
      }

      gsap.set(q("[data-sweep]"), { xPercent: -340, skewX: -17, opacity: 1 });
      layers.forEach((layer) => {
        gsap.set(layer.querySelectorAll("[data-c]"), { yPercent: 115 });
        gsap.set(layer.querySelectorAll("[data-panel]"), { clipPath: FROM_BOTTOM });
        gsap.set(layer.querySelectorAll("[data-desc]"), { opacity: 0, y: 30 });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            const idx = Math.min(PILLARS.length - 1, Math.floor(self.progress * PILLARS.length * 0.999));
            if (counter) counter.textContent = String(idx + 1).padStart(2, "0");
          },
        },
      });

      layers.forEach((layer, i) => {
        const t = i;
        const solid = layer.querySelectorAll("[data-word='solid'] [data-c]");
        const outline = layer.querySelectorAll("[data-word='outline'] [data-c]");
        const panels = layer.querySelectorAll("[data-panel]");
        const imgs = layer.querySelectorAll("[data-img]");
        const desc = layer.querySelectorAll("[data-desc]");
        const sweep = q("[data-sweep]")[0];

        if (i > 0) {
          tl.fromTo(sweep, { xPercent: -340 }, { xPercent: 340, duration: 0.5, ease: "power2.inOut", immediateRender: false }, t - 0.25);
        }
        tl.to(panels[0], { clipPath: FULL, duration: 0.4 }, t)
          .to(panels[1], { clipPath: FULL, duration: 0.4 }, t + 0.08)
          .fromTo(imgs, { scale: 1.4 }, { scale: 1, duration: 1, ease: "none" }, t)
          .to(solid, { yPercent: 0, duration: 0.35, stagger: 0.02, ease: "power3.out" }, t + 0.05)
          .to(outline, { yPercent: 0, duration: 0.35, stagger: 0.02, ease: "power3.out" }, t + 0.05)
          .to(desc, { opacity: 1, y: 0, duration: 0.3 }, t + 0.18)
          .to(q(`[data-bar="${i}"]`), { scaleX: 1, duration: 1, ease: "none" }, t);

        if (i < layers.length - 1) {
          tl.to(solid, { yPercent: -115, duration: 0.3, stagger: 0.015, ease: "power3.in" }, t + 0.72)
            .to(outline, { yPercent: -115, duration: 0.3, stagger: 0.015, ease: "power3.in" }, t + 0.72)
            .to(panels, { clipPath: TO_TOP, duration: 0.3, stagger: 0.05 }, t + 0.72)
            .to(desc, { opacity: 0, y: -30, duration: 0.2 }, t + 0.75);
        }
      });
      tl.to({}, { duration: 0.35 });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[440svh]" aria-label="What BOUNC stands for">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Accessible, static version of the content */}
        <ul className="sr-only">
          {PILLARS.map((p) => (
            <li key={p.word}>
              {p.word}: {p.text}
            </li>
          ))}
        </ul>

        {PILLARS.map((p, i) => (
          <div key={p.word} data-pillar={i} className="absolute inset-0" aria-hidden>
            {/* solid word (behind) */}
            <div data-word="solid" className="absolute inset-x-0 top-1/2 z-0 -translate-y-[58%]">
              <Word text={p.word} />
            </div>
            {/* main panel */}
            <div
              data-panel
              className="absolute left-1/2 top-1/2 z-10 h-[58svh] w-[min(64vw,34rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            >
              <div data-img className="absolute inset-0">
                <Image src={IMG[p.img].src} alt="" fill sizes="(min-width: 768px) 34rem, 64vw" className="object-cover" placeholder="blur" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
            {/* secondary panel */}
            <div
              data-panel
              className="absolute right-[6vw] top-[14svh] z-10 hidden h-[26svh] w-[min(18vw,15rem)] overflow-hidden md:block"
            >
              <div data-img className="absolute inset-0">
                <Image src={IMG[p.img2].src} alt="" fill sizes="15rem" className="object-cover" placeholder="blur" />
              </div>
            </div>
            {/* outline word (in front) */}
            <div data-word="outline" className="absolute inset-x-0 top-1/2 z-20 -translate-y-[58%]">
              <Word text={p.word} outline />
            </div>
            <p data-desc className="absolute bottom-[9svh] left-[var(--gutter)] z-30 max-w-[22rem] text-[1.02rem] leading-relaxed text-bone/85 md:bottom-[12svh]">
              {p.text}
            </p>
          </div>
        ))}

        {/* sweeping orange bar between cards */}
        <div aria-hidden data-sweep className="pointer-events-none absolute inset-y-[-10%] left-1/2 z-40 w-[28vw] -translate-x-1/2 bg-orange opacity-0" />

        {/* chrome */}
        <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--header-h)+1rem)] z-30 flex items-start justify-between px-[var(--gutter)]">
          <p className="eyebrow text-bone/60">
            <span className="text-orange-soft">(02)</span> What we stand for
          </p>
          <p className="display text-[clamp(2rem,4vw,3.5rem)] leading-none text-bone">
            <span data-counter>01</span>
            <span className="text-bone/30">/04</span>
          </p>
        </div>
        <div className="absolute bottom-6 right-[var(--gutter)] z-30 flex w-[min(40vw,18rem)] gap-2" aria-hidden>
          {PILLARS.map((p, i) => (
            <span key={p.word} className="h-[3px] flex-1 overflow-hidden bg-line-2">
              <span data-bar={i} className="block h-full w-full origin-left scale-x-0 bg-orange" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
