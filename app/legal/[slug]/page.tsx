import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeIn } from "@/components/motion/FadeIn";

type Doc = { title: string; updated: string; body: ReactNode };

const EMAIL = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

const DOCS: Record<string, Doc> = {
  privacy: {
    title: "Privacy Policy",
    updated: "September 2026",
    body: (
      <>
        <p>
          This policy explains how BOUNC (“we”, “us”) handles personal information collected through this website. If you have any questions, contact us at {EMAIL}.
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Contact form:</strong> your name, email address, optional phone number, the topic you choose and your message.
          </li>
          <li>
            <strong>Newsletter:</strong> your email address, if you choose to subscribe.
          </li>
        </ul>
        <h2>How we use it</h2>
        <p>
          We use contact form details only to reply to your enquiry. If you subscribe to our newsletter, we use your email address to send club news, league
          and event updates. You can unsubscribe at any time.
        </p>
        <h2>Bookings</h2>
        <p>
          Court bookings and payments are handled by Playtomic. When you book, Playtomic processes your information under its own privacy policy.
        </p>
        <h2>Third-party content</h2>
        <p>
          Our contact pages include an embedded Google Map, and we link to Instagram, TikTok and Google. These services may collect information under their own
          policies when you interact with them.
        </p>
        <h2>Cookies and storage</h2>
        <p>
          This site does not use advertising cookies. We use your browser’s session storage to remember that you have seen our intro animation during your
          visit.
        </p>
        <h2>Your rights</h2>
        <p>
          Under UK data protection law you can ask to access, correct or delete the personal information we hold about you, or object to how we use it. Email{" "}
          {EMAIL} and we will respond. You also have the right to complain to the Information Commissioner’s Office (ico.org.uk).
        </p>
      </>
    ),
  },
  terms: {
    title: "Terms & Conditions",
    updated: "September 2026",
    body: (
      <>
        <p>These terms cover your use of the BOUNC website. By using the site you agree to them.</p>
        <h2>Bookings</h2>
        <p>
          Court bookings, sessions and leagues are booked and paid for through Playtomic and are subject to Playtomic’s terms and any club rules shown at the
          time of booking. Prices shown on this website are for guidance; the price shown in Playtomic when you book is the one that applies.
        </p>
        <h2>Information on this site</h2>
        <p>
          We work to keep the information on this website accurate and up to date, including opening hours, prices and session details, but it may change. If
          something matters to your plans, check Playtomic or contact us at {EMAIL}.
        </p>
        <h2>Content</h2>
        <p>The BOUNC name, logo, photography, film and written content on this site belong to BOUNC or are used under licence. Please don’t reuse them without permission.</p>
        <h2>Links</h2>
        <p>We link to other services such as Playtomic, Instagram and Google Maps. We aren’t responsible for their content or how they operate.</p>
        <h2>Contact</h2>
        <p>
          BOUNC, {SITE.address.line1}, {SITE.address.line2}, {SITE.address.town}, {SITE.address.postcode}. Email {EMAIL}.
        </p>
      </>
    ),
  },
  accessibility: {
    title: "Accessibility Statement",
    updated: "September 2026",
    body: (
      <>
        <p>We want everyone to be able to use this website and enjoy the club. This site is designed with the Web Content Accessibility Guidelines (WCAG) 2.2, level AA, as its target.</p>
        <h2>What we’ve done</h2>
        <ul>
          <li>Semantic headings, landmarks and a “skip to content” link on every page.</li>
          <li>Full keyboard navigation with visible focus states.</li>
          <li>Text alternatives for meaningful images, and decorative images hidden from assistive technology.</li>
          <li>
            Respect for your device’s <strong>reduced motion</strong> setting: smooth scrolling, the intro and scroll animations are switched off, and content
            is shown immediately.
          </li>
          <li>The custom cursor only appears on devices with a precise pointer, and never replaces the text cursor in form fields.</li>
        </ul>
        <h2>At the club</h2>
        <p>
          The club has disabled access. If you have specific access needs, contact us before your visit at {EMAIL} or on {SITE.phone} and we’ll help you plan it.
        </p>
        <h2>Feedback</h2>
        <p>If you find something on this site that’s hard to use, please tell us at {EMAIL}. We’ll do our best to fix it.</p>
      </>
    ),
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const doc = DOCS[slug];
  return doc ? { title: doc.title, alternates: { canonical: `/legal/${slug}` } } : {};
}

export default async function LegalPage(props: PageProps<"/legal/[slug]">) {
  const { slug } = await props.params;
  const doc = DOCS[slug];
  if (!doc) notFound();

  return (
    <section className="wrap pb-[clamp(5rem,10vw,9rem)] pt-[calc(var(--header-h)+clamp(3rem,8vw,7rem))]">
      <FadeIn trigger="reveal" y={16}>
        <p className="eyebrow flex items-center gap-3 text-bone/60">
          <span aria-hidden className="inline-block h-[2px] w-6 -skew-x-[17deg] bg-orange" />
          Last updated {doc.updated}
        </p>
      </FadeIn>
      <SplitReveal as="h1" type="chars" trigger="reveal" className="display mt-8 max-w-[14ch] text-[clamp(3.4rem,9vw,9rem)] text-bone">
        {doc.title}
      </SplitReveal>
      <FadeIn trigger="reveal" delay={0.3} className="prose-bounc mt-14 max-w-3xl">
        {doc.body}
      </FadeIn>
    </section>
  );
}
