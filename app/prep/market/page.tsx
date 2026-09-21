import type { Metadata } from "next";
import Head, { H2 } from "@/app/components/prep/Head";
import MarketMap from "@/app/components/prep/MarketMap";
import SourceLinks, { Label } from "@/app/components/prep/SourceLinks";
import { market } from "@/content/prep/market";
import { proof } from "@/content/prep/proof";

export const metadata: Metadata = { title: "Market · Prep" };

export default function Market() {
  return (
    <>
      <Head eyebrow="Market map" title="Where everyone sits"
            lead="Pick a point to read why it sits there and how LanceDB talks about it." />
      <MarketMap points={market} />

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
