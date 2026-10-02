"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { lenisStore, markRevealed, resetRevealed } from "@/lib/stores";
import { ROUTE_LABELS } from "@/lib/site";
import { Mark } from "@/components/ui/Logo";

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx | null>(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

function labelFor(path: string) {
  if (ROUTE_LABELS[path]) return ROUTE_LABELS[path];
  if (path.startsWith("/journal/")) return "Journal";
  if (path.startsWith("/shop/")) return "Shop";
  return "BOUNC";
}

const BARS = 6;

/**
 * Slanted-bar curtain (the angle of the BOUNC mark). Orange sweeps up,
 * ink follows with the destination name, the route swaps underneath,
 * then both lift away and the new page's intro animations fire.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const prevPath = useRef(pathname);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  const q = useCallback((sel: string) => rootRef.current?.querySelectorAll<HTMLElement>(sel) ?? [], []);

  const uncover = useCallback(() => {
    if (safety.current) clearTimeout(safety.current);
    const lenis = lenisStore.get();
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    lenis?.start();

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const tl = gsap.timeline({
        onComplete: () => {
          busy.current = false;
          gsap.set(rootRef.current, { visibility: "hidden" });
        },
      });
      tl.to(labelRef.current, { yPercent: -120, duration: 0.5, ease: "power3.in" })
        .to(q("[data-ink]"), { yPercent: -110, duration: 0.85, stagger: 0.05, ease: "bouncInOut" }, 0.15)
        .to(q("[data-orange]"), { yPercent: -110, duration: 0.85, stagger: 0.05, ease: "bouncInOut" }, 0.27)
        .to(q("[data-t-mark]"), { autoAlpha: 0, duration: 0.3 }, 0.1)
        .add(() => markRevealed(), 0.5);
    });
  }, [q]);

  const navigate = useCallback(
    (href: string) => {
      if (busy.current) return;
      const target = href.split(/[?#]/)[0] || "/";
      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }
      busy.current = true;
      resetRevealed();
      lenisStore.get()?.stop();
      if (labelRef.current) labelRef.current.textContent = labelFor(target);

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href, { scroll: false });
          // Guard: if the route never changes (same page, error), lift anyway
          safety.current = setTimeout(() => {
            if (busy.current) uncover();
          }, 3500);
        },
      });
      tl.set(rootRef.current, { visibility: "visible" })
        .fromTo(q("[data-orange]"), { yPercent: 110 }, { yPercent: 0, duration: 0.75, stagger: 0.05, ease: "bouncInOut" })
        .fromTo(q("[data-ink]"), { yPercent: 110 }, { yPercent: 0, duration: 0.75, stagger: 0.05, ease: "bouncInOut" }, 0.12)
        .fromTo(q("[data-t-mark]"), { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, 0.55)
        .fromTo(labelRef.current, { yPercent: 120 }, { yPercent: 0, duration: 0.7 }, 0.6);
    },
    [q, router, uncover],
  );

  useEffect(() => {
    gsap.set(q("[data-orange], [data-ink]"), { yPercent: 110, skewX: -17 });
    gsap.set(labelRef.current, { yPercent: 120 });
  }, [q]);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    if (busy.current) {
      uncover();
    } else {
      // Browser back/forward: no curtain, just resync
      requestAnimationFrame(() => ScrollTrigger.refresh());
      markRevealed();
    }
  }, [pathname, uncover]);

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={rootRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[150] overflow-hidden"
        style={{ visibility: "hidden" }}
      >
        <div className="absolute inset-y-0 -left-[20%] -right-[20%] flex">
          {Array.from({ length: BARS }).map((_, i) => (
            <div key={`o${i}`} className="relative h-full flex-1">
              <div data-orange className="absolute -inset-x-px -inset-y-4 bg-orange" />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 -left-[20%] -right-[20%] flex">
          {Array.from({ length: BARS }).map((_, i) => (
            <div key={`i${i}`} className="relative h-full flex-1">
              <div data-ink className="absolute -inset-x-px -inset-y-4 bg-ink" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-6">
            <div data-t-mark className="w-14 text-orange opacity-0">
              <Mark />
            </div>
            <div className="overflow-hidden px-4 pb-2">
              <span ref={labelRef} className="display block text-[clamp(3.5rem,11vw,10rem)] text-bone">
                BOUNC
              </span>
            </div>
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
