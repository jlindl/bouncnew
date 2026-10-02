"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CATEGORIES, PRODUCTS, fromPrice, type Category } from "@/lib/shop";
import { cn } from "@/lib/cn";
import { ProductCard } from "@/components/shop/ProductCard";

type Filter = "All" | Category;
type Sort = "featured" | "low" | "high";

const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
];

export function ShopGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("featured");

  const list = (filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)).slice();
  if (sort === "low") list.sort((a, b) => fromPrice(a) - fromPrice(b));
  if (sort === "high") list.sort((a, b) => fromPrice(b) - fromPrice(a));

  return (
    <LayoutGroup>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div role="toolbar" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as Filter[]).map((c) => {
            const n = c === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                  filter === c ? "text-bone" : "text-bone/65 ring-1 ring-inset ring-line-2 hover:text-bone",
                )}
              >
                {filter === c && <motion.span layoutId="shop-chip" className="absolute inset-0 rounded-full bg-orange" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">
                  {c}
                  <span className="ml-2 text-xs opacity-60">{n}</span>
                </span>
              </button>
            );
          })}
        </div>
        <label className="flex items-center gap-3 text-sm text-bone/60">
          <span className="eyebrow">Sort</span>
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="appearance-none rounded-full bg-ink-3 py-2.5 pl-4 pr-10 text-bone ring-1 ring-inset ring-line-2 focus:outline-none focus:ring-orange"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-bone/60" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {list.length} products
      </p>

      <motion.div layout className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.7, delay: Math.min(i, 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={p} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
