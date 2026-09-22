import type { Metadata } from "next";
import Head, { H2, Say } from "@/app/components/prep/Head";
import StackExplorer, { Profiles, type LayerNote } from "@/app/components/prep/StackExplorer";
import { competitorById } from "@/app/lib/prep";
import { stackClosed, stackExtra } from "@/content/prep/stack-extra";
import MetadataTree from "@/app/components/prep/MetadataTree";
import { layers } from "@/content/prep/layers";
import { icebergTree } from "@/content/prep/iceberg-tree";

export const metadata: Metadata = { title: "Stack · Prep" };

function profiles(ids: readonly string[]) {
  return ids.flatMap((id) => {
    const c = competitorById(id);
    return c ? [{ id: c.id, name: c.name }] : [];
  });
}

const extra: Record<string, LayerNote[]> = Object.fromEntries(
  Object.entries(stackExtra).map(([layer, notes]) => [
    layer,
    notes.map((n) => ({ text: n.text, profiles: profiles(n.competitorIds) })),
  ]),
);

export default function Stack() {
  return (
    <>
      <Head eyebrow="Stack explorer" title="The same five layers, two stacks"
            lead="Pick a layer to see what the analytics stack uses there, what the Lance stack uses, and the line to say about it." />
      <StackExplorer layers={layers} extra={extra} />

      <div className="panel p-5 mt-10">
        <div className="eyebrow mb-2">Not on any one layer</div>
        <p className="text-[14px] leading-relaxed text-[var(--body)] max-w-[64ch]">{stackClosed.text}</p>
        <Profiles profiles={profiles(stackClosed.competitorIds)} />
      </div>

      <H2 id="tree">Iceberg&rsquo;s metadata tree next to Lance&rsquo;s</H2>
      <p className="text-[13px] text-[var(--haze)] mb-5">Open any node. Top of the tree first.</p>
      <MetadataTree iceberg={icebergTree.iceberg} lance={icebergTree.lance} />
      <Say label="Takeaway">{icebergTree.takeaway}</Say>
    </>
  );
}
