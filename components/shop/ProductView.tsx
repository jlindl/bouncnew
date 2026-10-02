"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cart } from "@/lib/cart";
import { flyToBag } from "@/lib/fly";
import { IMG } from "@/lib/media";
import { SHIPPING, artFor, defaultSelection, formatPrice, priceFor, type Product, type Selection } from "@/lib/shop";
import { cn } from "@/lib/cn";
import { Studio } from "@/components/shop/Studio";
import { ProductArt } from "@/components/shop/ProductArt";
import { Faq } from "@/components/sections/Faq";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ArrowRight } from "@/components/ui/Icons";
import { FadeIn } from "@/components/motion/FadeIn";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductView({ product }: { product: Product }) {
  const [sel, setSel] = useState<Selection>(() => defaultSelection(product));
  const [view, setView] = useState<"render" | number>("render");
  const [qty, setQty] = useState(1);
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");
  const [sizeError, setSizeError] = useState(false);
  const [pickedSize, setPickedSize] = useState(false);
  const addRef = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLButtonElement>(null);

  const art = artFor(product, sel);
  const price = priceFor(product, sel);
  const hasSize = product.options?.some((o) => o.name === "Size");
  const photos = product.photos ?? [];

  const add = async (from: HTMLElement | null) => {
    if (hasSize && !pickedSize) {
      setSizeError(true);
      document.getElementById("opt-Size")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setState("adding");
    cart.add(product, sel, qty);
    await flyToBag(from);
    setState("added");
    cart.open();
    setTimeout(() => setState("idle"), 2200);
  };

  const label = state === "adding" ? "Adding…" : state === "added" ? "Added to bag" : `Add to bag — ${formatPrice(price * qty)}`;

  const info = [
    {
      q: "Delivery & collection",
      a: `Collect free at BOUNC, usually ready within 24 hours. UK standard delivery is £${SHIPPING.methods[1].price} (free over £${SHIPPING.freeOver}), or next day for £${SHIPPING.methods[2].price}.`,
    },
    { q: "Returns", a: "Changed your mind? Return unused items within 30 days for a full refund — in person at the club or by post." },
  ];

  return (
    <div className="wrap grid gap-10 pb-28 lg:grid-cols-12 lg:gap-14 lg:pb-0">
      {/* Gallery */}
      <FadeIn trigger="reveal" y={30} className="lg:col-span-7">
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            {view === "render" ? (
              <motion.div key="render" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.5, ease: EASE }}>
                <Studio art={art} className="aspect-square lg:aspect-[5/5]" depth={8} title={`${product.name} — ${Object.values(sel).join(", ")}`}>
                  {product.badge && <span className="eyebrow absolute left-5 top-5 z-10 rounded-full bg-orange px-3 py-1.5 text-bone">{product.badge}</span>}
                  <span className="eyebrow absolute bottom-5 right-5 z-10 text-bone/40">Move your cursor to tilt</span>
                </Studio>
              </motion.div>
            ) : (
              <motion.div
                key={`photo-${view}`}
                initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative aspect-square overflow-hidden rounded-[1.25rem]"
              >
                <Image src={IMG[photos[view]].src} alt={IMG[photos[view]].alt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" placeholder="blur" />
                <span className="eyebrow absolute bottom-5 left-5 rounded-full bg-ink/60 px-3 py-1.5 text-bone backdrop-blur">Seen at BOUNC</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {photos.length > 0 && (
          <div className="mt-4 flex gap-3" role="tablist" aria-label="Product images">
            <button
              type="button"
              role="tab"
              aria-selected={view === "render"}
              onClick={() => setView("render")}
              className={cn("relative size-20 overflow-hidden rounded-xl bg-ink-3 ring-2 ring-inset transition md:size-24", view === "render" ? "ring-orange" : "ring-transparent opacity-60 hover:opacity-100")}
            >
              <span className="absolute inset-1.5">
                <ProductArt art={art} />
              </span>
              <span className="sr-only">Studio view</span>
            </button>
            {photos.map((p, i) => (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={view === i}
                onClick={() => setView(i)}
                className={cn("relative size-20 overflow-hidden rounded-xl ring-2 ring-inset transition md:size-24", view === i ? "ring-orange" : "ring-transparent opacity-60 hover:opacity-100")}
              >
                <Image src={IMG[p].src} alt="" fill sizes="96px" className="object-cover" />
                <span className="sr-only">Photo {i + 1}</span>
              </button>
            ))}
          </div>
        )}
      </FadeIn>

      {/* Buy box */}
      <FadeIn trigger="reveal" y={30} delay={0.12} className="lg:col-span-5">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-bone/50">
            <TransitionLink href="/shop" className="u-sweep hover:text-bone">
              Shop
            </TransitionLink>
            <span aria-hidden>/</span>
            <span>{product.category}</span>
          </nav>
          <h1 className="display mt-5 text-[clamp(3rem,6vw,5.6rem)] text-bone">{product.name}</h1>
          <p className="eyebrow mt-4 text-bone/60">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={price}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="display inline-block text-[3rem] leading-none text-orange"
              >
                {formatPrice(price)}
              </motion.span>
            </AnimatePresence>
            {product.compareAt && <span className="text-lg text-bone/40 line-through">{formatPrice(product.compareAt)}</span>}
          </div>

          <p className="mt-6 max-w-lg leading-relaxed text-bone/70">{product.description}</p>

          {/* Options */}
          <div className="mt-8 space-y-7">
            {product.options?.map((o) => {
              const swatches = o.values.some((v) => v.swatch);
              const isSize = o.name === "Size";
              return (
                <fieldset key={o.name} id={`opt-${o.name}`}>
                  <legend className="flex w-full items-baseline justify-between">
                    <span className="eyebrow text-bone/60">
                      {o.name}
                      {!isSize || pickedSize ? <span className="ml-2 normal-case tracking-normal text-bone">{sel[o.name]}</span> : null}
                    </span>
                    {isSize && sizeError && !pickedSize && (
                      <span role="alert" className="text-sm text-orange-soft">
                        Choose a size
                      </span>
                    )}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {o.values.map((v) => {
                      const active = sel[o.name] === v.label && (!isSize || pickedSize);
                      return swatches ? (
                        <button
                          key={v.label}
                          type="button"
                          onClick={() => setSel({ ...sel, [o.name]: v.label })}
                          aria-pressed={active}
                          aria-label={v.label}
                          title={v.label}
                          className={cn(
                            "grid size-11 place-items-center rounded-full ring-2 ring-offset-2 ring-offset-ink transition-all duration-300",
                            active ? "ring-orange" : "ring-transparent hover:ring-line-2",
                          )}
                        >
                          <span className="size-8 rounded-full ring-1 ring-inset ring-white/20" style={{ background: v.swatch }} />
                        </button>
                      ) : (
                        <button
                          key={v.label}
                          type="button"
                          onClick={() => {
                            setSel({ ...sel, [o.name]: v.label });
                            if (isSize) {
                              setPickedSize(true);
                              setSizeError(false);
                            }
                          }}
                          aria-pressed={active}
                          className={cn(
                            "relative min-w-14 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300",
                            active ? "text-bone" : "text-bone/75 ring-1 ring-inset ring-line-2 hover:text-bone hover:ring-bone/40",
                            isSize && sizeError && !pickedSize && "ring-orange/70",
                          )}
                        >
                          {active && <motion.span layoutId={`opt-${o.name}`} className="absolute inset-0 rounded-full bg-orange" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                          <span className="relative">
                            {v.label}
                            {v.price !== undefined && o.name !== "Amount" && <span className="ml-2 opacity-70">{formatPrice(v.price)}</span>}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              );
            })}
          </div>

          {/* Quantity + add */}
          <div className="mt-9 flex gap-3">
            <div className="flex h-[3.75rem] items-center rounded-full ring-1 ring-inset ring-line-2">
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="grid size-[3.75rem] place-items-center text-xl text-bone/70 hover:text-bone">
                −
              </button>
              <span className="w-6 text-center tabular-nums text-bone" aria-live="polite">
                {qty}
              </span>
              <button type="button" onClick={() => setQty(Math.min(20, qty + 1))} aria-label="Increase quantity" className="grid size-[3.75rem] place-items-center text-xl text-bone/70 hover:text-bone">
                +
              </button>
            </div>
            <button
              ref={addRef}
              type="button"
              onClick={() => add(addRef.current)}
              disabled={state === "adding"}
              className={cn(
                "group relative flex h-[3.75rem] flex-1 items-center justify-center gap-3 overflow-hidden rounded-full px-6 font-medium transition-colors duration-500",
                state === "added" ? "bg-bone text-ink" : "bg-orange text-bone hover:bg-orange-hot",
              )}
            >
              <span className="roll">
                <span>{label}</span>
                <span aria-hidden>{label}</span>
              </span>
            </button>
          </div>

          <ul className="mt-8 space-y-2.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-bone/80">
                <span aria-hidden className="mt-2 h-2.5 w-1 shrink-0 -skew-x-[17deg] bg-orange" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-4 rounded-[1rem] bg-ink-3 p-4 ring-1 ring-inset ring-line">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange/15 text-orange-soft">
              <ArrowRight className="size-4 -rotate-45" />
            </span>
            <p className="text-sm text-bone/75">
              <strong className="font-medium text-bone">Collect free at BOUNC</strong> — usually ready within 24 hours. Free UK delivery over £{SHIPPING.freeOver}.
            </p>
          </div>

          {product.specs && (
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[1rem] bg-line sm:grid-cols-3">
              {product.specs.map(([k, v]) => (
                <div key={k} className="bg-ink p-4">
                  <dt className="eyebrow text-mute">{k}</dt>
                  <dd className="mt-1.5 text-sm text-bone">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-8">
            <Faq items={info} />
          </div>
        </div>
      </FadeIn>

      {/* Mobile sticky add */}
      <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-ink/85 p-3 backdrop-blur-xl lg:hidden">
        <button
          ref={mobileRef}
          type="button"
          onClick={() => add(mobileRef.current)}
          className={cn("h-14 w-full rounded-full font-medium transition-colors", state === "added" ? "bg-bone text-ink" : "bg-orange text-bone")}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
