import type { Metadata } from "next";
import { SITE, bookingUrl } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { VisitBlock } from "@/components/sections/VisitBlock";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Instagram, Mail, Phone, TikTok } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with BOUNC — bookings, sessions, events and CUBE café. Email hello@bounc.uk or call 01257 444145.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Call", value: SITE.phone, href: SITE.phoneHref },
  { icon: Instagram, label: "Instagram", value: "@bounc.pdl", href: SITE.socials.instagram },
  { icon: TikTok, label: "TikTok", value: "@bounc.pdl", href: SITE.socials.tiktok },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Say <span className="text-orange">hello.</span>
          </>
        }
        lede="Questions about booking, sessions, events or CUBE? Drop us a message and the team will get back to you. Just want a court? Playtomic is quickest."
        actions={
          <Button href={bookingUrl("contact_hero")} external icon="external" size="lg">
            Book a court
          </Button>
        }
      />

      <section className="pb-[clamp(5rem,10vw,9rem)]" aria-label="Contact form and details">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <FadeIn trigger="reveal" delay={0.4} className="lg:col-span-7">
            <ContactForm />
          </FadeIn>
          <FadeIn stagger={0.08} trigger="reveal" className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
            {CHANNELS.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener" : undefined}
                className="group flex items-center gap-5 rounded-[1.25rem] bg-ink-3 p-5 ring-1 ring-inset ring-line transition-colors duration-500 hover:bg-orange"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink/40 text-bone transition-colors duration-500 group-hover:bg-ink/20">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="eyebrow block text-mute transition-colors duration-500 group-hover:text-ink/70">{label}</span>
                  <span className="mt-1 block truncate text-lg text-bone">{value}</span>
                </span>
              </a>
            ))}
          </FadeIn>
        </div>
      </section>

      <VisitBlock index="—" title="Find us." />
    </>
  );
}
