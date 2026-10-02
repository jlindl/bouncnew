"use client";

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; className?: string; hint?: string };

/** Underlined input with a floating label and an orange focus sweep. */
export function FloatField({ label, className, hint, required, ...rest }: Props) {
  return (
    <label className={cn("group relative block", className)}>
      <input
        required={required}
        placeholder=" "
        className="peer h-16 w-full border-b border-line-2 bg-transparent pb-1 pt-6 text-lg text-bone outline-none transition-colors focus:border-orange [&:user-invalid]:border-orange-soft"
        {...rest}
      />
      <span className="pointer-events-none absolute left-0 top-5 origin-left text-bone/50 transition-all duration-500 ease-[var(--ease-expo)] peer-focus:top-0 peer-focus:scale-[0.78] peer-focus:text-orange-soft peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.78]">
        {label}
        {required && <span className="text-orange-soft"> *</span>}
      </span>
      <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-orange transition-transform duration-700 ease-[var(--ease-expo)] peer-focus:scale-x-100" />
      {hint && <span className="mt-1.5 block text-xs text-bone/45">{hint}</span>}
    </label>
  );
}
