import type { Metadata } from "next";
import Image from "next/image";
import { IMG, type ImgKey } from "@/lib/media";
import { SITE, bookingUrl } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { HoverList } from "@/components/sections/HoverList";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Instagram } from "@/components/ui/Icons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Community — Americanos, Leagues & Events",
  description:
    "Intro sessions, Americanos, the BOUNC Community League, academy grading and events. Padel at BOUNC is built around shared moments, not just bookings.",
  alternates: { canonical: "/community" },
};

const AMERICANO = [
  { n: "01", t: "Sign up solo", d: "No four needed — join on Playtomic on your own." },
  { n: "02", t: "New partner each round", d: "Play short matches, rotating partners and opponents." },
  { n: "03", t: "Every point counts", d: "Points you win go on your own running total." },
  { n: "04", t: "Top of the table", d: "Most points wins. Then everyone heads to CUBE." },
];

const WALL: { img: ImgKey; cls: string }[] = [
  { img: "stillHighfive", cls: "col-span-2 row-span-2" },
  { img: "playerCheer", cls: "row-span-2" },
  { img: "stillTube", cls: "" },
  { img: "racketTap", cls: "" },
  { img: "fistPump", cls: "row-span-2" },
  { img: "stillDoubles", cls: "col-span-2" },
  { img: "doublesHandshake", cls: "row-span-2" },
  { img: "stillFootwork", cls: "" },
  { img: "stillNet", cls: "" },
];

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Community"
        title={
          <>
            Shared moments, <span className="text-orange">not just bookings.</span>
          </>
        }
        lede="From your very first rally to league night, there’s a session for every level. Sign up solo, meet your people, and make it a habit."
        actions={
          <>
            <Button href={bookingUrl("community_hero")} external icon="external" size="lg">
              Find a session
            </Button>
            <Button href={SITE.socials.instagram} external variant="ghost" size="lg" icon="external">
              @bounc.pdl
            </Button>
          </>
        }
        media={IMG.stillHighfive}
      />

      <section className="py-[clamp(5rem,10vw,9rem)]" aria-labelledby="programmes-title">
        <div className="wrap">
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="01" className="mb-8">
                Ways to play
              </SectionLabel>
              <SplitReveal as="h2" type="chars" id="programmes-title" className="display text-[clamp(3rem,7vw,7.5rem)] text-bone">
                Find your <span className="text-orange">level.</span>
              </SplitReveal>
            </div>
            <FadeIn className="max-w-sm text-bone/65">
              <p>All sessions are listed and booked on Playtomic under BOUNC. Prices as listed in September 2026.</p>
            </FadeIn>
          </div>
          <HoverList
            cursorLabel="Join"
            items={[
              {
                title: "Intro to padel",
                detail: "90 minutes covering the serve, the walls and scoring. Built for complete beginners.",
                price: "£10",
                meta: "90 min · Beginners",
                img: "stillRacket",
                href: bookingUrl("community_intro"),
              },
              {
                title: "Americanos",
                detail: "Social sessions with rotating partners — Mixed, Ladies Beginners and Next Level formats.",
                price: "£15",
                meta: "60 min · All levels",
                img: "stillDoubles",
                href: bookingUrl("community_americano"),
              },
              {
                title: "Community League",
                detail: "The BOUNC Community League runs at weekends — competitive, friendly and 24 places per session.",
                price: "£10",
                meta: "Sat & Sun · 11:00",
                img: "stillHoodie",
                href: bookingUrl("community_league"),
              },
              {
                title: "Academy grading",
                detail: "Find your level with a BOUNC Academy grading session for levels 1.5–2.8.",
                price: "£20",
                meta: "Levels 1.5–2.8",
                img: "stillOverhead",
                href: bookingUrl("community_academy"),
              },
              {
                title: "Events & celebrations",
                detail: "Socials, live events, birthdays and team days. Tell us what you’re planning and we’ll help you make it happen.",
                meta: "Get in touch",
                img: "playerCheer",
                href: "/contact",
              },
            ]}
          />
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-[clamp(5rem,10vw,9rem)]" aria-labelledby="americano-title">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel index="02" className="mb-8">
                Americano 101
              </SectionLabel>
              <SplitReveal as="h2" type="chars" id="americano-title" className="display text-[clamp(3rem,6vw,6.5rem)] text-bone">
                The social <span className="text-orange">mixer.</span>
              </SplitReveal>
              <FadeIn className="mt-8">
                <p className="lede max-w-md">Padel’s most social format — and the easiest way to find regular playing partners.</p>
                <div className="mt-8">
                  <Button href="/journal/americano-explained" variant="ghost">
                    Read the full guide
                  </Button>
                </div>
              </FadeIn>
            </div>
            <FadeIn stagger={0.1} className="grid gap-px self-end overflow-hidden rounded-[1.25rem] bg-line sm:grid-cols-2 lg:col-span-7">
              {AMERICANO.map((a) => (
                <div key={a.n} className="bg-ink-2 p-7 md:p-9">
                  <span className="display text-[3.5rem] leading-none text-orange">{a.n}</span>
                  <h3 className="mt-5 font-display text-xl font-bold text-bone">{a.t}</h3>
                  <p className="mt-2 text-bone/65">{a.d}</p>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-[clamp(5rem,10vw,9rem)]" aria-labelledby="wall-title">
        <div className="wrap">
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="03" className="mb-8">
                #MoveTogether
              </SectionLabel>
              <SplitReveal as="h2" type="chars" id="wall-title" className="display text-[clamp(3rem,7vw,7.5rem)] text-bone">
                The <span className="text-orange">wall.</span>
              </SplitReveal>
            </div>
            <FadeIn>
              <Button href={SITE.socials.instagram} external icon="external">
                Follow on Instagram
              </Button>
            </FadeIn>
          </div>
          <FadeIn stagger={0.06} className="grid grid-flow-row-dense auto-rows-[clamp(9rem,17vw,16rem)] grid-cols-2 gap-3 md:grid-cols-4">
            {WALL.map((w) => (
              <a
                key={w.img}
                href={SITE.socials.instagram}
                target="_blank"
                rel="noopener"
                data-cursor="Follow"
                className={`group relative overflow-hidden rounded-[1rem] ${w.cls}`}
                aria-label={`${IMG[w.img].alt} — view BOUNC on Instagram`}
              >
                <Image src={IMG[w.img].src} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-110" placeholder="blur" />
                <div className="absolute inset-0 grid place-items-center bg-orange/0 transition-colors duration-500 group-hover:bg-orange/70">
                  <Instagram className="size-8 scale-50 text-bone opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
                </div>
              </a>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-line py-[clamp(5rem,10vw,9rem)]" aria-labelledby="news-title">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="04" className="mb-8">
              Stay in the loop
            </SectionLabel>
            <SplitReveal as="h2" type="chars" id="news-title" className="display text-[clamp(3rem,6.5vw,7rem)] text-bone">
              First to <span className="text-orange">know.</span>
            </SplitReveal>
          </div>
          <FadeIn className="lg:col-span-5">
            <p className="lede">League drops, new sessions and event invites — straight to your inbox.</p>
            <NewsletterForm className="mt-6" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
