"use client";

import { useState } from "react";
import { NEEDS } from "@/app/lib/prep";

type Stage = { id: string; name: string; text: string; needs: readonly string[] };

/** One table's year, stage by stage. Picking a need lights the stages that
 *  create it, which is the whole argument in one gesture. */
export default function Pipeline({ stages }: { stages: readonly Stage[] }) {
  const [need, setNeed] = useState<string | null>(null);
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Highlight a need">
        {Object.entries(NEEDS).map(([id, label]) => (
          <button key={id} type="button" aria-pressed={need === id}
                  onClick={() => setNeed(need === id ? null : id)}
                  className="pill"
                  style={need === id ? { color: "var(--video)", borderColor: "var(--video)" } : undefined}>
            {label}
          </button>
        ))}
      </div>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {stages.map((s, i) => {
          const lit = !need || s.needs.includes(need);
          return (
            <li key={s.id} className="panel p-4 transition-opacity"
                style={{ opacity: lit ? 1 : 0.3, borderColor: need && lit ? "var(--video)" : undefined }}>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="mono text-[10px] text-[var(--dim)]">{i + 1}</span>
                <span className="text-[15px] font-bold text-[var(--bright)]">{s.name}</span>
              </div>
              <p className="text-[13px] leading-relaxed text-[var(--body)] mb-3">{s.text}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.needs.map((n) => <span key={n} className="chip">{NEEDS[n] ?? n}</span>)}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
