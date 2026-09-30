import { cn } from "@/lib/cn";

/** "(01) — The club" style kicker used above section headings. */
export function SectionLabel({ index, children, className }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-bone/60", className)}>
      {index && <span className="text-orange-soft">({index})</span>}
      <span aria-hidden className="inline-block h-[2px] w-6 -skew-x-[17deg] bg-orange" />
      <span>{children}</span>
    </p>
  );
}
