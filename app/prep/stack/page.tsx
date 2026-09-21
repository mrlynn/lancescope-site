import type { Metadata } from "next";
import Head, { H2, Say } from "@/app/components/prep/Head";
import StackExplorer from "@/app/components/prep/StackExplorer";
import MetadataTree from "@/app/components/prep/MetadataTree";
import { layers } from "@/content/prep/layers";
import { icebergTree } from "@/content/prep/iceberg-tree";

export const metadata: Metadata = { title: "Stack · Prep" };

export default function Stack() {
  return (
    <>
      <Head eyebrow="Stack explorer" title="The same five layers, two stacks"
            lead="Pick a layer to see what the analytics stack uses there, what the Lance stack uses, and the line to say about it." />
      <StackExplorer layers={layers} />

      <H2 id="tree">Iceberg&rsquo;s metadata tree next to Lance&rsquo;s</H2>
      <p className="text-[13px] text-[var(--haze)] mb-5">Open any node. Top of the tree first.</p>
      <MetadataTree iceberg={icebergTree.iceberg} lance={icebergTree.lance} />
      <Say label="Takeaway">{icebergTree.takeaway}</Say>
    </>
  );
}
