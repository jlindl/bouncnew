import { IMG } from "@/lib/media";
import { FOUNDER_QUOTE } from "@/lib/site";
import { ScrubText } from "@/components/motion/ScrubText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Counter } from "@/components/motion/Counter";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealImage } from "@/components/motion/RevealImage";

const STATS = [
  { value: 4, pad: 2, suffix: "", label: "Super-panoramic indoor courts" },
  { value: 360, pad: 3, suffix: "°", label: "Perimeter lighting — no glare on the lob" },
  { value: 4, pad: 1, suffix: "K", label: "AI cameras on every court" },
  { value: 5, pad: 1, suffix: "", label: "Food hygiene rating at CUBE" },
];

export function Manifesto() {
  return (
    <section className="relative py-[clamp(5rem,12vw,11rem)]" aria-labelledby="manifesto-label">
      <div className="wrap">
        <SectionLabel index="01" className="mb-10">
          <span id="manifesto-label">The club</span>
        </SectionLabel>

        <ScrubText
          className="max-w-[22ch] font-display text-[clamp(2.1rem,5.4vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.03em] text-bone [font-stretch:92%]"
          parts={[
            "BOUNC is a European-inspired padel club in Buckshaw Village.",
            { img: IMG.courtRally },
            "Four super-panoramic courts,",
            { img: IMG.latteArt },
            "a café worth staying for, and a",
            { em: "community" },
            "built on shared moments",
            { img: IMG.stillHighfive },
            "— not just bookings.",
          ]}
        />

        <div className="mt-[clamp(4rem,9vw,8rem)] grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative">
              <RevealImage src={IMG.playerFocus.src} alt={IMG.playerFocus.alt} className="aspect-[4/5] rounded-[1.25rem]" sizes="(min-width:1024px) 38vw, 100vw" reveal="slant" />
              <span className="eyebrow absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1.5 text-bone backdrop-blur">Shot at BOUNC</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12 lg:col-span-6 lg:col-start-7">
            <FadeIn>
              <blockquote>
                <p className="text-[clamp(1.35rem,2.1vw,2rem)] leading-snug text-bone">
                  <span className="display mr-1 align-[-0.35em] text-[2.8em] leading-none text-orange">“</span>
                  {FOUNDER_QUOTE.quote}
                </p>
                <footer className="mt-6 flex items-center gap-4">
                  <span className="h-px w-10 bg-orange" aria-hidden />
                  <span>
                    <span className="block font-medium text-bone">{FOUNDER_QUOTE.name}</span>
                    <span className="text-sm text-mute">{FOUNDER_QUOTE.role}</span>
                  </span>
                </footer>
              </blockquote>
            </FadeIn>

            <FadeIn stagger={0.1} className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] bg-line">
              {STATS.map((s) => (
                <div key={s.label} className="bg-ink p-6 md:p-8">
                  <p className="display text-[clamp(3.2rem,6vw,5.5rem)] leading-none text-bone">
                    <Counter to={s.value} pad={s.pad} suffix={s.suffix} />
                  </p>
                  <p className="mt-4 max-w-[16ch] text-sm leading-snug text-bone/65">{s.label}</p>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
