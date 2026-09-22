import type { Takeaway } from "./types";

/** "What changed in 2026" on the overview: the headline takeaways from the
 *  September 2026 competitor research, each linking to where it's covered in
 *  depth. Every fact comes from the checked profiles and proof points; the text
 *  names things rather than counting them, so it can't drift from the data. */
export const takeaways: Takeaway[] = [
  { id: "t-vector", href: "/prep/notes#n-vector-climb",
    title: "The vector databases are climbing toward the lake",
    text: "Milvus 3.0 indexes Lance tables in place, and Zilliz now sells a 'Vector Lakebase' for training-data pipelines. Vector search is one workload on the table, not the product." },
  { id: "t-formats", href: "/prep/notes#n-formats-converge",
    title: "The table formats are converging on Lance",
    text: "Hudi 1.2 added Lance as a file format, Paimon lists it, and Iceberg v4 is still debating cheap column updates. Lance's lead is how native these features are." },
  { id: "t-ecosystem", href: "/prep/market#ecosystem",
    title: "The honest weakness is closing",
    text: "Hudi, Paimon, Milvus, Polaris, Gravitino, the Hugging Face Hub, Ray, Daft and Apache Doris all support Lance now, several of them rivals. Quote it as reach, not adoption." },
  { id: "t-spiral", href: "/prep/competitors/spiral",
    title: "One direct rival to take seriously",
    text: "Spiral, the company behind Vortex, is building a platform for ML and robotics teams. It's in early access; Lance ships indexes, blobs and column evolution today." },
  { id: "t-partners", href: "/prep/notes#n-partners-change-hands",
    title: "The partners are changing hands",
    text: "Nvidia agreed to buy Hugging Face, and Nscale agreed to buy Anyscale. An open format is the safe bet when everything around it changes owners." },
  { id: "t-pointers", href: "/prep/notes#n-everyone-multimodal",
    title: "Every platform says 'multimodal lakehouse'",
    text: "Databricks, Snowflake and Google added column types that point at files. Pointers aren't bytes: lead with training shuffles over the media itself." },
];
