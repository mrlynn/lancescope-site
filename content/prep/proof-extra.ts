import type { ProofItem } from "./types";

/** Ecosystem proof: projects, several of them rivals, that added Lance support.
 *  The briefing names ecosystem breadth as Lance's honest weakness; these are the
 *  counter-evidence. Each is taken from the adopting project's own docs or
 *  announcement, checked September 2026, so none is a LanceDB claim. Support is
 *  not usage, and the page says so. */
export const proofExtra: ProofItem[] = [
  { id: "p-hudi", label: "Apache Hudi", competitorIds: ["hudi"], sourceIds: ["hudi-1-2"],
    text: "Hudi 1.2 (June 2026) added Lance as a base file format, alongside new VECTOR and BLOB types." },
  { id: "p-paimon", label: "Apache Paimon", competitorIds: ["paimon"], sourceIds: ["paimon-formats"],
    text: "Lists Lance among its data file formats and describes it as 'optimized for machine learning and vector search workloads'." },
  { id: "p-milvus", label: "Milvus 3.0", competitorIds: ["milvus"], sourceIds: ["milvus-3"],
    text: "Indexes Lance tables in place, read-only, through External Collections (July 2026). A rival treating Lance as a format the lake speaks." },
  { id: "p-polaris", label: "Apache Polaris", competitorIds: ["catalogs"], sourceIds: ["polaris-lance"],
    text: "Registers Lance tables as generic tables through the Lance Namespace. Its January 2026 post names Spark, Ray, LanceDB, Trino, Flink and DuckDB as engines." },
  { id: "p-gravitino", label: "Apache Gravitino", competitorIds: ["catalogs"], sourceIds: ["gravitino-lance", "gravitino-lance-rest"],
    text: "Manages Lance tables in its generic lakehouse catalog, and has shipped a Lance REST service implementing the Lance REST spec since 1.1." },
  { id: "p-hf", label: "Hugging Face Hub", competitorIds: ["huggingface"], sourceIds: ["hf-lance-docs"],
    text: "Documents Lance as a Hub format: scan, filter, fetch blobs and run vector search on hf:// paths, with indexes shipped alongside the data. Its docs call Lance 'an open multimodal lakehouse table format for AI'." },
  { id: "p-ray", label: "Ray Data", competitorIds: ["ray"], sourceIds: ["ray-read-lance"],
    text: "Ships a native read_lance, with version and column selection." },
  { id: "p-daft", label: "Daft", competitorIds: ["daft"], sourceIds: ["daft-lance"],
    text: "Reads and writes Lance natively, including version reads, vector search, filter pushdown and merge_columns for derived columns." },
  { id: "p-doris", label: "Apache Doris", sourceIds: ["doris-paimon-2"],
    text: "Multimodal lakehouse support for Iceberg, Paimon and Lance is merged into the 4.2 release branch, due at the end of September 2026." },
];
