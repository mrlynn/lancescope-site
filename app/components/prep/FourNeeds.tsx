import Link from "next/link";
import { NEEDS } from "@/app/lib/prep";
import type { Fit } from "@/content/prep/types";

const LOOK: Record<Fit, { label: string; color: string; fill: string }> = {
  strong: { label: "Strong", color: "var(--index)", fill: "rgb(var(--index-rgb) / 0.85)" },
  partial: { label: "Partial", color: "var(--haze)", fill: "rgb(var(--index-rgb) / 0.3)" },
  weak: { label: "Weak", color: "var(--dim)", fill: "transparent" },
};

export function FitMark({ fit }: { fit: Fit }) {
  const l = LOOK[fit];
  return (
    <span className="inline-flex items-center gap-1.5 mono text-[10px]" style={{ color: l.color }}>
      <span aria-hidden className="block w-2.5 h-2.5 rounded-full border"
            style={{ background: l.fill, borderColor: "var(--rule)" }} />
      {l.label}
    </span>
  );
}

type Row = { id: string; name: string; fourNeeds: Record<keyof typeof NEEDS, Fit> };

/** Which of the four needs each rival covers. The through-line of the whole
 *  competitive story, drawn: most rows are strong in one or two columns. */
export default function FourNeedsGrid({ rows, link = true }: { rows: Row[]; link?: boolean }) {
  const needs = Object.entries(NEEDS);
  return (
    <div className="overflow-x-auto [contain:inline-size]">
      <table className="w-full text-[13px] border-collapse min-w-[560px]">
        <thead>
          <tr>
            <th className="text-left font-normal eyebrow pb-2 pr-3">Rival</th>
            {needs.map(([id, label]) => (
              <th key={id} className="text-left font-normal eyebrow pb-2 pr-3">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-[var(--hairline)]">
              <td className="py-2 pr-3 text-[var(--bright)]">
                {link ? <Link href={`/prep/competitors/${r.id}`} className="hover:text-[var(--video)]">{r.name}</Link> : r.name}
              </td>
              {needs.map(([id]) => (
                <td key={id} className="py-2 pr-3"><FitMark fit={r.fourNeeds[id as keyof typeof NEEDS]} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
