"use client";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Throws an orange "ball" from an element into the header bag, then bumps the bag.
 * Resolves when it lands.
 */
export function flyToBag(from: Element | null): Promise<void> {
  return new Promise((resolve) => {
    const target = document.querySelector("[data-bag-target]");
    if (!from || !target || prefersReducedMotion()) {
      resolve();
      return;
    }
    const a = from.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const dot = document.createElement("div");
    dot.setAttribute("aria-hidden", "true");
    Object.assign(dot.style, {
      position: "fixed",
      left: "0px",
      top: "0px",
      width: "22px",
      height: "22px",
      borderRadius: "999px",
      background: "radial-gradient(circle at 35% 30%, #f6ff9c, #d6ec38 45%, #8ea214)",
      boxShadow: "0 10px 30px rgb(0 0 0 / 0.5)",
      zIndex: "400",
      pointerEvents: "none",
    });
    document.body.appendChild(dot);

    const sx = a.left + a.width / 2 - 11;
    const sy = a.top + a.height / 2 - 11;
    const ex = b.left + b.width / 2 - 11;
    const ey = b.top + b.height / 2 - 11;

    gsap.set(dot, { x: sx, y: sy, scale: 0.4 });
    const tl = gsap.timeline({
      onComplete: () => {
        dot.remove();
        gsap.fromTo(target, { scale: 1 }, { scale: 1.25, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" });
        resolve();
      },
    });
    tl.to(dot, { scale: 1, duration: 0.25, ease: "back.out(3)" }, 0)
      .to(dot, { x: ex, duration: 0.8, ease: "power1.inOut" }, 0)
      .to(dot, { y: Math.min(sy, ey) - 120, duration: 0.38, ease: "power2.out" }, 0)
      .to(dot, { y: ey, duration: 0.42, ease: "power2.in" }, 0.38)
      .to(dot, { scale: 0.5, duration: 0.2 }, 0.62);
  });
}
