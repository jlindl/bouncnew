"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { usePageTransition } from "@/components/providers/PageTransition";
import { lenisStore } from "@/lib/stores";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "href"> &
  Omit<LinkProps, "href"> & { href: string; children: ReactNode };

/** next/link that plays the slanted-bar curtain before client navigation. */
export function TransitionLink({ href, children, onNavigate, ...props }: Props) {
  const transition = usePageTransition();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      {...props}
      onNavigate={(e) => {
        onNavigate?.(e);
        const [path, hash] = href.split("#");
        const targetPath = path || pathname;
        if (targetPath === pathname) {
          e.preventDefault();
          const lenis = lenisStore.get();
          if (hash) lenis?.scrollTo(`#${hash}`, { offset: -96 });
          else lenis?.scrollTo(0, { duration: 1.6 });
          return;
        }
        if (!transition) return;
        e.preventDefault();
        transition.navigate(href);
      }}
    >
      {children}
    </Link>
  );
}
