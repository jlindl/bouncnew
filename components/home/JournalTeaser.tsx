import { POSTS } from "@/lib/journal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { PostCard } from "@/components/journal/PostCard";

export function JournalTeaser() {
  const posts = POSTS.slice(0, 3);
  return (
    <section className="relative border-t border-line py-[clamp(5rem,12vw,11rem)]" aria-labelledby="journal-title">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="08" className="mb-8">
              The Journal
            </SectionLabel>
            <SplitReveal as="h2" type="chars" id="journal-title" className="display text-[clamp(3rem,7vw,7.5rem)] text-bone">
              Read the <span className="text-orange">game.</span>
            </SplitReveal>
          </div>
          <FadeIn>
            <Button href="/journal" variant="ghost">
              All articles
            </Button>
          </FadeIn>
        </div>
        <FadeIn stagger={0.12} className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
