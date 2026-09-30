"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Plus } from "@/components/ui/Icons";

export type QA = { q: string; a: string };

function Item({ qa, open, onToggle, id }: { qa: QA; open: boolean; onToggle: () => void; id: string }) {
  const panel = useRef<HTMLDivElement>(null);
  const [initiallyOpen] = useState(open);

  const mounted = useRef(false);

  useEffect(() => {
    const el = panel.current;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!el) return;
    if (open) {
      gsap.fromTo(el, { height: 0 }, { height: "auto", duration: 0.8, ease: "bounc" });
      gsap.fromTo(el.firstElementChild, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: "bounc" });
    } else {
      gsap.to(el, { height: 0, duration: 0.6, ease: "power3.inOut" });
    }
  }, [open]);

  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
        >
          <span className={cn("text-[clamp(1.1rem,1.6vw,1.45rem)] font-medium tracking-[-0.01em] transition-colors duration-500", open ? "text-orange-soft" : "text-bone group-hover:text-bone/80")}>
            {qa.q}
          </span>
          <span
            aria-hidden
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-inset transition-all duration-500 ease-[var(--ease-expo)]",
              open ? "rotate-45 bg-orange text-bone ring-orange" : "text-bone ring-line-2 group-hover:bg-bone group-hover:text-ink",
            )}
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      <div ref={panel} id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} className="overflow-hidden" style={{ height: initiallyOpen ? "auto" : 0 }} inert={!open}>
        <p className="max-w-3xl pb-8 pr-16 leading-relaxed text-bone/70">{qa.a}</p>
      </div>
    </li>
  );
}

export function Faq({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="border-t border-line">
      {items.map((qa, i) => (
        <Item key={qa.q} id={`faq-${i}`} qa={qa} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
      ))}
    </ul>
  );
}
