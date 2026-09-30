"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lenisStore } from "@/lib/stores";
import { IMG, type ImgKey } from "@/lib/media";
import { NAV, SITE, bookingUrl } from "@/lib/site";
import { cn } from "@/lib/cn";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Button } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Instagram, TikTok } from "@/components/ui/Icons";

const PREVIEW: Record<string, ImgKey> = {
  "/facilities": "courtRally",
  "/book": "stillHoodie",
  "/cafe": "latteArt",
  "/community": "stillHighfive",
  "/journal": "racketBall",
  "/contact": "stillTube",
};

export function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [hovered, setHovered] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-m-panel]"), { yPercent: 110, skewX: -17 });
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "bouncInOut" } })
        .set(root.current, { visibility: "visible" })
        .to(q("[data-m-panel]"), { yPercent: 0, duration: 0.8, stagger: 0.04 })
        .from(q("[data-m-link]"), { yPercent: 115, duration: 1, stagger: 0.05, ease: "bounc" }, 0.35)
        .from(q("[data-m-fade]"), { opacity: 0, y: 20, duration: 0.8, stagger: 0.05, ease: "bounc" }, 0.55)
        .from(q("[data-m-preview]"), { clipPath: "inset(100% 0 0 0)", duration: 1.1 }, 0.4);
    },
    { scope: root },
  );

  const wasOpen = useRef(false);
  useEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    const lenis = lenisStore.get();
    if (open) {
      lenis?.stop();
      tl.current?.timeScale(1).play();
    } else {
      lenis?.start();
      tl.current?.timeScale(1.6).reverse();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={root}
      id="site-menu"
      className={cn("fixed inset-0 z-[80] overflow-hidden", !open && "pointer-events-none")}
      style={{ visibility: "hidden" }}
      aria-hidden={!open}
      inert={!open}
      data-lenis-prevent
    >
      <div className="absolute inset-y-0 -left-[20%] -right-[20%] flex" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="relative h-full flex-1">
            <div data-m-panel className={cn("absolute -inset-x-px -inset-y-4", i === 5 ? "bg-orange" : "bg-ink-2")} />
          </div>
        ))}
      </div>

      <div className="wrap relative flex h-full flex-col pb-8 pt-[calc(var(--header-h)+2rem)]">
        <div className="grid flex-1 grid-cols-1 gap-10 md:grid-cols-12">
          <nav aria-label="Menu" className="flex flex-col justify-center md:col-span-7">
            <ul className="space-y-1">
              {NAV.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <div data-m-link>
                    <TransitionLink
                      href={item.href}
                      onClick={onClose}
                      onPointerEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      className="group flex items-baseline gap-4 py-1"
                    >
                      <span className="eyebrow w-8 text-mute">0{i + 1}</span>
                      <span
                        className={cn(
                          "display text-[clamp(2.9rem,9vw,6.5rem)] transition-[color,transform] duration-500 ease-[var(--ease-expo)] group-hover:translate-x-3 group-hover:text-orange",
                          hovered === i ? "text-bone" : "text-bone/80",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="hidden text-sm text-mute opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:inline">
                        {item.blurb}
                      </span>
                    </TransitionLink>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative hidden md:col-span-5 md:block">
            <div data-m-preview className="absolute inset-y-6 right-0 w-full overflow-hidden rounded-[1.25rem]">
              {NAV.map((item, i) => {
                const img = IMG[PREVIEW[item.href] ?? "courtRally"];
                return (
                  <div
                    key={item.href}
                    className="absolute inset-0 transition-[clip-path,transform] duration-[900ms] ease-[var(--ease-expo)]"
                    style={{
                      clipPath: hovered === i ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                      transform: hovered === i ? "scale(1)" : "scale(1.15)",
                      zIndex: hovered === i ? 2 : 1,
                    }}
                  >
                    <Image src={img.src} alt="" fill sizes="40vw" className="object-cover" placeholder="blur" />
                  </div>
                );
              })}
              <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink/70 to-transparent" />
              <p className="eyebrow absolute bottom-5 left-5 z-[4] text-bone">{NAV[hovered]?.blurb}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <div data-m-fade>
            <Button href={bookingUrl("menu")} external icon="external" size="lg">
              Book a court
            </Button>
          </div>
          <div data-m-fade className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-bone/80">
            <OpenStatus />
            <a href={`mailto:${SITE.email}`} className="u-sweep">
              {SITE.email}
            </a>
            <div className="flex gap-2">
              <a href={SITE.socials.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-10 place-items-center rounded-full ring-1 ring-line-2 transition hover:bg-bone hover:text-ink">
                <Instagram className="size-4" />
              </a>
              <a href={SITE.socials.tiktok} target="_blank" rel="noopener" aria-label="TikTok" className="grid size-10 place-items-center rounded-full ring-1 ring-line-2 transition hover:bg-bone hover:text-ink">
                <TikTok className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
