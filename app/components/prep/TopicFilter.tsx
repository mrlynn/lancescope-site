"use client";

import { TOPICS } from "@/app/lib/prep";

/** A row of topic pills, limited to the topics a deck actually has. */
export default function TopicFilter({ topics, value, onChange, counts }: {
  topics: readonly string[];
  value: string | null;
  onChange: (t: string | null) => void;
  counts?: Record<string, number>;
}) {
  const on = { color: "var(--bright)", borderColor: "var(--haze)" };
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Topic">
      <button type="button" className="pill" aria-pressed={!value} onClick={() => onChange(null)}
              style={!value ? on : undefined}>All</button>
      {topics.map((t) => (
        <button key={t} type="button" className="pill" aria-pressed={value === t}
                onClick={() => onChange(value === t ? null : t)} style={value === t ? on : undefined}>
          {TOPICS[t] ?? t}{counts?.[t] != null && <span className="ml-1.5 text-[var(--dim)]">{counts[t]}</span>}
        </button>
      ))}
    </div>
  );
}

export function topicsOf(items: readonly { topic: string }[]): { topics: string[]; counts: Record<string, number> } {
  const counts: Record<string, number> = {};
  for (const i of items) counts[i.topic] = (counts[i.topic] ?? 0) + 1;
  const order = Object.keys(TOPICS);
  const topics = Object.keys(counts).sort((a, b) => order.indexOf(a) - order.indexOf(b));
  return { topics, counts };
}
