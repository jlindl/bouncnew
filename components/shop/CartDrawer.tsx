"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { lenisStore } from "@/lib/stores";
import { cart, totals, useCart } from "@/lib/cart";
import { SHIPPING, artFor, formatPrice } from "@/lib/shop";
import { cn } from "@/lib/cn";
import { ProductArt } from "@/components/shop/ProductArt";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Button } from "@/components/ui/Button";
import { Close } from "@/components/ui/Icons";
import { Mark } from "@/components/ui/Logo";

export function variantText(sel: Record<string, string>) {
  return Object.values(sel).join(" · ");
}

export function QtyStepper({ id, qty, small }: { id: string; qty: number; small?: boolean }) {
  const s = small ? "size-8" : "size-10";
  return (
    <div className="flex items-center rounded-full ring-1 ring-inset ring-line-2">
      <button type="button" onClick={() => cart.setQty(id, qty - 1)} aria-label="Decrease quantity" className={cn("grid place-items-center text-bone/70 hover:text-bone", s)}>
        −
      </button>
      <span className="w-5 text-center text-sm tabular-nums text-bone">{qty}</span>
      <button type="button" onClick={() => cart.setQty(id, qty + 1)} aria-label="Increase quantity" className={cn("grid place-items-center text-bone/70 hover:text-bone", s)}>
        +
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { lines, open } = useCart();
  const { count, subtotal, lines: resolved } = totals(lines);
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const first = useRef(true);

  const remaining = Math.max(0, SHIPPING.freeOver - subtotal);
  const pct = Math.min(1, subtotal / SHIPPING.freeOver);

  // Close when the route changes
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      cart.close();
    }
  }, [pathname]);

  useEffect(() => {
    const r = root.current;
    if (!r) return;
    if (first.current) {
      first.current = false;
      gsap.set(panel.current, { xPercent: 105 });
      gsap.set(shade.current, { opacity: 0 });
      if (!open) return;
    }
    const lenis = lenisStore.get();
    if (open) {
      lenis?.stop();
      gsap.set(r, { visibility: "visible" });
      gsap.to(shade.current, { opacity: 1, duration: 0.5 });
      gsap.to(panel.current, { xPercent: 0, duration: 0.9, ease: "bounc" });
      gsap.fromTo(r.querySelectorAll("[data-drawer-in]"), { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.05, delay: 0.15, ease: "bounc" });
      closeBtn.current?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.close();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    gsap.to(shade.current, { opacity: 0, duration: 0.4 });
    gsap.to(panel.current, {
      xPercent: 105,
      duration: 0.6,
      ease: "power3.in",
      onComplete: () => {
        gsap.set(r, { visibility: "hidden" });
      },
    });
    lenis?.start();
  }, [open]);

  return (
    <div ref={root} className="fixed inset-0 z-[170]" style={{ visibility: "hidden" }} aria-hidden={!open} inert={!open}>
      <div ref={shade} className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={() => cart.close()} />
      <aside
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className="absolute inset-y-0 right-0 flex w-[min(100vw,30rem)] flex-col border-l border-line bg-ink-2 shadow-[-40px_0_80px_-20px_rgb(0_0_0/0.7)]"
      >
        <header data-drawer-in className="flex items-center justify-between border-b border-line px-6 py-5">
          <p className="display text-[2.2rem] leading-none text-bone">
            Your bag <span className="text-orange">({count})</span>
          </p>
          <button
            ref={closeBtn}
            type="button"
            onClick={() => cart.close()}
            className="grid size-11 place-items-center rounded-full ring-1 ring-inset ring-line-2 transition hover:bg-bone hover:text-ink"
            aria-label="Close bag"
          >
            <Close className="size-4" />
          </button>
        </header>

        {count > 0 && (
          <div data-drawer-in className="border-b border-line px-6 py-4">
            <p className="text-sm text-bone/75">
              {remaining > 0 ? (
                <>
                  You’re <strong className="font-medium text-bone">{formatPrice(remaining)}</strong> away from free UK delivery
                </>
              ) : (
                <>
                  <strong className="font-medium text-orange-soft">Free UK delivery</strong> unlocked
                </>
              )}
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
              <motion.div className="h-full rounded-full bg-orange" initial={false} animate={{ width: `${pct * 100}%` }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
          {count === 0 ? (
            <div data-drawer-in className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="w-20 text-orange/80">
                <Mark />
              </div>
              <p className="display mt-8 text-[2.4rem] text-bone">Your bag is empty.</p>
              <p className="mt-3 max-w-xs text-bone/60">Rackets, balls and club kit — designed for the BOUNC courts.</p>
              <div className="mt-8">
                <Button href="/shop" onClick={() => cart.close()}>
                  Shop the kit
                </Button>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              <AnimatePresence initial={false}>
                {resolved.map((l) => (
                  <motion.li
                    key={l.id}
                    layout
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60, height: 0, paddingTop: 0, paddingBottom: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-4 overflow-hidden py-5"
                  >
                    <TransitionLink href={`/shop/${l.slug}`} onClick={() => cart.close()} className="relative block h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_28%,#3a3a3a,#161616_75%)]">
                      <span className="absolute inset-1.5">
                        <ProductArt art={artFor(l.product, l.selection)} />
                      </span>
                    </TransitionLink>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-medium text-bone">{l.product.name}</p>
                          <p className="mt-0.5 truncate text-sm text-bone/55">{variantText(l.selection) || l.product.tagline}</p>
                        </div>
                        <p className="shrink-0 font-medium text-bone">{formatPrice(l.total)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <QtyStepper id={l.id} qty={l.qty} small />
                        <button type="button" onClick={() => cart.remove(l.id)} className="u-sweep text-sm text-bone/55 hover:text-bone">
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {count > 0 && (
          <footer data-drawer-in className="border-t border-line px-6 pb-6 pt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-bone/70">Subtotal</span>
              <span className="display text-[2.2rem] leading-none text-bone">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-sm text-bone/45">Delivery and discounts calculated at checkout.</p>
            <TransitionLink
              href="/checkout"
              onClick={() => cart.close()}
              className="group mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-orange font-medium text-bone transition-colors duration-500 hover:bg-bone hover:text-ink"
            >
              <span className="roll">
                <span>Checkout — {formatPrice(subtotal)}</span>
                <span aria-hidden>Checkout — {formatPrice(subtotal)}</span>
              </span>
            </TransitionLink>
            <button type="button" onClick={() => cart.close()} className="mt-3 w-full py-2 text-sm text-bone/60 transition hover:text-bone">
              Continue shopping
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
