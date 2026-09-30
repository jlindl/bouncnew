"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { film, onRevealed } from "@/lib/stores";
import { markPath, MARK_W, MARK_H } from "@/lib/mark-clip";
import { VIDEO } from "@/lib/media";
import { bookingUrl } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";

/** Server-safe char split so the headline never jumps on hydration. */
function Chars({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, wi, arr) => (
        <span key={wi} className={`inline-block whitespace-nowrap ${className ?? ""}`}>
          {[...word].map((c, ci) => (
            <span key={ci} data-ch className="inline-block will-change-transform">
              {c}
            </span>
          ))}
          {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </>
  );
}

// Point inside the third bar of the mark: the zoom starts "inside" it.
const ANCHOR_START = { x: 95.5 / MARK_W, y: 0.5 };
const ANCHOR_END = { x: 0.5, y: 0.5 };

export function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const clipEl = q("[data-clip-video]")[0] as HTMLElement;
      const reduced = prefersReducedMotion();

      /* ── Intro, once the curtain lifts ── */
      const intro = gsap.timeline({ paused: true });
      intro
        .set(q("[data-hero-hide]"), { opacity: 1 })
        .fromTo(q("[data-video]"), { scale: 1.35 }, { scale: 1.08, duration: 2.6, ease: "bounc" }, 0)
        .fromTo(q("[data-ch]"), { yPercent: 125, skewX: -22 }, { yPercent: 0, skewX: 0, duration: 1.3, stagger: 0.028, ease: "bounc" }, 0.1)
        .fromTo(q("[data-hero-meta]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, ease: "bounc" }, 0.6)
        .fromTo(q("[data-hero-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "bouncInOut" }, 0.4);
      const unsub = onRevealed(() => intro.play());

      if (reduced) return unsub;

      /* ── Scroll: film collapses into the BOUNC mark ── */
      let vw = 0;
      let vh = 0;
      let w0 = 0;
      let w1 = 0;
      const measure = () => {
        vw = clipEl.clientWidth;
        vh = clipEl.clientHeight;
        w0 = Math.max(vw, vh) * 12;
        w1 = Math.min(vw * (vw < 768 ? 0.62 : 0.34), vh * 0.5 * (MARK_W / MARK_H));
      };
      measure();

      const state = { p: 0 };
      const apply = () => {
        const e = state.p;
        const w = w0 * Math.pow(w1 / w0, e);
        const s = w / MARK_W;
        const ax = ANCHOR_START.x + (ANCHOR_END.x - ANCHOR_START.x) * e;
        const ay = ANCHOR_START.y + (ANCHOR_END.y - ANCHOR_START.y) * e;
        const cy = vh * (0.5 - 0.02 * e);
        clipEl.style.clipPath = e <= 0.001 ? "none" : markPath(s, vw / 2 - ax * w, cy - ay * (w * (MARK_H / MARK_W)));
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
          onRefresh: () => {
            measure();
            apply();
          },
        },
      });
      tl.to(state, { p: 1, duration: 0.62, ease: "power2.inOut", onUpdate: apply }, 0)
        .to(q("[data-line='1']"), { xPercent: -28, opacity: 0, duration: 0.34 }, 0)
        .to(q("[data-line='2']"), { xPercent: 28, opacity: 0, duration: 0.34 }, 0)
        .to(q("[data-hero-fade]"), { opacity: 0, y: -30, duration: 0.2 }, 0)
        .to(q("[data-shade]"), { opacity: 0, duration: 0.4 }, 0.1)
        .fromTo(q("[data-video]"), { scale: 1.08 }, { scale: 1, duration: 0.62 }, 0)
        .fromTo(q("[data-end]"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.18, stagger: 0.05 }, 0.5)
        .fromTo(q("[data-end-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.25 }, 0.52)
        .to({}, { duration: 0.2 });

      return unsub;
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[260svh]" aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Film layer, clipped into the mark on scroll */}
        <div
          data-clip-video
          data-cursor="Play film"
          className="absolute inset-0 cursor-pointer will-change-[clip-path]"
          onClick={() => film.open()}
          role="button"
          tabIndex={-1}
          aria-label="Play the BOUNC film"
        >
          <video
            data-video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={VIDEO.loop.poster}
            aria-hidden
          >
            <source src={VIDEO.loop.webm} type="video/webm" />
            <source src={VIDEO.loop.mp4} type="video/mp4" />
          </video>
          <div data-shade className="absolute inset-0 bg-[linear-gradient(180deg,rgb(7_7_7/0.55)_0%,rgb(7_7_7/0.05)_35%,rgb(7_7_7/0.25)_60%,rgb(7_7_7/0.92)_100%)]" />
          <div data-shade className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_100%,rgb(190_64_23/0.35),transparent)] mix-blend-screen" />
        </div>

        {/* End card around the mark */}
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-[var(--gutter)] md:flex">
          <div data-end className="max-w-[22rem] opacity-0">
            <span className="eyebrow text-orange-soft">01 — Courts</span>
            <p className="display-wide mt-3 text-[clamp(1.4rem,2.2vw,2.4rem)]">Four super-panoramic courts</p>
          </div>
          <div data-end className="max-w-[22rem] text-right opacity-0">
            <span className="eyebrow text-orange-soft">02 — Light</span>
            <p className="display-wide mt-3 text-[clamp(1.4rem,2.2vw,2.4rem)]">360° perimeter lighting</p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-[8svh] flex flex-col items-center gap-4 text-center">
          <span data-end-rule className="block h-px w-40 origin-center bg-line-2" />
          <p data-end className="eyebrow text-bone/70 opacity-0">
            Buckshaw Village · Chorley · Lancashire
          </p>
        </div>

        {/* Headline + chrome */}
        <div className="pointer-events-none relative flex h-full flex-col justify-end pb-[max(2rem,5svh)] pt-[calc(var(--header-h)+1.5rem)]">
          <div className="wrap flex items-start justify-between gap-6" data-hero-fade>
            <p data-hero-meta data-hero-hide className="eyebrow hidden text-bone/70 sm:block">
              (Indoor padel club)
            </p>
            <div data-hero-meta data-hero-hide className="ml-auto">
              <OpenStatus className="text-bone/80" />
            </div>
          </div>

          <div className="mt-auto">
            <h1 className="display wrap text-[11.8vw] md:text-[clamp(2.4rem,10.6vw,13rem)] text-bone" aria-label="Move together. Play your way.">
              <span aria-hidden data-line="1" className="-mb-[0.06em] block overflow-hidden pb-[0.06em] pl-[0.04em]">
                <span data-hero-hide className="block">
                  <Chars text="Move together." />
                </span>
              </span>
              <span aria-hidden data-line="2" className="block overflow-hidden pb-[0.06em] pl-[0.04em] md:pl-[0.55em]">
                <span data-hero-hide className="block">
                  <Chars text="Play" /> <Chars text="your way." className="text-orange" />
                </span>
              </span>
            </h1>

            <div className="wrap mt-6 md:mt-8" data-hero-fade>
              <span data-hero-rule data-hero-hide className="block h-px origin-left bg-line-2" />
              <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <p data-hero-meta data-hero-hide className="max-w-[26rem] text-[1.05rem] leading-relaxed text-bone/80">
                  Four super-panoramic indoor courts, 360° perimeter lighting and the CUBE café — built for play, made for people.
                </p>
                <div data-hero-meta data-hero-hide className="pointer-events-auto flex flex-wrap gap-3">
                  <Button href={bookingUrl("hero")} external icon="external" size="lg">
                    Book a court
                  </Button>
                  <Button onClick={() => film.open()} variant="ghost" icon="play" size="lg">
                    Watch the film
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div data-hero-fade className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
          <span className="eyebrow text-[0.62rem] text-bone/50">Scroll</span>
          <span className="block h-10 w-px bg-line">
            <span className="scroll-cue block h-full w-full bg-orange" />
          </span>
        </div>
      </div>
    </section>
  );
}
