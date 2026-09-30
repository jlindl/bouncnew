# BOUNC — website v2

A multi-page redesign of [bounc.uk](https://www.bounc.uk) for BOUNC, the super-panoramic indoor padel club in Buckshaw Village.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · GSAP 3 (ScrollTrigger, SplitText, CustomEase) · Lenis smooth scroll · Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are statically prerendered)
npm run lint
```

## Pages

| Route | What it is |
|---|---|
| `/` | Home: film-into-logo hero, pillars, horizontal experience scroller, courts, CUBE, reviews, first-timer path, journal |
| `/facilities` | The Club: spaces, courts, amenities, hours and map |
| `/book` | Play: how booking works, pricing, FAQs (with FAQ schema) |
| `/cafe` | CUBE café & dessert space |
| `/community` | Sessions, Americanos, league, photo wall, newsletter |
| `/journal`, `/journal/[slug]` | Blog index with category filter, and articles |
| `/contact` | Contact form, channels, map |
| `/legal/[slug]` | Privacy, terms, accessibility |

## Editing content

- **Prices, hours, contact details, testimonials, nav:** `lib/site.ts`
- **Journal articles:** `lib/journal.ts` — each post is structured blocks (paragraphs, headings, lists, quotes, images, callouts). Inline `**bold**` and `[links](/path)` are supported. New posts appear in the index, sitemap and related-reads automatically.
- **Images:** add files under `assets/img/`, then register them with alt text in `lib/media.ts`.
- **Booking links:** always use `bookingUrl("placement_name")` — it adds UTM tags so you can see in Playtomic/analytics which button drove each booking.

## Contact form

`app/api/contact/route.ts` validates submissions (with a spam honeypot). Set `CONTACT_WEBHOOK_URL` to forward each submission as JSON to Zapier, Make, Slack or an email relay. Without it, submissions are only logged on the server.

## Motion system

- `components/providers/SmoothScroll.tsx` — Lenis driven by the GSAP ticker.
- `components/providers/PageTransition.tsx` — slanted-bar curtain between routes (uses `Link`'s `onNavigate`).
- `components/layout/Preloader.tsx` — first-visit intro, skipped for the rest of the session.
- `components/motion/*` — split-text reveals, masked image reveals, velocity marquee, scroll-scrubbed text, counters, magnetic hover.
- Intro animations wait for `onRevealed()` (in `lib/stores.ts`) so they play as the curtain lifts.
- `prefers-reduced-motion` is respected everywhere: smooth scroll, intro and scroll animations switch off and content shows immediately.

## Assets

- `assets/img/bounc/` — BOUNC's own photography and stills from the brand film.
- `assets/img/stock/` — licensed stock, colour-graded to the brand palette. See `assets/img/stock/CREDITS.md`.
- `public/video/` — the brand film, plus a seamless hero loop cut from it.
- `lib/logo-paths.ts` — the mark and wordmark, vectorised from the brand artwork.
