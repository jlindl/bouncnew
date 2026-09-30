import { bookingUrl } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)]">
      {/* court lines */}
      <svg aria-hidden viewBox="0 0 200 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full text-line-2">
        <rect x="10" y="10" width="180" height="80" fill="none" stroke="currentColor" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="10" x2="100" y2="90" stroke="currentColor" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
        <line x1="42" y1="10" x2="42" y2="90" stroke="currentColor" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
        <line x1="158" y1="10" x2="158" y2="90" stroke="currentColor" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
        <line x1="42" y1="50" x2="158" y2="50" stroke="currentColor" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
      </svg>
      <span aria-hidden className="absolute right-[12%] top-[22%] size-5 rounded-full bg-[#d7f24a] shadow-[0_0_40px_10px_rgb(215_242_74/0.25)]" />

      <div className="wrap relative">
        <FadeIn trigger="reveal" y={16}>
          <p className="eyebrow text-orange-soft">Error 404</p>
        </FadeIn>
        <SplitReveal as="h1" type="chars" trigger="reveal" className="display mt-6 text-[clamp(4.5rem,15vw,17rem)] text-bone">
          That one’s <span className="text-orange">out.</span>
        </SplitReveal>
        <FadeIn trigger="reveal" delay={0.4} className="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p className="lede max-w-md">The page you’re looking for has left the court. Let’s get you back in play.</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href={bookingUrl("404")} external variant="ghost" icon="external" size="lg">
              Book a court
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
