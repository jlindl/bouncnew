import type { ImgKey } from "@/lib/media";

/* ─────────────────────────────────────────────────────────────
   Pro Shop catalogue (demo store — no real payments are taken).
   Product visuals are drawn in code (components/shop/ProductArt),
   so a colour option can recolour the product live.
   ───────────────────────────────────────────────────────────── */

export type Category = "Rackets" | "Balls" | "Apparel" | "Accessories" | "Gift cards";
export const CATEGORIES: Category[] = ["Rackets", "Balls", "Apparel", "Accessories", "Gift cards"];

export type RacketShape = "round" | "teardrop" | "diamond";

export type Art =
  | { kind: "racket"; shape: RacketShape; face: string; accent: string; frame: string; label: string }
  | { kind: "balls" }
  | { kind: "tee"; color: string; print: string }
  | { kind: "hoodie"; color: string; print: string }
  | { kind: "cap"; color: string; print: string }
  | { kind: "wristband"; color: string; print: string }
  | { kind: "grips" }
  | { kind: "bag"; color: string; accent: string }
  | { kind: "bottle"; color: string; accent: string }
  | { kind: "giftcard"; amount: string };

export type OptionValue = {
  label: string;
  /** Price replaces the base price when this value is chosen */
  price?: number;
  /** Colour swatch for the selector */
  swatch?: string;
  /** Partial art override, e.g. a new colourway */
  art?: Record<string, string>;
};

export type ProductOption = { name: string; values: OptionValue[] };

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  price: number;
  compareAt?: number;
  badge?: "New" | "Bestseller" | "Club favourite" | "Limited";
  description: string;
  highlights: string[];
  specs?: [string, string][];
  options?: ProductOption[];
  art: Art;
  photos?: ImgKey[];
};

const SIZES: ProductOption = { name: "Size", values: ["XS", "S", "M", "L", "XL", "XXL"].map((label) => ({ label })) };

export const PRODUCTS: Product[] = [
  {
    slug: "precision-control",
    name: "Precision Control",
    tagline: "Round · Control · All levels",
    category: "Rackets",
    price: 149,
    badge: "Club favourite",
    description:
      "The racket you’ll see in hands all over the club. A round head and low balance put the sweet spot right where you need it, so every volley, lob and block feels under control.",
    highlights: ["Big, central sweet spot", "Low balance for fast hands at the net", "Soft EVA core — comfortable on the arm", "Textured face for spin"],
    specs: [
      ["Shape", "Round"],
      ["Weight", "355–365g"],
      ["Balance", "Low"],
      ["Core", "Soft EVA"],
      ["Face", "Fibreglass / carbon"],
      ["Level", "Beginner – intermediate"],
    ],
    options: [
      {
        name: "Colourway",
        values: [
          { label: "Carbon / Orange", swatch: "#be4017", art: { face: "#1a1a1a", accent: "#be4017", frame: "#0c0c0c" } },
          { label: "Carbon / Bone", swatch: "#f0eeed", art: { face: "#1a1a1a", accent: "#f0eeed", frame: "#0c0c0c" } },
        ],
      },
    ],
    art: { kind: "racket", shape: "round", face: "#1a1a1a", accent: "#be4017", frame: "#0c0c0c", label: "PRECISION CONTROL" },
    photos: ["stillRacket", "racketTap", "playerFocus"],
  },
  {
    slug: "velocity",
    name: "Velocity",
    tagline: "Teardrop · Hybrid · Intermediate",
    category: "Rackets",
    price: 169,
    badge: "New",
    description:
      "Power when you want it, control when you need it. Velocity’s teardrop head lifts the sweet spot for punchier overheads without losing feel at the net.",
    highlights: ["Teardrop head for balanced power", "Medium balance", "Carbon face for crisp feedback", "Reinforced throat"],
    specs: [
      ["Shape", "Teardrop"],
      ["Weight", "360–370g"],
      ["Balance", "Medium"],
      ["Core", "Medium EVA"],
      ["Face", "3K carbon"],
      ["Level", "Intermediate"],
    ],
    options: [
      {
        name: "Colourway",
        values: [
          { label: "Ink / Orange", swatch: "#0e0e0e", art: { face: "#0f0f0f", accent: "#e0521f", frame: "#1d1d1d" } },
          { label: "Bone / Ink", swatch: "#e9e4df", art: { face: "#e9e4df", accent: "#101010", frame: "#151515" } },
        ],
      },
    ],
    art: { kind: "racket", shape: "teardrop", face: "#0f0f0f", accent: "#e0521f", frame: "#1d1d1d", label: "VELOCITY" },
    photos: ["racketBall", "smashNight"],
  },
  {
    slug: "strike",
    name: "Strike",
    tagline: "Diamond · Power · Advanced",
    category: "Rackets",
    price: 189,
    badge: "Limited",
    description:
      "Built to finish points. A head-heavy diamond shape and stiff carbon face turn full swings into winners — for players who already own the basics.",
    highlights: ["Diamond head, high sweet spot", "Head-heavy for big overheads", "Hard core for maximum rebound", "Limited orange edition"],
    specs: [
      ["Shape", "Diamond"],
      ["Weight", "365–375g"],
      ["Balance", "High"],
      ["Core", "Hard EVA"],
      ["Face", "12K carbon"],
      ["Level", "Advanced"],
    ],
    art: { kind: "racket", shape: "diamond", face: "#be4017", accent: "#0b0b0b", frame: "#0b0b0b", label: "STRIKE" },
    photos: ["smashNight", "lungeGlass"],
  },
  {
    slug: "rookie",
    name: "Rookie",
    tagline: "Round · Forgiving · First racket",
    category: "Rackets",
    price: 79,
    description:
      "Your first racket, done right. Light, forgiving and comfortable, with a soft core that does the work on slower shots while you learn.",
    highlights: ["Light and easy to swing", "Extra-forgiving round head", "Fibreglass face", "Great value starter"],
    specs: [
      ["Shape", "Round"],
      ["Weight", "340–350g"],
      ["Balance", "Low"],
      ["Core", "Soft EVA"],
      ["Face", "Fibreglass"],
      ["Level", "Beginner"],
    ],
    art: { kind: "racket", shape: "round", face: "#e9e4df", accent: "#be4017", frame: "#151515", label: "ROOKIE" },
    photos: ["racketFlatlay", "topdown"],
  },
  {
    slug: "pro-balls",
    name: "Pro Padel Balls",
    tagline: "Tube of 3 · Pressurised",
    category: "Balls",
    price: 7.5,
    badge: "Bestseller",
    description: "The ball we play with. Consistent bounce, durable felt and a pressurised tube to keep them lively between sessions.",
    highlights: ["Consistent bounce off the glass", "Durable, high-visibility felt", "Pressurised tube", "Bulk packs for leagues and teams"],
    specs: [
      ["Contents", "3 balls per tube"],
      ["Type", "Pressurised"],
      ["Surface", "Artificial turf, indoor"],
    ],
    options: [
      {
        name: "Pack",
        values: [
          { label: "1 tube", price: 7.5 },
          { label: "4 tubes", price: 27 },
          { label: "24 tubes", price: 150 },
        ],
      },
    ],
    art: { kind: "balls" },
    photos: ["stillTube", "racketMoody"],
  },
  {
    slug: "core-tee",
    name: "Core Tee",
    tagline: "Heavyweight cotton · Relaxed fit",
    category: "Apparel",
    price: 30,
    badge: "Bestseller",
    description: "The tee from the brand film. Heavyweight cotton, a relaxed boxy fit and the BOUNC wordmark across the chest — on court or off it.",
    highlights: ["Heavyweight organic cotton", "Relaxed, boxy fit", "Printed wordmark, embroidered mark on the sleeve", "Pre-shrunk"],
    specs: [
      ["Fabric", "100% organic cotton, 240gsm"],
      ["Fit", "Relaxed"],
      ["Care", "Wash cold, inside out"],
    ],
    options: [
      {
        name: "Colour",
        values: [
          { label: "Bone", swatch: "#ece7e2", art: { color: "#ece7e2", print: "#be4017" } },
          { label: "Ink", swatch: "#141414", art: { color: "#141414", print: "#f0eeed" } },
          { label: "Orange", swatch: "#be4017", art: { color: "#be4017", print: "#0c0c0c" } },
        ],
      },
      SIZES,
    ],
    art: { kind: "tee", color: "#ece7e2", print: "#be4017" },
    photos: ["playerCheer", "stillHighfive", "playerFocus"],
  },
  {
    slug: "club-hoodie",
    name: "Club Hoodie",
    tagline: "Brushed fleece · Oversized",
    category: "Apparel",
    price: 60,
    badge: "Club favourite",
    description: "Warm-up, cool-down, everything in between. A brushed-back fleece hoodie with the BOUNC wordmark front and centre.",
    highlights: ["Soft brushed-back fleece", "Oversized, dropped-shoulder fit", "Kangaroo pocket", "Ribbed cuffs and hem"],
    specs: [
      ["Fabric", "80% cotton, 20% recycled polyester, 380gsm"],
      ["Fit", "Oversized"],
      ["Care", "Wash cold, inside out"],
    ],
    options: [
      {
        name: "Colour",
        values: [
          { label: "Ink", swatch: "#141414", art: { color: "#141414", print: "#f0eeed" } },
          { label: "Bone", swatch: "#ece7e2", art: { color: "#ece7e2", print: "#141414" } },
        ],
      },
      SIZES,
    ],
    art: { kind: "hoodie", color: "#141414", print: "#f0eeed" },
    photos: ["fistPump", "stillHoodie"],
  },
  {
    slug: "court-cap",
    name: "Court Cap",
    tagline: "Six-panel · Adjustable",
    category: "Apparel",
    price: 24,
    description: "Low-profile six-panel cap with the BOUNC mark embroidered up front. Lightweight, breathable, adjustable.",
    highlights: ["Embroidered mark", "Breathable cotton twill", "Curved brim", "Adjustable strap"],
    options: [
      {
        name: "Colour",
        values: [
          { label: "Ink", swatch: "#141414", art: { color: "#141414", print: "#be4017" } },
          { label: "Orange", swatch: "#be4017", art: { color: "#be4017", print: "#0c0c0c" } },
          { label: "Bone", swatch: "#ece7e2", art: { color: "#ece7e2", print: "#be4017" } },
        ],
      },
    ],
    art: { kind: "cap", color: "#141414", print: "#be4017" },
  },
  {
    slug: "wristbands",
    name: "Sweat Wristbands",
    tagline: "Pair · Terry cotton",
    category: "Accessories",
    price: 10,
    description: "The wristbands from the film. Thick terry cotton keeps sweat off your grip through the longest rallies.",
    highlights: ["Sold as a pair", "Thick, absorbent terry", "Woven BOUNC wordmark"],
    options: [
      {
        name: "Colour",
        values: [
          { label: "Ink", swatch: "#141414", art: { color: "#141414", print: "#f0eeed" } },
          { label: "Orange", swatch: "#be4017", art: { color: "#be4017", print: "#0c0c0c" } },
        ],
      },
    ],
    art: { kind: "wristband", color: "#141414", print: "#f0eeed" },
    photos: ["stillRacket"],
  },
  {
    slug: "overgrips",
    name: "Tacky Overgrips",
    tagline: "3-pack · Mixed colours",
    category: "Accessories",
    price: 9,
    description: "Fresh grip, fresh game. Thin, tacky overgrips in BOUNC orange, bone and ink.",
    highlights: ["Tacky feel, thin profile", "Absorbs sweat", "Three colours per pack"],
    art: { kind: "grips" },
  },
  {
    slug: "court-bag",
    name: "Court Bag",
    tagline: "Thermal · Fits 2 rackets",
    category: "Accessories",
    price: 75,
    badge: "New",
    description: "Everything for match day in one bag: a thermal-lined racket compartment for two rackets, a vented shoe pocket and a quick-access front pocket.",
    highlights: ["Thermal-lined racket compartment", "Ventilated shoe pocket", "Padded backpack straps", "Water-resistant base"],
    specs: [
      ["Capacity", "2 rackets + kit"],
      ["Dimensions", "50 × 32 × 14cm"],
    ],
    art: { kind: "bag", color: "#141414", accent: "#be4017" },
  },
  {
    slug: "club-bottle",
    name: "Club Bottle",
    tagline: "750ml · Insulated steel",
    category: "Accessories",
    price: 20,
    description: "Double-walled stainless steel that keeps water cold through a two-hour session — and coffee from CUBE hot for the drive home.",
    highlights: ["750ml capacity", "Double-wall insulated", "Leak-proof carry cap"],
    options: [
      {
        name: "Colour",
        values: [
          { label: "Ink", swatch: "#141414", art: { color: "#141414", accent: "#be4017" } },
          { label: "Orange", swatch: "#be4017", art: { color: "#be4017", accent: "#141414" } },
        ],
      },
    ],
    art: { kind: "bottle", color: "#141414", accent: "#be4017" },
  },
  {
    slug: "gift-card",
    name: "BOUNC Gift Card",
    tagline: "Delivered by email",
    category: "Gift cards",
    price: 25,
    description: "The easy gift for anyone who plays — or should. Choose an amount and we’ll email a gift card straight to their inbox.",
    highlights: ["Delivered instantly by email", "Choose £25, £50 or £100", "Add a personal message at checkout"],
    options: [
      {
        name: "Amount",
        values: [
          { label: "£25", price: 25, art: { amount: "£25" } },
          { label: "£50", price: 50, art: { amount: "£50" } },
          { label: "£100", price: 100, art: { amount: "£100" } },
        ],
      },
    ],
    art: { kind: "giftcard", amount: "£25" },
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export type Selection = Record<string, string>;

export function defaultSelection(p: Product): Selection {
  return Object.fromEntries((p.options ?? []).map((o) => [o.name, o.values[0].label]));
}

export function priceFor(p: Product, sel: Selection) {
  for (const o of p.options ?? []) {
    const v = o.values.find((x) => x.label === sel[o.name]);
    if (v?.price !== undefined) return v.price;
  }
  return p.price;
}

export function artFor(p: Product, sel: Selection): Art {
  let art = { ...p.art } as Art;
  for (const o of p.options ?? []) {
    const v = o.values.find((x) => x.label === sel[o.name]);
    if (v?.art) art = { ...art, ...v.art } as Art;
  }
  return art;
}

export function fromPrice(p: Product) {
  const prices = (p.options ?? []).flatMap((o) => o.values.map((v) => v.price).filter((x): x is number => x !== undefined));
  return prices.length ? Math.min(...prices) : p.price;
}

export function formatPrice(n: number) {
  return `£${Number.isInteger(n) ? n : n.toFixed(2)}`;
}

export const SHIPPING = {
  freeOver: 50,
  methods: [
    { id: "collect", label: "Collect at BOUNC", detail: "Ready in 24 hours · Buckshaw Village", price: 0 },
    { id: "standard", label: "UK standard", detail: "3–5 working days", price: 3.95 },
    { id: "express", label: "Next day", detail: "Order by 2pm, Mon–Thu", price: 6.95 },
  ],
} as const;

export type ShippingId = (typeof SHIPPING.methods)[number]["id"];

export const PROMO = { code: "MOVETOGETHER", percent: 10 } as const;
