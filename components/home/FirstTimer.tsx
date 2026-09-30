import Image from "next/image";
import { IMG, type ImgKey } from "@/lib/media";
import { bookingUrl } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

const STEPS: { title: string; text: string; img: ImgKey }[] = [
  {
    title: "Book an intro",
    text: "‘Intro to playing padel’ is 90 minutes for £10 and built for complete beginners. Or grab three friends and book a court.",
    img: "stillRacket",
  },
  {
    title: "Turn up",
    text: "Wear trainers with good grip and kit you can move in. No racket? Equipment hire is available at the club.",
    img: "stillFootwork",
  },
  {
    title: "Play your way",
    text: "Serve, walls, scoring — you’ll have it in minutes. Then it’s rallies, laughs and a coffee at CUBE.",
    img: "stillCheer",
  },
];

export function FirstTimer() {
  return (
    <section className="relative border-t border-line py-[clamp(5rem,12vw,11rem)]" aria-labelledby="first-title">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="07" className="mb-8">
              First time?
            </SectionLabel>
            <SplitReveal as="h2" type="chars" id="first-title" className="display text-[clamp(3rem,7vw,7.5rem)] text-bone">
              New to padel? <br className="hidden md:block" />
              <span className="text-orange">Start here.</span>
            </SplitReveal>
          </div>
          <FadeIn className="flex flex-wrap gap-3">
            <Button href={bookingUrl("first_timer")} external icon="external">
              Book an intro
            </Button>
            <Button href="/journal/first-padel-session" variant="ghost">
              Beginner’s guide
            </Button>
          </FadeIn>
        </div>

        <FadeIn stagger={0.12} className="mt-16 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <article key={s.title} className="group relative overflow-hidden rounded-[1.5rem] bg-ink-3 ring-1 ring-inset ring-line">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={IMG[s.img].src}
                  alt={IMG[s.img].alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-110"
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-3 via-ink-3/10 to-transparent" />
              </div>
              <div className="relative -mt-10 p-7 md:p-8">
                <span className="display text-[4.5rem] leading-none text-orange">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.02em] text-bone">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-bone/65">{s.text}</p>
              </div>
            </article>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
