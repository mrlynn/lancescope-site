"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Point = {
  id: string; label: string; x: number; y: number; note: string; self?: boolean;
  /** Added after the original map. Drawn as a ring, and hidden by the toggle. */
  added?: boolean;
  /** Profiles behind this point, resolved to names on the server. */
  profiles?: { id: string; name: string }[];
};

/** A two-axis map of who sits where. The axes are a reading of the placements,
 *  not a measurement, and the caption says so. */
export default function MarketMap({ points }: { points: readonly Point[] }) {
  const [id, setId] = useState<string>(points.find((p) => p.self)?.id ?? points[0].id);
  const [showAdded, setShowAdded] = useState(true);
  const hasAdded = points.some((p) => p.added);
  const shown = points.filter((p) => showAdded || !p.added);
  // Hiding the additions can hide the selected point; fall back to LanceDB.
  const sel = shown.find((p) => p.id === id) ?? shown.find((p) => p.self) ?? shown[0];

  // On a phone the map is wider than the frame. Open it centred rather than at the
  // left edge, which would start with LanceDB, at the right, out of view.
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = frame.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  return (
    <div>
      {hasAdded && (
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-4 mono text-[10px] text-[var(--haze)]">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="block w-2.5 h-2.5 rounded-full" style={{ background: "var(--index)" }} />
            Original map
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="block w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: "var(--index)" }} />
            Added September 2026
          </span>
          <button type="button" className="pill" aria-pressed={showAdded} onClick={() => setShowAdded(!showAdded)}>
            {showAdded ? "Show original only" : "Show additions"}
          </button>
        </div>
      )}

      {/* Below 440px the labels run into each other, the original ones included, so
          a phone pans the map inside this frame rather than squeezing it. The same
          rule the site applies to a screenshot: content keeps its size and scrolls
          inside its own container, never widening the page. */}
      <div ref={frame} className="overflow-x-auto overscroll-x-contain [contain:inline-size]">
      <div className="relative w-full min-w-[440px] max-w-[640px] aspect-square mx-auto">
        {/* plot area, inset so edge labels have room */}
        <div className="absolute left-7 right-2 top-2 bottom-7 border-l border-b border-[var(--rule)]">
          <div aria-hidden className="absolute inset-0 border-t border-r border-dashed border-[var(--hairline)]" />
          <div aria-hidden className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-[var(--hairline)]" />
          <div aria-hidden className="absolute top-1/2 left-0 right-0 border-t border-dashed border-[var(--hairline)]" />
          {shown.map((p) => {
            const right = p.x > 0.75;
            const active = p.id === sel.id;
            const color = p.self ? "var(--video)" : active ? "var(--bright)" : "var(--haze)";
            const fill = p.self ? "var(--video)" : active ? "var(--bright)" : "var(--index)";
            return (
              <button key={p.id} type="button" onClick={() => setId(p.id)} aria-pressed={active}
                      className={`absolute flex items-center gap-1.5 -translate-y-1/2 ${right ? "-translate-x-full flex-row-reverse" : ""}`}
                      style={{ left: `${p.x * 100}%`, top: `${(1 - p.y) * 100}%` }}>
                <span className={`block rounded-full shrink-0 ${right ? "translate-x-1/2" : "-translate-x-1/2"}`}
                      style={{
                        width: p.self ? 14 : 10, height: p.self ? 14 : 10,
                        background: p.added && !active ? "var(--ink)" : fill,
                        border: p.added ? `2px solid ${fill}` : undefined,
                        boxShadow: active ? "0 0 0 3px rgb(var(--video-rgb) / 0.35)" : undefined,
                      }} />
                <span className={`mono text-[10px] sm:text-[11px] whitespace-nowrap ${p.self ? "font-bold" : ""}`}
                      style={{ color }}>
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="absolute bottom-0 left-7 right-2 flex justify-between mono text-[9px] uppercase tracking-[0.12em] text-[var(--dim)]">
          <span>Scans</span><span>Random access →</span>
        </div>
        <div className="absolute left-0 top-2 bottom-7 w-5 flex flex-col-reverse justify-between items-center mono text-[9px] uppercase tracking-[0.12em] text-[var(--dim)]">
          <span className="[writing-mode:vertical-rl] rotate-180">Structured</span>
          <span className="[writing-mode:vertical-rl] rotate-180">Multimodal →</span>
        </div>
      </div>
      </div>
      <p className="mono text-[10px] text-[var(--dim)] text-center mt-2 min-[480px]:hidden">
        Swipe sideways to see the whole map.
      </p>
      <p className="mono text-[10px] text-[var(--dim)] text-center mt-2">
        Axis names are a reading of the placements, not a measurement.
        {hasAdded && " The September 2026 placements are my read too."}
      </p>

      <div className="panel p-5 mt-5" aria-live="polite">
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <div className="text-[16px] font-bold" style={{ color: sel.self ? "var(--video)" : "var(--bright)" }}>
            {sel.label}
          </div>
          {sel.added && <span className="mono text-[9px] uppercase tracking-[0.16em] text-[var(--dim)]">added Sep 2026</span>}
        </div>
        <p className="text-[14.5px] leading-relaxed text-[var(--body)] max-w-[68ch]">{sel.note}</p>
        {!!sel.profiles?.length && (
          <p className="mono text-[10px] leading-relaxed text-[var(--dim)] mt-3">
            <span className="uppercase tracking-[0.14em] mr-2">Profiles</span>
            {sel.profiles.map((c, i) => (
              <span key={c.id}>
                {i > 0 && <span className="mx-1.5">·</span>}
                <Link href={`/prep/competitors/${c.id}`}
                      className="text-[var(--video)] hover:underline underline-offset-2">{c.name}</Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
