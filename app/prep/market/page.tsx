import type { Metadata } from "next";
import Head, { H2 } from "@/app/components/prep/Head";
import MarketMap, { type Point } from "@/app/components/prep/MarketMap";
import SourceLinks, { Label } from "@/app/components/prep/SourceLinks";
import { competitorById } from "@/app/lib/prep";
import { market } from "@/content/prep/market";
import { marketExtra, originalPointProfiles } from "@/content/prep/market-extra";
import { proof } from "@/content/prep/proof";

export const metadata: Metadata = { title: "Market · Prep" };

function profiles(ids: readonly string[] | undefined) {
  return (ids ?? []).flatMap((id) => {
    const c = competitorById(id);
    return c ? [{ id: c.id, name: c.name }] : [];
  });
}

/** The original points as written, then the September 2026 additions. LanceDB
 *  goes last so its dot draws on top of anything placed near it. */
const points: Point[] = [
  ...market.filter((m) => !("self" in m && m.self)).map((m) => ({ ...m, profiles: profiles(originalPointProfiles[m.id]) })),
  ...marketExtra.map((m) => ({ ...m, added: true, profiles: profiles(m.competitorIds) })),
  ...market.filter((m) => "self" in m && m.self),
];

export default function Market() {
  return (
    <>
      <Head eyebrow="Market map" title="Where everyone sits"
            lead="Pick a point to read why it sits there and how LanceDB talks about it." />
      <MarketMap points={points} />

      <H2 id="proof">Proof points</H2>
      <p className="text-[13px] text-[var(--haze)] mb-5 max-w-[64ch]">
        Customer stories, benchmarks and milestones to quote. Most come from LanceDB&rsquo;s own
        newsletters and announcements, so treat them as vendor claims unless marked measured.
      </p>
      <ul className="grid sm:grid-cols-2 gap-3">
        {proof.map((p) => (
          <li key={p.id} className="panel p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[14px] font-bold text-[var(--bright)]">{p.label}</span>
              {p.text.includes("(measured)") && <Label kind="measured" />}
            </div>
            <p className="text-[13.5px] leading-relaxed text-[var(--body)] mb-2">{p.text}</p>
            <SourceLinks ids={p.sourceIds} />
          </li>
        ))}
      </ul>
    </>
  );
}
