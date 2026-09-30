import { HOURS, SITE } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Button } from "@/components/ui/Button";

/** Hours + address + dark map. Used on The Club, Play and Contact. */
export function VisitBlock({ index = "—", title = "Find us." }: { index?: string; title?: string }) {
  return (
    <section className="relative border-t border-line py-[clamp(5rem,10vw,9rem)]" aria-labelledby="visit-title">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index={index} className="mb-8">
            Visit
          </SectionLabel>
          <SplitReveal as="h2" type="chars" id="visit-title" className="display text-[clamp(3rem,6.5vw,7rem)] text-bone">
            {title}
          </SplitReveal>

          <FadeIn stagger={0.08} className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <h3 className="eyebrow mb-3 text-mute">Address</h3>
              <address className="not-italic text-lg leading-relaxed text-bone">
                {SITE.address.line1}, {SITE.address.line2}
                <br />
                {SITE.address.town}
                <br />
                {SITE.address.region} {SITE.address.postcode}
              </address>
            </div>
            <div>
              <h3 className="eyebrow mb-3 text-mute">Hours</h3>
              <ul className="space-y-1 text-lg text-bone">
                {HOURS.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span className="text-bone/60">{h.days}</span>
                    <span>
                      {h.open} – {h.close}
                    </span>
                  </li>
                ))}
              </ul>
              <OpenStatus className="mt-4 text-bone/70" />
            </div>
            <div>
              <h3 className="eyebrow mb-3 text-mute">Getting here</h3>
              <p className="leading-relaxed text-bone/75">
                Free on-site parking, and a short walk from Buckshaw Parkway station — between Chorley and Leyland.
              </p>
            </div>
            <div>
              <h3 className="eyebrow mb-3 text-mute">Talk to us</h3>
              <p className="leading-relaxed text-bone/75">
                <a href={`mailto:${SITE.email}`} className="u-sweep text-bone">
                  {SITE.email}
                </a>
                <br />
                <a href={SITE.phoneHref} className="u-sweep text-bone">
                  {SITE.phone}
                </a>
              </p>
            </div>
          </FadeIn>
          <FadeIn className="mt-10">
            <Button href={SITE.maps} external icon="external">
              Get directions
            </Button>
          </FadeIn>
        </div>

        <FadeIn className="relative min-h-[26rem] overflow-hidden rounded-[1.5rem] bg-ink-3 ring-1 ring-inset ring-line lg:col-span-7">
          <iframe
            title="Map showing BOUNC at Unit K4, Ordnance Road, Buckshaw Village"
            src={SITE.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-dark absolute inset-0 h-full w-full border-0"
          />
          <div className="pointer-events-none absolute inset-0 bg-orange/10 mix-blend-color" />
          <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-ink/80 px-4 py-2 backdrop-blur">
            <span className="eyebrow text-bone">BOUNC · {SITE.address.postcode}</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
