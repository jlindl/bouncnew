import type { Metadata } from "next";
import { IMG } from "@/lib/media";
import { PRICING, SITE, bookingUrl } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Faq, type QA } from "@/components/sections/Faq";
import { VisitBlock } from "@/components/sections/VisitBlock";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealImage } from "@/components/motion/RevealImage";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Play — Court Prices & Booking",
  description:
    "Book a padel court at BOUNC on Playtomic. Doubles courts from £48 an hour (£12 each for four), singles from £24, intro sessions from £10. Prices, how booking works and FAQs.",
  alternates: { canonical: "/book" },
};

const STEPS = [
  { n: "01", title: "Open Playtomic", text: "Book on the web or in the Playtomic app — search for BOUNC or tap any Book button on this site." },
  { n: "02", title: "Pick court & time", text: "Choose a doubles court for four or Court 4 for singles, then pick 60, 90 or 120 minutes." },
  { n: "03", title: "Split & play", text: "Invite your players and split the cost in the app. Turn up, warm up, play." },
];

const FAQ: QA[] = [
  {
    q: "I’ve never played padel. Can I still come?",
    a: "Absolutely — most of our players started from zero. ‘Intro to playing padel’ is a 90-minute session for £10 designed for complete beginners. Or book a court with friends and learn together; padel is famously quick to pick up.",
  },
  {
    q: "How many players do I need?",
    a: "Padel is usually played as doubles, so Centre Court, Court 2 and Court 3 are built for four players. Court 4 is our singles court for two. Short of players? Join an Americano — you sign up solo and play with rotating partners.",
  },
  {
    q: "Do I need my own racket?",
    a: "No. Equipment hire is available at the club, so you can play before you buy. When you’re ready, our guide to choosing a first racket will help.",
  },
  {
    q: "What should I wear?",
    a: "Comfortable sportswear and trainers with good grip for artificial turf — padel or tennis shoes with a herringbone or omni sole are ideal. Running shoes aren’t built for side-to-side movement, so they’re best avoided.",
  },
  {
    q: "How do I pay?",
    a: "All bookings are made and paid for on Playtomic, where you can split the court cost between the players in your match.",
  },
  {
    q: "What are your opening hours?",
    a: "Monday to Friday 6:00am – 2:00am, and Saturday to Sunday 5:00am – 3:00am. Live court availability is always on Playtomic.",
  },
  {
    q: "Is there parking, and can I get there by train?",
    a: "Yes — there’s free on-site parking, and we’re a short walk from Buckshaw Parkway station.",
  },
  {
    q: "Are there showers and changing rooms?",
    a: "Yes, there are showers and changing rooms on site, so you can head straight on to work or dinner after your game.",
  },
  {
    q: "Is BOUNC accessible?",
    a: `The club has disabled access. If you have specific access needs, email ${SITE.email} or call ${SITE.phone} before your visit and we’ll help you plan it.`,
  },
];

export default function BookPage() {
  const d = PRICING.doubles;
  const s = PRICING.singles;
  return (
    <>
      <PageHero
        eyebrow="Play"
        title={
          <>
            Book a <span className="text-orange">court.</span>
          </>
        }
        lede="Live availability, instant booking and split payments — all on Playtomic. Doubles courts from £48 an hour: that’s £12 each when you play as four."
        actions={
          <>
            <Button href={bookingUrl("book_hero")} external icon="external" size="lg">
              Book on Playtomic
            </Button>
            <Button href="#prices" variant="ghost" size="lg" icon="arrow">
              See prices
            </Button>
          </>
        }
      />

      <section className="pb-[clamp(5rem,10vw,9rem)]" aria-label="How booking works">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <RevealImage src={IMG.stillHoodie.src} alt={IMG.stillHoodie.alt} className="aspect-[16/10] rounded-[1.5rem] lg:col-span-7" sizes="(min-width:1024px) 58vw, 100vw" reveal="slant" trigger="reveal" delay={0.3} />
          <FadeIn stagger={0.1} className="flex flex-col justify-between gap-4 lg:col-span-5">
            {STEPS.map((st) => (
              <div key={st.n} className="group flex gap-6 rounded-[1.25rem] bg-ink-3 p-6 ring-1 ring-inset ring-line transition-colors duration-500 hover:bg-ink-4 md:p-7">
                <span className="display text-[3.2rem] leading-none text-orange transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1">{st.n}</span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-bone">{st.title}</h3>
                  <p className="mt-2 leading-relaxed text-bone/65">{st.text}</p>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section id="prices" className="scroll-mt-24 border-t border-line py-[clamp(5rem,10vw,9rem)]" aria-labelledby="prices-title">
        <div className="wrap">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="01" className="mb-8">
                Prices
              </SectionLabel>
              <SplitReveal as="h2" type="chars" id="prices-title" className="display text-[clamp(3rem,7vw,7.5rem)] text-bone">
                Simple <span className="text-orange">pricing.</span>
              </SplitReveal>
            </div>
            <FadeIn className="max-w-sm text-sm text-bone/60">
              <p>
                Prices as listed on Playtomic, {PRICING.asOf}. Always check the app for live rates and availability.
              </p>
            </FadeIn>
          </div>

          <FadeIn stagger={0.12} className="mt-14 grid gap-5 lg:grid-cols-12">
            {/* Doubles */}
            <article className="relative overflow-hidden rounded-[1.5rem] bg-orange p-8 text-ink md:p-10 lg:col-span-7">
              <div aria-hidden className="display pointer-events-none absolute -bottom-10 -right-4 text-[14rem] leading-none text-ink/10">
                ×4
              </div>
              <p className="eyebrow text-ink/70">{d.courts}</p>
              <h3 className="display mt-4 text-[clamp(2.6rem,4.5vw,4.5rem)]">{d.name}</h3>
              <p className="mt-2 text-ink/75">Up to {d.players} players</p>
              <ul className="relative mt-10 divide-y divide-ink/15 border-y border-ink/15">
                {d.rates.map((r) => (
                  <li key={r.mins} className="flex items-baseline justify-between gap-4 py-5">
                    <span className="text-lg font-medium">{r.mins} minutes</span>
                    <span className="flex items-baseline gap-4">
                      <span className="text-sm text-ink/65">£{r.price / d.players} per player</span>
                      <span className="display text-[2.6rem] leading-none">£{r.price}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="relative mt-8">
                <Button href={bookingUrl("price_doubles")} external icon="external" variant="dark">
                  Book a doubles court
                </Button>
              </div>
            </article>

            <div className="flex flex-col gap-5 lg:col-span-5">
              {/* Singles */}
              <article className="rounded-[1.5rem] bg-ink-3 p-8 ring-1 ring-inset ring-line md:p-10">
                <p className="eyebrow text-bone/60">{s.courts}</p>
                <h3 className="display mt-4 text-[clamp(2.2rem,3.4vw,3.4rem)] text-bone">{s.name}</h3>
                <div className="mt-8 flex items-baseline justify-between border-t border-line pt-5">
                  <span className="text-lg text-bone">{s.rates[0].mins} minutes</span>
                  <span className="display text-[2.6rem] leading-none text-bone">£{s.rates[0].price}</span>
                </div>
                <div className="mt-8">
                  <Button href={bookingUrl("price_singles")} external icon="external" variant="ghost">
                    Book singles
                  </Button>
                </div>
              </article>
              {/* Sessions */}
              <article className="flex-1 rounded-[1.5rem] bg-ink-3 p-8 ring-1 ring-inset ring-line md:p-10">
                <p className="eyebrow text-bone/60">Sessions & league</p>
                <ul className="mt-5 divide-y divide-line">
                  {PRICING.sessions.map((x) => (
                    <li key={x.name} className="flex items-center justify-between gap-4 py-4">
                      <span>
                        <span className="block font-medium text-bone">{x.name}</span>
                        <span className="text-sm text-bone/55">{x.detail}</span>
                      </span>
                      <span className="display text-[1.9rem] leading-none text-orange">£{x.price}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-line py-[clamp(5rem,10vw,9rem)]" aria-labelledby="faq-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="02" className="mb-8">
              FAQs
            </SectionLabel>
            <SplitReveal as="h2" type="chars" id="faq-title" className="display text-[clamp(3rem,6vw,6rem)] text-bone">
              Good <span className="text-orange">questions.</span>
            </SplitReveal>
            <FadeIn className="mt-8 text-bone/65">
              <p>
                Can’t find your answer?{" "}
                <a href={`mailto:${SITE.email}`} className="u-sweep text-bone">
                  Email the team
                </a>
                .
              </p>
            </FadeIn>
          </div>
          <FadeIn className="lg:col-span-8">
            <Faq items={FAQ} />
          </FadeIn>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            }),
          }}
        />
      </section>

      <VisitBlock index="03" title="See you on court." />
    </>
  );
}
