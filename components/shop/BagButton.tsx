"use client";

import { AnimatePresence, motion } from "motion/react";
import { cart, totals, useCart } from "@/lib/cart";

export function BagButton() {
  const { lines } = useCart();
  const { count } = totals(lines);
  return (
    <button
      type="button"
      onClick={() => cart.open()}
      data-bag-target
      aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative grid size-11 place-items-center rounded-full ring-1 ring-inset ring-line-2 transition-colors hover:bg-bone hover:text-ink"
    >
      <svg viewBox="0 0 24 24" className="size-[1.15rem]" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
        <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
        <path d="M9 10V7a3 3 0 0 1 6 0v3" />
      </svg>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange px-1 text-[0.68rem] font-semibold tabular-nums text-bone"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
