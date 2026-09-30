import { MARK, WORDMARK } from "@/lib/logo-paths";
import { cn } from "@/lib/cn";

type Props = { className?: string; title?: string };

/** The five-bar BOUNC mark. Each bar is a separate path for animation. */
export function Mark({ className, title }: Props) {
  return (
    <svg
      viewBox={MARK.viewBox}
      className={cn("block h-auto w-full overflow-visible", className)}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {MARK.bars.map((d, i) => (
        <path key={i} d={d} data-bar style={{ ["--i" as string]: i }} />
      ))}
    </svg>
  );
}

/** The italic BOUNC wordmark, one path per letter. */
export function Wordmark({ className, title }: Props) {
  return (
    <svg
      viewBox={WORDMARK.viewBox}
      className={cn("block h-auto w-full overflow-visible", className)}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {WORDMARK.letters.map((d, i) => (
        <path key={i} d={d} data-letter fillRule="evenodd" />
      ))}
    </svg>
  );
}
