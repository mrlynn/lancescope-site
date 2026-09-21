"use client";

import { useState } from "react";
import { Say } from "@/app/components/prep/Head";

type Layer = { id: string; name: string; analytics: string; lance: string; note: string; say: string };

/** The five layers, top to bottom. Pick one to see both stacks at that layer. */
export default function StackExplorer({ layers }: { layers: readonly Layer[] }) {
  const [id, setId] = useState(layers[0].id);
  const layer = layers.find((l) => l.id === id) ?? layers[0];
  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-5">
      <ol className="flex flex-wrap md:flex-col gap-1.5" aria-label="Layers">
        {layers.map((l, i) => (
          <li key={l.id} className="shrink-0">
            <button type="button" onClick={() => setId(l.id)} aria-pressed={l.id === id}
                    className="w-full text-left panel px-3 py-2.5 transition-colors hover:border-[var(--haze)]"
                    style={l.id === id ? { borderColor: "var(--video)", color: "var(--bright)" } : undefined}>
              <span className="mono text-[10px] text-[var(--dim)] mr-2">{i + 1}</span>
              <span className="text-[13.5px] font-semibold">{l.name}</span>
            </button>
          </li>
        ))}
      </ol>
      <div>
        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          <div className="rounded-[4px] border border-[var(--hairline)] p-3">
            <div className="eyebrow mb-1.5">Analytics stack</div>
            <div className="text-[14px] text-[var(--bright)]">{layer.analytics}</div>
          </div>
          <div className="rounded-[4px] border p-3" style={{ borderColor: "var(--index)" }}>
            <div className="eyebrow mb-1.5" style={{ color: "var(--index)" }}>Lance stack</div>
            <div className="text-[14px] text-[var(--bright)]">{layer.lance}</div>
          </div>
        </div>
        <p className="text-[14.5px] leading-relaxed text-[var(--body)] max-w-[64ch]">{layer.note}</p>
        <Say>{layer.say}</Say>
      </div>
    </div>
  );
}
