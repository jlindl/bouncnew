import type { Metadata } from "next";
import { POSTS } from "@/lib/journal";
import { PageHero } from "@/components/sections/PageHero";
import { JournalIndex } from "@/components/journal/JournalIndex";

export const metadata: Metadata = {
  title: "Journal — Padel Guides, Technique & Club News",
  description:
    "Beginner guides, rules, technique and culture from BOUNC, the padel club in Buckshaw Village. Everything you need to play better padel.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title={
          <>
            Read the <span className="text-orange">game.</span>
          </>
        }
        lede="Guides for your first session, the rules in plain English, technique to sharpen your game and stories from the club."
      />
      <section className="pb-[clamp(5rem,10vw,9rem)]" aria-label="Articles">
        <div className="wrap">
          <JournalIndex posts={POSTS} />
        </div>
      </section>
    </>
  );
}
