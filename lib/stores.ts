"use client";

import type Lenis from "lenis";

/* ── Lenis instance ─────────────────────────────────────────── */

let lenis: Lenis | null = null;
export const lenisStore = {
  get: () => lenis,
  set: (instance: Lenis | null) => {
    lenis = instance;
  },
};

/* ── Page reveal bus ────────────────────────────────────────────
   Intro animations wait until the preloader or page-transition
   curtain has lifted, then fire. Back/forward navigations (no
   curtain) find the flag already set and play immediately.        */

let revealed = false;
const revealListeners = new Set<() => void>();

export function markRevealed() {
  revealed = true;
  const fns = [...revealListeners];
  revealListeners.clear();
  fns.forEach((fn) => fn());
}

export function resetRevealed() {
  revealed = false;
}

export function isRevealed() {
  return revealed;
}

export function onRevealed(fn: () => void) {
  if (revealed) {
    fn();
    return () => {};
  }
  revealListeners.add(fn);
  return () => {
    revealListeners.delete(fn);
  };
}

/* ── Film modal ─────────────────────────────────────────────── */

type FilmListener = (open: boolean) => void;
const filmListeners = new Set<FilmListener>();
export const film = {
  open: () => filmListeners.forEach((fn) => fn(true)),
  close: () => filmListeners.forEach((fn) => fn(false)),
  subscribe: (fn: FilmListener) => {
    filmListeners.add(fn);
    return () => {
      filmListeners.delete(fn);
    };
  },
};
