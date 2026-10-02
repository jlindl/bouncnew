"use client";

import { useSyncExternalStore } from "react";
import { PRODUCTS, priceFor, type Product, type Selection } from "@/lib/shop";

export type Line = { id: string; slug: string; selection: Selection; qty: number };
type State = { lines: Line[]; open: boolean };

const KEY = "bounc:cart";
const EMPTY: State = { lines: [], open: false };

let state: State = EMPTY;
let loaded = false;
const subs = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    const lines = raw ? (JSON.parse(raw) as Line[]) : [];
    // Drop anything that no longer exists in the catalogue
    state = { ...state, lines: lines.filter((l) => PRODUCTS.some((p) => p.slug === l.slug)) };
  } catch {}
}

function set(next: State) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state.lines));
  } catch {}
  subs.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  subs.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    loaded = false;
    load();
    fn();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    subs.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

function snapshot() {
  load();
  return state;
}

export function useCart() {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}

export function lineId(slug: string, selection: Selection) {
  const sel = Object.keys(selection)
    .sort()
    .map((k) => `${k}:${selection[k]}`)
    .join("|");
  return `${slug}${sel ? `|${sel}` : ""}`;
}

export const cart = {
  add(product: Product, selection: Selection, qty = 1) {
    load();
    const id = lineId(product.slug, selection);
    const existing = state.lines.find((l) => l.id === id);
    const lines = existing
      ? state.lines.map((l) => (l.id === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l))
      : [...state.lines, { id, slug: product.slug, selection, qty }];
    set({ ...state, lines });
  },
  setQty(id: string, qty: number) {
    if (qty <= 0) return cart.remove(id);
    set({ ...state, lines: state.lines.map((l) => (l.id === id ? { ...l, qty: Math.min(99, qty) } : l)) });
  },
  remove(id: string) {
    set({ ...state, lines: state.lines.filter((l) => l.id !== id) });
  },
  clear() {
    set({ ...state, lines: [] });
  },
  open() {
    set({ ...state, open: true });
  },
  close() {
    set({ ...state, open: false });
  },
};

export type ResolvedLine = Line & { product: Product; unit: number; total: number };

export function resolve(lines: Line[]): ResolvedLine[] {
  return lines.flatMap((l) => {
    const product = PRODUCTS.find((p) => p.slug === l.slug);
    if (!product) return [];
    const unit = priceFor(product, l.selection);
    return [{ ...l, product, unit, total: unit * l.qty }];
  });
}

export function totals(lines: Line[]) {
  const resolved = resolve(lines);
  return {
    count: resolved.reduce((n, l) => n + l.qty, 0),
    subtotal: resolved.reduce((n, l) => n + l.total, 0),
    lines: resolved,
  };
}

/* ── Last order (for the confirmation page) ─────────────────── */

export type Order = {
  number: string;
  email: string;
  name: string;
  shipping: { id: string; label: string; price: number };
  address?: string;
  lines: { name: string; variant: string; qty: number; total: number; slug: string; selection: Selection }[];
  subtotal: number;
  discount: number;
  total: number;
  placedAt: string;
};

const ORDER_KEY = "bounc:last-order";

export function saveOrder(order: Order) {
  try {
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch {}
}

export function readOrder(): Order | null {
  try {
    const raw = sessionStorage.getItem(ORDER_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}
