"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { lenisStore } from "@/lib/stores";
import { bookingUrl } from "@/lib/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Mark } from "@/components/ui/Logo";

/** Floating "Book a court" pill: appears after the hero, steps aside when the footer CTA is on screen. */
export function StickyBook() {
  const ref = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  // The shop has its own add-to-bag CTAs; keep the court CTA out of the way there
  const hidden = pathname.startsWith("/shop") || pathname.startsWith("/checkout");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { yPercent: 160, autoAlpha: 0 });
    let shown = false;
    let footerVisible = false;

    const update = (y: number) => {
      const want = y > window.innerHeight * 0.9 && !footerVisible;
      if (want === shown) return;
      shown = want;
      gsap.to(el, { yPercent: want ? 0 : 160, autoAlpha: want ? 1 : 0, duration: 0.9, ease: "bounc", overwrite: "auto" });
    };

    const io = new IntersectionObserver(([entry]) => {
      footerVisible = entry.isIntersecting;
      update(window.scrollY);
    });
    const observeFooter = () => {
      const f = document.getElementById("footer");
      if (f) io.observe(f);
    };
    observeFooter();

    let lenis = lenisStore.get();
    let raf = 0;
    const handler = ({ scroll }: { scroll: number }) => update(scroll);
    const attach = () => {
      lenis = lenisStore.get();
      if (!lenis) {
        raf = requestAnimationFrame(attach);
        return;
      }
      lenis.on("scroll", handler);
    };
    attach();
    const onNative = () => update(window.scrollY);
    window.addEventListener("scroll", onNative, { passive: true });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      lenis?.off("scroll", handler);
      window.removeEventListener("scroll", onNative);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={bookingUrl("sticky")}
      target="_blank"
      rel="noopener"
      className="group fixed bottom-4 right-4 z-[70] flex data-[hidden=true]:!hidden items-center gap-3 rounded-full bg-orange py-2 pl-2 pr-5 text-bone shadow-[0_20px_60px_-10px_rgb(190_64_23/0.6)] transition-colors duration-500 hover:bg-bone hover:text-ink sm:bottom-6 sm:right-6"
      style={{ visibility: "hidden" }}
      data-hidden={hidden}
    >
      <span className="grid size-10 place-items-center rounded-full bg-ink/25 transition-colors duration-500 group-hover:bg-orange">
        <span className="w-5 text-bone">
          <Mark />
        </span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[0.95rem] font-semibold">Book a court</span>
        <span className="hidden text-[0.72rem] opacity-80 sm:block">Live availability on Playtomic</span>
      </span>
      <ArrowUpRight className="ml-1 size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
