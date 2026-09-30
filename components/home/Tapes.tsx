import { Fragment } from "react";
import { Marquee } from "@/components/motion/Marquee";
import { Mark } from "@/components/ui/Logo";

const PILLARS = ["Movement", "Community", "Experience", "Culture"];
const CHANT = ["Book", "Play", "Repeat", "#MoveTogether"];

/** Two crossing marquee tapes, like tape across a motion-graphics frame. */
export function Tapes() {
  return (
    <section aria-label="BOUNC pillars" className="relative z-10 overflow-hidden py-[clamp(4rem,9vw,8rem)]">
      <div className="relative -mx-[5vw] rotate-[3deg] bg-bone py-3 text-ink md:py-4">
        <Marquee reverse speed={1.6}>
          {CHANT.concat(CHANT).map((w, i) => (
            <Fragment key={i}>
              <span className="display-wide px-6 text-[clamp(1.1rem,2vw,1.8rem)]">{w}</span>
              <span className="size-2 rotate-45 bg-orange" aria-hidden />
            </Fragment>
          ))}
        </Marquee>
      </div>
      <div className="relative -mx-[5vw] -mt-6 -rotate-[2.5deg] bg-orange py-4 text-bone shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] md:-mt-10 md:py-6">
        <Marquee speed={2}>
          {PILLARS.concat(PILLARS).map((w, i) => (
            <Fragment key={i}>
              <span className="display px-8 text-[clamp(3rem,8vw,7.5rem)]">{w}</span>
              <span className="w-[clamp(2.5rem,5vw,4.5rem)] text-ink" aria-hidden>
                <Mark />
              </span>
            </Fragment>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
