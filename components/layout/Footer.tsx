"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { HOURS, LEGAL, NAV, SITE, bookingUrl } from "@/lib/site";
import { Wordmark, Mark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Instagram, TikTok, ArrowUpRight } from "@/components/ui/Icons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(ref);
      // Giant wordmark letters rise into place as the page ends
      gsap.fromTo(
        q("[data-wm] [data-letter]"),
        { yPercent: 70, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: q("[data-wm]")[0], start: "top bottom", end: "bottom bottom", scrub: 0.8 },
        },
      );
      // Parallax on the info grid so the footer "surfaces" from below
      gsap.fromTo(
        q("[data-foot-inner]"),
        { yPercent: -12 },
        { yPercent: 0, ease: "none", scrollTrigger: { trigger: q("[data-foot-inner]")[0], start: "top bottom", end: "top 40%", scrub: true } },
      );
      // Ambient glow drifts with scroll
      gsap.fromTo(
        q("[data-glow]"),
        { xPercent: -20, opacity: 0.4 },
        { xPercent: 20, opacity: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true } },
      );
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink" id="footer">
      {/* Closing CTA */}
      <section id="footer-cta" className="relative border-t border-line py-[clamp(6rem,14vw,12rem)]">
        <div
          data-glow
          aria-hidden
          className="pointer-events-none absolute -bottom-1/2 left-1/2 aspect-square w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(190_64_23/0.45),transparent)] blur-3xl"
        />
        <div className="wrap relative">
          <p className="eyebrow mb-8 flex items-center gap-3 text-orange-soft">
            <span className="inline-block h-[2px] w-6 -skew-x-[17deg] bg-orange" />
            #MoveTogether
          </p>
          <SplitReveal as="h2" type="chars" className="display max-w-[14ch] text-[clamp(4rem,14vw,15rem)] text-bone">
            Join the <span className="text-orange">movement.</span>
          </SplitReveal>
          <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="lede max-w-md">
              Four super-panoramic courts, early starts and late finishes, seven days a week. Grab three friends and book in seconds on Playtomic.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={bookingUrl("footer_cta")} external icon="external" size="lg">
                Book a court
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div data-foot-inner className="relative">
        <div className="wrap grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line py-16 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="w-10 text-orange">
                <Mark />
              </span>
              <span className="eyebrow text-mute">Padel club · Est. 2026</span>
            </div>
            <p className="mt-6 max-w-sm text-bone/70">
              Court news, league drops and event invites — straight to your inbox. No spam, just padel.
            </p>
            <NewsletterForm className="mt-5 max-w-sm" />
          </div>

          <div className="md:col-span-2 md:col-start-5">
            <h3 className="eyebrow mb-5 text-mute">Visit</h3>
            <address className="not-italic leading-relaxed text-bone/85">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.town}
              <br />
              {SITE.address.postcode}
            </address>
            <a href={SITE.maps} target="_blank" rel="noopener" className="group mt-4 inline-flex items-center gap-1.5 text-sm text-orange-soft">
              <span className="u-sweep">Get directions</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow mb-5 text-mute">Hours</h3>
            <ul className="space-y-3 text-bone/85">
              {HOURS.map((h) => (
                <li key={h.days}>
                  <span className="block text-sm text-mute">{h.days}</span>
                  {h.open} – {h.close}
                </li>
              ))}
            </ul>
            <OpenStatus className="mt-5 text-bone/70" />
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow mb-5 text-mute">Explore</h3>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <TransitionLink href={n.href} className="u-sweep text-bone/85 transition-colors hover:text-bone">
                    {n.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2">
            <h3 className="eyebrow mb-5 text-mute">Contact</h3>
            <ul className="space-y-2.5 text-bone/85">
              <li>
                <a href={`mailto:${SITE.email}`} className="u-sweep">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.phoneHref} className="u-sweep">
                  {SITE.phone}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              <a href={SITE.socials.instagram} target="_blank" rel="noopener" aria-label="BOUNC on Instagram" className="grid size-11 place-items-center rounded-full ring-1 ring-line-2 transition duration-500 hover:bg-orange hover:ring-orange">
                <Instagram className="size-[1.1rem]" />
              </a>
              <a href={SITE.socials.tiktok} target="_blank" rel="noopener" aria-label="BOUNC on TikTok" className="grid size-11 place-items-center rounded-full ring-1 ring-line-2 transition duration-500 hover:bg-orange hover:ring-orange">
                <TikTok className="size-[1.1rem]" />
              </a>
            </div>
          </div>
        </div>

        <div data-wm className="wrap pb-4 text-bone" aria-hidden>
          <Wordmark />
        </div>

        <div className="wrap flex flex-col gap-3 border-t border-line py-6 text-xs text-mute md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} BOUNC. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <TransitionLink href={l.href} className="u-sweep hover:text-bone">
                  {l.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
