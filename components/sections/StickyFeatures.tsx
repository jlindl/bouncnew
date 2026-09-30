"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { IMG, type ImgKey } from "@/lib/media";
import { cn } from "@/lib/cn";

export type Feature = { title: string; text: string; points?: string[]; img: ImgKey; tag?: string };

/** Scrolling copy on one side, a sticky frame on the other that wipes to the active feature's image. */
export function StickyFeatures({ features }: { features: Feature[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const items = root.current?.querySelectorAll<HTMLElement>("[data-feature]") ?? [];
      items.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-[calc(var(--header-h)+2rem)] aspect-[4/5] max-h-[calc(100svh-var(--header-h)-4rem)] w-full overflow-hidden rounded-[1.5rem] bg-ink-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="absolute inset-0 transition-[clip-path,transform] duration-[1100ms] ease-[var(--ease-in-out-expo)]"
              style={{
                clipPath: i === active ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : i < active ? "polygon(0 0, 100% 0, 100% 0, 0 0)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                transform: i === active ? "scale(1)" : "scale(1.12)",
                zIndex: i === active ? 2 : 1,
              }}
            >
              <Image src={IMG[f.img].src} alt={IMG[f.img].alt} fill sizes="45vw" className="object-cover" placeholder="blur" />
            </div>
          ))}
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute inset-x-6 bottom-6 z-[4] flex items-end justify-between">
            <p className="display text-[clamp(2rem,3.4vw,3.2rem)] text-bone">{features[active].title}</p>
            <p className="display text-[3rem] leading-none text-orange">
              {String(active + 1).padStart(2, "0")}
              <span className="text-bone/30">/{String(features.length).padStart(2, "0")}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6">
        {features.map((f, i) => (
          <article
            key={f.title}
            data-feature
            className={cn(
              "border-t border-line py-12 transition-opacity duration-700 lg:flex lg:min-h-[70svh] lg:flex-col lg:justify-center lg:py-20",
              i === active ? "lg:opacity-100" : "lg:opacity-35",
            )}
          >
            <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-[1.25rem] lg:hidden">
              <Image src={IMG[f.img].src} alt={IMG[f.img].alt} fill sizes="100vw" className="object-cover" placeholder="blur" />
            </div>
            <div className="flex items-center gap-4">
              <span className="display text-[2.4rem] leading-none text-orange">{String(i + 1).padStart(2, "0")}</span>
              {f.tag && <span className="eyebrow rounded-full bg-ink-3 px-3 py-1.5 text-bone/70 ring-1 ring-inset ring-line">{f.tag}</span>}
            </div>
            <h3 className="mt-6 font-display text-[clamp(2rem,3.4vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-bone [font-stretch:95%]">
              {f.title}
            </h3>
            <p className="mt-5 max-w-lg text-[1.08rem] leading-relaxed text-bone/70">{f.text}</p>
            {f.points && (
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-bone/85">
                    <span aria-hidden className="mt-2 h-2.5 w-1 shrink-0 -skew-x-[17deg] bg-orange" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
