"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { cart, saveOrder, totals, useCart, type Order } from "@/lib/cart";
import { lenisStore } from "@/lib/stores";
import { PROMO, SHIPPING, artFor, formatPrice, type ShippingId } from "@/lib/shop";
import { cn } from "@/lib/cn";
import { usePageTransition } from "@/components/providers/PageTransition";
import { ProductArt } from "@/components/shop/ProductArt";
import { CardPreview, cardBrand } from "@/components/shop/CardPreview";
import { variantText } from "@/components/shop/CartDrawer";
import { FloatField } from "@/components/forms/FloatField";
import { Button } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Logo";
import { ArrowRight } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;
const STEPS = ["Details", "Delivery", "Payment"] as const;

const useHydrated = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

const round2 = (n: number) => Math.round(n * 100) / 100;

function formatCard(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}
function formatExp(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

export function Checkout() {
  const hydrated = useHydrated();
  const { lines } = useCart();
  const { count, subtotal, lines: resolved } = totals(lines);
  const router = useRouter();
  const transition = usePageTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState(0);
  const [details, setDetails] = useState({ email: "", first: "", last: "", phone: "", news: true });
  const [address, setAddress] = useState({ line1: "", line2: "", town: "", postcode: "" });
  const [ship, setShip] = useState<ShippingId>("collect");
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvc: "" });
  const [flipped, setFlipped] = useState(false);
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);
  const [promoMsg, setPromoMsg] = useState("");
  const [processing, setProcessing] = useState<"" | "pay" | "confirm">("");

  const digitalOnly = resolved.length > 0 && resolved.every((l) => l.product.category === "Gift cards");
  const method = SHIPPING.methods.find((m) => m.id === ship)!;
  const shipCost = digitalOnly ? 0 : ship === "standard" && subtotal >= SHIPPING.freeOver ? 0 : method.price;
  const discount = applied ? round2((subtotal * PROMO.percent) / 100) : 0;
  const total = round2(subtotal - discount + (step > 0 ? shipCost : 0));

  const go = (n: number) => {
    setStep(n);
    const lenis = lenisStore.get();
    if (lenis) lenis.scrollTo(0, { duration: 1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = () => {
    if (!formRef.current?.reportValidity()) return;
    go(step + 1);
  };

  const place = async () => {
    setProcessing("pay");
    await new Promise((r) => setTimeout(r, 1600));
    setProcessing("confirm");
    await new Promise((r) => setTimeout(r, 1100));
    const order: Order = {
      number: `BNC-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      email: details.email,
      name: details.first,
      shipping: digitalOnly ? { id: "email", label: "Email delivery", price: 0 } : { id: method.id, label: method.label, price: shipCost },
      address: !digitalOnly && ship !== "collect" ? [address.line1, address.line2, address.town, address.postcode].filter(Boolean).join(", ") : undefined,
      lines: resolved.map((l) => ({ name: l.product.name, variant: variantText(l.selection), qty: l.qty, total: l.total, slug: l.slug, selection: l.selection })),
      subtotal,
      discount,
      total: round2(subtotal - discount + shipCost),
      placedAt: new Date().toISOString(),
    };
    saveOrder(order);
    cart.clear();
    if (transition) transition.navigate("/checkout/success");
    else router.push("/checkout/success");
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (step < 2) return next();
    if (!formRef.current?.reportValidity()) return;
    void place();
  };

  const applyPromo = (e: FormEvent) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === PROMO.code) {
      setApplied(true);
      setPromoMsg(`${PROMO.percent}% off applied`);
    } else {
      setApplied(false);
      setPromoMsg("That code isn’t valid");
    }
  };

  if (!hydrated) {
    return <div className="wrap min-h-[60svh]" aria-busy="true" />;
  }

  if (count === 0) {
    return (
      <div className="wrap flex min-h-[60svh] flex-col items-start justify-center">
        <div className="w-16 text-orange">
          <Mark />
        </div>
        <h1 className="display mt-8 text-[clamp(3.4rem,8vw,7rem)] text-bone">
          Your bag is <span className="text-orange">empty.</span>
        </h1>
        <p className="lede mt-6 max-w-md">Add some kit and come back — checkout will be waiting.</p>
        <div className="mt-10">
          <Button href="/shop" size="lg">
            Shop the kit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="wrap">
        <div className="mb-10 flex flex-col gap-3 rounded-[1rem] bg-orange/12 px-5 py-4 text-sm text-bone/85 ring-1 ring-inset ring-orange/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <strong className="font-semibold text-bone">Demo checkout.</strong> No payment is taken and no order is placed — use any details you like.
          </p>
          <p className="text-bone/60">
            Psst: try code <span className="font-mono text-orange-soft">{PROMO.code}</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Steps */}
          <div className="lg:col-span-7">
            <button
              type="button"
              onClick={() => lenisStore.get()?.scrollTo("#order-summary", { offset: -100 })}
              className="mb-8 flex w-full items-center justify-between rounded-full bg-ink-3 px-5 py-3.5 text-sm ring-1 ring-inset ring-line lg:hidden"
            >
              <span className="text-bone/70">
                {count} {count === 1 ? "item" : "items"} · <span className="u-sweep text-bone">View summary</span>
              </span>
              <span className="display text-2xl leading-none text-bone">{formatPrice(total)}</span>
            </button>
            <ol className="flex items-center gap-3" aria-label="Checkout progress">
              {STEPS.map((s, i) => (
                <li key={s} className="flex flex-1 items-center gap-3">
                  <button
                    type="button"
                    disabled={i >= step}
                    onClick={() => go(i)}
                    aria-current={i === step ? "step" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 text-sm transition-colors",
                      i === step ? "text-bone" : i < step ? "text-orange-soft hover:text-bone" : "text-bone/35",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full font-mono text-xs ring-1 ring-inset transition-all duration-500",
                        i === step ? "bg-orange text-bone ring-orange" : i < step ? "bg-orange/15 ring-orange/40" : "ring-line-2",
                      )}
                    >
                      {i < step ? "✓" : `0${i + 1}`}
                    </span>
                    <span className="hidden font-medium sm:inline">{s}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <span className="relative h-px flex-1 bg-line-2">
                      <motion.span className="absolute inset-y-0 left-0 bg-orange" initial={false} animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.8, ease: EASE }} />
                    </span>
                  )}
                </li>
              ))}
            </ol>

            <form ref={formRef} onSubmit={submit} className="mt-12" noValidate={false}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.55, ease: EASE }}>
                  {step === 0 && (
                    <fieldset>
                      <legend className="display text-[clamp(2.4rem,4.4vw,3.8rem)] text-bone">Your details</legend>
                      <div className="mt-8 grid gap-8 sm:grid-cols-2">
                        <FloatField label="Email" type="email" required autoComplete="email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} className="sm:col-span-2" />
                        <FloatField label="First name" required autoComplete="given-name" value={details.first} onChange={(e) => setDetails({ ...details, first: e.target.value })} />
                        <FloatField label="Last name" required autoComplete="family-name" value={details.last} onChange={(e) => setDetails({ ...details, last: e.target.value })} />
                        <FloatField label="Phone" type="tel" autoComplete="tel" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} hint="For collection and delivery updates" />
                      </div>
                      <label className="mt-8 flex cursor-pointer items-center gap-3 text-bone/75">
                        <input type="checkbox" checked={details.news} onChange={(e) => setDetails({ ...details, news: e.target.checked })} className="peer sr-only" />
                        <span className="grid size-6 place-items-center rounded-md ring-1 ring-inset ring-line-2 transition peer-checked:bg-orange peer-checked:ring-orange peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-orange-soft">
                          <svg viewBox="0 0 16 16" className="size-3.5 text-bone" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden>
                            <path d="m3.5 8.5 3 3 6-7" />
                          </svg>
                        </span>
                        Send me new kit drops, league news and offers.
                      </label>
                    </fieldset>
                  )}

                  {step === 1 && (
                    <fieldset>
                      <legend className="display text-[clamp(2.4rem,4.4vw,3.8rem)] text-bone">{digitalOnly ? "Delivery" : "How do you want it?"}</legend>
                      {digitalOnly ? (
                        <p className="mt-6 max-w-md rounded-[1rem] bg-ink-3 p-6 text-bone/75 ring-1 ring-inset ring-line">
                          Gift cards are delivered by email to <strong className="font-medium text-bone">{details.email}</strong> — no shipping needed.
                        </p>
                      ) : (
                        <>
                          <div className="mt-8 grid gap-3" role="radiogroup" aria-label="Delivery method">
                            {SHIPPING.methods.map((m) => {
                              const free = m.id === "standard" && subtotal >= SHIPPING.freeOver;
                              const active = ship === m.id;
                              return (
                                <label
                                  key={m.id}
                                  className={cn(
                                    "relative flex cursor-pointer items-center gap-5 overflow-hidden rounded-[1.1rem] p-5 ring-1 ring-inset transition-colors duration-300",
                                    active ? "bg-orange/10 ring-orange" : "bg-ink-3 ring-line hover:ring-line-2",
                                  )}
                                >
                                  <input type="radio" name="ship" value={m.id} checked={active} onChange={() => setShip(m.id)} className="peer sr-only" />
                                  <span className={cn("grid size-6 shrink-0 place-items-center rounded-full ring-2 ring-inset transition", active ? "ring-orange" : "ring-line-2")}>
                                    <span className={cn("size-2.5 rounded-full bg-orange transition-transform duration-300", active ? "scale-100" : "scale-0")} />
                                  </span>
                                  <span className="flex-1">
                                    <span className="block font-medium text-bone">{m.label}</span>
                                    <span className="text-sm text-bone/55">{m.detail}</span>
                                  </span>
                                  <span className="display text-[1.7rem] leading-none text-bone">{m.price === 0 || free ? "Free" : formatPrice(m.price)}</span>
                                  <span className="pointer-events-none absolute inset-0 rounded-[1.1rem] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-orange-soft" />
                                </label>
                              );
                            })}
                          </div>
                          <AnimatePresence initial={false}>
                            {ship !== "collect" ? (
                              <motion.div
                                key="addr"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.6, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <div className="grid gap-8 pt-10 sm:grid-cols-2">
                                  <FloatField label="Address" required autoComplete="address-line1" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} className="sm:col-span-2" />
                                  <FloatField label="Apartment, unit (optional)" autoComplete="address-line2" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} className="sm:col-span-2" />
                                  <FloatField label="Town / city" required autoComplete="address-level2" value={address.town} onChange={(e) => setAddress({ ...address, town: e.target.value })} />
                                  <FloatField
                                    label="Postcode"
                                    required
                                    autoComplete="postal-code"
                                    value={address.postcode}
                                    onChange={(e) => setAddress({ ...address, postcode: e.target.value.toUpperCase() })}
                                  />
                                </div>
                              </motion.div>
                            ) : (
                              <motion.p
                                key="collect"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-6 text-sm text-bone/60"
                              >
                                Collect from reception at BOUNC, Unit K4, Ordnance Road, Buckshaw Village. We’ll email you when it’s ready.
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </fieldset>
                  )}

                  {step === 2 && (
                    <fieldset>
                      <legend className="display text-[clamp(2.4rem,4.4vw,3.8rem)] text-bone">Payment</legend>
                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {["Apple Pay", "Google Pay"].map((x) => (
                          <button
                            key={x}
                            type="button"
                            onClick={() => void place()}
                            className="h-14 rounded-full bg-bone font-medium text-ink transition hover:bg-white"
                          >
                            Pay with {x}
                          </button>
                        ))}
                      </div>
                      <div className="my-8 flex items-center gap-4 text-sm text-bone/45">
                        <span className="h-px flex-1 bg-line" />
                        or pay by card
                        <span className="h-px flex-1 bg-line" />
                      </div>
                      <CardPreview number={card.number} name={card.name} exp={card.exp} cvc={card.cvc} flipped={flipped} />
                      <div className="mt-10 grid gap-8 sm:grid-cols-2">
                        <FloatField
                          label="Card number"
                          required
                          inputMode="numeric"
                          autoComplete="cc-number"
                          pattern="[0-9 ]{19}"
                          title="16-digit card number"
                          value={card.number}
                          onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
                          className="sm:col-span-2"
                          hint={cardBrand(card.number) ? `${cardBrand(card.number)} detected` : "Any 16 digits — this is a demo"}
                        />
                        <FloatField label="Name on card" required autoComplete="cc-name" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} className="sm:col-span-2" />
                        <FloatField
                          label="Expiry (MM / YY)"
                          required
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          pattern="(0[1-9]|1[0-2]) / [0-9]{2}"
                          title="MM / YY"
                          value={card.exp}
                          onChange={(e) => setCard({ ...card, exp: formatExp(e.target.value) })}
                        />
                        <FloatField
                          label="Security code"
                          required
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          pattern="[0-9]{3,4}"
                          title="3 or 4 digits"
                          value={card.cvc}
                          onFocus={() => setFlipped(true)}
                          onBlur={() => setFlipped(false)}
                          onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                        />
                      </div>
                    </fieldset>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex flex-col-reverse gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                {step > 0 ? (
                  <button type="button" onClick={() => go(step - 1)} className="group inline-flex items-center gap-2 text-sm text-bone/65 transition hover:text-bone">
                    <ArrowRight className="size-4 rotate-180 transition-transform duration-500 group-hover:-translate-x-1" />
                    Back to {STEPS[step - 1].toLowerCase()}
                  </button>
                ) : (
                  <span />
                )}
                <Button type="submit" size="lg" magnetic={false} icon={step === 2 ? "none" : "arrow"}>
                  {step === 0 ? "Continue to delivery" : step === 1 ? "Continue to payment" : `Pay ${formatPrice(round2(subtotal - discount + shipCost))}`}
                </Button>
              </div>
            </form>
          </div>

          {/* Summary */}
          <aside id="order-summary" className="scroll-mt-24 lg:col-span-5" aria-label="Order summary">
            <div className="rounded-[1.5rem] bg-ink-3 p-6 ring-1 ring-inset ring-line md:p-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <p className="eyebrow text-bone/60">Order summary · {count} {count === 1 ? "item" : "items"}</p>
              <ul className="mt-6 max-h-[38svh] space-y-4 overflow-y-auto pr-1" data-lenis-prevent>
                {resolved.map((l) => (
                  <li key={l.id} className="flex items-center gap-4">
                    <span className="relative h-20 w-16 shrink-0 rounded-xl bg-[radial-gradient(circle_at_50%_28%,#3a3a3a,#161616_75%)]">
                      <span className="absolute inset-1">
                        <ProductArt art={artFor(l.product, l.selection)} />
                      </span>
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-orange px-1 text-[0.68rem] font-semibold text-bone">{l.qty}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-bone">{l.product.name}</span>
                      <span className="block truncate text-sm text-bone/50">{variantText(l.selection) || l.product.tagline}</span>
                    </span>
                    <span className="font-medium text-bone">{formatPrice(l.total)}</span>
                  </li>
                ))}
              </ul>

              <form onSubmit={applyPromo} className="mt-6 flex gap-2 border-t border-line pt-6">
                <label htmlFor="promo" className="sr-only">
                  Promo code
                </label>
                <input
                  id="promo"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Promo code"
                  className="h-12 min-w-0 flex-1 rounded-full bg-ink px-5 font-mono text-sm uppercase text-bone ring-1 ring-inset ring-line-2 placeholder:font-sans placeholder:normal-case placeholder:text-mute focus:outline-none focus:ring-orange"
                />
                <button type="submit" className="h-12 rounded-full px-5 text-sm font-medium text-bone ring-1 ring-inset ring-line-2 transition hover:bg-bone hover:text-ink">
                  Apply
                </button>
              </form>
              <AnimatePresence>
                {promoMsg && (
                  <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className={cn("mt-2 text-sm", applied ? "text-orange-soft" : "text-bone/60")}>
                    {promoMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              <dl className="mt-6 space-y-3 border-t border-line pt-6 text-bone/75">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-bone">{formatPrice(subtotal)}</dd>
                </div>
                {applied && (
                  <div className="flex justify-between text-orange-soft">
                    <dt>Discount ({PROMO.code})</dt>
                    <dd>−{formatPrice(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt>{digitalOnly ? "Delivery" : method.label}</dt>
                  <dd className="text-bone">{step === 0 && !digitalOnly ? "Next step" : shipCost === 0 ? "Free" : formatPrice(shipCost)}</dd>
                </div>
              </dl>
              <div className="mt-6 flex items-baseline justify-between border-t border-line pt-6">
                <span className="text-bone">Total</span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={total}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="display text-[2.8rem] leading-none text-bone"
                  >
                    {formatPrice(total)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-bone/45">
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                Demo checkout — no card details leave your browser.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Processing overlay */}
      <AnimatePresence>
        {processing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[180] grid place-items-center bg-ink/92 backdrop-blur-md"
            role="status"
            aria-live="assertive"
          >
            <div className="flex flex-col items-center">
              <div className="logo-hover processing w-24 text-orange">
                <Mark />
              </div>
              <AnimatePresence mode="wait">
                <motion.p key={processing} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} className="display mt-10 text-[clamp(2rem,4vw,3rem)] text-bone">
                  {processing === "pay" ? "Processing payment…" : "Confirming your order…"}
                </motion.p>
              </AnimatePresence>
              <p className="mt-3 text-sm text-bone/50">Demo mode — nothing is being charged.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
