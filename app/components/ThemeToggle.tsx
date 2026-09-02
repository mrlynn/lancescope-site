"use client";

/** Three states, not two — the same control the console carries, so someone who
 *  sets light here and then downloads the app finds the same choice waiting.
 *  An absent `data-theme` means "follow the OS", which is what the media query in
 *  globals.css is for; a two-way button gives no way back to that once you have
 *  chosen, and no way to see which of the three you are in.
 *
 *  The document is the store. The inline script in layout.tsx resolves the theme
 *  before first paint, so `<html data-theme>` is authoritative by the time this
 *  runs — reading it beats a second copy in React state that can disagree with
 *  what the user is looking at.
 *
 *  The key is `lancescope-theme`, deliberately the same as the console's. They are
 *  different origins so nothing is actually shared; matching it just means one
 *  name to remember when either is being debugged.
 */
import { useSyncExternalStore } from "react";

export type Choice = "system" | "light" | "dark";

export const THEME_KEY = "lancescope-theme";
const EVENT = "lancescope:themechange";

const OPTIONS: { id: Choice; label: string; icon: React.ReactNode }[] = [
  { id: "system", label: "Follow the system", icon: <SystemIcon /> },
  { id: "light", label: "Light", icon: <SunIcon /> },
  { id: "dark", label: "Dark", icon: <MoonIcon /> },
];

function getSnapshot(): Choice {
  const t = document.documentElement.dataset.theme;
  return t === "light" || t === "dark" ? t : "system";
}

/** Used during SSR and hydration, where there is no document. React re-renders
 *  with the real snapshot immediately afterwards. */
function getServerSnapshot(): Choice {
  return "system";
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

export function applyTheme(c: Choice) {
  if (c === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = c;
  try {
    if (c === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, c);
  } catch {
    // Private windows and blocked site data. The theme still applies to this
    // page; it just will not be remembered.
  }
  window.dispatchEvent(new Event(EVENT));
}

export default function ThemeToggle() {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="flex items-center gap-0.5 p-0.5 rounded-sm border border-[var(--rule)]"
    >
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => applyTheme(o.id)}
          aria-pressed={choice === o.id}
          aria-label={o.label}
          title={o.label}
          className={`grid place-items-center w-6 h-6 rounded-[3px] transition-colors
                      ${choice === o.id
                        ? "bg-[var(--ink-3)] text-[var(--bright)]"
                        : "text-[var(--dim)] hover:text-[var(--haze)]"}`}
        >
          {o.icon}
        </button>
      ))}
    </div>
  );
}

/* Drawn rather than pulled from an icon set: three glyphs is not worth a
   dependency, and these inherit currentColor like the mark does. */
function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8" />
    </svg>
  );
}
