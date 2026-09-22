import type { Metadata } from "next";
import Head from "@/app/components/prep/Head";
import { notes } from "@/content/prep/notes";
import { notesExtra } from "@/content/prep/notes-extra";
import { proof } from "@/content/prep/proof";
import { competitorDetail } from "@/content/prep/competitors-detail";
import { allCompetitors, allSources } from "@/app/lib/prep";

export const metadata: Metadata = { title: "Sources · Prep" };

/** Which pieces of study content lean on each source, so a claim can be traced
 *  back and a source that nothing cites stands out. */
function citedBy(): Map<string, string[]> {
  const m = new Map<string, string[]>();
  const add = (ids: readonly string[] | undefined, label: string) =>
    (ids ?? []).forEach((id) => m.set(id, [...(m.get(id) ?? []), label]));
  notes.forEach((n) => add("sourceIds" in n ? n.sourceIds : undefined, `Briefing: ${n.title}`));
  notesExtra.forEach((n) => add(n.sourceIds, `Briefing: ${n.title}`));
  proof.forEach((p) => add(p.sourceIds, `Proof: ${p.label}`));
  allCompetitors.forEach((c) => add([...new Set([...c.sourceIds, ...(competitorDetail[c.id]?.sourceIds ?? [])])], `Competitor: ${c.name}`));
  return m;
}

export default function Sources() {
  const cites = citedBy();
  return (
    <>
      <Head eyebrow="Sources" title="Where the claims come from"
            lead="Research is current as of September 2026. Where a claim comes from a vendor, the text says so." />
      <ul className="space-y-3">
        {allSources.map((s) => (
          <li key={s.id} id={s.id} className="panel p-4">
            <a href={s.url} target="_blank" rel="noreferrer"
               className="text-[15px] font-semibold text-[var(--bright)] hover:text-[var(--video)]">
              {s.title}
            </a>
            <div className="mono text-[11px] text-[var(--haze)] mt-1">
              {s.publisher}{s.date ? ` · ${s.date}` : ""}
            </div>
            {cites.get(s.id) && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {cites.get(s.id)!.map((c) => <span key={c} className="chip">{c}</span>)}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
