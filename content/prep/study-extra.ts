/** Study items for the competitor deep-dive, same shapes as cards.ts, quiz.ts and
 *  rehearse.ts. Researched September 2026. */

export const cardsExtra = [
  { id: "cx-milvus-lance", topic: "vector", q: "What did Milvus 3.0 do with Lance?", a: "External Collections index Lance, Iceberg, Parquet and Vortex data in place, read-only and zero-copy. Milvus's own default storage format is Vortex. Announced July 27, 2026." },
  { id: "cx-lakebase", topic: "vector", q: "What is Zilliz Vector Lakebase?", a: "Zilliz's cloud platform pitched as one foundation for serving, discovery and multi-petabyte training-data pipelines. Public preview June 10, 2026. It's the vector database moving directly onto LanceDB's ground." },
  { id: "cx-hudi-lance", topic: "analytics-formats", q: "What did Hudi 1.2 add for AI data?", a: "Lance as a base file format, plus VECTOR and BLOB types (June 2026). Vector search is brute-force for now and Spark-only." },
  { id: "cx-paimon", topic: "analytics-formats", q: "Why watch Apache Paimon?", a: "It's the table format converging fastest on Lance: column evolution without rewrites, blob files, a vector index, and Lance as a supported file format. Its docs recommend Lance for ML." },
  { id: "cx-v4-columns", topic: "iceberg", q: "Where does Iceberg v4 stand on cheap column updates?", a: "It's the most debated v4 topic, with no consensus as of mid-2026. Single-file commits are in design. Relative paths and content stats passed in May 2026." },
  { id: "cx-file-type", topic: "platforms", q: "What is Databricks' FILE type?", a: "A beta column type (August 2026) that stores pointers to PDFs, images, audio and video inside managed Delta and Iceberg tables. The bytes still sit outside the table format." },
  { id: "cx-databricks-190", topic: "platforms", q: "Databricks' latest round?", a: "$5B at a $190B valuation, August 2026, led by Coatue. Revenue run-rate above $7B, growing over 80%." },
  { id: "cx-spiral", topic: "rivals", q: "Who is Spiral?", a: "The company behind Vortex. $22M from Amplify and General Catalyst (2025), a multimodal data platform for ML and robotics teams, in early access. Names Chef Robotics, Skild AI and Figure AI." },
  { id: "cx-deeplake", topic: "rivals", q: "Activeloop Deep Lake in one line?", a: "An early versioned tensor format with PyTorch loaders, about $20M raised, now repositioned several times, most recently as continual learning infrastructure with a Postgres layer." },
  { id: "cx-pixeltable", topic: "rivals", q: "Pixeltable in one line?", a: "Marcel Kornacker's Python library for multimodal tables with incremental computed columns. The same idea as Geneva, aimed at single app backends. $5.5M seed." },
  { id: "cx-hf-nvidia", topic: "proof", q: "What happened to Hugging Face in September 2026?", a: "Nvidia agreed to acquire it for $12.93B on September 3, and said the Hub stays open. The Hub documents Lance as a supported format." },
  { id: "cx-anyscale", topic: "platforms", q: "What happened to Anyscale?", a: "Nscale, a GPU cloud, agreed to acquire it on July 30, 2026. Bloomberg reported $1.65B. Ray stays under the PyTorch Foundation, and Geneva depends on open-source Ray." },
  { id: "cx-pinecone", topic: "vector", q: "Pinecone's situation in 2026?", a: "New CEO Ash Ashutosh since September 2025, founder Edo Liberty stepping back, a reported sale exploration in 2025, and a pivot to 'knowledge' with Nexus (GA August 2026)." },
  { id: "cx-catalogs-lance", topic: "catalogs", q: "Which catalogs can see Lance tables?", a: "Gravitino natively, as a Lance REST namespace server. Polaris through generic tables. Unity Catalog through an external-table mapping." },
]

export const quizExtra = [
  { id: "qx-milvus", topic: "vector", q: "Milvus 3.0 can do what with Lance tables?", options: ["Write to them as its primary store", "Index them in place, read-only", "Convert them to Parquet", "Nothing; it doesn't support Lance"], answer: 1, why: "External Collections are read-only and zero-copy. Milvus keeps its own storage, with Vortex as the default, for writes and serving." },
  { id: "qx-hudi", topic: "analytics-formats", q: "Hudi 1.2's vector search is:", options: ["IVF-PQ", "HNSW", "Distributed brute-force KNN", "Delegated to LanceDB"], answer: 2, why: "The 1.2 announcement says the first version is brute force, with ANN indexing planned." },
  { id: "qx-file", topic: "platforms", q: "Databricks' FILE type stores:", options: ["The media bytes inside Parquet", "Pointers to files in object storage", "Embeddings only", "Lance blobs"], answer: 1, why: "It's a governed reference. The bytes stay outside the table format, which is the gap Lance's blob columns fill." },
  { id: "qx-spiral", topic: "rivals", q: "Which rival is closest to LanceDB architecturally?", options: ["Pinecone", "Spiral, on the Vortex format", "Chroma", "DuckLake"], answer: 1, why: "A new open format with random-access claims, plus a platform on top for ML and robotics teams. It is in early access." },
  { id: "qx-paimon", topic: "analytics-formats", q: "Which file format do Paimon's docs recommend for ML workloads?", options: ["Parquet", "ORC", "Lance", "Avro"], answer: 2, why: "Paimon supports several formats and recommends Lance for ML, which is an endorsement worth quoting." },
  { id: "qx-v4", topic: "iceberg", q: "As of mid-2026, cheap column updates in Iceberg v4 are:", options: ["Shipped in 1.11", "Passed and in the spec", "The most debated topic, with no consensus", "Rejected"], answer: 2, why: "Relative paths and content stats passed. Column updates, meaning independently evolved column groups, are still contested." },
]

export const rehearseExtra = [
  { id: "rx-milvus", topic: "vector", q: "Milvus now reads Lance and Zilliz sells a 'Vector Lakebase'. Isn't that LanceDB's pitch?", points: [
    "It is, and that's validation: the biggest open-source vector database now treats Lance as a format the lake speaks.",
    "Milvus reads Lance read-only. Writes, versions, schema evolution and serving still go to Milvus's own storage, so it's a second system.",
    "LanceDB is the native engine for the format: one table for blobs, features, embeddings and indexes, used by training and retrieval." ] },
  { id: "rx-convergence", topic: "iceberg", q: "Hudi, Paimon and Iceberg are all adding vectors and blobs. What's left for Lance?", points: [
    "They're converging on Lance's feature list, and Hudi and Paimon adopted Lance as a file format to get there.",
    "In each, these are new opt-in features or proposals. In Lance they're native: random access, blobs, column evolution, versioned indexes.",
    "Lead with the workload, then show the bytes. The format that was designed for it still wins on the details." ] },
  { id: "rx-spiral", topic: "rivals", q: "How would you position against Spiral and Vortex?", points: [
    "Take it seriously: an open format with strong backers, and robotics customers.",
    "Both beat Parquet on random access, and those are vendor numbers against Parquet, not against each other.",
    "Lance ships the table layer, indexes, blobs and a search engine today. Spiral is in early access." ] },
  { id: "rx-consolidation", topic: "platforms", q: "Nvidia is buying Hugging Face and Nscale is buying Anyscale. What does consolidation mean for LanceDB?", points: [
    "GPU owners are buying the software layers around data and compute.",
    "Both are partners: the Hub documents Lance, and Geneva runs on open-source Ray under the PyTorch Foundation.",
    "An open format is the safe bet when the layers around it change hands." ] },
]
