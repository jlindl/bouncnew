import { HomeHero } from "@/components/home/HomeHero";
import { Tapes } from "@/components/home/Tapes";
import { Manifesto } from "@/components/home/Manifesto";
import { Pillars } from "@/components/home/Pillars";
import { Experience } from "@/components/home/Experience";
import { Courts } from "@/components/home/Courts";
import { CubeTeaser } from "@/components/home/CubeTeaser";
import { Voices } from "@/components/home/Voices";
import { FirstTimer } from "@/components/home/FirstTimer";
import { JournalTeaser } from "@/components/home/JournalTeaser";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Tapes />
      <Manifesto />
      <Pillars />
      <Experience />
      <Courts />
      <CubeTeaser />
      <Voices />
      <FirstTimer />
      <JournalTeaser />
    </>
  );
}
