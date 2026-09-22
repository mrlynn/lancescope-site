import type { MarketPoint } from "./types";

/** Points for the competitors added in the September 2026 deep-dive, placed on
 *  the original map's axes. One point per position rather than per company, so
 *  the map stays legible on a phone: Pinecone and Qdrant are already in the
 *  original "Pinecone, Qdrant, Milvus" point, and companies that sit in the same
 *  place share one. Placement is my read. No label collides with another at the
 *  map's 440px minimum width, which phones pan rather than squeeze. */
export const marketExtra: MarketPoint[] = [
  { id: "m-zilliz", label: "Zilliz Lakebase", x: 0.8, y: 0.58, competitorIds: ["milvus"],
    note: "Where Milvus is heading. Zilliz pitches a 'Vector Lakebase' for serving, discovery and training-data pipelines, and Milvus 3.0 indexes Lance tables in place, read-only. The original 'Pinecone, Qdrant, Milvus' point shows where it started; this one shows it climbing toward LanceDB's corner." },
  { id: "m-weaviate-chroma", label: "Weaviate, Chroma", x: 0.97, y: 0.36, competitorIds: ["weaviate", "chroma"],
    note: "Retrieval indexes for apps, next to the other vector databases. Weaviate adds hybrid search and agent memory; Chroma is built for millions of small collections on object storage. Neither holds blobs, features or training data." },
  { id: "m-search", label: "Search incumbents", x: 0.55, y: 0.12, competitorIds: ["search-incumbents"],
    note: "Elastic, OpenSearch, MongoDB and Vespa: search and operational systems that added vector search. Fast lookups over structured documents. They win where they're already deployed, and Lance can be the table their indexes are built from." },
  { id: "m-hudi-paimon", label: "Hudi, Paimon", x: 0.14, y: 0.46, competitorIds: ["hudi", "paimon"],
    note: "Analytics table formats moving up the multimodal axis. Hudi 1.2 added VECTOR, BLOB and Lance files; Paimon added blob files, a vector index and column evolution. Still scan-first, with the AI features newer and opt-in." },
  { id: "m-objectref", label: "ObjectRef, Fabric", x: 0.06, y: 0.6, competitorIds: ["hyperscaler-lakehouses"],
    note: "Google's BigQuery ObjectRef and Microsoft Fabric's AI functions bring media into analytics as pointers to files. More multimodal than a warehouse, but the bytes stay outside the table and the vector index is a separate service." },
  { id: "m-spiral", label: "Spiral", x: 0.66, y: 0.96, competitorIds: ["spiral"],
    note: "The closest architectural rival: a platform on the Vortex format for ML and robotics teams, in early access. It sits near LanceDB because it's aiming for the same corner." },
  { id: "m-deeplake", label: "Deep Lake", x: 0.48, y: 0.82, competitorIds: ["deeplake"],
    note: "Versioned multimodal tensors with training loaders, now repositioned as continual learning infrastructure. Strong on blobs and random access, lighter on scans and on engine support." },
  { id: "m-pixeltable", label: "Pixeltable", x: 0.36, y: 0.76, competitorIds: ["pixeltable"],
    note: "Multimodal tables with incremental computed columns, aimed at app backends. Far along the multimodal axis, but not built for petabyte scans or training-throughput reads." },
  { id: "m-aperture", label: "ApertureDB", x: 0.78, y: 0.68, competitorIds: ["aperturedb"],
    note: "A graph-vector database that stores images and video natively. Strong random access over media, weak at scans, and a proprietary server rather than an open format." },
  { id: "m-engines", label: "Daft, Ray", x: 0.3, y: 0.88, competitorIds: ["daft", "ray"],
    note: "Partners, not rivals: engines that process multimodal data and read and write Lance. Placed for the data they process, not for anything they store. Geneva runs on Ray." },
  { id: "m-hf", label: "Hugging Face", x: 0.06, y: 0.96, competitorIds: ["huggingface"],
    note: "A partner: where datasets are shared. The Hub documents Lance, so a Lance dataset ships with its blobs, embeddings and indexes. Nvidia agreed to buy Hugging Face in September 2026." },
];

/** Profiles behind the original map's points, so every point links somewhere.
 *  DuckDB and the OLAP engines have no profile. */
export const originalPointProfiles: Record<string, readonly string[]> = {
  wh: ["databricks-snowflake"],
  lh: ["iceberg", "databricks-snowflake"],
  s3v: ["s3-vectors"],
  tpuf: ["turbopuffer"],
  vdb: ["pinecone", "qdrant", "milvus", "vector-dbs"],
  vast: ["vast"],
};
