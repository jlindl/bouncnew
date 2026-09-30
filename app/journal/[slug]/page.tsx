import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IMG } from "@/lib/media";
import { POSTS, formatDate, getPost, readingTime } from "@/lib/journal";
import { SITE, bookingUrl } from "@/lib/site";
import { ArticleBody, tocFrom } from "@/components/journal/ArticleBody";
import { ArticleToc, CopyLink, ReadingProgress } from "@/components/journal/ArticleChrome";
import { PostCard } from "@/components/journal/PostCard";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealImage } from "@/components/motion/RevealImage";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  const cover = IMG[post.cover].src;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: cover.src, width: cover.width, height: cover.height }],
    },
  };
}

export default async function PostPage(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const idx = POSTS.findIndex((p) => p.slug === post.slug);
  const next = POSTS[(idx + 1) % POSTS.length];
  const related = POSTS.filter((p) => p.slug !== post.slug && p.slug !== next.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);
  const toc = tocFrom(post.body);
  const cover = IMG[post.cover];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "BOUNC" },
    publisher: { "@type": "Organization", name: "BOUNC", url: SITE.url },
    image: `${SITE.url}${cover.src.src}`,
    mainEntityOfPage: `${SITE.url}/journal/${post.slug}`,
  };

  return (
    <article>
      <ReadingProgress target="#article-body" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="wrap pb-12 pt-[calc(var(--header-h)+clamp(2.5rem,7vw,6rem))]">
        <FadeIn trigger="reveal" y={16} className="flex flex-wrap items-center gap-4">
          <TransitionLink href="/journal" className="group inline-flex items-center gap-2 text-sm text-bone/70 transition-colors hover:text-bone">
            <ArrowRight className="size-4 rotate-180 transition-transform duration-500 group-hover:-translate-x-1" />
            <span className="u-sweep">Journal</span>
          </TransitionLink>
          <span aria-hidden className="h-3 w-px bg-line-2" />
          <span className="eyebrow rounded-full bg-orange px-3 py-1.5 text-bone">{post.category}</span>
        </FadeIn>
        <SplitReveal as="h1" type="words" trigger="reveal" className="mt-8 max-w-[20ch] font-display text-[clamp(2.6rem,6.2vw,6.4rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-bone [font-stretch:88%]">
          {post.title}
        </SplitReveal>
        <FadeIn trigger="reveal" delay={0.4} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-bone/60">
          <span>By the BOUNC team</span>
          <span aria-hidden className="h-3 w-px bg-line-2" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden className="h-3 w-px bg-line-2" />
          <span>{readingTime(post)} min read</span>
        </FadeIn>
      </header>

      <div className="wrap">
        <RevealImage src={cover.src} alt={cover.alt} preload className="aspect-[16/9] rounded-[1.5rem] md:aspect-[21/9]" sizes="100vw" trigger="reveal" delay={0.25} />
      </div>

      <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-[calc(var(--header-h)+2rem)] space-y-10">
            <ArticleToc items={toc} />
            <div>
              <p className="eyebrow mb-4 text-mute">Share</p>
              <CopyLink />
            </div>
          </div>
        </aside>

        <div id="article-body" className="lg:col-span-7 lg:col-start-5">
          <p className="mb-10 text-[clamp(1.25rem,1.8vw,1.55rem)] leading-snug text-bone">{post.excerpt}</p>
          <ArticleBody blocks={post.body} />

          <div className="mt-16 flex flex-col gap-6 rounded-[1.5rem] bg-ink-3 p-8 ring-1 ring-inset ring-line md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="display text-[clamp(2rem,3.2vw,2.8rem)] text-bone">Ready to play?</p>
              <p className="mt-2 text-bone/65">Four super-panoramic courts. Book in seconds on Playtomic.</p>
            </div>
            <Button href={bookingUrl(`journal_${post.slug}`)} external icon="external">
              Book a court
            </Button>
          </div>
        </div>
      </div>

      <section className="border-t border-line" aria-label="Next article">
        <TransitionLink href={`/journal/${next.slug}`} data-cursor="Next" className="wrap group grid gap-8 py-16 md:grid-cols-12 md:items-center md:py-24">
          <div className="md:col-span-8">
            <p className="eyebrow text-orange-soft">Up next · {next.category}</p>
            <p className="mt-5 font-display text-[clamp(2rem,4.6vw,4.6rem)] font-extrabold leading-[1] tracking-[-0.035em] text-bone transition-colors duration-500 group-hover:text-orange [font-stretch:88%]">
              {next.title}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] md:col-span-4">
            <RevealImage src={IMG[next.cover].src} alt={IMG[next.cover].alt} className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-105" sizes="33vw" reveal="none" />
          </div>
        </TransitionLink>
      </section>

      <section className="border-t border-line py-[clamp(4rem,8vw,7rem)]" aria-labelledby="related-title">
        <div className="wrap">
          <SectionLabel className="mb-10">
            <span id="related-title">Keep reading</span>
          </SectionLabel>
          <FadeIn stagger={0.1} className="grid gap-x-6 gap-y-14 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </FadeIn>
        </div>
      </section>
    </article>
  );
}
