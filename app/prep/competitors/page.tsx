import type { Metadata } from "next";
import Head, { H2, Say } from "@/app/components/prep/Head";
import CompetitorList, { Threat } from "@/app/components/prep/CompetitorList";
import { Label } from "@/app/components/prep/SourceLinks";
import FourNeedsGrid from "@/app/components/prep/FourNeeds";
import { threatRanking } from "@/content/prep/competitors";
import { competitorDetail } from "@/content/prep/competitors-detail";
import { allCompetitors } from "@/app/lib/prep";

export const metadata: Metadata = { title: "Competitors · Prep" };

export default function Competitors() {
  const grid = allCompetitors.flatMap((c) => {
    const d = competitorDetail[c.id];
    return d?.fourNeeds ? [{ id: c.id, name: c.name, fourNeeds: d.fourNeeds }] : [];
  });
  return (
    <>
      <Head eyebrow="Competitive landscape" title="Rivals, neighbours and partners"
            lead="Threat is rated one to five. Filter by where they sit in the stack." />

      <section className="panel p-5 mb-10">
        <div className="flex items-center gap-3 flex-wrap mb-1">
          <h2 className="text-[16px] font-bold text-[var(--bright)]">Threat ranking</h2>
          <Label kind="my read" />
        </div>
        <p className="text-[12.5px] text-[var(--haze)] mb-4">{threatRanking.caption}</p>
        <ol className="space-y-3">
          {threatRanking.items.map((t) => (
            <li key={t.id} className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 items-center">
              <Threat score={t.score} />
              <span className="text-[14px] font-semibold text-[var(--bright)]">{t.label}</span>
              <span />
              <span className="text-[13px] leading-relaxed text-[var(--body)]">{t.text}</span>
            </li>
          ))}
        </ol>
        <Say label="Through-line">{threatRanking.throughLine}</Say>
      </section>

      {grid.length > 0 && (
        <>
          <div className="flex items-center gap-3 mt-14 mb-2 flex-wrap">
            <h2 className="text-[19px] font-bold tracking-tight text-[var(--bright)]">Who covers which need</h2>
            <Label kind="my read" />
          </div>
          <p className="text-[13px] text-[var(--haze)] mb-5 max-w-[64ch]">
            Most rivals are strong in one or two columns. That gap is the pitch.
          </p>
          <FourNeedsGrid rows={grid} />
        </>
      )}

      <H2>Every competitor</H2>
      <CompetitorList items={allCompetitors} detailIds={Object.keys(competitorDetail)} />
    </>
  );
}
