"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import { MARK, WORDMARK } from "@/lib/logo-paths";
import type { Art, RacketShape } from "@/lib/shop";
import { cn } from "@/lib/cn";

/* Studio-style product renders drawn in SVG, so colourways can morph live. */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const T: CSSProperties = { transition: `fill 0.7s ${EASE}, stop-color 0.7s ${EASE}, stroke 0.7s ${EASE}` };
const MONO: CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

function isLight(hex: string) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}

function MarkG({ x, y, w, fill, opacity = 1 }: { x: number; y: number; w: number; fill: string; opacity?: number }) {
  const s = w / Number(MARK.viewBox.split(" ")[2]);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill} style={T} opacity={opacity}>
      {MARK.bars.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  );
}

function WordG({ x, y, w, fill, opacity = 1 }: { x: number; y: number; w: number; fill: string; opacity?: number }) {
  const s = w / Number(WORDMARK.viewBox.split(" ")[2]);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill} style={T} opacity={opacity}>
      {WORDMARK.letters.map((d, i) => (
        <path key={i} d={d} fillRule="evenodd" />
      ))}
    </g>
  );
}

/* ── Racket ─────────────────────────────────────────────────── */

const HEADS: Record<RacketShape, string> = {
  round: "M200 38 C298 38 322 120 320 172 C318 240 268 302 200 308 C132 302 82 240 80 172 C78 120 102 38 200 38 Z",
  teardrop: "M200 34 C306 34 326 116 318 168 C310 236 258 300 200 314 C142 300 90 236 82 168 C74 116 94 34 200 34 Z",
  diamond: "M200 32 C266 32 314 66 322 126 C328 172 302 236 200 318 C98 236 72 172 78 126 C86 66 134 32 200 32 Z",
};

const HOLES: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (let row = 0, y = 76; y <= 232; y += 17, row++) {
    for (let x = 104 + (row % 2) * 8.5; x <= 296; x += 17) {
      if (((x - 200) / 86) ** 2 + ((y - 154) / 82) ** 2 < 1) out.push([x, y]);
    }
  }
  return out;
})();

function Racket({ art, id }: { art: Extract<Art, { kind: "racket" }>; id: string }) {
  const head = HEADS[art.shape];
  const light = isLight(art.face);
  const ink = light ? "#121212" : "#f0eeed";
  return (
    <g transform="rotate(-14 200 250) translate(0 6)">
      <defs>
        <clipPath id={`${id}-face`}>
          <path d={head} />
        </clipPath>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={light ? 0.35 : 0.14} />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id={`${id}-gloss`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grip`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <rect width="9" height="9" fill="#111" />
          <rect width="2.5" height="9" fill="#262626" />
        </pattern>
      </defs>

      {/* throat arms + handle */}
      <path d="M158 286 C174 318 186 344 190 374" stroke={art.frame} strokeWidth="15" strokeLinecap="round" fill="none" style={T} />
      <path d="M242 286 C226 318 214 344 210 374" stroke={art.frame} strokeWidth="15" strokeLinecap="round" fill="none" style={T} />
      <rect x="183" y="368" width="34" height="100" rx="7" fill={`url(#${id}-grip)`} />
      <rect x="183" y="368" width="34" height="100" rx="7" fill="none" stroke="#000" strokeOpacity="0.4" />
      <rect x="181" y="366" width="38" height="8" rx="3" fill={art.accent} style={T} />
      <rect x="179" y="462" width="42" height="13" rx="5" fill={art.frame} style={T} />
      <path d="M200 475 C197 494 170 496 163 484 C156 471 178 466 198 476" stroke="#2a2a2a" strokeWidth="3" fill="none" />

      {/* head */}
      <path d={head} fill={art.face} stroke={art.frame} strokeWidth="18" style={T} />
      <g clipPath={`url(#${id}-face)`}>
        <g transform="skewX(-12) translate(34 0)" opacity="0.9">
          {[112, 156, 200, 244, 288].map((x) => (
            <rect key={x} x={x} y="20" width="2.2" height="320" fill={art.accent} opacity="0.55" style={T} />
          ))}
          {[96, 140, 184, 228].map((y) => (
            <rect key={y} x="60" y={y} width="300" height="2.2" fill={art.accent} opacity="0.55" style={T} />
          ))}
          <rect x="156" y="140" width="88" height="88" fill={art.accent} style={T} />
        </g>
        {HOLES.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4.3" fill="#070707" stroke="#fff" strokeOpacity="0.09" strokeWidth="0.8" />
        ))}
        <path d={head} fill={`url(#${id}-shade)`} />
        <ellipse cx="150" cy="104" rx="58" ry="92" transform="rotate(-24 150 104)" fill={`url(#${id}-gloss)`} />
      </g>
      <path d={head} fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="1.4" transform="translate(-1.5 -1.5)" />
      <MarkG x={180} y={52} w={40} fill={art.accent === art.face ? ink : art.accent} />
      <WordG x={154} y={246} w={92} fill={ink} />
      <text x="200" y="290" textAnchor="middle" fontSize="7.5" letterSpacing="2.5" fill={ink} opacity="0.75" style={MONO}>
        {art.label}
      </text>
    </g>
  );
}

/* ── Balls ──────────────────────────────────────────────────── */

function Ball({ cx, cy, r, id }: { cx: number; cy: number; r: number; id: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-ball)`} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-felt)`} opacity="0.5" />
      <path
        d={`M${cx - r * 0.72} ${cy - r * 0.69} C${cx - r * 0.18} ${cy - r * 0.3} ${cx - r * 0.18} ${cy + r * 0.3} ${cx - r * 0.72} ${cy + r * 0.69}`}
        stroke="#fbfde8"
        strokeWidth={r * 0.07}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M${cx + r * 0.72} ${cy - r * 0.69} C${cx + r * 0.18} ${cy - r * 0.3} ${cx + r * 0.18} ${cy + r * 0.3} ${cx + r * 0.72} ${cy + r * 0.69}`}
        stroke="#fbfde8"
        strokeWidth={r * 0.07}
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-ballshade)`} />
    </g>
  );
}

function Balls({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-tube`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#040404" />
          <stop offset="0.3" stopColor="#2b2b2b" />
          <stop offset="0.55" stopColor="#111" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <linearGradient id={`${id}-lid`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#151515" />
          <stop offset="0.35" stopColor="#4a4a4a" />
          <stop offset="1" stopColor="#151515" />
        </linearGradient>
        <radialGradient id={`${id}-ball`} cx="0.36" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#f6ff9c" />
          <stop offset="0.45" stopColor="#d6ec38" />
          <stop offset="1" stopColor="#8ea214" />
        </radialGradient>
        <radialGradient id={`${id}-ballshade`} cx="0.7" cy="0.78" r="0.6">
          <stop offset="0" stopColor="#000" stopOpacity="0.32" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-felt`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.7" fill="#fff" opacity="0.35" />
          <circle cx="4.5" cy="4" r="0.6" fill="#000" opacity="0.2" />
        </pattern>
      </defs>
      <g transform="rotate(6 200 250)">
        <rect x="148" y="74" width="104" height="24" fill={`url(#${id}-lid)`} />
        <ellipse cx="200" cy="74" rx="52" ry="13" fill="#3a3a3a" />
        <ellipse cx="200" cy="74" rx="44" ry="9" fill="#222" />
        <rect x="150" y="98" width="100" height="300" fill={`url(#${id}-tube)`} />
        <path d="M150 398 A50 13 0 0 0 250 398 Z" fill="#0b0b0b" />
        <rect x="150" y="96" width="100" height="3" fill="#000" opacity="0.6" />
        <rect x="166" y="104" width="9" height="288" rx="4" fill="#fff" opacity="0.07" />
        <MarkG x={166} y={170} w={68} fill="#f0eeed" />
        <WordG x={172} y={276} w={56} fill="#f0eeed" opacity={0.85} />
        <text x="200" y="330" textAnchor="middle" fontSize="6.5" letterSpacing="2" fill="#f0eeed" opacity="0.6" style={MONO}>
          PRO PADEL · 3 BALLS
        </text>
      </g>
      <Ball cx={122} cy={404} r={50} id={id} />
      <Ball cx={284} cy={414} r={42} id={id} />
    </g>
  );
}

/* ── Apparel ────────────────────────────────────────────────── */

function Shading({ id, light }: { id: string; light: boolean }) {
  return (
    <defs>
      <linearGradient id={`${id}-cloth`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity={light ? 0.25 : 0.08} />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity={light ? 0.22 : 0.4} />
      </linearGradient>
    </defs>
  );
}

const TEE = "M132 96 L166 80 C180 104 220 104 234 80 L268 96 L334 150 L304 198 L276 180 L280 424 C230 437 170 437 120 424 L124 180 L96 198 L66 150 Z";

function Tee({ art, id }: { art: Extract<Art, { kind: "tee" }>; id: string }) {
  const light = isLight(art.color);
  return (
    <g transform="translate(0 10)">
      <Shading id={id} light={light} />
      <path d={TEE} fill={art.color} style={T} />
      <path d="M166 80 C180 104 220 104 234 80 C224 96 176 96 166 80 Z" fill="#000" opacity="0.35" />
      <path d="M166 80 C180 104 220 104 234 80" stroke="#000" strokeOpacity="0.18" strokeWidth="7" fill="none" />
      <path d="M124 180 C140 260 132 360 128 420 M276 180 C262 250 270 350 274 420 M160 300 C190 320 210 318 240 300" stroke="#000" strokeOpacity={light ? 0.07 : 0.25} strokeWidth="10" fill="none" />
      <path d={TEE} fill={`url(#${id}-cloth)`} />
      <WordG x={136} y={150} w={128} fill={art.print} />
      <g transform="rotate(38 312 160)">
        <MarkG x={300} y={150} w={22} fill={art.print} />
      </g>
    </g>
  );
}

const HOODIE =
  "M140 104 L120 110 L74 162 L58 382 L94 388 L110 208 L112 428 C160 442 240 442 288 428 L290 208 L306 388 L342 382 L326 162 L280 110 L260 104 C246 130 154 130 140 104 Z";

function Hoodie({ art, id }: { art: Extract<Art, { kind: "hoodie" }>; id: string }) {
  const light = isLight(art.color);
  return (
    <g transform="translate(0 8)">
      <Shading id={id} light={light} />
      <path d="M146 112 C132 48 268 48 254 112 Z" fill={art.color} style={T} />
      <path d="M146 112 C132 48 268 48 254 112 Z" fill="#000" opacity="0.28" />
      <path d={HOODIE} fill={art.color} style={T} />
      <path d="M150 108 C164 136 236 136 250 108 C236 124 164 124 150 108 Z" fill="#000" opacity="0.5" />
      <path d="M58 382 L94 388 L95 368 L60 362 Z M342 382 L306 388 L305 368 L340 362 Z" fill="#000" opacity="0.18" />
      <path d="M112 410 C160 424 240 424 288 410 L288 428 C240 442 160 442 112 428 Z" fill="#000" opacity="0.18" />
      <path d="M146 320 L254 320 L272 404 L128 404 Z" fill="#000" opacity={light ? 0.08 : 0.22} />
      <path d="M150 326 L250 326" stroke="#000" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="3 4" />
      <path d="M180 126 L176 196 M220 126 L224 200" stroke={light ? "#d8d2cc" : "#e8e4e0"} strokeWidth="3" strokeLinecap="round" />
      <rect x="172.5" y="194" width="7" height="12" rx="2" fill={light ? "#9b948d" : "#bdb7b1"} />
      <rect x="220.5" y="198" width="7" height="12" rx="2" fill={light ? "#9b948d" : "#bdb7b1"} />
      <path d={HOODIE} fill={`url(#${id}-cloth)`} />
      <WordG x={140} y={218} w={120} fill={art.print} />
    </g>
  );
}

function Cap({ art, id }: { art: Extract<Art, { kind: "cap" }>; id: string }) {
  const light = isLight(art.color);
  return (
    <g transform="translate(0 30)">
      <Shading id={id} light={light} />
      <path d="M104 286 C104 150 296 150 296 286 Z" fill={art.color} style={T} />
      <path d="M200 166 L200 286 M152 182 C162 222 166 254 168 286 M248 182 C238 222 234 254 232 286" stroke="#000" strokeOpacity="0.22" strokeWidth="2" fill="none" />
      <circle cx="200" cy="166" r="8" fill={art.color} stroke="#000" strokeOpacity="0.3" style={T} />
      <path d="M104 286 C104 150 296 150 296 286 Z" fill={`url(#${id}-cloth)`} />
      <MarkG x={172} y={222} w={56} fill={art.print} />
      <path d="M92 282 C120 264 280 264 308 282 C336 304 300 346 200 348 C100 346 64 304 92 282 Z" fill={art.color} style={T} />
      <path d="M92 282 C120 264 280 264 308 282 C300 292 260 300 200 300 C140 300 100 292 92 282 Z" fill="#000" opacity="0.35" />
      <path d="M92 282 C120 264 280 264 308 282 C336 304 300 346 200 348 C100 346 64 304 92 282 Z" fill={`url(#${id}-cloth)`} />
      <path d="M100 300 C130 330 270 330 300 300" stroke="#000" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="3 4" fill="none" />
    </g>
  );
}

function Band({ cx, cy, color, print, id }: { cx: number; cy: number; color: string; print: string; id: string }) {
  const w = 156;
  const h = 64;
  const rx = w / 2;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry="24" fill={color} style={T} />
      <ellipse cx={cx} cy={cy} rx={rx} ry="24" fill="#000" opacity="0.45" />
      <ellipse cx={cx} cy={cy} rx={rx - 12} ry="16" fill="#050505" />
      <path d={`M${cx - rx} ${cy} L${cx - rx} ${cy + h} A${rx} 24 0 0 0 ${cx + rx} ${cy + h} L${cx + rx} ${cy} A${rx} 24 0 0 1 ${cx - rx} ${cy} Z`} fill={color} style={T} />
      <path
        d={`M${cx - rx} ${cy} L${cx - rx} ${cy + h} A${rx} 24 0 0 0 ${cx + rx} ${cy + h} L${cx + rx} ${cy} A${rx} 24 0 0 1 ${cx - rx} ${cy} Z`}
        fill={`url(#${id}-cyl)`}
      />
      {Array.from({ length: 22 }).map((_, i) => {
        const x = cx - rx + 8 + i * ((w - 16) / 21);
        return <line key={i} x1={x} y1={cy + 18} x2={x} y2={cy + h + 14} stroke="#000" strokeOpacity="0.12" strokeWidth="2" />;
      })}
      <WordG x={cx - 40} y={cy + 30} w={80} fill={print} />
    </g>
  );
}

function Wristbands({ art, id }: { art: Extract<Art, { kind: "wristband" }>; id: string }) {
  const second = art.color === "#be4017" ? "#141414" : "#be4017";
  const secondPrint = second === "#be4017" ? "#0c0c0c" : "#f0eeed";
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-cyl`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.5" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <g transform="rotate(-8 200 250)">
        <Band cx={226} cy={292} color={second} print={secondPrint} id={id} />
        <Band cx={182} cy={176} color={art.color} print={art.print} id={id} />
      </g>
    </g>
  );
}

function Grips({ id }: { id: string }) {
  const roll = (cx: number, cy: number, color: string, line: string) => (
    <g>
      <path d={`M${cx + 58} ${cy + 20} C${cx + 90} ${cy + 60} ${cx + 70} ${cy + 110} ${cx + 30} ${cy + 130}`} stroke={color} strokeWidth="26" fill="none" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="70" fill={color} />
      {[60, 50, 40, 31].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={line} strokeOpacity="0.18" strokeWidth="1.5" />
      ))}
      <circle cx={cx} cy={cy} r="22" fill="#0b0b0b" />
      <circle cx={cx} cy={cy} r="70" fill={`url(#${id}-gs)`} />
    </g>
  );
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-gs`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
      </defs>
      {roll(140, 200, "#141414", "#fff")}
      {roll(262, 214, "#ece7e2", "#000")}
      {roll(196, 316, "#be4017", "#000")}
    </g>
  );
}

function Bag({ art, id }: { art: Extract<Art, { kind: "bag" }>; id: string }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-bag`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <path d="M168 150 C168 96 232 96 232 150" stroke="#0a0a0a" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M168 150 C168 100 232 100 232 150" stroke="#fff" strokeOpacity="0.08" strokeWidth="3" fill="none" />
      <rect x="86" y="144" width="228" height="290" rx="34" fill={art.color} style={T} />
      <path d="M96 190 C150 172 250 172 304 190" stroke={art.accent} strokeWidth="5" fill="none" strokeDasharray="2 3" style={T} />
      <rect x="292" y="176" width="10" height="24" rx="3" fill={art.accent} style={T} />
      <rect x="116" y="262" width="168" height="140" rx="22" fill="#000" opacity="0.28" />
      <path d="M126 286 L274 286" stroke={art.accent} strokeWidth="4" strokeDasharray="2 3" style={T} />
      <MarkG x={176} y={318} w={48} fill={art.accent} />
      <WordG x={150} y={208} w={100} fill="#f0eeed" opacity={0.92} />
      <rect x="86" y="144" width="228" height="290" rx="34" fill={`url(#${id}-bag)`} />
      <rect x="86" y="410" width="228" height="24" rx="12" fill="#000" opacity="0.3" />
    </g>
  );
}

function Bottle({ art, id }: { art: Extract<Art, { kind: "bottle" }>; id: string }) {
  return (
    <g transform="rotate(4 200 260)">
      <defs>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.5" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d="M186 74 C186 52 214 52 214 74" stroke={art.accent} strokeWidth="9" fill="none" style={T} />
      <rect x="168" y="70" width="64" height="52" rx="12" fill={art.accent} style={T} />
      <rect x="168" y="70" width="64" height="52" rx="12" fill={`url(#${id}-steel)`} />
      <path d="M164 128 L236 128 C252 140 256 158 256 176 L256 420 C256 440 244 448 200 448 C156 448 144 440 144 420 L144 176 C144 158 148 140 164 128 Z" fill={art.color} style={T} />
      <rect x="166" y="120" width="68" height="12" rx="4" fill="#9a9a9a" />
      <g transform="rotate(-90 200 300)">
        <WordG x={140} y={286} w={120} fill={art.accent === "#141414" ? "#141414" : "#f0eeed"} />
      </g>
      <MarkG x={186} y={392} w={28} fill={art.accent} />
      <path d="M164 128 L236 128 C252 140 256 158 256 176 L256 420 C256 440 244 448 200 448 C156 448 144 440 144 420 L144 176 C144 158 148 140 164 128 Z" fill={`url(#${id}-steel)`} />
    </g>
  );
}

function GiftCard({ art, id }: { art: Extract<Art, { kind: "giftcard" }>; id: string }) {
  const DISPLAY: CSSProperties = { fontFamily: "var(--font-archivo)", fontStyle: "italic", fontWeight: 900, fontStretch: "72%" };
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-gc`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e0521f" />
          <stop offset="1" stopColor="#9e3312" />
        </linearGradient>
      </defs>
      <g transform="rotate(9 220 230)">
        <rect x="80" y="150" width="264" height="168" rx="18" fill="#141414" stroke="#fff" strokeOpacity="0.08" />
        <WordG x={220} y={276} w={100} fill="#f0eeed" opacity={0.85} />
      </g>
      <g transform="rotate(-8 190 290)">
        <rect x="60" y="214" width="264" height="168" rx="18" fill={`url(#${id}-gc)`} />
        <rect x="60" y="214" width="264" height="168" rx="18" fill="none" stroke="#fff" strokeOpacity="0.2" />
        <MarkG x={82} y={236} w={44} fill="#0c0c0c" />
        <text x="82" y="306" fontSize="8" letterSpacing="2.5" fill="#0c0c0c" style={MONO}>
          GIFT CARD
        </text>
        <text x="80" y="356" fontSize="52" fill="#f0eeed" style={DISPLAY}>
          {art.amount}
        </text>
        <WordG x={230} y={348} w={76} fill="#0c0c0c" />
      </g>
    </g>
  );
}

/* ── Public component ───────────────────────────────────────── */

export function ProductArt({ art, className, title }: { art: Art; className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  let body: ReactNode;
  switch (art.kind) {
    case "racket":
      body = <Racket art={art} id={id} />;
      break;
    case "balls":
      body = <Balls id={id} />;
      break;
    case "tee":
      body = <Tee art={art} id={id} />;
      break;
    case "hoodie":
      body = <Hoodie art={art} id={id} />;
      break;
    case "cap":
      body = <Cap art={art} id={id} />;
      break;
    case "wristband":
      body = <Wristbands art={art} id={id} />;
      break;
    case "grips":
      body = <Grips id={id} />;
      break;
    case "bag":
      body = <Bag art={art} id={id} />;
      break;
    case "bottle":
      body = <Bottle art={art} id={id} />;
      break;
    case "giftcard":
      body = <GiftCard art={art} id={id} />;
      break;
  }
  return (
    <svg viewBox="0 0 400 500" className={cn("block h-full w-full overflow-visible", className)} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {body}
    </svg>
  );
}
