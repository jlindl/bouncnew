import type { ReactNode } from "react";
import { IMG } from "@/lib/media";
import { slugify, type Block } from "@/lib/journal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealImage } from "@/components/motion/RevealImage";

/** Minimal inline formatting: **bold** and [label](href). */
function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("/") ? (
        <TransitionLink key={i} href={href}>
          {label}
        </TransitionLink>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener">
          {label}
        </a>
      );
    }
    return part;
  });
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-bounc">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{inline(b.text)}</p>;
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)}>
                {b.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <FadeIn key={i} as="figure" className="!my-14 border-l-2 border-orange pl-6 md:pl-8">
                <blockquote className="font-display text-[clamp(1.5rem,2.6vw,2.3rem)] font-bold italic leading-[1.15] tracking-[-0.02em] text-bone">
                  “{b.text}”
                </blockquote>
                {b.cite && <figcaption className="eyebrow mt-5 text-orange-soft">— {b.cite}</figcaption>}
              </FadeIn>
            );
          case "image":
            return (
              <figure key={i} className="!my-14 md:-mx-16">
                <RevealImage src={IMG[b.img].src} alt={IMG[b.img].alt} className="aspect-[16/9] rounded-[1.25rem]" sizes="(min-width: 1024px) 60vw, 100vw" reveal="slant" />
                {b.caption && <figcaption className="mt-3 text-sm text-mute">{b.caption}</figcaption>}
              </figure>
            );
          case "callout":
            return (
              <aside key={i} className="relative !mt-14 overflow-hidden rounded-[1.25rem] bg-orange p-8 text-ink md:p-10">
                <span aria-hidden className="display pointer-events-none absolute -right-3 -top-6 text-[9rem] leading-none text-ink/10">
                  !
                </span>
                <p className="display text-[clamp(1.8rem,3vw,2.6rem)] text-ink">{b.title}</p>
                <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-ink/80">{b.text}</p>
                {b.cta && (
                  <div className="mt-6">
                    <Button href={b.cta.href} variant="dark">
                      {b.cta.label}
                    </Button>
                  </div>
                )}
              </aside>
            );
        }
      })}
    </div>
  );
}

export function tocFrom(blocks: Block[]) {
  return blocks.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2").map((b) => ({ id: slugify(b.text), text: b.text }));
}

