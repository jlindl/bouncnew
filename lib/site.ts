export const SITE = {
  name: "BOUNC",
  url: "https://www.bounc.uk",
  tagline: "Move together. Play your way.",
  description:
    "Four super-panoramic indoor padel courts, 360° perimeter lighting and the CUBE café in Buckshaw Village, Chorley. Book a court on Playtomic.",
  email: "hello@bounc.uk",
  phone: "01257 444145",
  phoneHref: "tel:+441257444145",
  address: {
    line1: "Unit K4",
    line2: "Ordnance Road",
    town: "Buckshaw Village",
    region: "Chorley, Lancashire",
    postcode: "PR7 7EL",
  },
  geo: { lat: 53.6728, lng: -2.6554 },
  playtomic: "https://playtomic.io/tenant/3ef27a5d-a35a-474e-a588-12b5b20fe8c1",
  playtomicClub: "https://playtomic.com/clubs/bounc",
  maps: "https://www.google.com/maps/search/?api=1&query=BOUNC+Padel+Unit+K4+Ordnance+Road+Buckshaw+Village+PR7+7EL",
  mapEmbed:
    "https://www.google.com/maps?q=Unit+K4+Ordnance+Road+Buckshaw+Village+PR7+7EL&z=15&output=embed",
  reviews:
    "https://www.google.com/search?q=bounc+padel+chorley#lrd=0x487b0da53a44839f:0xbcea04a3363fcbae,1,,,,",
  socials: {
    instagram: "https://www.instagram.com/bounc.pdl/",
    tiktok: "https://www.tiktok.com/@bounc.pdl",
    cube: "https://www.instagram.com/cubedesserts/",
  },
} as const;

/** Playtomic link tagged with the CTA placement, so bookings can be attributed per button. */
export function bookingUrl(placement: string) {
  const url = new URL(SITE.playtomic);
  url.searchParams.set("utm_source", "bounc.uk");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", "book_a_court");
  url.searchParams.set("utm_content", placement);
  return url.toString();
}

export type NavItem = { label: string; href: string; blurb: string };

export const NAV: NavItem[] = [
  { label: "The Club", href: "/facilities", blurb: "Courts, spaces & facilities" },
  { label: "Play", href: "/book", blurb: "Prices, booking & FAQs" },
  { label: "CUBE", href: "/cafe", blurb: "Café & dessert space" },
  { label: "Community", href: "/community", blurb: "Leagues, Americanos & events" },
  { label: "Journal", href: "/journal", blurb: "Guides, culture & club news" },
  { label: "Contact", href: "/contact", blurb: "Say hello" },
];

export const LEGAL: NavItem[] = [
  { label: "Privacy Policy", href: "/legal/privacy", blurb: "" },
  { label: "Terms & Conditions", href: "/legal/terms", blurb: "" },
  { label: "Accessibility", href: "/legal/accessibility", blurb: "" },
];

/** Human labels for page-transition titles. */
export const ROUTE_LABELS: Record<string, string> = {
  "/": "Home",
  "/facilities": "The Club",
  "/book": "Play",
  "/cafe": "CUBE",
  "/community": "Community",
  "/journal": "Journal",
  "/contact": "Contact",
  "/legal/privacy": "Privacy",
  "/legal/terms": "Terms",
  "/legal/accessibility": "Access",
};

export const HOURS = [
  { days: "Mon – Fri", open: "6:00am", close: "2:00am" },
  { days: "Sat – Sun", open: "5:00am", close: "3:00am" },
] as const;

/** Court pricing published on Playtomic (September 2026). Always defer to the app for live rates. */
export const PRICING = {
  asOf: "September 2026",
  doubles: {
    name: "Doubles courts",
    courts: "Centre Court · Court 2 · Court 3",
    players: 4,
    rates: [
      { mins: 60, price: 48 },
      { mins: 90, price: 72 },
      { mins: 120, price: 96 },
    ],
  },
  singles: {
    name: "Singles court",
    courts: "Court 4",
    players: 2,
    rates: [{ mins: 60, price: 24 }],
  },
  sessions: [
    { name: "Intro to playing padel", detail: "90 min · for first-timers", price: 10 },
    { name: "Mixed Americano", detail: "60 min · rotating partners", price: 15 },
    { name: "BOUNC Community League", detail: "Sat & Sun · 11:00 · 3 hrs", price: 10 },
    { name: "Academy grading", detail: "Levels 1.5 – 2.8", price: 20 },
  ],
} as const;

export const TESTIMONIALS = [
  {
    name: "Ali",
    quote:
      "Amazing courts, never experienced a playing surface quite like it, the 360 degree lighting is a game changer. Would highly recommend this place to everyone, best place around.",
  },
  {
    name: "Jay",
    quote:
      "Great facility and best courts in the area. Can’t wait to play regularly and try the new cafe.",
  },
] as const;

export const FOUNDER_QUOTE = {
  quote:
    "This isn’t just about sport; it’s about culture, community and building a healthier way of living together.",
  name: "Declan Bailey",
  role: "Co-Founder, BOUNC",
} as const;
