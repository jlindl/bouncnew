import { MARK } from "@/lib/logo-paths";

// Pre-parse the mark into tokens once so a transformed clip-path string
// can be rebuilt every frame without re-parsing.
type Token = string | number;
const TOKENS: Token[] = [];
for (const d of MARK.bars) {
  for (const m of d.matchAll(/([MCLZ])|(-?\d*\.?\d+)/g)) {
    TOKENS.push(m[1] ?? Number(m[2]));
  }
}

export const MARK_W = Number(MARK.viewBox.split(" ")[2]);
export const MARK_H = Number(MARK.viewBox.split(" ")[3]);

/** CSS `path()` for the BOUNC mark scaled by `s` and offset by (tx, ty) in px. */
export function markPath(s: number, tx: number, ty: number) {
  let out = "";
  let isX = true;
  for (const t of TOKENS) {
    if (typeof t === "string") {
      out += t;
      isX = true;
      continue;
    }
    out += isX ? `${(t * s + tx).toFixed(1)},` : `${(t * s + ty).toFixed(1)} `;
    isX = !isX;
  }
  return `path('${out}')`;
}
