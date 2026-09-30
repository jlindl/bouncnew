import Image from "next/image";
import { IMG } from "@/lib/media";
import { formatDate, readingTime, type Post } from "@/lib/journal";
import { cn } from "@/lib/cn";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ArrowUpRight } from "@/components/ui/Icons";

export function PostCard({ post, featured, className }: { post: Post; featured?: boolean; className?: string }) {
  const img = IMG[post.cover];
  return (
    <TransitionLink href={`/journal/${post.slug}`} data-cursor="Read" className={cn("group block", className)}>
      <div className={cn("relative overflow-hidden rounded-[1.25rem] bg-ink-3", featured ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-orange opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-50" />
        <span className="eyebrow absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1.5 text-bone backdrop-blur">{post.category}</span>
        <span className="absolute bottom-4 right-4 grid size-11 translate-y-3 place-items-center rounded-full bg-bone text-ink opacity-0 transition-all duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="mt-5 flex items-center gap-3 text-sm text-mute">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden className="h-3 w-px bg-line-2" />
        <span>{readingTime(post)} min read</span>
      </div>
      <h3
        className={cn(
          "mt-3 font-display font-bold leading-[1.1] tracking-[-0.02em] text-bone",
          featured ? "text-[clamp(1.8rem,3vw,3rem)]" : "text-[clamp(1.3rem,1.7vw,1.6rem)]",
        )}
      >
        <span className="u-sweep pb-0.5">{post.title}</span>
      </h3>
      <p className={cn("mt-3 leading-relaxed text-bone/60", featured ? "max-w-xl text-lg" : "line-clamp-2")}>{post.excerpt}</p>
    </TransitionLink>
  );
}
