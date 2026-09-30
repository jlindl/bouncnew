import type { ImgKey } from "@/lib/media";

export type Category = "Guides" | "Technique" | "Culture" | "Club";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; img: ImgKey; caption?: string }
  | { type: "callout"; title: string; text: string; cta?: { label: string; href: string } };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string; // ISO
  cover: ImgKey;
  body: Block[];
};

export const CATEGORIES: Category[] = ["Guides", "Technique", "Culture", "Club"];

const POSTS_UNSORTED: Post[] = [
  {
    slug: "what-is-padel",
    title: "What is padel? The sport everyone’s talking about, explained",
    excerpt:
      "Part tennis, part squash, all social. Here’s what padel actually is, where it came from and why people get hooked after one session.",
    category: "Guides",
    date: "2026-02-03",
    cover: "courtRally",
    body: [
      {
        type: "p",
        text: "If you’ve seen glass-walled courts popping up across the country and wondered what all the noise is about, this one’s for you. Padel is a racket sport that borrows from tennis and squash, is almost always played as doubles, and is famously easy to pick up — which is exactly why it spreads so fast.",
      },
      { type: "h2", text: "Where it came from" },
      {
        type: "p",
        text: "Padel was invented in Acapulco, Mexico, in 1969, when Enrique Corcuera adapted a court at his home by adding walls. It travelled to Spain and Argentina, where it became one of the most played sports in the country, and it has been growing quickly in Britain ever since. In the UK, padel sits under the governance of the LTA — the same body that looks after tennis.",
      },
      { type: "h2", text: "The court" },
      {
        type: "p",
        text: "A padel court is 20 metres long and 10 metres wide — roughly a third of the size of a tennis court — with a net across the middle. It’s fully enclosed: glass walls at each end and along part of the sides, with metal mesh making up the rest. The walls are in play, which is what gives padel its signature long rallies.",
      },
      {
        type: "p",
        text: "At BOUNC, all four courts are **super-panoramic**, meaning the glass runs without the usual structural posts interrupting your view, and they’re lit by a 360° perimeter lighting system rather than overhead masts. You can read more about why that matters in [our guide to super-panoramic courts](/journal/super-panoramic-courts).",
      },
      { type: "image", img: "stillOverhead", caption: "Perimeter lighting keeps the whole court evenly lit — even when you’re looking up at a lob." },
      { type: "h2", text: "The kit" },
      {
        type: "ul",
        items: [
          "**Rackets** are solid, stringless and perforated with holes. They’re shorter than a tennis racket, so the ball feels close and controllable from your first hit.",
          "**Balls** look like tennis balls but are slightly lower pressure, which keeps rallies at a friendlier pace.",
          "**Shoes** matter more than you’d think — you want grip on artificial turf. Our [first-session guide](/journal/first-padel-session) covers what to wear.",
        ],
      },
      { type: "h2", text: "Why people get hooked" },
      {
        type: "ol",
        items: [
          "**It’s easy to start.** The serve is underarm, the court is compact and the racket is forgiving. Most people are rallying within minutes.",
          "**It’s social by design.** Four players, one court, constant conversation. It’s as much a catch-up as a workout.",
          "**The walls keep points alive.** Balls you’d never reach in tennis come back off the glass, so rallies are longer and more fun.",
          "**There’s real depth.** Once you’ve got the basics, there’s a whole world of positioning, lobs, volleys and wall play to master.",
        ],
      },
      {
        type: "callout",
        title: "Try it at BOUNC",
        text: "Our ‘Intro to playing padel’ session is 90 minutes for £10 and built for complete beginners. Or grab three friends and book a court on Playtomic.",
        cta: { label: "See sessions & prices", href: "/book" },
      },
    ],
  },
  {
    slug: "first-padel-session",
    title: "Your first padel session: a beginner’s game plan",
    excerpt: "What to wear, what to bring, and the five things that will make your first hour on court feel easy.",
    category: "Guides",
    date: "2026-02-17",
    cover: "doublesHandshake",
    body: [
      {
        type: "p",
        text: "First sessions are the best sessions. You’ll learn more in an hour than you expect, and you’ll probably book the next one before you’ve left. Here’s how to make it count.",
      },
      { type: "h2", text: "Before you arrive" },
      {
        type: "ul",
        items: [
          "**Find your four.** Padel is played as doubles, so book a court with three friends — or join an intro session or Americano and we’ll do the matchmaking for you.",
          "**Book on Playtomic.** Pick your court and time, and split the cost between players in the app.",
          "**Arrive 10–15 minutes early** so you can warm up properly. There’s a dedicated warm-up and movement area for exactly that.",
        ],
      },
      { type: "h2", text: "What to wear" },
      {
        type: "p",
        text: "Comfortable sportswear you can move in. The big one is shoes: the court surface is artificial turf, so you want grip and lateral support. Padel or tennis shoes with a herringbone or omni sole are ideal. Running shoes are built for moving forwards, not side to side, so they’re best avoided.",
      },
      { type: "h2", text: "What to bring" },
      {
        type: "ul",
        items: [
          "Water — you’ll need it.",
          "A racket if you have one. If not, equipment hire is available at the club.",
          "Something warm for afterwards, because you’ll want to stay for a coffee.",
        ],
      },
      { type: "image", img: "stillFootwork", caption: "Grip on the turf makes everything easier. Leave the running shoes at home." },
      { type: "h2", text: "Five things that make it click" },
      {
        type: "ol",
        items: [
          "**Let it come off the glass.** The biggest adjustment — especially for tennis players — is letting the ball rebound off the back wall instead of rushing it. Wait, turn and hit it on the way out.",
          "**Serve underarm.** Bounce the ball behind the service line and hit it at or below waist height, diagonally into the box. Simple.",
          "**Move with your partner.** Think of yourselves as a pair on a string: forward together, back together.",
          "**The lob is your friend.** When you’re under pressure, a high ball over the net players buys you time and resets the point.",
          "**Get to the net.** Most points are won at the net. When you get the chance, move up together.",
        ],
      },
      { type: "h2", text: "After the match" },
      {
        type: "p",
        text: "Tap rackets, shake hands and head to CUBE. The post-match coffee (or thickshake) is part of the game — and it’s where next week’s booking usually gets made.",
      },
      {
        type: "callout",
        title: "Brand new to padel?",
        text: "Start with ‘Intro to playing padel’ — 90 minutes, £10, designed for first-timers.",
        cta: { label: "Book on Playtomic", href: "/book" },
      },
    ],
  },
  {
    slug: "padel-rules-explained",
    title: "Padel rules in plain English: serves, scoring and the walls",
    excerpt: "The serve, the scoring and exactly how the walls work — everything you need to play your first proper match.",
    category: "Guides",
    date: "2026-03-05",
    cover: "serveNight",
    body: [
      {
        type: "p",
        text: "You don’t need to know every rule to enjoy padel, but a handful make a big difference. Here are the ones that matter, without the jargon.",
      },
      { type: "h2", text: "The serve" },
      {
        type: "ul",
        items: [
          "Serves are **underarm**. Bounce the ball on the ground behind the service line, then hit it at or below waist height.",
          "Serve **diagonally** into your opponent’s service box. The ball must bounce in that box.",
          "After bouncing in the box, the serve can hit the glass and stay in play. If it hits the **metal mesh** after the bounce, it’s a fault.",
          "Clip the net and land in the box? That’s a **let** — take it again.",
          "Like tennis, you get **two attempts**.",
          "The receiver must let the serve bounce before returning it.",
        ],
      },
      { type: "h2", text: "Scoring" },
      {
        type: "p",
        text: "Padel uses tennis scoring: 15, 30, 40, game. Six games wins a set (with a tie-break at 6–6), and matches are usually best of three sets. Many clubs and social games use a **golden point** at deuce — one deciding point, with the receiving pair choosing who receives it. Agree before you start.",
      },
      { type: "h2", text: "How the walls work" },
      {
        type: "p",
        text: "This is where padel gets interesting. Once the ball has bounced on your side, it can hit any of your walls and you can still play it. You can even hit the ball into your own walls to get it back over the net.",
      },
      {
        type: "p",
        text: "What you can’t do is hit the ball so it strikes your opponents’ walls or mesh before it bounces on their side — that’s your point lost.",
      },
      { type: "image", img: "lungeGlass", caption: "Wait for the rebound: the glass gives you a second chance at almost everything." },
      { type: "h2", text: "You lose the point if…" },
      {
        type: "ul",
        items: [
          "The ball bounces twice on your side before you return it.",
          "You hit the ball into the net, or it lands out.",
          "Your shot hits the opponents’ walls or mesh before bouncing on their side.",
          "The ball hits you or your partner.",
          "You touch the net with your body or racket during the point.",
        ],
      },
      { type: "h2", text: "Volleys and the rest" },
      {
        type: "p",
        text: "Apart from the return of serve, you can volley whenever you like — and you’ll want to, because the net is where most points are won. Beyond that, the spirit of the game does the rest: call your own side fairly, and replay anything you genuinely can’t agree on.",
      },
      {
        type: "callout",
        title: "Learn it on court",
        text: "Rules make far more sense once you’ve played a few points. Our intro session walks you through all of this in 90 minutes.",
        cta: { label: "View sessions", href: "/book" },
      },
    ],
  },
  {
    slug: "super-panoramic-courts",
    title: "Why super-panoramic courts change the way you play",
    excerpt: "Frameless glass, 360° perimeter lighting and 4K cameras on every court. What it all means once you step on.",
    category: "Club",
    date: "2026-03-24",
    cover: "stillOverhead",
    body: [
      {
        type: "p",
        text: "Walk onto one of our courts for the first time and the difference is immediate: it feels open. That’s the super-panoramic design at work — and it changes more than the view.",
      },
      { type: "h2", text: "What ‘panoramic’ actually means" },
      {
        type: "p",
        text: "On a traditional padel court, the glass walls are held up by a frame of metal posts that run through your field of view. Panoramic courts remove as much of that structure as possible, and super-panoramic courts go further, leaving the glass walls uninterrupted by pillars. The result is a clean, open box of glass.",
      },
      { type: "h2", text: "Why players notice it" },
      {
        type: "ul",
        items: [
          "**Clear sightlines.** No posts in your way when you’re tracking a ball off the glass.",
          "**Cleaner rebounds.** Fewer frame elements in the glass area means the ball comes off the walls the way you expect.",
          "**A better watch.** Spectators, teammates and anyone waiting for the next slot get an unobstructed view of the play.",
        ],
      },
      { type: "h2", text: "360° perimeter lighting" },
      {
        type: "p",
        text: "Instead of tall masts pointing down at the court, BOUNC uses lighting that runs around the perimeter. The aim is even light across the whole court and less glare when you look up for a lob or an overhead. The Lancashire Post described it as first-of-its-kind — and players tend to agree.",
      },
      { type: "quote", text: "Never experienced a playing surface quite like it, the 360 degree lighting is a game changer.", cite: "Ali, BOUNC player" },
      { type: "h2", text: "4K AI cameras on every court" },
      {
        type: "p",
        text: "All four courts — Centre Court, Court 2, Court 3 and our singles Court 4 — are fitted with 4K AI cameras. Ask the team how to make the most of them when you visit.",
      },
      { type: "image", img: "courtRally", caption: "Premium turf, frameless glass, even light." },
      { type: "h2", text: "Premium turf, year-round" },
      {
        type: "p",
        text: "Everything’s indoors, so the weather never cancels your game. The premium turf gives consistent bounce and grip from the first slot of the morning to the last one at night.",
      },
      {
        type: "callout",
        title: "See it for yourself",
        text: "Doubles courts from £48 an hour — that’s £12 each when you play as four.",
        cta: { label: "Prices & booking", href: "/book" },
      },
    ],
  },
  {
    slug: "padel-warm-up",
    title: "The 10-minute warm-up every padel player needs",
    excerpt: "Padel is quick, lateral and full of overheads. Ten minutes before you play keeps you sharper — and on court for longer.",
    category: "Technique",
    date: "2026-04-14",
    cover: "warmupLunge",
    body: [
      {
        type: "p",
        text: "Padel asks a lot of your body in short bursts: quick side-steps, sudden stops, lunges for low balls and overheads above your head. Walking straight on court cold is how tweaks happen. This routine takes ten minutes and needs no kit — do it in our warm-up and movement area before you play.",
      },
      { type: "h2", text: "1. Raise — 2 minutes" },
      {
        type: "ul",
        items: ["Light jog or skip on the spot", "Side shuffles, both directions", "Carioca (crossover steps) to wake up the hips"],
      },
      { type: "h2", text: "2. Mobilise — 3 minutes" },
      {
        type: "ul",
        items: [
          "Big arm circles forwards and backwards",
          "Thoracic rotations: open your chest to each side",
          "A long lunge with a rotation towards your front knee",
          "Ankle rocks: knee over toes against a wall",
        ],
      },
      { type: "image", img: "warmupSide", caption: "Lateral lunges prime the exact movement padel asks for." },
      { type: "h2", text: "3. Activate — 2 minutes" },
      {
        type: "ul",
        items: ["Bodyweight squats", "Lateral lunges, alternating sides", "Calf raises — your calves do more work than you think"],
      },
      { type: "h2", text: "4. Get quick — 2 minutes" },
      {
        type: "ul",
        items: ["Fast feet on the spot", "Split-steps: a small hop as an imaginary opponent hits", "Short sprints forward and back-pedal"],
      },
      { type: "h2", text: "5. Racket — the first few minutes on court" },
      {
        type: "p",
        text: "Start at the net with gentle volleys, then move back for groundstrokes, and finish with a few lobs and overheads. Build the pace up gradually — there’s no prize for the hardest hit in the warm-up.",
      },
      { type: "h2", text: "After you play" },
      {
        type: "p",
        text: "Walk it off, stretch your calves, hips and shoulders gently, rehydrate and refuel. CUBE has you covered for that last part.",
      },
      {
        type: "callout",
        title: "A quick note",
        text: "This is general guidance for healthy adults, not medical advice. If you have an injury or health condition, check with a professional first.",
      },
    ],
  },
  {
    slug: "americano-explained",
    title: "Americano, explained: padel’s most social format",
    excerpt: "Rotating partners, individual scores and nobody sitting out. The format that turns strangers into regulars.",
    category: "Culture",
    date: "2026-05-06",
    cover: "stillHighfive",
    body: [
      {
        type: "p",
        text: "If you’ve ever wanted to play but couldn’t pull a four together, the Americano is your answer. It’s padel’s great social mixer — and it’s one of the fastest ways to find your level and your people.",
      },
      { type: "h2", text: "How it works" },
      {
        type: "ol",
        items: [
          "Everyone signs up individually.",
          "Each round, you play a short match with a **different partner** against a different pair.",
          "Matches are played to a set number of points rather than games.",
          "Every point you win goes on **your own** running total.",
          "After the final round, the player with the most points wins.",
        ],
      },
      { type: "h2", text: "Why it works so well" },
      {
        type: "ul",
        items: [
          "**No one sits out.** Everyone plays every round.",
          "**You meet everyone.** By the end you’ve partnered half the room.",
          "**It levels out.** Rotating partners means strong and newer players mix naturally.",
          "**Zero admin.** Turn up, play, go for a coffee.",
        ],
      },
      { type: "image", img: "stillDoubles", caption: "New partner every round — and a handshake at the end of each one." },
      { type: "h2", text: "Americano’s cousins" },
      {
        type: "p",
        text: "In a **Mexicano**, the pairings for each round are based on the current standings, so matches get more even as the session goes on. A **Team Americano** keeps fixed partners and rotates the opposition instead.",
      },
      { type: "h2", text: "Americanos at BOUNC" },
      {
        type: "ul",
        items: [
          "**Mixed Americano** — 60 minutes, £15",
          "**Ladies Beginners Americano** — a relaxed way in for newer players",
          "**Next Level Americano** — for players ready for a step up",
        ],
      },
      {
        type: "callout",
        title: "Find your next Americano",
        text: "Sessions are listed in the Playtomic app under BOUNC. Sign up solo — that’s the point.",
        cta: { label: "Community & sessions", href: "/community" },
      },
    ],
  },
  {
    slug: "choosing-a-padel-racket",
    title: "Round, teardrop or diamond? Choosing your first padel racket",
    excerpt: "Shape, weight, core and face — the four things that decide how a racket feels, and which to pick first.",
    category: "Technique",
    date: "2026-06-02",
    cover: "stillRacket",
    body: [
      {
        type: "p",
        text: "There are hundreds of padel rackets out there and most of the marketing is noise. Four things genuinely change how a racket plays. Get these right and you’ll have a racket that helps you improve rather than fights you.",
      },
      { type: "h2", text: "1. Shape" },
      {
        type: "ul",
        items: [
          "**Round** — the sweet spot sits low and central, and the balance is towards the handle. Forgiving and easy to control. The best starting point for most players.",
          "**Teardrop** — a middle ground. Balance and sweet spot sit a little higher, mixing control with extra power.",
          "**Diamond** — head-heavy with a high sweet spot. Big power on overheads, but less forgiving on mishits. Usually for advanced players.",
        ],
      },
      { type: "h2", text: "2. Weight" },
      {
        type: "p",
        text: "Most adult rackets sit somewhere around 340–375g. Lighter rackets are quicker to manoeuvre at the net and kinder on your arm; heavier rackets add stability and power but can tire you out. If in doubt, go lighter.",
      },
      { type: "h2", text: "3. Core" },
      {
        type: "p",
        text: "The foam inside the racket affects feel. Softer cores give more help on slower shots and feel comfortable; harder cores reward fast, powerful swings with more control. Newer players usually get on better with a softer feel.",
      },
      { type: "h2", text: "4. Face" },
      {
        type: "p",
        text: "Fibreglass faces are more flexible and forgiving. Carbon faces are stiffer, offering more control and durability, and tend to cost more. There’s no wrong answer — it comes down to feel.",
      },
      { type: "image", img: "racketCloseup", caption: "Hold a few before you buy. Feel matters more than spec sheets." },
      { type: "h2", text: "Our advice" },
      {
        type: "p",
        text: "Don’t buy blind. Play a few sessions with hire rackets, notice what you like, and try friends’ rackets between games. When you do buy, start with a round, lighter, softer racket — then upgrade once your game tells you what it needs.",
      },
      {
        type: "callout",
        title: "No racket yet? No problem",
        text: "Equipment hire is available at the club, so you can play before you commit.",
        cta: { label: "Plan your visit", href: "/book" },
      },
    ],
  },
  {
    slug: "padel-etiquette",
    title: "The unwritten rules: padel etiquette for new players",
    excerpt: "The racket tap, the golden rule about walking behind courts, and the small habits that make you everyone’s favourite fourth.",
    category: "Culture",
    date: "2026-07-15",
    cover: "racketTap",
    body: [
      {
        type: "p",
        text: "Padel is a friendly sport with a strong culture, and a few habits go a long way. None of this is written on the wall — but everyone notices.",
      },
      { type: "h2", text: "On court" },
      {
        type: "ul",
        items: [
          "**Tap rackets.** Before and after the match, a quick racket tap with everyone is the padel handshake.",
          "**Call your side fairly.** If it’s close and you’re not sure, give it to your opponents or replay the point.",
          "**Say sorry for net cords.** A lucky bounce off the net tape gets a raised hand and an apology. It’s tradition.",
          "**Keep the balls moving.** Pass balls to the server between points — don’t make them fetch.",
        ],
      },
      { type: "h2", text: "Around the courts" },
      {
        type: "ul",
        items: [
          "**Never walk behind a court mid-rally.** Wait for the point to finish, then move quickly.",
          "**Start and finish on time.** Courts are booked back to back. Warm up before your slot and clear the court promptly when it ends.",
          "**Keep the noise friendly.** Celebrate big points — just not at the expense of the court next door.",
        ],
      },
      { type: "image", img: "stillTeammates", caption: "Good padel is as much about the four people as the points." },
      { type: "h2", text: "Off court" },
      {
        type: "ul",
        items: [
          "**Be honest about your level** when joining games, so matches are fun for everyone.",
          "**Settle up quickly.** Playtomic makes it easy to split the court fee — pay your share without being chased.",
          "**Stay for one.** The best padel friendships start with a post-match coffee.",
        ],
      },
      {
        type: "callout",
        title: "Find your four",
        text: "Americanos, leagues and intro sessions are the easiest way to meet regular playing partners.",
        cta: { label: "Explore community", href: "/community" },
      },
    ],
  },
  {
    slug: "the-post-match",
    title: "More than a court: the case for the post-match",
    excerpt: "Why BOUNC was built around CUBE, the lounge and the time after the final point — not just the booking.",
    category: "Club",
    date: "2026-08-26",
    cover: "cafeInterior",
    body: [
      {
        type: "p",
        text: "Most sports venues treat the café as an add-on — somewhere to buy a bottle of water on the way out. BOUNC was designed the other way round. The time after the final point matters as much as the match itself.",
      },
      { type: "quote", text: "This isn’t just about sport; it’s about culture, community and building a healthier way of living together.", cite: "Declan Bailey, Co-Founder, BOUNC" },
      { type: "h2", text: "European-inspired, Lancashire-built" },
      {
        type: "p",
        text: "Padel culture in Spain has always been about more than the game: you play, you sit down together, you stay. That’s the feeling BOUNC set out to bring to Buckshaw Village — a club where the courts, the café and the lounge work as one space.",
      },
      { type: "h2", text: "Meet CUBE" },
      {
        type: "p",
        text: "CUBE opened in January 2026 as our in-house café and dessert space. Expect good coffee alongside waffles, pancakes, thickshakes, sundaes and cookie dough, with vegan and gluten-free desserts too. It holds a 5 food hygiene rating — the top score.",
      },
      { type: "image", img: "waffleCaramel", caption: "Post-match fuel, CUBE style." },
      { type: "h2", text: "Spaces to stay" },
      {
        type: "ul",
        items: [
          "**Watch the games.** Super-panoramic glass means the lounge has a clear view of the action.",
          "**Work remotely.** There’s WiFi, good coffee and a comfortable seat between sessions.",
          "**Celebrate.** Leagues, Americanos and events all end in the same place.",
        ],
      },
      {
        type: "callout",
        title: "Come for the game. Stay for the rest.",
        text: "CUBE is open to players and visitors alike.",
        cta: { label: "Discover CUBE", href: "/cafe" },
      },
    ],
  },
];

export const POSTS: Post[] = [...POSTS_UNSORTED].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function readingTime(post: Post) {
  const words = post.body
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : ""))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
