"use client";

import { useSyncExternalStore } from "react";
import { getOpenStatus } from "@/lib/hours";
import { cn } from "@/lib/cn";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};
const snapshot = () => {
  const s = getOpenStatus();
  return `${s.open ? "1" : "0"}${s.label}`;
};

/** Live open/closed indicator computed in UK time from the published hours. */
export function OpenStatus({ className }: { className?: string }) {
  const snap = useSyncExternalStore(subscribe, snapshot, () => null);
  const open = snap?.[0] === "1";
  const label = snap ? snap.slice(1) : "Mon–Fri 6am–2am · Sat–Sun 5am–3am";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn("pulse-dot size-2 shrink-0 rounded-full", snap === null ? "bg-mute" : open ? "bg-[#3ddc84] text-[#3ddc84]" : "bg-orange text-orange")}
      />
      <span className="eyebrow whitespace-nowrap">{label}</span>
    </span>
  );
}
