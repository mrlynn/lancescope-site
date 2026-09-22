import type { QuizItem, RehearseItem, StudyCard } from "./types";

/** Study items for the competitor deep-dive, same shapes as cards.ts, quiz.ts and
 *  rehearse.ts, plus a competitorId linking each to its profile. Every fact comes
 *  from the competitor profiles. Researched September 2026. */

export const cardsExtra: StudyCard[] = [
  { id: "cx-milvus-lance", competitorId: "milvus", topic: "vector", q: "What did Milvus 3.0 do with Lance?", a: "External Collections index Lance, Iceberg, Parquet and Vortex data in place, read-only and zero-copy. Milvus's own default storage format is Vortex. Announced July 27, 2026." },
  { id: "cx-lakebase", competitorId: "milvus", topic: "vector", q: "What is Zilliz Vector Lakebase?", a: "Zilliz's cloud platform pitched as one foundation for serving, discovery and multi-petabyte training-data pipelines. Public preview June 10, 2026. It's the vector database moving directly onto LanceDB's ground." },
  { id: "cx-hudi-lance", competitorId: "hudi", topic: "analytics-formats", q: "What did Hudi 1.2 add for AI data?", a: "Lance as a base file format, plus VECTOR and BLOB types (June 2026). Vector search is brute-force for now and Spark-only." },
  { id: "cx-paimon", competitorId: "paimon", topic: "analytics-formats", q: "Why watch Apache Paimon?", a: "It's the table format converging fastest on Lance: column evolution without rewrites, blob files, a vector index, and Lance as a supported file format. Its docs describe Lance as optimized for ML and vector search." },
  { id: "cx-v4-columns", competitorId: "iceberg", topic: "iceberg", q: "Where does Iceberg v4 stand on cheap column updates?", a: "It's the most debated v4 topic, with no consensus as of mid-2026. Single-file commits are in design. Relative paths and content stats passed in May 2026." },
  { id: "cx-file-type", competitorId: "databricks-snowflake", topic: "platforms", q: "What is Databricks' FILE type?", a: "A beta column type (August 2026) that stores pointers to PDFs, images, audio and video inside managed Delta and Iceberg tables. The bytes still sit outside the table format." },
  { id: "cx-databricks-190", competitorId: "databricks-snowflake", topic: "platforms", q: "Databricks' latest round?", a: "$5B at a $190B valuation, August 2026, led by Coatue. Revenue run-rate above $7B, growing over 80%." },
  { id: "cx-spiral", competitorId: "spiral", topic: "rivals", q: "Who is Spiral?", a: "The company behind Vortex. $22M from Amplify and General Catalyst (2025), a multimodal data platform for ML and robotics teams, in early access. Names Chef Robotics, Skild AI and Figure AI." },
  { id: "cx-deeplake", competitorId: "deeplake", topic: "rivals", q: "Activeloop Deep Lake in one line?", a: "An early versioned tensor format with PyTorch loaders, about $20M raised, now repositioned several times, most recently as continual learning infrastructure with a Postgres layer." },
  { id: "cx-pixeltable", competitorId: "pixeltable", topic: "rivals", q: "Pixeltable in one line?", a: "Marcel Kornacker's Python library for multimodal tables with incremental computed columns. The same idea as Geneva, aimed at single app backends. $5.5M seed." },
  { id: "cx-hf-nvidia", competitorId: "huggingface", topic: "proof", q: "What happened to Hugging Face in September 2026?", a: "Nvidia agreed to acquire it for $12.93B on September 3, and said the Hub stays open. The Hub documents Lance as a supported format." },
  { id: "cx-anyscale", competitorId: "ray", topic: "platforms", q: "What happened to Anyscale?", a: "Nscale, a GPU cloud, agreed to acquire it on July 30, 2026. Bloomberg reported $1.65B. Ray stays under the PyTorch Foundation, and Geneva depends on open-source Ray." },
  { id: "cx-pinecone", competitorId: "pinecone", topic: "vector", q: "Pinecone's situation in 2026?", a: "New CEO Ash Ashutosh since September 2025, founder Edo Liberty stepping back, a reported sale exploration in 2025, and a pivot to 'knowledge' with Nexus (GA August 2026)." },
  { id: "cx-catalogs-lance", competitorId: "catalogs", topic: "catalogs", q: "Which catalogs can see Lance tables?", a: "Gravitino most directly: its generic lakehouse catalog manages Lance tables, and it has shipped a Lance REST service implementing the Lance REST spec since 1.1. Polaris through generic tables. Unity Catalog through an external-table mapping." },

  // One or more per new competitor, beyond the headline findings above.
  { id: "cx-pinecone-arch", competitorId: "pinecone", topic: "vector", q: "How does Pinecone serverless store data?", a: "Writes go to a log and an in-memory memtable, then into immutable slabs on object storage that compaction merges and indexes. Stateless query executors cache slabs in memory and on SSD." },
  { id: "cx-pinecone-answer", competitorId: "pinecone", topic: "vector", q: "Your answer to 'Pinecone is the default vector database'?", a: "It's a strong retrieval service, but a separate silo: embeddings are copied in and the source data lives elsewhere. Its own move to BYOC shows buyers want the data in their own account, which is how Lance has always worked." },
  { id: "cx-qdrant", competitorId: "qdrant", topic: "vector", q: "Qdrant in one breath?", a: "Berlin, Rust, strong filtered HNSW search on RAM or local disk. A $50M Series B led by AVP in March 2026, about $88M in total. Canva, HubSpot and Roche are customers." },
  { id: "cx-qdrant-answer", competitorId: "qdrant", topic: "vector", q: "Qdrant wins a latency benchmark. Your reply?", a: "On a hot, RAM-sized index it can. Compare total cost and the number of copies: Lance keeps data on object storage, and the same table feeds training." },
  { id: "cx-weaviate", competitorId: "weaviate", topic: "vector", q: "Weaviate in one breath?", a: "Amsterdam, written in Go. Hybrid search, native multi-tenancy, and a disk-based HFresh index GA in v1.38. Moving into agents with Engram memory, GA June 2026." },
  { id: "cx-weaviate-pricing", competitorId: "weaviate", topic: "vector", q: "Why does Weaviate's pricing model matter to your pitch?", a: "It bills by stored vector dimensions, so cost grows with embedding size. Lance on object storage grows with bytes, at storage prices." },
  { id: "cx-chroma", competitorId: "chroma", topic: "vector", q: "Chroma in one breath?", a: "An open-source embeddable vector store. Chroma Cloud is Rust on object storage, built for millions of small collections. $18M seed in 2023, no later round found." },
  { id: "cx-chroma-diff", competitorId: "chroma", topic: "vector", q: "Chroma is also embedded and on object storage. What's the difference?", a: "Scope. Chroma is a retrieval index for apps. Lance is a format and engine for all the AI data, readable by Spark, Ray and DuckDB, with random access for training." },
  { id: "cx-incumbents", competitorId: "search-incumbents", topic: "vector", q: "Who else is in the room on vector search?", a: "Elastic with its DiskBBQ disk index, OpenSearch with GPU index builds and S3 Vectors as an engine, MongoDB with Voyage AI embeddings, and Vespa, which runs Perplexity's search." },
  { id: "cx-mongo-voyage", competitorId: "search-incumbents", topic: "vector", q: "What did MongoDB buy to strengthen vector search?", a: "Voyage AI, the embedding model company, in February 2025. Automatic embedding with Voyage models followed in 2026." },
  { id: "cx-spiral-answer", competitorId: "spiral", topic: "rivals", q: "Your answer to Spiral?", a: "Both beat Parquet on random access, and those are vendor numbers against Parquet, not against each other. Lance ships indexes, blobs, column evolution and a search engine today. Spiral is in early access." },
  { id: "cx-deeplake-answer", competitorId: "deeplake", topic: "rivals", q: "What's Lance's edge over Deep Lake?", a: "An open table format many engines read natively, with random access, vector and full-text indexes and zero-copy column evolution, plus petabyte-scale references. Deep Lake keeps changing what it is." },
  { id: "cx-pixeltable-geneva", competitorId: "pixeltable", topic: "rivals", q: "How is Geneva different from Pixeltable's computed columns?", a: "Same idea: declarative, incremental derived columns. Geneva runs the backfills distributed on Ray over an open format built for petabytes. Pixeltable targets a single app backend." },
  { id: "cx-aperture", competitorId: "aperturedb", topic: "rivals", q: "ApertureDB in one breath?", a: "A graph-vector database from two Intel Labs researchers. Annotations in an in-memory property graph, FAISS vector search, and native image and video storage. $8.25M seed in 2024." },
  { id: "cx-aperture-answer", competitorId: "aperturedb", topic: "rivals", q: "When does ApertureDB beat Lance?", a: "When the core need is graph traversal over annotations, at moderate scale. When scale, open access and training reads matter, Lance." },
  { id: "cx-daft", competitorId: "daft", topic: "partners", q: "Daft: partner or rival?", a: "Mostly a partner. It reads and writes Lance natively, including version reads, vector search and merge_columns. Watch Eventual's robotics curation product, which could overlap in physical AI." },
  { id: "cx-daft-geneva", competitorId: "daft", topic: "partners", q: "Does Daft replace Geneva?", a: "No. Daft is an execution engine. Geneva is versioned, incremental feature engineering bound to the Lance table. They compose." },
  { id: "cx-ray-lance", competitorId: "ray", topic: "partners", q: "How does Ray connect to Lance?", a: "Ray Data has a native read_lance, the lance-ray project adds distributed writes, and Geneva runs on Ray." },
  { id: "cx-hf-lance", competitorId: "huggingface", topic: "partners", q: "What can you do with Lance datasets on the Hugging Face Hub?", a: "Scan, filter, fetch blobs and run vector search directly on hf:// paths, and stream them with load_dataset. A dataset ships with its blobs, embeddings and indexes." },
  { id: "cx-objectref", competitorId: "hyperscaler-lakehouses", topic: "platforms", q: "What is BigQuery ObjectRef?", a: "A column type, GA in April 2026, that points at Cloud Storage objects from inside tables, including managed Iceberg. The media stay as pointers." },
  { id: "cx-hyperscaler-answer", competitorId: "hyperscaler-lakehouses", topic: "platforms", q: "Google and Microsoft now say 'multimodal lakehouse'. Your answer?", a: "Both model media as pointers plus a separate vector service. Lance stores bytes, embeddings and indexes in one versioned table with random access, on any cloud." },
  { id: "cx-paimon-answer", competitorId: "paimon", topic: "analytics-formats", q: "Paimon has blobs, vectors and column evolution. Isn't it Lance plus streaming?", a: "It's converging on Lance's feature list, and its docs describe Lance as optimized for ML and vector search. In Lance these are native defaults with a wider AI engine ecosystem; in Paimon they're newer opt-in modes on a Flink-first format." },
]

export const quizExtra: QuizItem[] = [
  { id: "qx-milvus", competitorId: "milvus", topic: "vector", q: "Milvus 3.0 can do what with Lance tables?", options: ["Write to them as its primary store", "Index them in place, read-only", "Convert them to Parquet", "Nothing; it doesn't support Lance"], answer: 1, why: "External Collections are read-only and zero-copy. Milvus keeps its own storage, with Vortex as the default, for writes and serving." },
  { id: "qx-hudi", competitorId: "hudi", topic: "analytics-formats", q: "Hudi 1.2's vector search is:", options: ["IVF-PQ", "HNSW", "Distributed brute-force KNN", "Delegated to LanceDB"], answer: 2, why: "The 1.2 announcement says the first version is brute force, with ANN indexing planned." },
  { id: "qx-file", competitorId: "databricks-snowflake", topic: "platforms", q: "Databricks' FILE type stores:", options: ["The media bytes inside Parquet", "Pointers to files in object storage", "Embeddings only", "Lance blobs"], answer: 1, why: "It's a governed reference. The bytes stay outside the table format, which is the gap Lance's blob columns fill." },
  { id: "qx-spiral", competitorId: "spiral", topic: "rivals", q: "Which rival is closest to LanceDB architecturally?", options: ["Pinecone", "Spiral, on the Vortex format", "Chroma", "DuckLake"], answer: 1, why: "A new open format with random-access claims, plus a platform on top for ML and robotics teams. It is in early access." },
  { id: "qx-paimon", competitorId: "paimon", topic: "analytics-formats", q: "Which of its file formats do Paimon's docs describe as optimized for machine learning and vector search?", options: ["Parquet", "ORC", "Lance", "Avro"], answer: 2, why: "Paimon supports several formats and singles out Lance for ML and vector search, which is an endorsement worth quoting." },
  { id: "qx-v4", competitorId: "iceberg", topic: "iceberg", q: "As of mid-2026, cheap column updates in Iceberg v4 are:", options: ["Shipped in 1.11", "Passed and in the spec", "The most debated topic, with no consensus", "Rejected"], answer: 2, why: "Relative paths and content stats passed. Column updates, meaning independently evolved column groups, are still contested." },

  { id: "qx-pinecone", competitorId: "pinecone", topic: "vector", q: "Pinecone's 2026 repositioning is toward:", options: ["Running a GPU cloud", "'Knowledge' for agents, with Pinecone Nexus", "An open table format", "On-premises hardware"], answer: 1, why: "Nexus compiles enterprise data into governed context for agents, runs in the customer's own cloud account, and went GA in August 2026." },
  { id: "qx-qdrant", competitorId: "qdrant", topic: "vector", q: "Where does Qdrant keep its data?", options: ["Only on object storage", "In RAM or on node-local disk", "Inside Postgres", "In Lance files"], answer: 1, why: "That's why it's fast on a warm index, and why it gets expensive at hundreds of terabytes." },
  { id: "qx-weaviate", competitorId: "weaviate", topic: "vector", q: "Weaviate mainly prices by:", options: ["Queries per second", "Stored vector dimensions, plus storage", "Number of users", "GPU hours"], answer: 1, why: "Cost grows with embedding size, while Lance on object storage grows with bytes at storage prices." },
  { id: "qx-chroma", competitorId: "chroma", topic: "vector", q: "Chroma Cloud is designed for:", options: ["A few very large tables", "Millions of small collections on object storage", "GPU training pipelines", "BI dashboards"], answer: 1, why: "Per-user or per-repo collections with power-law access, cached from S3." },
  { id: "qx-incumbents", competitorId: "search-incumbents", topic: "vector", q: "Which search engine runs Perplexity's search?", options: ["Elasticsearch", "Vespa", "Pinecone", "Qdrant"], answer: 1, why: "Perplexity announced its partnership with Vespa in April 2025." },
  { id: "qx-deeplake", competitorId: "deeplake", topic: "rivals", q: "Activeloop now brands itself as:", options: ["A pure vector database", "Continual learning infrastructure, with a Postgres layer on Deep Lake", "A file format under Iceberg", "A BI tool"], answer: 1, why: "It has repositioned several times since starting as a data lake for deep learning." },
  { id: "qx-pixeltable", competitorId: "pixeltable", topic: "rivals", q: "Pixeltable's founder Marcel Kornacker created:", options: ["Apache Spark", "Apache Impala, and co-created Parquet", "Apache Arrow", "DuckDB"], answer: 1, why: "That pedigree is why a small seed-stage company is worth knowing about." },
  { id: "qx-aperture", competitorId: "aperturedb", topic: "rivals", q: "ApertureDB keeps annotations like bounding boxes in:", options: ["Parquet files", "An in-memory property graph", "Lance blob columns", "S3 Vectors"], answer: 1, why: "Good for relationship-heavy visual data, but an in-memory graph limits scale economics." },
  { id: "qx-daft", competitorId: "daft", topic: "partners", q: "Daft's relationship to Lance is mainly:", options: ["A rival file format", "An engine that reads and writes Lance", "A catalog for Lance tables", "A fork of Lance"], answer: 1, why: "Daft is compute, not storage. It's often the engine writing to Lance." },
  { id: "qx-ray", competitorId: "ray", topic: "partners", q: "After Nscale's deal for Anyscale, Ray is governed by:", options: ["Nscale", "The PyTorch Foundation", "Databricks", "LanceDB"], answer: 1, why: "Ray was donated in October 2025 and isn't part of the deal. Geneva depends on open-source Ray, not Anyscale's product." },
  { id: "qx-hf", competitorId: "huggingface", topic: "partners", q: "Nvidia agreed to acquire Hugging Face for:", options: ["$4.5 billion", "$12.93 billion", "$1.65 billion", "$30 billion"], answer: 1, why: "Announced September 3, 2026. Nvidia says the Hub stays open, and the Hub documents Lance as a supported format." },
  { id: "qx-objectref", competitorId: "hyperscaler-lakehouses", topic: "platforms", q: "BigQuery ObjectRef columns hold:", options: ["The media bytes inline", "References to Cloud Storage objects", "Vector indexes", "Lance fragments"], answer: 1, why: "Pointers, like Databricks' FILE type. The bytes stay outside the table format." },
  { id: "qx-lakebase", competitorId: "milvus", topic: "vector", q: "Zilliz pitches Vector Lakebase for:", options: ["BI dashboards only", "Serving, discovery and multi-petabyte training-data pipelines", "Streaming ingestion only", "Postgres replacement"], answer: 1, why: "That's LanceDB's positioning. Milvus reads Lance read-only; LanceDB is the format's native engine." },
]

export const rehearseExtra: RehearseItem[] = [
  { id: "rx-milvus", competitorId: "milvus", topic: "vector", q: "Milvus now reads Lance and Zilliz sells a 'Vector Lakebase'. Isn't that LanceDB's pitch?", points: [
    "It is, and that's validation: the biggest open-source vector database now treats Lance as a format the lake speaks.",
    "Milvus reads Lance read-only. Writes, versions, schema evolution and serving still go to Milvus's own storage, so it's a second system.",
    "LanceDB is the native engine for the format: one table for blobs, features, embeddings and indexes, used by training and retrieval." ] },
  { id: "rx-convergence", topic: "iceberg", q: "Hudi, Paimon and Iceberg are all adding vectors and blobs. What's left for Lance?", points: [
    "They're converging on Lance's feature list, and Hudi and Paimon adopted Lance as a file format to get there.",
    "In each, these are new opt-in features or proposals. In Lance they're native: random access, blobs, column evolution, versioned indexes.",
    "Lead with the workload, then show the bytes. The format that was designed for it still wins on the details." ] },
  { id: "rx-spiral", competitorId: "spiral", topic: "rivals", q: "How would you position against Spiral and Vortex?", points: [
    "Take it seriously: an open format with strong backers, and robotics customers.",
    "Both beat Parquet on random access, and those are vendor numbers against Parquet, not against each other.",
    "Lance ships the table layer, indexes, blobs and a search engine today. Spiral is in early access." ] },
  { id: "rx-consolidation", topic: "platforms", q: "Nvidia is buying Hugging Face and Nscale is buying Anyscale. What does consolidation mean for LanceDB?", points: [
    "GPU owners are buying the software layers around data and compute.",
    "Both are partners: the Hub documents Lance, and Geneva runs on open-source Ray under the PyTorch Foundation.",
    "An open format is the safe bet when the layers around it change hands." ] },
  // One dedicated prompt per new competitor. The two above that span several
  // (convergence, consolidation) stay untagged.
  { id: "rx-paimon", competitorId: "paimon", topic: "analytics-formats", q: "Paimon has blobs, vector indexes and column evolution. Isn't it Lance plus streaming?", points: [
    "It's the table format converging fastest on Lance, and its own docs describe Lance as optimized for ML and vector search. That's an endorsement.",
    "In Paimon these are newer opt-in modes: row tracking and data evolution have to be switched on, on a Flink-first streaming format.",
    "In Lance they're native defaults, with a wider Python, Ray and PyTorch ecosystem and Western catalog support." ] },
  { id: "rx-pinecone", competitorId: "pinecone", topic: "vector", q: "Pinecone is the default vector database. Why LanceDB?", points: [
    "Pinecone is a strong managed retrieval service, but a separate silo: embeddings are copied in, and the source data lives elsewhere.",
    "Lance keeps source data, blobs, features, embeddings and indexes in one versioned table, in an open format on your own storage.",
    "Pinecone's own moves, BYOC and the Nexus pivot to 'knowledge', show buyers want the data in their own account. Lance has always worked that way." ] },
  { id: "rx-qdrant", competitorId: "qdrant", topic: "vector", q: "Qdrant beats LanceDB on a filtered search benchmark. How do you respond?", points: [
    "Concede it: on a hot, RAM-sized index on dedicated nodes, Qdrant can be faster.",
    "That's a different cost point. Qdrant keeps data in RAM or on local disk, which gets expensive at hundreds of terabytes, with no dataset versioning.",
    "Compare total cost and the number of copies of the data, not p50 on a warm benchmark. Lance's table also feeds training." ] },
  { id: "rx-weaviate", competitorId: "weaviate", topic: "vector", q: "Weaviate has built-in vectorizers and agent memory. Isn't it easier?", points: [
    "For a RAG app it can be, and LanceDB has embedding functions and hybrid search too.",
    "Weaviate prices by stored vector dimensions, so cost grows with embedding size. Lance on object storage grows with bytes at storage prices.",
    "The real difference is where the data lives: one open, versioned table you own, which matters once the same data feeds training and evaluation." ] },
  { id: "rx-chroma", competitorId: "chroma", topic: "vector", q: "Chroma is embedded, open source and on object storage too. What's the difference?", points: [
    "Similar deployment shape, and that confirms object storage is the right bet.",
    "Different scope: Chroma is a retrieval index for apps, built for millions of small collections.",
    "Lance is a format and engine for all of the AI data: blobs, features and embeddings in one versioned table, with random access for training and Spark, Ray and DuckDB integrations." ] },
  { id: "rx-incumbents", competitorId: "search-incumbents", topic: "vector", q: "We already run Elastic, or MongoDB, and it does vectors now. Why add anything?", points: [
    "Keep it for the app. Vector search is a feature of those products, and they win by default where they're already deployed.",
    "The question is where the images, features and training sets live, and how they stay in sync with the search index.",
    "Lance is the versioned source-of-truth table underneath. A search cluster can be one consumer of it, and training reads the same table." ] },
  { id: "rx-deeplake", competitorId: "deeplake", topic: "rivals", q: "Deep Lake did versioned multimodal datasets with PyTorch loaders first. What's different about Lance?", points: [
    "Credit them for being early to the idea.",
    "Lance is an open table format many engines read natively, with random access, vector and full-text indexes, and zero-copy column evolution in the format.",
    "Deep Lake has repositioned several times, most recently as continual learning infrastructure. Lance has petabyte-scale references and a steady thesis." ] },
  { id: "rx-pixeltable", competitorId: "pixeltable", topic: "rivals", q: "Pixeltable's computed columns sound like Geneva. Why pay for LanceDB?", points: [
    "It's the same good idea: declarative, incremental derived columns with lineage, from founders with real format pedigree.",
    "Pixeltable targets a single application backend, not petabyte scans or training-throughput reads.",
    "Geneva runs those backfills distributed on Ray, over an open columnar format built for billions of rows." ] },
  { id: "rx-aperturedb", competitorId: "aperturedb", topic: "rivals", q: "ApertureDB does graph and vector search over images. Doesn't Lance lack the graph?", points: [
    "Lance models relationships as columns and joins through engines like DuckDB or Spark.",
    "If the core need is graph traversal over annotations at moderate scale, a graph-vector database can be the right fit. Say so.",
    "Most training and search workloads need scale, an open format and object-storage cost more than a graph, and that's Lance's ground." ] },
  { id: "rx-daft", competitorId: "daft", topic: "partners", q: "Daft claims to be 18 times faster than Spark. Is it a threat to LanceDB?", points: [
    "Mostly a partner. Daft is compute, not storage, and it reads and writes Lance natively, including merge_columns.",
    "It doesn't replace Geneva: Geneva is versioned, incremental feature engineering bound to the Lance table. They compose.",
    "The one thing to watch is Eventual's robotics curation product, which could overlap with LanceDB in physical AI accounts." ] },
  { id: "rx-ray", competitorId: "ray", topic: "partners", q: "A GPU cloud is buying Anyscale. Is depending on Ray a risk for LanceDB?", points: [
    "Nscale agreed to acquire Anyscale in July 2026. Ray itself isn't part of the deal.",
    "Ray is governed by the PyTorch Foundation, and Nscale says it will support it there.",
    "Geneva depends on open-source Ray, not Anyscale's product. Ray Data reads Lance natively, and lance-ray adds distributed writes." ] },
  { id: "rx-huggingface", competitorId: "huggingface", topic: "partners", q: "Nvidia is buying Hugging Face. Does that threaten Lance's distribution?", points: [
    "Nvidia agreed to the $12.93B deal on September 3, 2026, and said the Hub will stay an open, multi-cloud platform.",
    "The Hub documents Lance as a supported format: scan, filter, fetch blobs and vector search on hf:// paths.",
    "The Hub distributes and Lance makes the data queryable in place. A bigger, Nvidia-backed Hub is more reach for Lance datasets." ] },
  { id: "rx-hyperscalers", competitorId: "hyperscaler-lakehouses", topic: "platforms", q: "Google and Microsoft both say 'multimodal lakehouse' now. Is the category commoditized?", points: [
    "They've adopted the vocabulary LanceDB helped popularize, which validates the category.",
    "Both model media as pointers to objects, like BigQuery ObjectRef, plus a separate vector service.",
    "Lance stores the bytes, embeddings and indexes in one versioned table with random access, and it runs on every cloud's object storage." ] },
]
