"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lenisStore } from "@/lib/stores";
import { cn } from "@/lib/cn";

/** Thin orange bar tracking progress through the article body. */
export function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: target, start: "top 30%", end: "bottom 80%", scrub: 0.3 } },
    );
  });
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[110] h-[3px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-orange" />
    </div>
  );
}

/** Sticky contents list; highlights the section in view. */
export function ArticleToc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="In this article">
      <p className="eyebrow mb-5 text-mute">In this article</p>
      <ul className="space-y-1 border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              onClick={(e) => {
                e.preventDefault();
                lenisStore.get()?.scrollTo(`#${i.id}`, { offset: -110 });
              }}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors duration-300",
                active === i.id ? "border-orange text-bone" : "border-transparent text-bone/50 hover:text-bone/80",
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Copy-link share button with a small confirmation. */
export function CopyLink() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {}
      }}
      className="rounded-full px-4 py-2 text-sm text-bone/80 ring-1 ring-inset ring-line-2 transition hover:bg-bone hover:text-ink"
    >
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
