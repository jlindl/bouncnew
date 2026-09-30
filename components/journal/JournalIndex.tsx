"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CATEGORIES, type Category, type Post } from "@/lib/journal";
import { cn } from "@/lib/cn";
import { PostCard } from "@/components/journal/PostCard";

type Filter = "All" | Category;

/** Category chips with a sliding active pill; the grid re-flows with shared-layout animation. */
export function JournalIndex({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const [featured, ...rest] = shown;
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c, posts.filter((p) => p.category === c).length]));

  return (
    <LayoutGroup>
      <div role="toolbar" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as Filter[]).map((c) => (
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
            {filter === c && (
              <motion.span layoutId="chip" className="absolute inset-0 -z-0 rounded-full bg-orange" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
            )}
            <span className="relative">
              {c}
              <span className="ml-2 text-xs opacity-60">{c === "All" ? posts.length : counts[c]}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-14">
        <AnimatePresence mode="popLayout">
          {featured && (
            <motion.div
              key={`f-${featured.slug}`}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <PostCard post={featured} featured />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rest.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <PostCard post={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </LayoutGroup>
  );
}
