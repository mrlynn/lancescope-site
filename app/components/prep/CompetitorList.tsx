"use client";

import Link from "next/link";
import { useState } from "react";
import { GROUPS } from "@/app/lib/prep";
import SourceLinks from "@/app/components/prep/SourceLinks";

type Competitor = {
  id: string; name: string; group: string; threat: number; sourceIds: readonly string[];
  origin: string; whatItIs: string; whyItMatters: string; lanceAngle: string;
};

export function Threat({ score }: { score: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Threat ${score} of 5`} title={`Threat ${score} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="block w-2 h-2 rounded-full"
              style={{ background: i <= score ? "var(--video)" : "var(--ink-3)", border: "1px solid var(--rule)" }} />
      ))}
    </span>
  );
}

/** Every competitor, filterable by group and sortable by threat. */
export default function CompetitorList({ items, detailIds = [] }: { items: readonly Competitor[]; detailIds?: string[] }) {
  const [group, setGroup] = useState<string | null>(null);
  const [byThreat, setByThreat] = useState(false);
  const shown = items
    .filter((c) => !group || c.group === group)
    .slice()
    .sort((a, b) => (byThreat ? b.threat - a.threat : 0));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button type="button" className="pill" aria-pressed={!group} onClick={() => setGroup(null)}
                style={!group ? { color: "var(--bright)", borderColor: "var(--haze)" } : undefined}>All</button>
        {Object.entries(GROUPS).map(([id, label]) => (
          <button key={id} type="button" className="pill" aria-pressed={group === id}
                  onClick={() => setGroup(group === id ? null : id)}
                  style={group === id ? { color: "var(--bright)", borderColor: "var(--haze)" } : undefined}>
            {label}
          </button>
        ))}
        <button type="button" className="pill sm:ml-auto" aria-pressed={byThreat} onClick={() => setByThreat(!byThreat)}
                style={byThreat ? { color: "var(--video)", borderColor: "var(--video)" } : undefined}>
          Sort by threat
        </button>
      </div>

      <div className="space-y-4">
        {shown.map((c) => (
          <article key={c.id} id={c.id} className="panel p-5 scroll-mt-28">
            <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
              <div>
                <h3 className="text-[17px] font-bold text-[var(--bright)]"><Link href={`/prep/competitors/${c.id}`} className="hover:text-[var(--video)]">{c.name}</Link></h3>
                <div className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--dim)] mt-1">
                  {GROUPS[c.group] ?? c.group}
                </div>
              </div>
              <Threat score={c.threat} />
            </div>
            <dl className="space-y-3 text-[14px] leading-relaxed">
              <div><dt className="eyebrow mb-0.5">Origin</dt><dd className="text-[var(--body)]">{c.origin}</dd></div>
              <div><dt className="eyebrow mb-0.5">What it is</dt><dd className="text-[var(--body)]">{c.whatItIs}</dd></div>
              <div><dt className="eyebrow mb-0.5">Why it matters</dt><dd className="text-[var(--body)]">{c.whyItMatters}</dd></div>
              <div className="border-l-2 pl-3" style={{ borderColor: "var(--video)" }}>
                <dt className="eyebrow mb-0.5" style={{ color: "var(--video)" }}>The Lance angle</dt>
                <dd className="text-[var(--bright)]">{c.lanceAngle}</dd>
              </div>
            </dl>
            <SourceLinks ids={c.sourceIds} className="mt-4" />
            <Link href={`/prep/competitors/${c.id}`}
                  className="inline-block mono text-[11px] mt-4 hover:underline" style={{ color: "var(--video)" }}>
              {detailIds.includes(c.id) ? "Full profile →" : "Profile →"}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
