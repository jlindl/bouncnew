import type { Metadata } from "next";
import Image from "next/image";
import { IMG, type ImgKey } from "@/lib/media";
import { SITE } from "@/lib/site";
import { CubeHero } from "@/components/cafe/CubeHero";
import { HoverList } from "@/components/sections/HoverList";
import { ScrubText } from "@/components/motion/ScrubText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealImage } from "@/components/motion/RevealImage";
import { Marquee } from "@/components/motion/Marquee";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "CUBE — Café & Dessert Space",
  description:
    "CUBE is BOUNC’s in-house café and dessert space in Buckshaw Village: coffee, waffles, pancakes, thickshakes, sundaes and cookie dough, with vegan and gluten-free desserts.",
  alternates: { canonical: "/cafe" },
};

const HUB: { title: string; text: string; img: ImgKey }[] = [
  { title: "Watch the games", text: "Super-panoramic glass means a clear view of the action from the social spaces.", img: "courtRally" },
  { title: "Work between sets", text: "WiFi, good coffee and a comfortable seat. Take the call, then take the court.", img: "coffeePour" },
  { title: "Celebrate", text: "Leagues, Americanos and birthdays all end in the same place: around a table at CUBE.", img: "stillHighfive" },
];

export default function CafePage() {
  return (
    <>
      <CubeHero />

      <section className="overflow-hidden bg-orange py-5 text-ink" aria-hidden>
        <Marquee speed={1.8}>
          {["Coffee", "Waffles", "Pancakes", "Thickshakes", "Sundaes", "Cookie dough", "Vegan & GF desserts"].map((t) => (
            <span key={t} className="flex items-center">
              <span className="display px-8 text-[clamp(2.2rem,5vw,4.5rem)]">{t}</span>
              <span className="size-3 rotate-45 bg-ink" />
            </span>
          ))}
        </Marquee>
      </section>

      <section className="py-[clamp(5rem,12vw,11rem)]" aria-labelledby="cube-story">
        <div className="wrap">
          <SectionLabel index="01" className="mb-10">
            <span id="cube-story">The idea</span>
          </SectionLabel>
          <ScrubText
            className="max-w-[24ch] font-display text-[clamp(2rem,5vw,5.2rem)] font-bold leading-[1.03] tracking-[-0.03em] text-bone [font-stretch:92%]"
            parts={[
              "Most clubs treat the café as an add-on.",
              { img: IMG.waffleCaramel },
              "We built CUBE as a",
              { em: "social hub" },
              "— a place to refuel,",
              { img: IMG.latteArt },
              "catch up and replay every point.",
            ]}
          />
        </div>
      </section>

      <section id="menu" className="scroll-mt-24 border-t border-line py-[clamp(5rem,10vw,9rem)]" aria-labelledby="menu-title">
        <div className="wrap">
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="02" className="mb-8">
                On the menu
              </SectionLabel>
              <SplitReveal as="h2" type="chars" id="menu-title" className="display text-[clamp(3rem,7vw,7.5rem)] text-bone">
                Fuel, <span className="text-orange">sweetened.</span>
              </SplitReveal>
            </div>
            <FadeIn className="max-w-sm text-bone/65">
              <p>A taste of what CUBE serves. The menu changes — follow @cubedesserts for what’s on today.</p>
            </FadeIn>
          </div>
          <HoverList
            cursorLabel="Yum"
            items={[
              { title: "Coffee", detail: "Good coffee, made properly — the pre-match ritual.", img: "espresso" },
              { title: "Waffles", detail: "Loaded, drizzled and made to share (or not).", img: "waffleCaramel" },
              { title: "Pancakes", detail: "Stacked high with sauces and toppings.", img: "pancakes" },
              { title: "Thickshakes", detail: "Properly thick. Straws optional.", img: "shakesPair" },
              { title: "Sundaes", detail: "Scoops, sauces, wafers — the full works.", img: "sundae" },
              { title: "Cookie dough", detail: "Warm, gooey and dangerously good after a long set.", img: "cookies" },
            ]}
          />
          <FadeIn className="mt-10 flex flex-wrap gap-2">
            {["Vegan desserts", "Gluten-free desserts", "5 food hygiene rating"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-full bg-ink-3 px-4 py-2 text-sm text-bone/80 ring-1 ring-inset ring-line">
                <span aria-hidden className="h-2.5 w-1 -skew-x-[17deg] bg-orange" />
                {t}
              </span>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-line py-[clamp(5rem,10vw,9rem)]" aria-labelledby="hub-title">
        <div className="wrap">
          <SectionLabel index="03" className="mb-8">
            The social hub
          </SectionLabel>
          <SplitReveal as="h2" type="chars" id="hub-title" className="display max-w-[14ch] text-[clamp(3rem,7vw,7.5rem)] text-bone">
            Come for the game. <span className="text-orange">Stay for the rest.</span>
          </SplitReveal>
          <FadeIn stagger={0.12} className="mt-16 grid gap-5 md:grid-cols-3">
            {HUB.map((h) => (
              <article key={h.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={IMG[h.img].src}
                    alt={IMG[h.img].alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-110"
                    placeholder="blur"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <h3 className="display absolute inset-x-6 bottom-6 text-[clamp(2rem,3vw,2.8rem)] text-bone">{h.title}</h3>
                </div>
                <p className="mt-5 max-w-sm leading-relaxed text-bone/65">{h.text}</p>
              </article>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-line py-[clamp(5rem,10vw,9rem)]" aria-labelledby="ig-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <RevealImage src={IMG.shakeChoc.src} alt={IMG.shakeChoc.alt} className="aspect-[3/4] rounded-[1.25rem]" sizes="25vw" />
            <RevealImage src={IMG.waffleBerries.src} alt={IMG.waffleBerries.alt} className="mt-16 aspect-[3/4] rounded-[1.25rem]" sizes="25vw" delay={0.15} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionLabel index="04" className="mb-8">
              Follow CUBE
            </SectionLabel>
            <SplitReveal as="h2" type="chars" id="ig-title" className="display text-[clamp(3rem,6vw,6rem)] text-bone">
              See what’s <span className="text-orange">fresh.</span>
            </SplitReveal>
            <FadeIn className="mt-8">
              <p className="lede max-w-md">New specials, seasonal drops and the occasional too-good-to-share creation — all on Instagram first.</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href={SITE.socials.cube} external icon="external" size="lg">
                  Follow @cubedesserts
                </Button>
                <Button href="/facilities" variant="ghost" size="lg">
                  Explore the club
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
