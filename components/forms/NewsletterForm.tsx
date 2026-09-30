"use client";

import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/Icons";

type State = "idle" | "sending" | "done" | "error";

export function NewsletterForm({ className }: { className?: string }) {
  const [state, setState] = useState<State>("idle");
  const id = useId();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "newsletter" }),
      });
      if (!res.ok) throw new Error();
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className={cn("rounded-full bg-orange/15 px-5 py-3.5 text-sm text-bone", className)} role="status">
        You’re in. See you on court.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={cn("group/nl relative", className)}>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Your email"
        className="h-14 w-full rounded-full bg-ink-3 pl-5 pr-16 text-bone ring-1 ring-inset ring-line-2 transition placeholder:text-mute focus:outline-none focus:ring-orange"
      />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button
        type="submit"
        disabled={state === "sending"}
        aria-label="Subscribe"
        className="absolute right-1.5 top-1.5 grid size-11 place-items-center overflow-hidden rounded-full bg-orange text-bone transition hover:bg-orange-hot disabled:opacity-60"
      >
        <ArrowRight className={cn("size-4 transition-transform duration-500", state === "sending" && "translate-x-[180%]")} />
      </button>
      {state === "error" && (
        <p className="mt-2 text-sm text-orange-soft" role="alert">
          Something went wrong — try again, or email us.
        </p>
      )}
    </form>
  );
}
