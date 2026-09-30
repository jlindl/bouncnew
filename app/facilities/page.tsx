import type { Metadata } from "next";
import { IMG } from "@/lib/media";
import { PRICING, bookingUrl } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { StickyFeatures, type Feature } from "@/components/sections/StickyFeatures";
import { HoverList } from "@/components/sections/HoverList";
import { VisitBlock } from "@/components/sections/VisitBlock";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { Marquee } from "@/components/motion/Marquee";
import { Button } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "The Club — Courts & Facilities",
  description:
    "Four super-panoramic indoor padel courts with 360° perimeter lighting and 4K AI cameras, plus the CUBE café, lounge, warm-up area, showers and free parking in Buckshaw Village.",
  alternates: { canonical: "/facilities" },
};

const FEATURES: Feature[] = [
  {
    title: "Super-panoramic courts",
    tag: "4 indoor courts",
    text: "International-standard courts designed for year-round play, performance and enjoyment — whatever the weather. Frameless glass means clear sightlines for players and spectators alike.",
    points: ["Three doubles courts + one singles court", "Uninterrupted panoramic glass", "Premium turf", "Fully indoor, all year"],
    img: "courtRally",
  },
  {
    title: "360° perimeter lighting",
    tag: "Even light, less glare",
    text: "Instead of masts overhead, lighting runs around the perimeter of every court — so the whole court is evenly lit and looking up for a lob doesn’t mean looking into a floodlight.",
    points: ["Evenly lit edge to edge", "Built for evening play", "Designed around the overhead game"],
    img: "stillOverhead",
  },
  {
    title: "4K AI cameras",
    tag: "Every court",
    text: "All four courts are fitted with 4K AI cameras. Ask the team how to make the most of them on your next visit.",
    img: "stillSmash",
  },
  {
    title: "CUBE café",
    tag: "Coffee & desserts",
    text: "Our in-house café serving great coffee, fresh food and post-match rituals worth staying for. Designed as a social hub, not an add-on.",
    points: ["Coffee, waffles & thickshakes", "Vegan & gluten-free desserts", "5 food hygiene rating"],
    img: "latteArt",
  },
  {
    title: "Social & lounge spaces",
    tag: "Watch · Work · Unwind",
    text: "Comfortable, considered spaces to watch games, catch up, work remotely or unwind after a session.",
    points: ["Views onto the courts", "WiFi", "Space to linger"],
    img: "cheers",
  },
  {
    title: "Warm-up & movement area",
    tag: "Prep · Recover",
    text: "Dedicated areas to prep your body, recover properly and move well — before and after play.",
    points: ["Warm up before your slot", "Stretch and recover after"],
    img: "warmupSprint",
  },
  {
    title: "Showers & changing rooms",
    tag: "Straight from court",
    text: "Showers and changing rooms on site, so you can head straight to work, dinner or the café after your game.",
    img: "stillTeammates",
  },
];

const AMENITIES = [
  "Free on-site parking",
  "Showers & changing rooms",
  "Equipment hire",
  "Disabled access",
  "WiFi",
  "CUBE café",
  "Near Buckshaw Parkway station",
  "Indoor, all weather",
];

export default function FacilitiesPage() {
  const d = PRICING.doubles;
  return (
    <>
      <PageHero
        eyebrow="The Club"
        title={
          <>
            Built for play. <span className="text-orange">Made for people.</span>
          </>
        }
        lede="Four super-panoramic indoor courts, a café worth staying for, social spaces, a warm-up zone and showers — all under one roof in Buckshaw Village."
        actions={
          <>
            <Button href={bookingUrl("facilities_hero")} external icon="external" size="lg">
              Book a court
            </Button>
            <Button href="/book" variant="ghost" size="lg">
              Prices
            </Button>
          </>
        }
        media={IMG.courtRally}
      />

      <section className="overflow-hidden border-y border-line bg-ink-2 py-6" aria-hidden>
        <Marquee speed={1.4}>
          {["Super-panoramic glass", "360° perimeter lighting", "4K AI cameras", "Premium turf", "Showers & changing rooms", "CUBE café"].map((t) => (
            <span key={t} className="flex items-center">
              <span className="display-wide px-8 text-[clamp(1.2rem,2.4vw,2rem)] text-bone">{t}</span>
              <span className="w-8 text-orange">
                <Mark />
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      <section className="py-[clamp(5rem,10vw,9rem)]" aria-labelledby="spaces-title">
        <div className="wrap mb-10 lg:mb-4">
          <SectionLabel index="01" className="mb-8">
            Inside BOUNC
          </SectionLabel>
          <SplitReveal as="h2" type="chars" id="spaces-title" className="display max-w-[14ch] text-[clamp(3rem,7vw,7.5rem)] text-bone">
            Every detail, <span className="text-orange">considered.</span>
          </SplitReveal>
        </div>
        <StickyFeatures features={FEATURES} />
      </section>

      <section className="border-t border-line py-[clamp(5rem,10vw,9rem)]" aria-labelledby="courts-list-title">
        <div className="wrap">
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="02" className="mb-8">
                The courts
              </SectionLabel>
              <SplitReveal as="h2" type="chars" id="courts-list-title" className="display text-[clamp(3rem,7vw,7.5rem)] text-bone">
                Pick your <span className="text-orange">stage.</span>
              </SplitReveal>
            </div>
            <FadeIn className="max-w-sm text-bone/70">
              <p>
                Doubles courts from £{d.rates[0].price}/hour — £{d.rates[0].price / d.players} each for four. Singles from £{PRICING.singles.rates[0].price}/hour.
              </p>
            </FadeIn>
          </div>
          <HoverList
            cursorLabel="Book"
            items={[
              { title: "Centre Court", detail: "Our main stage. Super-panoramic glass, 360° lighting, 4K AI camera.", meta: "Doubles · 4 players", img: "courtRally", href: bookingUrl("court_centre") },
              { title: "Court 2", detail: "Super-panoramic doubles court with 360° perimeter lighting.", meta: "Doubles · 4 players", img: "stillHoodie", href: bookingUrl("court_2") },
              { title: "Court 3", detail: "Super-panoramic doubles court with 360° perimeter lighting.", meta: "Doubles · 4 players", img: "stillDoubles", href: bookingUrl("court_3") },
              { title: "Court 4", detail: "Our singles court — perfect for one-on-one sessions and drills.", meta: "Singles · 2 players", img: "fistPump", href: bookingUrl("court_4") },
            ]}
          />
        </div>
      </section>

      <section className="border-t border-line py-[clamp(5rem,10vw,9rem)]" aria-labelledby="amenities-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="03" className="mb-8">
              Good to know
            </SectionLabel>
            <SplitReveal as="h2" type="chars" id="amenities-title" className="display text-[clamp(3rem,6vw,6.5rem)] text-bone">
              All the <span className="text-orange">essentials.</span>
            </SplitReveal>
          </div>
          <FadeIn stagger={0.06} className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-[1.25rem] bg-line lg:col-span-7">
            {AMENITIES.map((a, i) => (
              <div key={a} className="group relative bg-ink p-6 transition-colors duration-500 hover:bg-ink-3 md:p-8">
                <span className="eyebrow text-orange-soft">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-6 font-display text-[clamp(1.1rem,1.6vw,1.45rem)] font-bold leading-tight tracking-[-0.01em] text-bone">{a}</p>
                <span aria-hidden className="absolute right-6 top-6 h-4 w-1.5 origin-bottom -skew-x-[17deg] scale-y-0 bg-orange transition-transform duration-500 group-hover:scale-y-100" />
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <VisitBlock index="04" title="Come and play." />
    </>
  );
}
