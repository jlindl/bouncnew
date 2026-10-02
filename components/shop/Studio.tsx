"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import type { Art } from "@/lib/shop";
import { cn } from "@/lib/cn";
import { ProductArt } from "@/components/shop/ProductArt";

type Props = {
  art: Art;
  className?: string;
  tilt?: boolean;
  /** Strength of the 3D tilt in degrees */
  depth?: number;
  title?: string;
  children?: ReactNode;
};

/** Product "photo studio": soft key light, orange bounce, floor shadow, 3D tilt and a glare that follows the pointer. */
export function Studio({ art, className, tilt = true, depth = 10, title, children }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const st = stage.current;
    if (!el || !st || !tilt || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rx = gsap.quickTo(st, "rotationX", { duration: 0.8, ease: "power3" });
    const ry = gsap.quickTo(st, "rotationY", { duration: 0.8, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * depth * 2);
      rx(-(py - 0.5) * depth * 2);
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [tilt, depth]);

  return (
    <div
      ref={root}
      className={cn(
        "group/studio relative isolate overflow-hidden rounded-[1.25rem] bg-[radial-gradient(120%_80%_at_50%_18%,#262626_0%,#121212_45%,#0a0a0a_100%)] ring-1 ring-inset ring-line [perspective:1100px]",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/50 to-transparent" />
      <div aria-hidden className="absolute left-1/2 top-[55%] aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(190_64_23/0.22),transparent)] transition-opacity duration-700 group-hover/studio:opacity-100 md:opacity-70" />
      <div
        aria-hidden
        className="absolute bottom-[7%] left-1/2 h-[5%] w-[50%] -translate-x-1/2 rounded-[50%] bg-black/80 blur-[14px] transition-transform duration-700 ease-[var(--ease-expo)] group-hover/studio:scale-x-75 group-hover/studio:opacity-70"
      />
      <div ref={stage} className="absolute inset-0 [transform-style:preserve-3d]">
        <div className="absolute inset-[7%] transition-transform duration-700 ease-[var(--ease-expo)] [transform:translateZ(36px)] group-hover/studio:-translate-y-[2%]">
          <ProductArt art={art} title={title} className="drop-shadow-[0_30px_30px_rgb(0_0_0/0.5)]" />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,30%),rgb(255_255_255/0.1),transparent_45%)] group-hover/studio:opacity-100"
      />
      {children}
    </div>
  );
}
