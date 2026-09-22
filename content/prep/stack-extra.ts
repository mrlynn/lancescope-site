import type { StackNote } from "./types";

/** Where the competitors added in the September 2026 deep-dive sit in the stack
 *  explorer's five layers, keyed by layer id from layers.ts. Every fact comes
 *  from the competitor profiles. */
export const stackExtra: Record<string, StackNote[]> = {
  compute: [
    { competitorIds: ["daft", "ray"],
      text: "Engines that read and write Lance natively. Daft handles version reads, vector search and merge_columns; Ray Data has read_lance, and Geneva runs on Ray. More engines reading Lance makes the format stronger." },
    { competitorIds: ["milvus"],
      text: "Milvus 3.0 is a retrieval engine that indexes Lance tables in place, read-only. Lance stays the table; Milvus competes at this layer, for the query, not for the data." },
    { competitorIds: ["hyperscaler-lakehouses"],
      text: "BigQuery and Fabric run AI functions from SQL over pointers to media files. Compute is where they're strong; the bytes still live outside their tables." },
  ],
  catalog: [
    { competitorIds: ["huggingface"],
      text: "Not a catalog, but where datasets are found and shared. The Hub documents Lance, so a Lance dataset arrives with its blobs, embeddings and indexes in one artifact." },
    { competitorIds: ["catalogs"],
      text: "Since the original notes were written, Polaris registers Lance tables as generic tables, and Gravitino manages them and ships a Lance REST service. Unity Catalog maps them as external tables." },
  ],
  table: [
    { competitorIds: ["paimon", "hudi"],
      text: "The analytics table formats are converging on Lance here. Paimon has column evolution without rewrites, blob files and a vector index, as opt-in modes. Hudi 1.2 added VECTOR and BLOB types, with brute-force vector search for now." },
    { competitorIds: ["spiral"],
      text: "Spiral builds a platform for ML and robotics teams on the Vortex format, with versioning through branches and tags. It's the closest rival at this layer, and in early access." },
    { competitorIds: ["deeplake", "pixeltable"],
      text: "Deep Lake versions tensor datasets and now puts a Postgres layer in front. Pixeltable gives tables incremental computed columns, built on Postgres per Gradient Flow. Both aim at smaller scale than an open table format for petabytes." },
  ],
  file: [
    { competitorIds: ["hudi", "paimon"],
      text: "This is the layer where rivals adopt Lance. Hudi 1.2 uses Lance as a base file format, and Paimon lists it as a data file format 'optimized for machine learning and vector search workloads'." },
    { competitorIds: ["spiral", "milvus"],
      text: "Vortex is the other new file format in play: Spiral's platform is built on it, and Milvus 3.0 uses it as its default storage format." },
  ],
  storage: [
    { competitorIds: ["hyperscaler-lakehouses", "databricks-snowflake"],
      text: "The platforms' new column types, BigQuery ObjectRef and Databricks' FILE type, point at files in object storage rather than storing them. The bucket is the same; what differs is whether the table holds the bytes." },
  ],
};

/** Rivals that bring their own storage, index and engine, so they don't sit on
 *  any single open layer. */
export const stackClosed: StackNote = {
  competitorIds: ["pinecone", "qdrant", "weaviate", "chroma", "search-incumbents", "aperturedb"],
  text: "These don't sit on one layer. Each keeps its own storage, index and query engine, so using one means copying data into its stack. That's the pitch against them: one open, versioned table you own on your own storage, versus a closed stack you keep in sync.",
};
