"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onRevealed } from "@/lib/stores";
import { PRODUCTS } from "@/lib/shop";
import { ProductArt } from "@/components/shop/ProductArt";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

function Ball({ size, className }: { size: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden>
      <defs>
        <radialGradient id={`hb-${size}`} cx="0.36" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#f6ff9c" />
          <stop offset="0.45" stopColor="#d6ec38" />
          <stop offset="1" stopColor="#8ea214" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#hb-${size})`} />
      <path d="M15 17 C41 36 41 64 15 83 M85 17 C59 36 59 64 85 83" stroke="#fbfde8" strokeWidth="3.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const HERO = PRODUCTS.find((p) => p.slug === "precision-control")!;

/** Floating hero racket: bobs on a loop, tilts towards the pointer, drifts on scroll. */
export function ShopHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const racket = q("[data-racket]")[0];
      const floatEl = q("[data-float]")[0];
      if (prefersReducedMotion()) {
        gsap.set(q("[data-hero-hide]"), { opacity: 1 });
        return;
      }

      const intro = gsap.timeline({ paused: true });
      intro
        .set(q("[data-hero-hide]"), { opacity: 1 })
        .fromTo(racket, { yPercent: 40, rotate: -40, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 1.8, ease: "bounc" }, 0.15)
        .fromTo(q("[data-ball]"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, stagger: 0.12, ease: "back.out(2)" }, 0.6)
        .fromTo(q("[data-shop-word]"), { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.6, ease: "bounc" }, 0);
      const unsub = onRevealed(() => intro.play());

      // idle bob
      gsap.to(floatEl, { y: -16, rotate: 2, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      q("[data-ball]").forEach((b, i) =>
        gsap.to(b, { y: i % 2 ? 18 : -22, x: i % 2 ? -10 : 8, duration: 2.2 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 }),
      );

      // pointer parallax
      const mm = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      let off: (() => void) | undefined;
      if (mm) {
        const rx = gsap.quickTo(racket, "rotationY", { duration: 1, ease: "power3" });
        const ry = gsap.quickTo(racket, "rotationX", { duration: 1, ease: "power3" });
        const balls = q("[data-ball]").map((b, i) => ({
          x: gsap.quickTo(b, "xPercent", { duration: 1.2, ease: "power3" }),
          y: gsap.quickTo(b, "yPercent", { duration: 1.2, ease: "power3" }),
          d: (i + 1) * 18,
        }));
        const move = (e: PointerEvent) => {
          const px = e.clientX / window.innerWidth - 0.5;
          const py = e.clientY / window.innerHeight - 0.5;
          rx(px * 24);
          ry(-py * 16);
          balls.forEach((b) => {
            b.x(px * b.d);
            b.y(py * b.d);
          });
        };
        window.addEventListener("pointermove", move);
        off = () => window.removeEventListener("pointermove", move);
      }

      // scroll drift
      gsap.to(q("[data-stage]"), {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-shop-word]"), {
        xPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      return () => {
        unsub();
        off?.();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden" aria-labelledby="shop-title">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[18%] flex justify-center opacity-[0.06]">
        <span data-shop-word data-hero-hide className="display whitespace-nowrap text-[38vw] leading-none text-stroke">
          Pro shop
        </span>
      </div>

      <div className="wrap relative grid min-h-[100svh] items-center gap-10 pb-16 pt-[calc(var(--header-h)+2rem)] lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-6">
          <FadeIn trigger="reveal" y={16}>
            <p className="eyebrow flex items-center gap-3 text-bone/60">
              <span aria-hidden className="inline-block h-[2px] w-6 -skew-x-[17deg] bg-orange" />
              The Pro Shop
            </p>
          </FadeIn>
          <SplitReveal as="h1" type="chars" trigger="reveal" id="shop-title" className="display mt-8 text-[clamp(3.6rem,9.5vw,10.5rem)] text-bone">
            Kit that <span className="text-orange">plays back.</span>
          </SplitReveal>
          <FadeIn trigger="reveal" delay={0.35} className="mt-10 max-w-lg">
            <p className="lede">
              Rackets, balls and club kit — designed in Buckshaw Village and tested on the BOUNC courts. Order online or collect free at the club.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="#catalogue" size="lg">
                Shop the kit
              </Button>
              <Button href={`/shop/${HERO.slug}`} variant="ghost" size="lg">
                Meet Precision Control
              </Button>
            </div>
          </FadeIn>
        </div>

        <div data-stage className="relative h-[58svh] lg:col-span-6 lg:h-[80svh]">
          <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(190_64_23/0.38),transparent)] blur-2xl" />
          <div data-float className="absolute inset-0 [perspective:1200px]">
            <div data-racket data-hero-hide className="absolute inset-0 [transform-style:preserve-3d]">
              <ProductArt art={HERO.art} title="Precision Control racket" className="drop-shadow-[0_50px_50px_rgb(0_0_0/0.6)]" />
            </div>
          </div>
          <div data-ball data-hero-hide className="absolute left-[8%] top-[14%]">
            <Ball size={74} />
          </div>
          <div data-ball data-hero-hide className="absolute bottom-[12%] right-[6%]">
            <Ball size={110} />
          </div>
          <div data-ball data-hero-hide className="absolute bottom-[28%] left-[2%] blur-[2px]">
            <Ball size={44} />
          </div>
        </div>
      </div>
    </section>
  );
}
