"use client";

import Image from "next/image";
import { useState } from "react";
import { IMG, type ImgKey } from "@/lib/media";
import { PRICING, bookingUrl } from "@/lib/site";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

const COURTS: { name: string; type: string; img: ImgKey }[] = [
  { name: "Centre Court", type: "Doubles · 4 players", img: "courtRally" },
  { name: "Court 2", type: "Doubles · 4 players", img: "stillHoodie" },
  { name: "Court 3", type: "Doubles · 4 players", img: "stillOverhead" },
  { name: "Court 4", type: "Singles · 2 players", img: "fistPump" },
];

const FEATURES = ["Super-panoramic glass", "360° perimeter lighting", "4K AI cameras", "Premium turf", "Showers & changing rooms", "Indoor, all year"];

export function Courts() {
  const [active, setActive] = useState(0);
  const perHead = PRICING.doubles.rates[0].price / PRICING.doubles.players;

  return (
    <section className="relative py-[clamp(5rem,12vw,11rem)]" aria-labelledby="courts-title">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel index="04" className="mb-8">
              The courts
            </SectionLabel>
            <SplitReveal as="h2" type="chars" id="courts-title" className="display text-[clamp(3.2rem,7vw,8rem)] text-bone">
              Four courts. <span className="text-orange">No weather.</span> No excuses.
            </SplitReveal>
            <FadeIn className="mt-8 max-w-md">
              <p className="lede">
                International-standard, fully indoor and lit edge to edge. Doubles courts from £{PRICING.doubles.rates[0].price} an hour —
                that’s <strong className="font-semibold text-bone">£{perHead} each</strong> when you play as four.
              </p>
            </FadeIn>

            <ul className="mt-12 border-t border-line" onPointerLeave={() => undefined}>
              {COURTS.map((c, i) => (
                <li key={c.name} className="border-b border-line">
                  <button
                    type="button"
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className="group flex w-full items-center gap-5 py-5 text-left md:py-6"
                  >
                    <span className="eyebrow w-8 text-mute">0{i + 1}</span>
                    <span
                      className={cn(
                        "font-display text-[clamp(1.6rem,3vw,2.8rem)] font-bold italic uppercase leading-none tracking-[-0.01em] transition-all duration-500 ease-[var(--ease-expo)] [font-stretch:80%]",
                        active === i ? "translate-x-2 text-orange" : "text-bone group-hover:translate-x-2",
                      )}
                    >
                      {c.name}
                    </span>
                    <span className="ml-auto hidden text-sm text-bone/60 sm:inline">{c.type}</span>
                    <ArrowRight
                      className={cn(
                        "size-5 shrink-0 transition-all duration-500",
                        active === i ? "translate-x-0 text-orange opacity-100" : "-translate-x-3 opacity-0",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <FadeIn stagger={0.05} className="mt-10 flex flex-wrap gap-2">
              {FEATURES.map((f) => (
                <span key={f} className="inline-flex items-center gap-2 rounded-full bg-ink-3 px-4 py-2 text-sm text-bone/80 ring-1 ring-inset ring-line">
                  <span aria-hidden className="h-2.5 w-1 -skew-x-[17deg] bg-orange" />
                  {f}
                </span>
              ))}
            </FadeIn>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={bookingUrl("courts")} external icon="external">
                Book a court
              </Button>
              <Button href="/book" variant="ghost">
                Prices & how it works
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ink-3" data-cursor={COURTS[active].name}>
                {COURTS.map((c, i) => (
                  <div
                    key={c.name}
                    className="absolute inset-0 transition-[clip-path,transform] duration-[1100ms] ease-[var(--ease-in-out-expo)]"
                    style={{
                      clipPath: active === i ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : active > i ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                      transform: active === i ? "scale(1)" : "scale(1.12)",
                      zIndex: active === i ? 2 : 1,
                    }}
                  >
                    <Image src={IMG[c.img].src} alt={IMG[c.img].alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" placeholder="blur" />
                  </div>
                ))}
                <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 z-[4] flex items-end justify-between">
                  <div>
                    <p className="eyebrow text-orange-soft">Now showing</p>
                    <p className="display mt-2 text-[clamp(2rem,3.4vw,3.4rem)] text-bone">{COURTS[active].name}</p>
                  </div>
                  <p className="eyebrow text-bone/70">{COURTS[active].type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
