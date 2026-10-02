"use client";

import { useRef, useState } from "react";
import { cart } from "@/lib/cart";
import { flyToBag } from "@/lib/fly";
import { defaultSelection, formatPrice, fromPrice, type Product } from "@/lib/shop";
import { cn } from "@/lib/cn";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Studio } from "@/components/shop/Studio";
import { Plus } from "@/components/ui/Icons";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const btn = useRef<HTMLButtonElement>(null);
  const [added, setAdded] = useState(false);
  const needsChoice = product.options?.some((o) => o.name === "Size");
  const colour = product.options?.find((o) => o.values.some((v) => v.swatch));
  const from = fromPrice(product);
  const hasRange = from !== product.price || product.options?.some((o) => o.values.some((v) => v.price !== undefined));

  const quickAdd = async () => {
    cart.add(product, defaultSelection(product));
    setAdded(true);
    await flyToBag(btn.current);
    cart.open();
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="group/card">
      <div className="relative">
      <TransitionLink href={`/shop/${product.slug}`} data-cursor="View" className="block" aria-label={`${product.name} — ${formatPrice(from)}`}>
        <Studio art={product.art} className="aspect-[4/5]" title={priority ? product.name : undefined}>
          {product.badge && (
            <span className="eyebrow absolute left-4 top-4 z-10 rounded-full bg-orange px-3 py-1.5 text-bone">{product.badge}</span>
          )}
          <span className="eyebrow absolute right-4 top-4 z-10 text-bone/50">{product.category}</span>
        </Studio>
      </TransitionLink>

      {/* quick add sits over the image but outside the link */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center">
        {needsChoice ? (
          <TransitionLink
            href={`/shop/${product.slug}`}
            className="pointer-events-auto translate-y-3 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink opacity-0 shadow-[0_20px_40px_-10px_rgb(0_0_0/0.6)] transition-all duration-500 ease-[var(--ease-expo)] hover:bg-orange hover:text-bone focus-visible:translate-y-0 focus-visible:opacity-100 group-hover/card:translate-y-0 group-hover/card:opacity-100"
          >
            Choose size
          </TransitionLink>
        ) : (
          <button
            ref={btn}
            type="button"
            onClick={quickAdd}
            className={cn(
              "pointer-events-auto flex translate-y-3 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium opacity-0 shadow-[0_20px_40px_-10px_rgb(0_0_0/0.6)] transition-all duration-500 ease-[var(--ease-expo)] focus-visible:translate-y-0 focus-visible:opacity-100 group-hover/card:translate-y-0 group-hover/card:opacity-100",
              added ? "bg-orange text-bone" : "bg-bone text-ink hover:bg-orange hover:text-bone",
            )}
          >
            {added ? "Added to bag" : (
              <>
                <Plus className="size-3.5" /> Quick add
              </>
            )}
          </button>
        )}
      </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-[1.35rem] font-bold leading-tight tracking-[-0.02em] text-bone">
            <TransitionLink href={`/shop/${product.slug}`} className="u-sweep">
              {product.name}
            </TransitionLink>
          </h3>
          <p className="mt-1 text-sm text-bone/55">{product.tagline}</p>
        </div>
        <p className="shrink-0 text-right">
          {hasRange && <span className="block text-[0.7rem] uppercase tracking-[0.14em] text-mute">From</span>}
          <span className="display text-[1.9rem] leading-none text-bone">{formatPrice(from)}</span>
        </p>
      </div>
      {colour && (
        <div className="mt-3 flex gap-1.5" aria-label={`${colour.values.length} colours`}>
          {colour.values.map((v) => (
            <span key={v.label} title={v.label} className="size-3.5 rounded-full ring-1 ring-inset ring-white/20" style={{ background: v.swatch }} />
          ))}
        </div>
      )}
    </article>
  );
}
