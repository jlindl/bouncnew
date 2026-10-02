"use client";

import { cn } from "@/lib/cn";
import { Mark, Wordmark } from "@/components/ui/Logo";

export function cardBrand(num: string) {
  const n = num.replace(/\D/g, "");
  if (/^4/.test(n)) return "VISA";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "MASTERCARD";
  if (/^3[47]/.test(n)) return "AMEX";
  return "";
}

/** Live 3D card that mirrors what you type and flips to the back for the security code. */
export function CardPreview({ number, name, exp, cvc, flipped }: { number: string; name: string; exp: string; cvc: string; flipped: boolean }) {
  const digits = number.replace(/\D/g, "").padEnd(16, "•").slice(0, 16);
  const groups = digits.match(/.{1,4}/g) ?? [];
  const brand = cardBrand(number);

  return (
    <div className="mx-auto w-full max-w-[24rem] [perspective:1200px]" aria-hidden>
      <div
        className="relative aspect-[1.586] w-full transition-transform duration-[900ms] ease-[var(--ease-expo)] [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* front */}
        <div className="absolute inset-0 overflow-hidden rounded-[1.1rem] bg-[linear-gradient(135deg,#e0521f_0%,#be4017_45%,#7e2a0f_100%)] p-5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] [backface-visibility:hidden] sm:p-6">
          <div className="absolute -right-8 -top-10 w-[70%] text-ink/10">
            <Mark />
          </div>
          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between">
              <span className="w-20 text-bone">
                <Wordmark />
              </span>
              <span className={cn("eyebrow text-bone transition-opacity", brand ? "opacity-100" : "opacity-0")}>{brand || "—"}</span>
            </div>
            <div className="mt-5 h-8 w-11 rounded-md bg-[linear-gradient(135deg,#f3d9a4,#b88a3e)] opacity-90" />
            <p className="mt-auto font-mono text-[clamp(1rem,4.2vw,1.35rem)] tracking-[0.12em] text-bone">
              {groups.map((g, i) => (
                <span key={i} className="mr-3 last:mr-0">
                  {g}
                </span>
              ))}
            </p>
            <div className="mt-4 flex items-end justify-between text-bone">
              <div className="min-w-0">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] opacity-70">Card holder</p>
                <p className="truncate text-sm font-medium uppercase tracking-wide">{name || "Your name"}</p>
              </div>
              <div className="text-right">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] opacity-70">Expires</p>
                <p className="font-mono text-sm">{exp || "MM / YY"}</p>
              </div>
            </div>
          </div>
        </div>
        {/* back */}
        <div className="absolute inset-0 overflow-hidden rounded-[1.1rem] bg-[linear-gradient(135deg,#1d1d1d,#0b0b0b)] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="mt-6 h-11 bg-black" />
          <div className="mx-5 mt-5 flex items-center gap-3">
            <div className="h-9 flex-1 rounded bg-[repeating-linear-gradient(90deg,#e8e4e0_0_6px,#d6d1cc_6px_12px)]" />
            <div className="grid h-9 w-16 place-items-center rounded bg-bone font-mono text-ink">{cvc || "•••"}</div>
          </div>
          <div className="absolute bottom-5 right-5 w-10 text-orange">
            <Mark />
          </div>
        </div>
      </div>
    </div>
  );
}
