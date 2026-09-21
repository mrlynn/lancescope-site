"use client";

import { useState } from "react";

type Node = { id: string; label: string; text: string };

/** Iceberg's metadata tree beside Lance's, each a column of boxes top to bottom.
 *  One node open at a time across both, so the comparison stays on screen. */
export default function MetadataTree({ iceberg, lance }: {
  iceberg: readonly Node[];
  lance: readonly Node[];
}) {
  const [open, setOpen] = useState<string | null>("data-files");
  const column = (title: string, nodes: readonly Node[], accent: string) => (
    <div>
      <div className="eyebrow mb-3" style={{ color: accent }}>{title}</div>
      <ol className="relative">
        {nodes.map((n, i) => (
          <li key={n.id} className="relative pb-3">
            {i < nodes.length - 1 && (
              <span aria-hidden className="absolute left-4 top-full -mt-3 h-3 w-px bg-[var(--rule)]" />
            )}
            <button type="button" onClick={() => setOpen(open === n.id ? null : n.id)}
                    aria-expanded={open === n.id}
                    className="w-full text-left panel px-3 py-2.5 transition-colors hover:border-[var(--haze)]"
                    style={open === n.id ? { borderColor: accent } : undefined}>
              <span className="mono text-[12.5px] text-[var(--bright)]">{n.label}</span>
              {open === n.id && (
                <span className="block text-[13px] leading-relaxed text-[var(--body)] mt-2 font-sans">
                  {n.text}
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {column("Iceberg", iceberg, "var(--haze)")}
      {column("Lance", lance, "var(--index)")}
    </div>
  );
}
