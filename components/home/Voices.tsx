import { IMG } from "@/lib/media";
import { SITE, TESTIMONIALS } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealImage } from "@/components/motion/RevealImage";
import { ArrowUpRight } from "@/components/ui/Icons";

export function Voices() {
  return (
    <section className="relative py-[clamp(5rem,12vw,11rem)]" aria-labelledby="voices-title">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="06" className="mb-8">
            Voices
          </SectionLabel>
          <SplitReveal as="h2" type="chars" id="voices-title" className="display text-[clamp(3rem,6vw,6.5rem)] text-bone">
            Don’t take our <span className="text-orange">word</span> for it.
          </SplitReveal>
          <RevealImage
            src={IMG.playerCheer.src}
            alt={IMG.playerCheer.alt}
            className="mt-12 hidden aspect-[3/4] w-[70%] rounded-[1.25rem] lg:block"
            sizes="28vw"
            reveal="up"
          />
        </div>

        <div className="flex flex-col justify-end gap-6 lg:col-span-7">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <figure className="group relative overflow-hidden rounded-[1.5rem] bg-ink-3 p-8 ring-1 ring-inset ring-line transition-colors duration-700 hover:bg-ink-4 md:p-12">
                <span aria-hidden className="display pointer-events-none absolute -right-2 -top-8 text-[12rem] leading-none text-orange/15 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-2 group-hover:text-orange/30">
                  ”
                </span>
                <blockquote className="relative text-[clamp(1.3rem,2.2vw,2.1rem)] leading-snug tracking-[-0.01em] text-bone">
                  {t.quote}
                </blockquote>
                <figcaption className="relative mt-8 flex items-center gap-4">
                  <span className="display grid size-12 place-items-center rounded-full bg-orange text-xl text-bone">{t.name[0]}</span>
                  <span>
                    <span className="block font-medium text-bone">{t.name}</span>
                    <span className="text-sm text-mute">Player review</span>
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
          <FadeIn>
            <a href={SITE.reviews} target="_blank" rel="noopener" className="group inline-flex items-center gap-2 text-bone/80 transition-colors hover:text-bone">
              <span className="u-sweep">Read more reviews on Google</span>
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
