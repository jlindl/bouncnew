"use client";

import { useRef, useState, type FormEvent, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Logo";

const TOPICS = ["Booking help", "Sessions & leagues", "Events & celebrations", "CUBE café", "Something else"];

type FieldProps = { label: string; name: string; required?: boolean; className?: string };

function Field({ label, name, required, className, ...rest }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("group relative block", className)}>
      <input
        name={name}
        required={required}
        placeholder=" "
        className="peer h-16 w-full border-b border-line-2 bg-transparent pb-1 pt-6 text-lg text-bone outline-none transition-colors focus:border-orange"
        {...rest}
      />
      <span className="pointer-events-none absolute left-0 top-5 origin-left text-bone/50 transition-all duration-500 ease-[var(--ease-expo)] peer-focus:top-0 peer-focus:scale-[0.78] peer-focus:text-orange-soft peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.78]">
        {label}
        {required && <span className="text-orange-soft"> *</span>}
      </span>
      <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-orange transition-transform duration-700 ease-[var(--ease-expo)] peer-focus:scale-x-100" />
    </label>
  );
}

function Area({ label, name, required }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="group relative block">
      <textarea
        name={name}
        required={required}
        placeholder=" "
        rows={5}
        className="peer w-full resize-none border-b border-line-2 bg-transparent pb-3 pt-8 text-lg text-bone outline-none transition-colors focus:border-orange"
      />
      <span className="pointer-events-none absolute left-0 top-7 origin-left text-bone/50 transition-all duration-500 ease-[var(--ease-expo)] peer-focus:top-0 peer-focus:scale-[0.78] peer-focus:text-orange-soft peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.78]">
        {label}
        {required && <span className="text-orange-soft"> *</span>}
      </span>
      <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-orange transition-transform duration-700 ease-[var(--ease-expo)] peer-focus:scale-x-100" />
    </label>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const doneRef = useRef<HTMLDivElement>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic, newsletter: data.newsletter === "on" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("done");
      form.reset();
      requestAnimationFrame(() => {
        if (!doneRef.current) return;
        const q = gsap.utils.selector(doneRef.current);
        gsap.fromTo(q("[data-bar]"), { yPercent: 140, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.07, duration: 0.9, ease: "bounc" });
        gsap.fromTo(q("[data-done-text]"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 1, delay: 0.3, ease: "bounc" });
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div ref={doneRef} role="status" className="flex min-h-[28rem] flex-col items-start justify-center rounded-[1.5rem] bg-ink-3 p-10 ring-1 ring-inset ring-line">
        <div className="w-20 text-orange">
          <Mark />
        </div>
        <p data-done-text className="display mt-8 text-[clamp(2.6rem,5vw,4.5rem)] text-bone">
          Message received.
        </p>
        <p data-done-text className="mt-4 max-w-md text-bone/70">
          Thanks for getting in touch — the team will get back to you as soon as possible. In the meantime, courts are live on Playtomic.
        </p>
        <button data-done-text type="button" onClick={() => setStatus("idle")} className="u-sweep mt-8 text-sm text-orange-soft">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8" noValidate={false}>
      <fieldset>
        <legend className="eyebrow mb-4 text-mute">What’s it about?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-all duration-300",
                topic === t ? "bg-orange text-bone" : "text-bone/70 ring-1 ring-inset ring-line-2 hover:text-bone hover:ring-bone/40",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="First name" name="firstName" required autoComplete="given-name" />
        <Field label="Last name" name="lastName" autoComplete="family-name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <Area label="Message" name="message" required />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <label className="flex cursor-pointer items-center gap-3 text-bone/75">
        <input type="checkbox" name="newsletter" className="peer sr-only" />
        <span className="grid size-6 place-items-center rounded-md ring-1 ring-inset ring-line-2 transition peer-checked:bg-orange peer-checked:ring-orange peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-orange-soft">
          <svg viewBox="0 0 16 16" className="size-3.5 text-bone" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden>
            <path d="m3.5 8.5 3 3 6-7" />
          </svg>
        </span>
        Yes, send me BOUNC news, league drops and event invites.
      </label>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-orange/15 px-4 py-3 text-sm text-bone">
          {error} You can also email us directly.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
