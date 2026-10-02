import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/shop";
import { ProductView } from "@/components/shop/ProductView";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.category}`,
    description: p.description,
    alternates: { canonical: `/shop/${p.slug}` },
    // Demo store: keep out of search results until it sells for real
    robots: { index: false, follow: true },
  };
}

// Complementary picks: rackets → balls/grips/bag, apparel → other apparel, etc.
const PAIRINGS: Record<string, string[]> = {
  Rackets: ["pro-balls", "overgrips", "court-bag", "wristbands"],
  Balls: ["precision-control", "overgrips", "club-bottle", "court-bag"],
  Apparel: ["core-tee", "club-hoodie", "court-cap", "wristbands"],
  Accessories: ["pro-balls", "precision-control", "core-tee", "club-bottle"],
  "Gift cards": ["precision-control", "club-hoodie", "pro-balls", "core-tee"],
};

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PAIRINGS[product.category]
    .filter((s) => s !== product.slug)
    .map((s) => getProduct(s)!)
    .slice(0, 3);

  return (
    <>
      <section className="pt-[calc(var(--header-h)+clamp(1.5rem,4vw,3rem))] lg:pb-[clamp(4rem,8vw,7rem)]">
        <ProductView product={product} />
      </section>

      <section className="border-t border-line py-[clamp(4rem,8vw,7rem)]" aria-labelledby="related-title">
        <div className="wrap">
          <SectionLabel className="mb-8">Complete your kit</SectionLabel>
          <SplitReveal as="h2" type="chars" id="related-title" className="display text-[clamp(2.8rem,6vw,6rem)] text-bone">
            Goes well <span className="text-orange">with.</span>
          </SplitReveal>
          <FadeIn stagger={0.1} className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
