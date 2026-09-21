"use client";

import { useState } from "react";

type Point = { id: string; label: string; x: number; y: number; note: string; self?: boolean };

/** A two-axis map of who sits where. The axes are a reading of the placements,
 *  not a measurement, and the caption says so. */
export default function MarketMap({ points }: { points: readonly Point[] }) {
  const [id, setId] = useState<string>(points.find((p) => p.self)?.id ?? points[0].id);
  const sel = points.find((p) => p.id === id) ?? points[0];

  return (
    <div>
      <div className="relative w-full max-w-[640px] aspect-square mx-auto">
        {/* plot area, inset so edge labels have room */}
        <div className="absolute left-7 right-2 top-2 bottom-7 border-l border-b border-[var(--rule)]">
          <div aria-hidden className="absolute inset-0 border-t border-r border-dashed border-[var(--hairline)]" />
          <div aria-hidden className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-[var(--hairline)]" />
          <div aria-hidden className="absolute top-1/2 left-0 right-0 border-t border-dashed border-[var(--hairline)]" />
          {points.map((p) => {
            const right = p.x > 0.75;
            const active = p.id === id;
            const color = p.self ? "var(--video)" : active ? "var(--bright)" : "var(--haze)";
            return (
              <button key={p.id} type="button" onClick={() => setId(p.id)} aria-pressed={active}
                      className={`absolute flex items-center gap-1.5 -translate-y-1/2 ${right ? "-translate-x-full flex-row-reverse" : ""}`}
                      style={{ left: `${p.x * 100}%`, top: `${(1 - p.y) * 100}%` }}>
                <span className={`block rounded-full shrink-0 ${right ? "translate-x-1/2" : "-translate-x-1/2"}`}
                      style={{
                        width: p.self ? 14 : 10, height: p.self ? 14 : 10,
                        background: p.self ? "var(--video)" : active ? "var(--bright)" : "var(--index)",
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
      <p className="mono text-[10px] text-[var(--dim)] text-center mt-2">
        Axis names are a reading of the placements, not a measurement.
      </p>

      <div className="panel p-5 mt-5" aria-live="polite">
        <div className="text-[16px] font-bold mb-2" style={{ color: sel.self ? "var(--video)" : "var(--bright)" }}>
          {sel.label}
        </div>
        <p className="text-[14.5px] leading-relaxed text-[var(--body)] max-w-[68ch]">{sel.note}</p>
      </div>
    </div>
  );
}
