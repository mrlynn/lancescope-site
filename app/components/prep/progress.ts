"use client";

/** Study progress, remembered in this browser only.
 *
 *  Same shape as the theme and the guide's path: the value lives in localStorage,
 *  a custom event says when it changed, and `useSyncExternalStore` reads it. Empty
 *  on the server and through hydration, so nothing renders one state and swaps.
 */
import { useSyncExternalStore } from "react";

export type Progress = {
  cards: Record<string, "known" | "again">;
  rehearsed: Record<string, true>;
};

const KEY = "lancescope-prep";
const EVENT = "lancescope:prepchange";
const EMPTY: Progress = { cards: {}, rehearsed: {} };

let lastRaw: string | null = null;
let lastParsed: Progress = EMPTY;

function read(): Progress {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    // Private windows and blocked site data: study still works, it just forgets.
    return EMPTY;
  }
  if (raw === lastRaw) return lastParsed;
  lastRaw = raw;
  try {
    const p = raw ? JSON.parse(raw) : {};
    lastParsed = { cards: p.cards ?? {}, rehearsed: p.rehearsed ?? {} };
  } catch {
    lastParsed = EMPTY;
  }
  return lastParsed;
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const serverSnapshot = () => EMPTY;

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, read, serverSnapshot);
}

export function updateProgress(fn: (p: Progress) => Progress) {
  const next = fn(read());
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Not remembered; nothing else to do.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function shuffled<T>(xs: readonly T[]): T[] {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
