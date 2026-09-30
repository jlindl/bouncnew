"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { IMG, type ImgKey } from "@/lib/media";
import { cn } from "@/lib/cn";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ArrowUpRight } from "@/components/ui/Icons";

export type HoverItem = {
  title: string;
  meta?: string;
  detail?: ReactNode;
  price?: string;
  img: ImgKey;
  href?: string;
  external?: boolean;
};

/**
 * Big typographic rows. On desktop a preview image trails the cursor and
 * swaps (with a clip wipe) as you move between rows.
 */
export function HoverList({ items, cursorLabel = "View" }: { items: HoverItem[]; cursorLabel?: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const float = floatRef.current;
    if (!list || !float || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    gsap.set(float, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
    const xTo = gsap.quickTo(float, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(float, "y", { duration: 0.7, ease: "power3" });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      const r = list.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      gsap.to(float, { rotate: gsap.utils.clamp(-8, 8, dx * 0.6), duration: 0.6, overwrite: "auto" });
    };
    const enter = () => gsap.to(float, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "bounc" });
    const leave = () => {
      gsap.to(float, { autoAlpha: 0, scale: 0.6, duration: 0.5, ease: "power3.out" });
      setActive(null);
    };
    list.addEventListener("pointermove", move);
    list.addEventListener("pointerenter", enter);
    list.addEventListener("pointerleave", leave);
    return () => {
      list.removeEventListener("pointermove", move);
      list.removeEventListener("pointerenter", enter);
      list.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={floatRef} aria-hidden className="pointer-events-none absolute left-0 top-0 z-20 hidden aspect-[4/5] w-[min(22vw,20rem)] overflow-hidden rounded-[1rem] opacity-0 lg:block">
        {items.map((it, i) => (
          <div
            key={it.title}
            className="absolute inset-0 transition-[clip-path] duration-700 ease-[var(--ease-expo)]"
            style={{ clipPath: active === i ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)", zIndex: active === i ? 2 : 1 }}
          >
            <Image src={IMG[it.img].src} alt="" fill sizes="20rem" className="object-cover" placeholder="blur" />
          </div>
        ))}
      </div>
      <ul ref={listRef} className="border-t border-line">

      {items.map((it, i) => {
        const content = (
          <>
            <span className="eyebrow w-10 shrink-0 pt-2 text-mute md:pt-4">0{i + 1}</span>
            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  "display block text-[clamp(2.2rem,5.4vw,5.5rem)] transition-[color,transform] duration-500 ease-[var(--ease-expo)]",
                  active === i ? "translate-x-3 text-orange" : "text-bone",
                )}
              >
                {it.title}
              </span>
              {it.detail && <span className="mt-3 block max-w-xl text-bone/65">{it.detail}</span>}
            </span>
            <span className="hidden shrink-0 flex-col items-end gap-2 pt-3 text-right md:flex">
              {it.price && <span className="display text-[2.2rem] leading-none text-bone">{it.price}</span>}
              {it.meta && <span className="eyebrow text-bone/60">{it.meta}</span>}
            </span>
            {it.href && (
              <span
                className={cn(
                  "mt-2 grid size-12 shrink-0 place-items-center rounded-full ring-1 ring-inset transition-all duration-500 md:mt-3",
                  active === i ? "bg-orange text-bone ring-orange" : "text-bone ring-line-2",
                )}
              >
                <ArrowUpRight className="size-4" />
              </span>
            )}
          </>
        );
        const rowCls = "group flex items-start gap-4 py-7 md:gap-8 md:py-9";
        const handlers = { onPointerEnter: () => setActive(i), onFocus: () => setActive(i) };
        return (
          <li key={it.title} className="border-b border-line">
            {it.href ? (
              it.external || it.href.startsWith("http") ? (
                <a href={it.href} target="_blank" rel="noopener" className={rowCls} data-cursor={cursorLabel} {...handlers}>
                  {content}
                </a>
              ) : (
                <TransitionLink href={it.href} className={rowCls} data-cursor={cursorLabel} {...handlers}>
                  {content}
                </TransitionLink>
              )
            ) : (
              <div className={rowCls} {...handlers}>
                {content}
              </div>
            )}
            {(it.price || it.meta) && (
              <div className="-mt-4 flex gap-4 pb-6 pl-14 md:hidden">
                {it.price && <span className="display text-2xl text-bone">{it.price}</span>}
                {it.meta && <span className="eyebrow self-center text-bone/60">{it.meta}</span>}
              </div>
            )}
          </li>
        );
      })}
      </ul>
    </div>
  );
}
