"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { IMG, type ImgKey } from "@/lib/media";
import { Button } from "@/components/ui/Button";
import { SplitReveal } from "@/components/motion/SplitReveal";

const FLOATS: { img: ImgKey; cls: string; speed: number; rot: number }[] = [
  { img: "waffleBerries", cls: "left-[4%] top-[8%] w-[22vw] max-w-[20rem] aspect-[3/4]", speed: 0.6, rot: -6 },
  { img: "shakeChoc", cls: "right-[6%] top-[4%] w-[16vw] max-w-[15rem] aspect-[2/3]", speed: 1.1, rot: 5 },
  { img: "latteArt", cls: "left-[18%] bottom-[6%] w-[18vw] max-w-[17rem] aspect-[4/3]", speed: 1.4, rot: 4 },
  { img: "cookies", cls: "right-[14%] bottom-[10%] w-[14vw] max-w-[13rem] aspect-[3/4]", speed: 0.8, rot: -4 },
];

/** Orange break in the rhythm: CUBE, the in-house café and dessert space. */
export function CubeTeaser() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      q("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed);
        gsap.fromTo(
          el,
          { y: 160 * speed, rotate: Number(el.dataset.rot) * 1.8 },
          {
            y: -160 * speed,
            rotate: Number(el.dataset.rot),
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      gsap.fromTo(
        q("[data-cube-word]"),
        { xPercent: 12 },
        { xPercent: -12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden bg-orange py-[clamp(7rem,16vw,14rem)] text-ink" aria-labelledby="cube-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <span data-cube-word className="display whitespace-nowrap text-[42vw] leading-none text-ink/[0.09]">
          CUBE
        </span>
      </div>

      {FLOATS.map((f) => (
        <div
          key={f.img}
          data-speed={f.speed}
          data-rot={f.rot}
          className={`absolute hidden overflow-hidden rounded-[1rem] shadow-[0_40px_80px_-20px_rgb(0_0_0/0.55)] md:block ${f.cls}`}
          aria-hidden
        >
          <Image src={IMG[f.img].src} alt="" fill sizes="22vw" className="object-cover" placeholder="blur" />
        </div>
      ))}

      <div className="wrap relative z-10 flex flex-col items-center text-center">
        <p className="eyebrow flex items-center gap-3 text-ink/70">
          <span>(05)</span>
          <span aria-hidden className="inline-block h-[2px] w-6 -skew-x-[17deg] bg-ink" />
          <span>In-house café & dessert space</span>
        </p>
        <SplitReveal as="h2" type="chars" id="cube-title" className="display mt-8 max-w-[12ch] text-[clamp(3.4rem,8.5vw,9.5rem)] text-ink">
          Stay for the third set.
        </SplitReveal>
        <p className="mt-8 max-w-[34rem] text-[1.1rem] leading-relaxed text-ink/80">
          CUBE serves great coffee, waffles, thickshakes, sundaes and cookie dough — with vegan and gluten-free desserts too. A social hub, not an
          add-on.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/cafe" variant="dark" size="lg">
            Discover CUBE
          </Button>
        </div>

        {/* mobile images */}
        <div className="mt-14 grid w-full grid-cols-2 gap-3 md:hidden">
          {FLOATS.slice(0, 2).map((f) => (
            <div key={f.img} className="relative aspect-[3/4] overflow-hidden rounded-[1rem]">
              <Image src={IMG[f.img].src} alt={IMG[f.img].alt} fill sizes="50vw" className="object-cover" placeholder="blur" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
