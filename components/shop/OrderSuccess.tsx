"use client";

import { useMemo, useRef, useSyncExternalStore } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onRevealed } from "@/lib/stores";
import type { Order } from "@/lib/cart";
import { PRODUCTS, artFor, formatPrice } from "@/lib/shop";
import { bookingUrl } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ProductArt } from "@/components/shop/ProductArt";
import { Button } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Logo";

const KEY = "bounc:last-order";
const readRaw = () => {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
};

const SHARDS = Array.from({ length: 16 }, (_, i) => ({ angle: (i / 16) * Math.PI * 2 + (i % 2) * 0.2, dist: 140 + (i % 4) * 55, w: 8 + (i % 3) * 4 }));

export function OrderSuccess() {
  const raw = useSyncExternalStore(
    () => () => {},
    readRaw,
    () => undefined,
  );
  const order = useMemo<Order | null>(() => (raw ? (JSON.parse(raw) as Order) : null), [raw]);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!order || prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-shard]"), { x: 0, y: 0, scale: 0, opacity: 1, skewX: -17 });
      gsap.set(q("[data-burst-mark]"), { scale: 0, rotate: -20 });
      const tl = gsap.timeline({ paused: true });
      tl.to(q("[data-burst-mark]"), { scale: 1, rotate: 0, duration: 1.1, ease: "elastic.out(1, 0.55)" }, 0.1);
      q("[data-shard]").forEach((el, i) => {
        const s = SHARDS[i];
        tl.to(el, { x: Math.cos(s.angle) * s.dist, y: Math.sin(s.angle) * s.dist, scale: 1, duration: 1.2, ease: "expo.out" }, 0.15).to(el, { opacity: 0, duration: 0.6 }, 0.9);
      });
      tl.fromTo(q("[data-fade-up]"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: "bounc" }, 0.35);
      return onRevealed(() => tl.play());
    },
    { scope: root, dependencies: [order] },
  );

  if (raw === undefined) return <div className="min-h-[60svh]" aria-busy="true" />;

  if (!order) {
    return (
      <div className="wrap flex min-h-[60svh] flex-col items-start justify-center">
        <h1 className="display text-[clamp(3.4rem,8vw,7rem)] text-bone">
          No recent <span className="text-orange">order.</span>
        </h1>
        <p className="lede mt-6 max-w-md">Looks like you landed here directly. Head to the shop to pick up some kit.</p>
        <div className="mt-10">
          <Button href="/shop" size="lg">
            Visit the shop
          </Button>
        </div>
      </div>
    );
  }

  const collecting = order.shipping.id === "collect";
  const email = order.shipping.id === "email";
  const track = [
    { t: "Order placed", d: new Date(order.placedAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) },
    { t: email ? "Gift card sent" : "Being packed", d: email ? "Check your inbox" : "Usually within 24 hours" },
    { t: email ? "Ready to spend" : collecting ? "Ready to collect" : "On its way", d: email ? "On court, at CUBE or in the shop" : collecting ? "Reception, BOUNC" : order.shipping.label },
  ];

  return (
    <div ref={root} className="wrap">
      <div className="relative flex flex-col items-center text-center">
        <div className="relative grid size-40 place-items-center">
          {SHARDS.map((s, i) => (
            <span key={i} data-shard aria-hidden className="absolute left-1/2 top-1/2 h-8 -translate-x-1/2 -translate-y-1/2 bg-orange opacity-0" style={{ width: s.w }} />
          ))}
          <div data-burst-mark className="w-28 text-orange">
            <Mark />
          </div>
        </div>
        <p data-fade-up className="eyebrow mt-10 text-orange-soft">
          Order {order.number}
        </p>
        <h1 data-fade-up className="display mt-5 text-[clamp(3.6rem,10vw,10rem)] text-bone">
          You’re <span className="text-orange">all set.</span>
        </h1>
        <p data-fade-up className="lede mt-6 max-w-xl">
          Thanks{order.name ? `, ${order.name}` : ""}. A confirmation would be on its way to <strong className="font-medium text-bone">{order.email}</strong>
          {collecting ? " — we’ll let you know when your kit is ready at the club." : "."}
        </p>
        <p data-fade-up className="mt-4 rounded-full bg-orange/12 px-4 py-2 text-sm text-bone/75 ring-1 ring-inset ring-orange/30">
          Demo order — nothing was charged and nothing will be shipped.
        </p>
      </div>

      <div data-fade-up className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-12">
        <ol className="rounded-[1.5rem] bg-ink-3 p-7 ring-1 ring-inset ring-line md:p-8 lg:col-span-5">
          {track.map((s, i) => (
            <li key={s.t} className="relative flex gap-4 pb-8 last:pb-0">
              {i < track.length - 1 && <span aria-hidden className={cn("absolute left-[0.95rem] top-9 h-[calc(100%-2.5rem)] w-px", i === 0 ? "bg-orange" : "bg-line-2")} />}
              <span className={cn("grid size-8 shrink-0 place-items-center rounded-full font-mono text-xs", i === 0 ? "bg-orange text-bone" : "text-bone/50 ring-1 ring-inset ring-line-2")}>
                {i === 0 ? "✓" : `0${i + 1}`}
              </span>
              <span>
                <span className={cn("block font-medium", i === 0 ? "text-bone" : "text-bone/60")}>{s.t}</span>
                <span className="text-sm text-bone/45">{s.d}</span>
              </span>
            </li>
          ))}
          {order.address && <p className="mt-8 border-t border-line pt-6 text-sm text-bone/60">Delivering to {order.address}</p>}
        </ol>

        <div className="rounded-[1.5rem] bg-ink-3 p-7 ring-1 ring-inset ring-line md:p-8 lg:col-span-7">
          <ul className="space-y-4">
            {order.lines.map((l, i) => {
              const p = PRODUCTS.find((x) => x.slug === l.slug);
              return (
                <li key={i} className="flex items-center gap-4">
                  <span className="relative h-20 w-16 shrink-0 rounded-xl bg-[radial-gradient(circle_at_50%_28%,#3a3a3a,#161616_75%)]">
                    {p && (
                      <span className="absolute inset-1">
                        <ProductArt art={artFor(p, l.selection)} />
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-bone">
                      {l.name} <span className="text-bone/45">× {l.qty}</span>
                    </span>
                    <span className="block truncate text-sm text-bone/50">{l.variant}</span>
                  </span>
                  <span className="text-bone">{formatPrice(l.total)}</span>
                </li>
              );
            })}
          </ul>
          <dl className="mt-6 space-y-2.5 border-t border-line pt-6 text-bone/70">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatPrice(order.subtotal)}</dd>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-orange-soft">
                <dt>Discount</dt>
                <dd>−{formatPrice(order.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt>{order.shipping.label}</dt>
              <dd>{order.shipping.price === 0 ? "Free" : formatPrice(order.shipping.price)}</dd>
            </div>
          </dl>
          <div className="mt-5 flex items-baseline justify-between border-t border-line pt-5">
            <span className="text-bone">Total</span>
            <span className="display text-[2.6rem] leading-none text-bone">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div data-fade-up className="mt-14 flex flex-wrap justify-center gap-3">
        <Button href="/shop" size="lg">
          Keep shopping
        </Button>
        <Button href={bookingUrl("order_success")} external variant="ghost" icon="external" size="lg">
          Now book a court
        </Button>
      </div>
    </div>
  );
}
