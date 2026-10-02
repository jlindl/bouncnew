"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/motion/Magnetic";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ArrowRight, ArrowUpRight, Play } from "@/components/ui/Icons";

type Variant = "primary" | "ghost" | "dark" | "light";
type Icon = "arrow" | "external" | "play" | "none";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  icon?: Icon;
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
  /** Classes for the outer wrapper — use this for display/visibility (e.g. "hidden sm:inline-block"). */
  wrapperClassName?: string;
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const VARIANTS: Record<Variant, string> = {
  primary: "bg-orange text-bone [--fill:var(--color-bone)] hover:text-ink [--icon-bg:rgb(7_7_7/0.18)] [--icon-hover:var(--color-orange)]",
  ghost:
    "bg-transparent text-bone ring-1 ring-inset ring-line-2 [--fill:var(--color-bone)] hover:text-ink [--icon-bg:rgb(240_238_237/0.08)] [--icon-hover:var(--color-orange)]",
  dark: "bg-ink text-bone [--fill:var(--color-bone)] hover:text-ink [--icon-bg:rgb(240_238_237/0.1)] [--icon-hover:var(--color-orange)]",
  light: "bg-bone text-ink [--fill:var(--color-orange)] hover:text-bone [--icon-bg:rgb(7_7_7/0.08)] [--icon-hover:var(--color-ink)]",
};

function IconGlyph({ icon }: { icon: Icon }) {
  if (icon === "play") return <Play className="size-3.5" />;
  const G = icon === "external" ? ArrowUpRight : ArrowRight;
  const cls = "size-4 transition-transform duration-[600ms] ease-[var(--ease-expo)]";
  return (
    <>
      <G className={cn(cls, icon === "external" ? "group-hover:translate-x-[160%] group-hover:-translate-y-[160%]" : "group-hover:translate-x-[180%]")} />
      <G
        className={cn(
          cls,
          "absolute",
          icon === "external" ? "-translate-x-[160%] translate-y-[160%]" : "-translate-x-[180%]",
          "group-hover:translate-x-0 group-hover:translate-y-0",
        )}
      />
    </>
  );
}

/** Pill button: fill blooms from the pointer's entry point, label rolls, icon swaps, whole thing is magnetic. */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  icon = "arrow",
  size = "md",
  external,
  className,
  wrapperClassName,
  magnetic = true,
  type = "button",
  disabled,
  ariaLabel,
}: Props) {
  const setOrigin = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const cls = cn(
    "group relative isolate inline-flex select-none items-center overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-colors duration-500 ease-[var(--ease-expo)]",
    size === "lg" ? "h-[3.75rem] gap-4 pl-7 pr-2 text-[1.05rem]" : "h-[3.25rem] gap-3 pl-6 pr-1.5 text-[0.95rem]",
    icon === "none" && (size === "lg" ? "pr-7" : "pr-6"),
    VARIANTS[variant],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  const inner = (
    <>
      <span
        aria-hidden
        className="absolute left-[var(--x,50%)] top-[var(--y,50%)] -z-10 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-[var(--fill)] transition-transform duration-[700ms] ease-[var(--ease-expo)] group-hover:scale-100"
      />
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
      {icon !== "none" && (
        <span
          aria-hidden
          className={cn(
            "relative grid place-items-center overflow-hidden rounded-full bg-[var(--icon-bg)] transition-colors duration-500 group-hover:bg-[var(--icon-hover)] group-hover:text-bone",
            size === "lg" ? "size-11" : "size-10",
          )}
        >
          <IconGlyph icon={icon} />
        </span>
      )}
    </>
  );

  let el: ReactNode;
  if (href && (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"))) {
    const newTab = href.startsWith("http");
    el = (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        onPointerEnter={setOrigin}
        onPointerLeave={setOrigin}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener" : undefined}
        aria-label={ariaLabel}
      >
        {inner}
      </a>
    );
  } else if (href) {
    el = (
      <TransitionLink href={href} className={cls} onClick={onClick} onPointerEnter={setOrigin} onPointerLeave={setOrigin} aria-label={ariaLabel}>
        {inner}
      </TransitionLink>
    );
  } else {
    el = (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cls}
        onPointerEnter={setOrigin}
        onPointerLeave={setOrigin}
        aria-label={ariaLabel}
      >
        {inner}
      </button>
    );
  }

  if (magnetic) {
    return (
      <Magnetic strength={0.22} className={wrapperClassName}>
        {el}
      </Magnetic>
    );
  }
  return wrapperClassName ? <span className={wrapperClassName}>{el}</span> : el;
}
