"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onRevealed } from "@/lib/stores";
import { IMG, type ImgKey } from "@/lib/media";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";

const FACES: { img: ImgKey; t: string }[] = [
  { img: "waffleBerries", t: "rotateY(0deg)" },
  { img: "shakeChoc", t: "rotateY(90deg)" },
  { img: "latteArt", t: "rotateY(180deg)" },
  { img: "cookies", t: "rotateY(-90deg)" },
  { img: "pancakes", t: "rotateX(90deg)" },
  { img: "sundae", t: "rotateX(-90deg)" },
];

/** A literal cube for CUBE: six dessert faces spinning in 3D between the letters. */
export function CubeHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const cube = q("[data-cube]")[0];
      const tilt = q("[data-tilt]")[0];
      const reduced = prefersReducedMotion();

      gsap.set(cube, { rotateX: -18, rotateY: 30 });
      if (reduced) {
        gsap.set(q("[data-hero-hide]"), { opacity: 1 });
        return;
      }

      const spin = gsap.to(cube, { rotateY: "+=360", duration: 22, ease: "none", repeat: -1, paused: true });

      const intro = gsap.timeline({ paused: true });
      intro
        .set(q("[data-hero-hide]"), { opacity: 1 })
        .fromTo(tilt, { scale: 0, rotateZ: -40 }, { scale: 1, rotateZ: 0, duration: 1.8, ease: "elastic.out(1, 0.6)" }, 0.1)
        .fromTo(cube, { rotateY: -300 }, { rotateY: 30, duration: 2.2, ease: "bounc", onComplete: () => spin.play() }, 0.1)
        .fromTo(q("[data-cu]"), { xPercent: -60, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.4, ease: "bounc" }, 0.2)
        .fromTo(q("[data-be]"), { xPercent: 60, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.4, ease: "bounc" }, 0.2)
        .fromTo(q("[data-sub]"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: "bounc" }, 0.7);
      const unsub = onRevealed(() => intro.play());

      // Scroll: tilt the cube and let the letters drift apart
      gsap.to(tilt, {
        rotateX: 40,
        scale: 1.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-cu]"), { xPercent: -25, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q("[data-be]"), { xPercent: 25, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });

      return () => {
        unsub();
        spin.kill();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-[calc(var(--header-h)+2rem)]" aria-labelledby="cube-h1">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-0 aspect-square w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(190_64_23/0.35),transparent)] blur-2xl" />

      <h1 id="cube-h1" className="sr-only">
        CUBE — café and dessert space at BOUNC
      </h1>

      <div className="relative flex items-center justify-center gap-[2vw]" aria-hidden>
        <span data-cu data-hero-hide className="display text-[clamp(5rem,20vw,22rem)] text-bone">
          CU
        </span>
        <div className="[perspective:1400px]">
          <div data-tilt data-hero-hide className="[transform-style:preserve-3d]" style={{ ["--s" as string]: "clamp(8rem, 19vw, 20rem)" }}>
            <div data-cube className="relative size-[var(--s)] [transform-style:preserve-3d]">
              {FACES.map((f) => (
                <div
                  key={f.img}
                  className="absolute inset-0 overflow-hidden rounded-[0.6rem] ring-1 ring-orange/40 [backface-visibility:hidden]"
                  style={{ transform: `${f.t} translateZ(calc(var(--s) / 2))` }}
                >
                  <Image src={IMG[f.img].src} alt="" fill sizes="20rem" className="object-cover" placeholder="blur" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-ink/40" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <span data-be data-hero-hide className="display text-[clamp(5rem,20vw,22rem)] text-orange">
          BE
        </span>
      </div>

      <div className="wrap relative mt-12 flex flex-col items-center gap-6 text-center md:mt-16">
        <p data-sub data-hero-hide className="eyebrow text-bone/70">
          In-house café & dessert space · Opened January 2026
        </p>
        <p data-sub data-hero-hide className="lede max-w-xl">
          Great coffee, waffles, thickshakes and post-match rituals worth staying for. Open to players and visitors alike.
        </p>
        <div data-sub data-hero-hide className="mt-2 flex flex-wrap justify-center gap-3">
          <Button href={SITE.socials.cube} external icon="external" size="lg">
            @cubedesserts
          </Button>
          <Button href="#menu" variant="ghost" size="lg">
            What’s on the menu
          </Button>
        </div>
      </div>
    </section>
  );
}
