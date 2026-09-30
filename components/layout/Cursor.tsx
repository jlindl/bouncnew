"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Two-part cursor: a precise dot and a lagging ring.
 * - links/buttons: ring expands
 * - [data-cursor="Label"]: ring becomes an orange disc with the label
 * - text fields: custom cursor steps aside for the native caret
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const d = dot.current!;
    const r = ring.current!;
    const l = label.current!;
    document.documentElement.classList.add("has-cursor");

    gsap.set([d, r], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3" });

    let visible = false;
    let mode = "";

    const setMode = (next: string, text = "") => {
      if (next === mode && !text) return;
      mode = next;
      if (next === "label") {
        l.textContent = text;
        gsap.to(r, { width: 104, height: 104, backgroundColor: "#be4017", borderColor: "rgba(190,64,23,0)", duration: 0.5, ease: "bounc" });
        gsap.to(l, { autoAlpha: 1, scale: 1, duration: 0.4, delay: 0.05 });
        gsap.to(d, { scale: 0, duration: 0.3 });
      } else if (next === "link") {
        gsap.to(r, { width: 64, height: 64, backgroundColor: "rgba(240,238,237,0.06)", borderColor: "rgba(240,238,237,0.5)", duration: 0.5, ease: "bounc" });
        gsap.to(l, { autoAlpha: 0, scale: 0.6, duration: 0.2 });
        gsap.to(d, { scale: 0.5, duration: 0.3 });
      } else if (next === "text") {
        gsap.to([r, d], { autoAlpha: 0, duration: 0.2 });
      } else {
        gsap.to(r, { width: 38, height: 38, backgroundColor: "rgba(240,238,237,0)", borderColor: "rgba(240,238,237,0.35)", duration: 0.5, ease: "bounc" });
        gsap.to(l, { autoAlpha: 0, scale: 0.6, duration: 0.2 });
        gsap.to(d, { scale: 1, duration: 0.3 });
      }
      if (next !== "text" && visible) gsap.to([r, d], { autoAlpha: 1, duration: 0.2 });
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.set([d, r], { x: e.clientX, y: e.clientY });
        gsap.to([d, r], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled?.dataset.cursor) return setMode("label", labelled.dataset.cursor);
      if (t.closest("input, textarea, select")) return setMode("text");
      if (t.closest("a, button, [role='button'], label, summary")) return setMode("link");
      setMode("default");
    };

    const down = () => gsap.to(r, { scale: 0.82, duration: 0.2 });
    const up = () => gsap.to(r, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    const leave = () => {
      visible = false;
      gsap.to([d, r], { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    setMode("default");

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[300] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={ring}
        className="fixed left-0 top-0 grid size-[38px] place-items-center rounded-full border border-bone/35 opacity-0"
      >
        <span ref={label} className="eyebrow text-[0.68rem] text-bone opacity-0">
          View
        </span>
      </div>
      <div ref={dot} className="fixed left-0 top-0 size-[7px] rounded-full bg-orange-soft opacity-0" />
    </div>
  );
}
