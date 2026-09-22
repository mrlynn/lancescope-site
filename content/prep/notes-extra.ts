import type { NoteItem } from "./types";

/** Briefing notes on the competitors added in the September 2026 deep-dive,
 *  grouped by theme rather than one per company. The profiles hold the detail;
 *  these hold the pattern to carry into the room. Every fact comes from the
 *  competitor profiles. */
export const notesExtra: NoteItem[] = [
  { id: "n-vector-climb", title: "The vector databases are climbing toward the lake",
    competitorIds: ["milvus", "pinecone", "qdrant", "weaviate", "chroma", "search-incumbents"],
    sourceIds: ["milvus-3", "zilliz-lakebase", "pinecone-nexus", "pinecone-one-year", "calcalist-pinecone", "qdrant-series-b"],
    paragraphs: [
      "LanceDB started in the vector database category and has been climbing out of it. In 2026 the vector databases started climbing the same way, toward the lake. That validates the thesis, and it's also the closest competition you'll be asked about.",
      "Zilliz is the sharpest case. Milvus 3.0 (July 2026) indexes Lance, Iceberg, Parquet and Vortex data in place, read-only. Zilliz now sells a 'Vector Lakebase' pitched at serving, discovery and multi-petabyte training-data pipelines. That is LanceDB's positioning, almost word for word.",
      "Pinecone went another way. It has a new CEO, its founder is stepping back, it reportedly explored a sale in 2025, and it pivoted to 'knowledge' for agents with Nexus, which runs in the customer's own cloud account. Qdrant raised $50M in March 2026 and competes on fast filtered search from RAM or local disk. Weaviate and Chroma are moving into agent memory.",
      "One line handles all of them: vector search is one workload on the table, not the product. Milvus reads Lance but keeps its own storage for writes and serving. The rest hold vectors and metadata, not the images, the features and the training set. Lance keeps all of it in one versioned table.",
      "Elastic, OpenSearch, MongoDB and Vespa win wherever they're already deployed. Don't fight them for the app. Position Lance as the source-of-truth table their indexes are built from.",
    ] },
  { id: "n-formats-converge", title: "The table formats are converging on Lance",
    competitorIds: ["hudi", "paimon", "iceberg", "delta"],
    sourceIds: ["hudi-1-2", "paimon-formats", "paimon-blob", "merced-v4-jul26", "databricks-file-type"],
    paragraphs: [
      "The analytics formats are adding what Lance already has. Hudi 1.2 (June 2026) added VECTOR and BLOB types and Lance as a base file format. Paimon added blob files, a vector index and column evolution without rewrites, and its docs list Lance as a file format 'optimized for machine learning and vector search workloads'. Iceberg v4 is debating cheap column updates, and a dense vector type is on its dev list.",
      "Both of them support Lance's file format as part of getting there. Quote that: when formats built for analytics went looking for a way to store AI data, they added Lance.",
      "Frame it honestly. The convergence is real, and Lance's lead is in how native these features are. Hudi's vector search is brute force and Spark-only. Paimon's blobs and column evolution are opt-in modes. Iceberg has no consensus on column updates. Databricks' new FILE type stores pointers, not bytes. In Lance, random access, blobs, column evolution and versioned indexes are how the format works.",
    ] },
  { id: "n-direct-rivals", title: "The direct multimodal rivals: several small companies, one serious",
    competitorIds: ["spiral", "deeplake", "pixeltable", "aperturedb"],
    sourceIds: ["spiral-site", "gunder-spiral", "deeplake-pg", "pixeltable-seed", "aperture-seed"],
    paragraphs: [
      "Four companies pitch something close to 'a data layer for multimodal AI'. Only one is a structural threat.",
      "Spiral is the one to take seriously. It created Vortex, raised $22M from Amplify Partners and General Catalyst, and is building a platform on it for ML and robotics teams, naming Chef Robotics, Skild AI and Figure AI. It's in early access. Your answer: both beat Parquet on random access, and those are vendor numbers against Parquet, not against each other. Lance ships indexes, blobs, column evolution and a search engine today.",
      "Deep Lake was early to versioned multimodal datasets with training loaders, then repositioned several times and now calls itself continual learning infrastructure. Pixeltable, from the creator of Impala, has an elegant incremental computed-column model aimed at app backends; it's Geneva's idea at a smaller scale. ApertureDB is a graph-vector database for visual data with lots of annotations. All three are at seed or Series A.",
      "Use them to show range, not fear. Knowing the field well enough to say which rival matters, and why, is itself the signal.",
    ] },
  { id: "n-partners-change-hands", title: "The partners are changing hands",
    competitorIds: ["huggingface", "ray", "daft"],
    sourceIds: ["nvidia-hf", "hf-lance-docs", "nscale-anyscale", "bloomberg-anyscale", "daft-lance"],
    paragraphs: [
      "Three of Lance's most important neighbours are partners, and two of them changed owners this year.",
      "Nvidia agreed on September 3, 2026 to buy Hugging Face for $12.93B and said the Hub will stay open. The Hub documents Lance as a supported format, so a Lance dataset ships as one artifact with its blobs, embeddings and indexes. Nscale, a GPU cloud, agreed in July to buy Anyscale; Bloomberg reported $1.65B. Ray itself stays with the PyTorch Foundation, and Geneva depends on open-source Ray, not on Anyscale's product.",
      "Daft reads and writes Lance natively and is often the engine writing to it. The one thing to watch is Eventual's new robotics curation product, which could overlap in physical AI.",
      "The read for Chang: GPU owners are buying the layers around data and compute. An open format is the safe bet when everything around it changes hands. How he sees that shift is also a good question to ask him.",
    ] },
  { id: "n-everyone-multimodal", title: "Every platform says 'multimodal lakehouse' now",
    competitorIds: ["databricks-snowflake", "hyperscaler-lakehouses", "vast"],
    sourceIds: ["databricks-file-type", "databricks-190b", "snowflake-multimodal", "google-lakehouse-2026", "fabric-multimodal", "vast-series-f"],
    paragraphs: [
      "The phrase LanceDB helped popularize is now everyone's. Databricks shipped a FILE column type in beta and made Iceberg v3 GA. Snowflake runs AI functions over staged media from SQL and now offers GPU training. Google made BigQuery ObjectRef GA. Microsoft Fabric's AI functions take image and PDF paths. VAST raised at a $30B valuation selling storage plus a database for AI.",
      "Look at how they store the media. Almost all of them keep pointers to files in object storage, plus a separate vector service. VAST is the exception, and it's a proprietary platform.",
      "That's the gap to name: pointers aren't bytes. Lance stores the bytes, embeddings and indexes in one versioned table with random access, and it runs on every cloud's object storage, VAST's included. 'Good enough' is still the biggest threat, so lead with the workload their pointers can't serve: training shuffles over the media itself.",
    ] },
];
