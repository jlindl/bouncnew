import type { StaticImageData } from "next/image";

/* ── Real BOUNC photography & film stills ─────────────────────── */
import courtRally from "@/assets/img/bounc/court-rally.jpg";
import racketTap from "@/assets/img/bounc/racket-tap.jpg";
import playerFocus from "@/assets/img/bounc/player-focus.jpg";
import doublesHandshake from "@/assets/img/bounc/doubles-handshake.jpg";
import playerCheer from "@/assets/img/bounc/player-cheer.jpg";
import fistPump from "@/assets/img/bounc/fist-pump.jpg";
import stillRacket from "@/assets/img/bounc/still-racket.jpg";
import stillFootwork from "@/assets/img/bounc/still-footwork.jpg";
import stillDoubles from "@/assets/img/bounc/still-doubles.jpg";
import stillHoodie from "@/assets/img/bounc/still-hoodie.jpg";
import stillNet from "@/assets/img/bounc/still-net.jpg";
import stillHighfive from "@/assets/img/bounc/still-highfive.jpg";
import stillCheer from "@/assets/img/bounc/still-cheer.jpg";
import stillOverhead from "@/assets/img/bounc/still-overhead.jpg";
import stillSmash from "@/assets/img/bounc/still-smash.jpg";
import stillTube from "@/assets/img/bounc/still-tube.jpg";
import stillTeammates from "@/assets/img/bounc/still-teammates.jpg";

/* ── Licensed stock, graded to the BOUNC palette ──────────────── */
import serveNight from "@/assets/img/stock/padel-serve-night-01.jpg";
import lungeGlass from "@/assets/img/stock/padel-lunge-glass-bw-01.jpg";
import smashNight from "@/assets/img/stock/padel-smash-night-bw-01.jpg";
import clubRally from "@/assets/img/stock/padel-indoor-club-rally-01.jpg";
import playerOrange from "@/assets/img/stock/padel-player-orange-indoor-01.jpg";
import racketFlatlay from "@/assets/img/stock/padel-racket-red-court-01.jpg";
import racketMoody from "@/assets/img/stock/padel-racket-ball-moody-01.jpg";
import racketBall from "@/assets/img/stock/padel-racket-ball-bw-01.jpg";
import racketCloseup from "@/assets/img/stock/padel-racket-orange-closeup-01.jpg";
import courtsAerial from "@/assets/img/stock/padel-courts-aerial-night-01.jpg";
import playerLow from "@/assets/img/stock/padel-player-dramatic-light-01.jpg";
import topdown from "@/assets/img/stock/padel-topdown-feet-racket-01.jpg";
import warmupLunge from "@/assets/img/stock/warmup-lunge-stretch-01.jpg";
import warmupSide from "@/assets/img/stock/warmup-side-lunge-haze-01.jpg";
import warmupCalf from "@/assets/img/stock/warmup-calf-stretch-01.jpg";
import warmupSprint from "@/assets/img/stock/warmup-sprint-start-bw-01.jpg";
import espresso from "@/assets/img/stock/cafe-espresso-shots-01.jpg";
import latteArt from "@/assets/img/stock/cafe-latte-art-pour-01.jpg";
import coffeePour from "@/assets/img/stock/cafe-coffee-pour-01.jpg";
import croissants from "@/assets/img/stock/cafe-croissants-dark-01.jpg";
import cafeInterior from "@/assets/img/stock/cafe-interior-moody-01.jpg";
import cheers from "@/assets/img/stock/social-cheers-01.jpg";
import cocktails from "@/assets/img/stock/social-cocktails-dark-01.jpg";
import lounge from "@/assets/img/stock/social-lounge-candles-01.jpg";
import streaks from "@/assets/img/stock/texture-orange-streaks-01.jpg";
import mesh from "@/assets/img/stock/texture-mesh-01.jpg";
import waffleCaramel from "@/assets/img/stock/dessert-waffle-caramel-pour-01.jpg";
import waffleBerries from "@/assets/img/stock/dessert-waffle-berries-dark-01.jpg";
import pancakes from "@/assets/img/stock/dessert-pancakes-syrup-stack-01.jpg";
import shakesPair from "@/assets/img/stock/dessert-milkshakes-caramel-pair-01.jpg";
import shakeChoc from "@/assets/img/stock/dessert-milkshake-chocolate-01.jpg";
import sundae from "@/assets/img/stock/dessert-sundae-chocolate-wafers-01.jpg";
import cookies from "@/assets/img/stock/dessert-cookies-warm-choc-chip-01.jpg";

export type Media = { src: StaticImageData; alt: string };

const m = (src: StaticImageData, alt: string): Media => ({ src, alt });

export const IMG = {
  // BOUNC
  courtRally: m(courtRally, "A player hits a forehand on BOUNC’s terracotta court while her partner watches from the baseline"),
  racketTap: m(racketTap, "Two players tap BOUNC rackets together, one smiling"),
  playerFocus: m(playerFocus, "A player in a BOUNC tee rests his racket against his forehead, eyes closed"),
  doublesHandshake: m(doublesHandshake, "Doubles partners slap hands between points on the orange court"),
  playerCheer: m(playerCheer, "A player celebrates a point with his racket raised in front of the glass"),
  fistPump: m(fistPump, "A player in a BOUNC hoodie fist-pumps on court with more courts behind him"),
  stillRacket: m(stillRacket, "Close-up of a black and orange BOUNC racket held in a player’s hand"),
  stillFootwork: m(stillFootwork, "Close-up of trainers moving across the orange turf"),
  stillDoubles: m(stillDoubles, "Two players shake hands mid-match on court"),
  stillHoodie: m(stillHoodie, "A player celebrates in a BOUNC hoodie, courts and nets behind"),
  stillNet: m(stillNet, "A player reaches high behind the net against the orange court"),
  stillHighfive: m(stillHighfive, "Players high-five after a rally, one wearing a BOUNC shirt"),
  stillCheer: m(stillCheer, "A player celebrates with his racket raised under the court lights"),
  stillOverhead: m(stillOverhead, "A player lines up an overhead beneath the perimeter lighting"),
  stillSmash: m(stillSmash, "A player leaps for a smash against the glass"),
  stillTube: m(stillTube, "A BOUNC-branded ball tube resting against the net on the orange court"),
  stillTeammates: m(stillTeammates, "Two teammates walk off court together with their rackets"),
  // Stock (graded)
  serveNight: m(serveNight, "A player tosses the ball for a serve, framed by the net"),
  lungeGlass: m(lungeGlass, "A player lunges low for a forehand behind the net"),
  smashNight: m(smashNight, "A player leaps for an overhead smash against a dark background"),
  clubRally: m(clubRally, "A player in bright trainers plays a shot on an indoor court"),
  playerOrange: m(playerOrange, "A player waits between points holding her racket"),
  racketFlatlay: m(racketFlatlay, "A padel racket, ball and tube laid on the court surface"),
  racketMoody: m(racketMoody, "A padel racket stands beside a ball on court"),
  racketBall: m(racketBall, "A ball bounces off a perforated padel racket at the net"),
  racketCloseup: m(racketCloseup, "A hand grips a perforated padel racket against the glass"),
  courtsAerial: m(courtsAerial, "An aerial view of a row of padel courts lit at night"),
  playerLow: m(playerLow, "A player bends low into a shot under hard light"),
  topdown: m(topdown, "Top-down view of trainers, a racket and a ball on the court lines"),
  warmupLunge: m(warmupLunge, "An athlete in a deep lunge stretch, backlit"),
  warmupSide: m(warmupSide, "An athlete in a side lunge stretch in a hazy space"),
  warmupCalf: m(warmupCalf, "An athlete stretches their calf before playing"),
  warmupSprint: m(warmupSprint, "An athlete crouches in a sprint start on a reflective floor"),
  espresso: m(espresso, "Two espresso shots pour from the machine"),
  latteArt: m(latteArt, "Milk poured into a cappuccino forming latte art"),
  coffeePour: m(coffeePour, "Coffee pours into a white cup, steam rising"),
  croissants: m(croissants, "Golden croissants dusted with icing sugar"),
  cafeInterior: m(cafeInterior, "A warm, dimly lit café interior with pendant lights"),
  cheers: m(cheers, "Friends laugh and raise their glasses together"),
  cocktails: m(cocktails, "Two drinks meet over a table in a warm, dark lounge"),
  lounge: m(lounge, "A low-lit lounge with tub chairs and candles"),
  streaks: m(streaks, "Streaks of orange light on black"),
  mesh: m(mesh, "Macro of curved wire mesh"),
  waffleCaramel: m(waffleCaramel, "Caramel sauce poured over a waffle topped with cream and nuts"),
  waffleBerries: m(waffleBerries, "A waffle topped with fresh berries and icing sugar"),
  pancakes: m(pancakes, "A tall stack of pancakes with syrup and chocolate"),
  shakesPair: m(shakesPair, "Two vanilla thickshakes topped with whipped cream"),
  shakeChoc: m(shakeChoc, "A chocolate thickshake with whipped cream and drizzle"),
  sundae: m(sundae, "A chocolate and vanilla sundae with wafer rolls"),
  cookies: m(cookies, "A stack of warm chocolate-chip cookies"),
} satisfies Record<string, Media>;

export type ImgKey = keyof typeof IMG;

export const VIDEO = {
  loop: { mp4: "/video/bounc-loop.mp4", webm: "/video/bounc-loop.webm", poster: "/video/bounc-loop-poster.jpg" },
  film: { mp4: "/video/bounc-film.mp4", poster: "/video/bounc-loop-poster.jpg" },
};
