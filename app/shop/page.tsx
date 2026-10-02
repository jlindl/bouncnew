import type { Metadata } from "next";
import Image from "next/image";
import { IMG, type ImgKey } from "@/lib/media";
import { SHIPPING } from "@/lib/shop";
import { ShopHero } from "@/components/shop/ShopHero";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { Marquee } from "@/components/motion/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { Mark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Pro Shop — Rackets, Balls & Club Kit",
  description: "Shop BOUNC padel rackets, balls, apparel and accessories. Order online or collect free at the club in Buckshaw Village.",
  alternates: { canonical: "/shop" },
  // Demo store: keep out of search results until it sells for real
  robots: { index: false, follow: true },
};

const PERKS = [
  { title: "Free club collection", text: "Order online, collect at BOUNC within 24 hours." },
  { title: `Free UK delivery over £${SHIPPING.freeOver}`, text: "Standard delivery in 3–5 working days." },
  { title: "Try before you buy", text: "Demo rackets available to hire at the club." },
  { title: "30-day returns", text: "Unused kit back within 30 days, no fuss." },
];

const SEEN: { img: ImgKey; label: string }[] = [
  { img: "stillRacket", label: "Precision Control" },
  { img: "playerCheer", label: "Core Tee · Bone" },
  { img: "stillTube", label: "Pro Padel Balls" },
  { img: "fistPump", label: "Club Hoodie · Ink" },
  { img: "stillHighfive", label: "Core Tee · Ink" },
  { img: "racketTap", label: "Precision Control" },
];

export default function ShopPage() {
  return (
    <>
      <ShopHero />

      <section className="overflow-hidden bg-orange py-4 text-ink" aria-hidden>
        <Marquee speed={1.8}>
          {["Rackets", "Balls", "Club kit", "Accessories", "Gift cards", "Free club collection"].map((t) => (
            <span key={t} className="flex items-center">
              <span className="display px-8 text-[clamp(2rem,4.5vw,4rem)]">{t}</span>
              <span className="w-10">
                <Mark />
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      <section id="catalogue" className="scroll-mt-24 py-[clamp(4rem,8vw,7rem)]" aria-label="Products">
        <div className="wrap">
          <ShopGrid />
        </div>
      </section>

      <section className="border-t border-line py-[clamp(4rem,8vw,7rem)]" aria-label="Why shop with us">
        <div className="wrap">
        <FadeIn stagger={0.08} className="grid gap-px overflow-hidden rounded-[1.25rem] bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p, i) => (
            <div key={p.title} className="bg-ink p-7 md:p-9">
              <span className="display text-[2.6rem] leading-none text-orange">0{i + 1}</span>
              <h3 className="mt-5 font-display text-xl font-bold text-bone">{p.title}</h3>
              <p className="mt-2 text-bone/60">{p.text}</p>
            </div>
          ))}
        </FadeIn>
        </div>
      </section>

      <section className="border-t border-line py-[clamp(5rem,10vw,9rem)]" aria-labelledby="seen-title">
        <div className="wrap">
          <SectionLabel index="—" className="mb-8">
            In the wild
          </SectionLabel>
          <SplitReveal as="h2" type="chars" id="seen-title" className="display text-[clamp(3rem,7vw,7.5rem)] text-bone">
            Seen at <span className="text-orange">BOUNC.</span>
          </SplitReveal>
        </div>
        <div className="mt-14 overflow-hidden">
          <Marquee speed={1.2} skew={false}>
            {SEEN.map((s) => (
              <figure key={s.img} className="group relative mx-2.5 h-[clamp(18rem,34vw,30rem)] w-[clamp(14rem,26vw,23rem)] shrink-0 overflow-hidden rounded-[1.25rem]">
                <Image src={IMG[s.img].src} alt={IMG[s.img].alt} fill sizes="26vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-110" placeholder="blur" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <figcaption className="eyebrow absolute bottom-4 left-4 text-bone">{s.label}</figcaption>
              </figure>
            ))}
          </Marquee>
        </div>
      </section>
    </>
  );
}
