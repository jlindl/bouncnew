"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { lenisStore, onRevealed } from "@/lib/stores";
import { NAV, bookingUrl } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Mark, Wordmark } from "@/components/ui/Logo";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Button } from "@/components/ui/Button";
import { Menu } from "@/components/layout/Menu";
import { BagButton } from "@/components/shop/BagButton";

export function Header() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const hiddenRef = useRef(false);

  // Intro: drop in once the page is revealed
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.set(ref.current, { yPercent: -120 });
      return onRevealed(() => gsap.to(ref.current, { yPercent: 0, duration: 1.2, ease: "bounc", delay: 0.35 }));
    },
    { scope: ref },
  );

  // Hide on scroll down, reveal on scroll up; frosted once scrolled
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lenis = lenisStore.get();
    let raf = 0;

    const onScroll = (y: number, dir: number) => {
      el.dataset.scrolled = y > 24 ? "true" : "false";
      if (el.dataset.menu === "open") return;
      const shouldHide = y > 160 && dir === 1;
      if (shouldHide !== hiddenRef.current && (dir === 1 || dir === -1)) {
        hiddenRef.current = shouldHide;
        gsap.to(el, { yPercent: shouldHide ? -120 : 0, duration: 0.8, ease: "bounc", overwrite: "auto" });
      }
    };
    const handler = ({ scroll, direction }: { scroll: number; direction: number }) => onScroll(scroll, direction);

    const attach = () => {
      lenis = lenisStore.get();
      if (!lenis) {
        raf = requestAnimationFrame(attach);
        return;
      }
      lenis.on("scroll", handler);
    };
    attach();
    return () => {
      cancelAnimationFrame(raf);
      lenis?.off("scroll", handler);
    };
  }, []);

  // New page: header always comes back
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    hiddenRef.current = false;
    if (ref.current) ref.current.dataset.scrolled = "false";
    gsap.to(ref.current, { yPercent: 0, duration: 1, ease: "bounc", delay: 0.4, overwrite: "auto" });
  }, [pathname]);

  useEffect(() => {
    if (ref.current) ref.current.dataset.menu = open ? "open" : "closed";
    if (open) gsap.to(ref.current, { yPercent: 0, duration: 0.6, overwrite: "auto" });
  }, [open]);

  return (
    <>
      <header
        ref={ref}
        data-scrolled="false"
        className="group/header fixed inset-x-0 top-0 z-[100] will-change-transform"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-500 group-data-[scrolled=true]/header:border-line group-data-[scrolled=true]/header:bg-ink/60 group-data-[scrolled=true]/header:backdrop-blur-xl group-data-[menu=open]/header:!border-transparent group-data-[menu=open]/header:!bg-transparent group-data-[menu=open]/header:!backdrop-blur-none"
        />
        <div className="wrap relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <TransitionLink href="/" aria-label="BOUNC — home" className="logo-hover group flex items-center gap-3" onClick={() => setOpenAt(null)}>
            <span className="w-9 text-orange">
              <Mark />
            </span>
            <span className="w-[5.6rem] text-bone">
              <Wordmark />
            </span>
          </TransitionLink>

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors",
                    active ? "text-bone" : "text-bone/70 hover:text-bone",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="roll">
                    <span>{item.label}</span>
                    <span aria-hidden>{item.label}</span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute bottom-0.5 left-1/2 h-[3px] w-3 -translate-x-1/2 -skew-x-[17deg] bg-orange transition-transform duration-500 ease-[var(--ease-expo)]",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </TransitionLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button href={bookingUrl("header")} external icon="external" wrapperClassName="hidden sm:inline-block">
              Book a court
            </Button>
            <Button href={bookingUrl("header_mobile")} external icon="none" className="!h-11 !pl-5 !pr-5 !text-[0.85rem]" wrapperClassName="inline-block sm:hidden" magnetic={false}>
              Book
            </Button>
            <BagButton />
            <button
              type="button"
              onClick={() => setOpenAt(open ? null : pathname)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group relative grid size-11 place-items-center rounded-full ring-1 ring-inset ring-line-2 transition-colors hover:bg-bone hover:text-ink xl:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-expo)]",
                    open && "translate-y-[5.25px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-expo)]",
                    open && "-translate-y-[5.25px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <Menu open={open} onClose={() => setOpenAt(null)} />
    </>
  );
}
