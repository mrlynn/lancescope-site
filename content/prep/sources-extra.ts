import type { SourceEntry } from "./types";

/** Sources for the competitor deep-dive, researched September 2026. */
export const sourcesExtra: SourceEntry[] = [
  // Iceberg
  { id: "ice-1-11", title: "Apache Iceberg 1.11.0 Release", publisher: "Apache Iceberg", url: "https://iceberg.apache.org/blog/apache-iceberg-1.11.0-release/", date: "2026-05-19" },
  { id: "dremio-open-lakehouse-sep26", title: "State of the Open Lakehouse, September 2026", publisher: "Dremio", url: "https://www.dremio.com/blog/state-of-the-open-lakehouse-september-2026/", date: "2026-09" },
  { id: "snowflake-v4-recap", title: "Apache Iceberg V4: Iceberg Summit 2026 Recap", publisher: "Snowflake", url: "https://www.snowflake.com/en/blog/engineering/iceberg-summit-2026-recap-v4-spec/", date: "2026-06-04" },
  { id: "merced-v4-jul26", title: "The State of Apache Iceberg v4 in July 2026", publisher: "Alex Merced (datalakehousehub)", url: "https://datalakehousehub.com/blog/iceberg-v4-state-july-2026/", date: "2026-07" },
  { id: "snowflake-v3-ga", title: "Support for Iceberg v3 (GA)", publisher: "Snowflake Docs", url: "https://docs.snowflake.com/en/release-notes/2026/other/2026-05-07-iceberg-v3-ga", date: "2026-05-07" },
  { id: "databricks-v3-preview", title: "Apache Iceberg v3 in Public Preview on Databricks", publisher: "Databricks", url: "https://www.databricks.com/blog/next-era-open-lakehouse-apache-icebergtm-v3-public-preview-databricks", date: "2026-04" },
  { id: "aws-v3-konishi", title: "Apache Iceberg V3 on AWS", publisher: "hidekazu-konishi.com", url: "https://hidekazu-konishi.com/entry/apache_iceberg_v3_on_aws.html", date: "2026-08-29" },
  { id: "duckdb-iceberg-153", title: "New DuckDB-Iceberg Features in v1.5.3", publisher: "DuckDB", url: "https://duckdb.org/2026/05/29/new-iceberg-features", date: "2026-05-29" },
  { id: "iceberg-vortex-pr", title: "Core: Add Vortex format to Iceberg (PR #15915)", publisher: "GitHub, apache/iceberg", url: "https://github.com/apache/iceberg/pull/15915", date: "2026-04-08" },
  // Delta and Databricks FILE type
  { id: "delta-4-2", title: "Delta 4.2.0 Released", publisher: "delta.io", url: "https://delta.io/blog/2026-04-17-delta-4-2-released/", date: "2026-04-17" },
  { id: "delta-kernel-uc", title: "Advancing the Open Lakehouse with Spark, the Delta Kernel, and the new UC Delta APIs", publisher: "delta.io", url: "https://delta.io/blog/2026-08-20-simplifying-your-open-lakehouse-with-the-delta-kernel-and-the-uc-delta-apis/", date: "2026-08-20" },
  { id: "databricks-file-type", title: "Introducing FILE type: a native column type for multimodal data", publisher: "Databricks", url: "https://www.databricks.com/blog/introducing-file-type-native-column-type-multimodal-data", date: "2026-08-10" },
  { id: "databricks-uc-dais26", title: "What's new with Unity Catalog at Data + AI Summit 2026", publisher: "Databricks", url: "https://www.databricks.com/blog/whats-new-unity-catalog-data-ai-summit-2026", date: "2026-06" },
  // Hudi
  { id: "hudi-1-2", title: "Apache Hudi 1.2 announcement", publisher: "Apache Hudi", url: "https://hudi.apache.org/blog/2026/06/07/apache-hudi-release-1-2-announcement/", date: "2026-06-07" },
  { id: "hudi-vector", title: "Bringing Vector Search to the Lakehouse with Apache Hudi", publisher: "Apache Hudi", url: "https://hudi.apache.org/blog/2026/07/06/bringing-vector-search-to-the-lakehouse-with-apache-hudi/", date: "2026-07-06" },
  { id: "onehouse-series-b", title: "Open lakehouse provider Onehouse lands $35M", publisher: "SiliconANGLE", url: "https://siliconangle.com/2024/06/26/open-lakehouse-provider-onehouse-lands-35m-funding-round/", date: "2024-06-26" },
  // Parquet
  { id: "merced-parquet-2026", title: "The State of Apache Parquet in 2026", publisher: "Alex Merced (iceberglakehouse.com)", url: "https://iceberglakehouse.com/posts/state-of-apache-parquet-2026/", date: "2026-07-06" },
  { id: "parquet-fsst-review", title: "[DISCUSS] FSST proposal final design review", publisher: "dev@parquet mailing list", url: "http://www.mail-archive.com/dev@parquet.apache.org/msg27836.html", date: "2026-08" },
  // Vortex and Nimble
  { id: "spiral-announce", title: "Announcing Spiral", publisher: "SpiralDB", url: "https://spiraldb.com/post/announcing-spiral", date: "2025-09-11" },
  { id: "vortex-site", title: "Vortex", publisher: "vortex.dev", url: "https://vortex.dev/" },
  { id: "nimble-gh", title: "facebookincubator/nimble", publisher: "GitHub", url: "https://github.com/facebookincubator/nimble" },
  { id: "merced-formats", title: "The File Format Renaissance: Parquet, Lance, Vortex, Nimble", publisher: "Alex Merced (Substack)", url: "https://amdatalakehouse.substack.com/p/the-file-format-renaissance-parquet", date: "2026-07" },
  // Catalogs
  { id: "polaris-lance", title: "Apache Polaris and Lance: Bringing AI-Native Storage to the Open Multimodal Lakehouse", publisher: "Apache Polaris", url: "https://polaris.apache.org/blog/2026/01/06/apache-polaris-and-lance-bringing-ai-native-storage-to-the-open-multimodal-lakehouse/", date: "2026-01-06" },
  { id: "polaris-tlp", title: "Apache Polaris Graduates to Top Level Project", publisher: "Apache Polaris", url: "https://polaris.apache.org/blog/2026/02/19/apache-polaris-graduates-to-top-level-project/", date: "2026-02-19" },
  { id: "uc-lance-spec", title: "Unity Catalog Lance Namespace Implementation Spec", publisher: "lance.org", url: "https://lance.org/format/namespace/integrations/unity/" },
  { id: "gravitino-lance", title: "Lance table support (Gravitino 1.2.1 docs)", publisher: "Apache Gravitino", url: "https://gravitino.apache.org/docs/1.2.1/lance-table-support/", date: "2026" },
  { id: "gravitino-lance-rest", title: "Lance REST service", publisher: "Apache Gravitino", url: "https://gravitino.apache.org/docs/1.2.1/lance-rest-service" },
  { id: "ducklake-1-0", title: "DuckLake v1.0: The Lakehouse Format Built on SQL Reaches Production-Readiness", publisher: "DuckLake", url: "https://ducklake.select/2026/04/13/ducklake-10/", date: "2026-04-13" },
  // Paimon
  { id: "paimon-formats", title: "FileFormat spec", publisher: "Apache Paimon docs", url: "https://paimon.apache.org/docs/master/concepts/spec/fileformat/" },
  { id: "paimon-blob", title: "Blob Storage", publisher: "Apache Paimon docs", url: "https://paimon.apache.org/docs/master/multimodal-table/blob/" },
  { id: "doris-paimon-2", title: "Apache Doris x Paimon 2.0: Closing the Agentic AI Data Loop", publisher: "Apache Doris", url: "https://doris.apache.org/blog/apache-doris-paimon-agentic-ai-data-loop/", date: "2026-09-09" },
  // Pinecone
  { id: "pinecone-ceo", title: "Pinecone appoints Ash Ashutosh as CEO", publisher: "Pinecone", url: "https://www.pinecone.io/newsroom/next-chapter/", date: "2025-09-08" },
  { id: "pinecone-one-year", title: "One Year In, and Just Getting Started", publisher: "Pinecone", url: "https://www.pinecone.io/blog/one-year-in-just-getting-started/", date: "2026-08-26" },
  { id: "calcalist-pinecone", title: "AI database startup Pinecone weighs sale amid rising competition", publisher: "Calcalist (Ctech)", url: "https://www.calcalistech.com/ctechnews/article/rz31q82b5", date: "2025-08-31" },
  { id: "pinecone-nexus", title: "General availability of Pinecone Nexus", publisher: "Pinecone", url: "https://www.pinecone.io/newsroom/general-availability-of-pinecone-nexus-proves-knowledge-drives-real-outcomes-for-agentic-ai/", date: "2026-08-06" },
  { id: "pinecone-pricing", title: "Pricing", publisher: "Pinecone", url: "https://www.pinecone.io/pricing/" },
  { id: "pinecone-arch", title: "Serverless architecture", publisher: "Pinecone Docs", url: "https://docs.pinecone.io/reference/architecture/serverless-architecture" },
  // Milvus / Zilliz
  { id: "milvus-3", title: "Milvus 3.0: Lake-Native Vector Search and Retrieval Engine", publisher: "Milvus", url: "https://milvus.io/blog/announcing-milvus-3-lake-native-vector-search-and-a-more-powerful-retrieval-engine.md", date: "2026-07-27" },
  { id: "zilliz-lakebase", title: "Zilliz Launches Vector Lakebase", publisher: "PR Newswire", url: "https://www.prnewswire.com/news-releases/zilliz-launches-vector-lakebase-extending-the-worlds-most-adopted-vector-database-into-a-unified-data-platform-for-ai-302796419.html", date: "2026-06-10" },
  { id: "bf-lakebase", title: "Milvus invents Vector Lakebase", publisher: "Blocks and Files", url: "https://www.blocksandfiles.com/ai-ml/2026/06/15/milvus-invents-vector-lakebase/5255542", date: "2026-06-15" },
  { id: "tracxn-zilliz", title: "Zilliz company profile", publisher: "Tracxn", url: "https://tracxn.com/d/companies/zilliz/__3kmvnTH8wUTuKs-hu5_rNyYWcfxlWLOAW0urecWctVY", date: "2026" },
  // Qdrant
  { id: "qdrant-series-b", title: "We Raised $50M to Build Composable Vector Search as Core Infrastructure", publisher: "Qdrant", url: "https://qdrant.tech/blog/series-b-announcement/", date: "2026-03-12" },
  { id: "qdrant-1-16", title: "Qdrant 1.16: Tiered Multitenancy and Disk-Efficient Vector Search", publisher: "Qdrant", url: "https://qdrant.tech/blog/qdrant-1.16.x/", date: "2025-11-19" },
  // Weaviate
  { id: "weaviate-series-b", title: "Weaviate Raises $50 Million Series B", publisher: "PR Newswire", url: "https://www.prnewswire.com/news-releases/weaviate-raises-50-million-series-b-funding-to-meet-soaring-demand-for-ai-native-vector-database-technology-301803296.html", date: "2023-04-21" },
  { id: "weaviate-1-38", title: "Weaviate 1.38 Release", publisher: "Weaviate", url: "https://weaviate.io/blog/weaviate-1-38-release", date: "2026-06" },
  { id: "weaviate-pricing", title: "Pricing", publisher: "Weaviate", url: "https://weaviate.io/pricing" },
  // Chroma
  { id: "chroma-serverless", title: "Retrieval powered by object storage", publisher: "Chroma", url: "https://www.trychroma.com/engineering/serverless" },
  { id: "chroma-pricing", title: "Pricing", publisher: "Chroma", url: "https://www.trychroma.com/pricing" },
  // Postgres
  { id: "pgvector-changelog", title: "pgvector CHANGELOG", publisher: "GitHub, pgvector/pgvector", url: "https://github.com/pgvector/pgvector/blob/master/CHANGELOG.md" },
  { id: "pgvectorscale-091", title: "pgvectorscale 0.9.1", publisher: "GitHub, timescale/pgvectorscale", url: "https://github.com/timescale/pgvectorscale/releases/tag/0.9.1", date: "2026-09-04" },
  { id: "infoworld-crunchy", title: "Snowflake acquires Crunchy Data to counter Databricks' Neon buy", publisher: "InfoWorld", url: "https://www.infoworld.com/article/4001149/snowflake-acquires-crunchy-data-for-enterprise-grade-postgresql-to-counter-databricks-neon-buy.html", date: "2025-06" },
  // turbopuffer
  { id: "tpuf-about", title: "turbopuffer the company", publisher: "turbopuffer", url: "https://turbopuffer.com/about" },
  { id: "tpuf-arch", title: "Architecture", publisher: "turbopuffer docs", url: "https://turbopuffer.com/docs/architecture" },
  { id: "tpuf-pricing", title: "Pricing", publisher: "turbopuffer", url: "https://turbopuffer.com/pricing" },
  { id: "betakit-tpuf", title: "Ex-Shopify engineers raise fresh financing to scale turbopuffer's AI search", publisher: "BetaKit", url: "https://betakit.com/ex-shopify-engineers-raise-fresh-financing-to-scale-turbopuffers-ai-search/", date: "2025-12-19" },
  { id: "sacra-tpuf", title: "turbopuffer revenue, funding and news", publisher: "Sacra", url: "https://sacra.com/c/turbopuffer/", date: "2026" },
  // S3 Vectors
  { id: "aws-s3v-blog", title: "Amazon S3 Vectors now generally available with increased scale and performance", publisher: "AWS News Blog", url: "https://aws.amazon.com/blogs/aws/amazon-s3-vectors-now-generally-available-with-increased-scale-and-performance", date: "2025-12-02" },
  { id: "aws-s3v-price-cut", title: "Amazon S3 Vectors reduces query charges by up to 80% for large vector indexes", publisher: "AWS", url: "https://aws.amazon.com/about-aws/whats-new/2026/06/s3-vectors-reduces-query-charges-80-percent-large-indexes/", date: "2026-06-16" },
  { id: "aws-s3v-topk", title: "Amazon S3 Vectors now supports up to 10,000 similarity search results per query", publisher: "AWS", url: "https://aws.amazon.com/about-aws/whats-new/2026/06/s3-vectors-supports-10000-search-results-per-query/", date: "2026-06-16" },
  { id: "aws-s3-pricing", title: "Amazon S3 pricing", publisher: "AWS", url: "https://aws.amazon.com/s3/pricing/" },
  // Search incumbents
  { id: "elastic-diskbbq", title: "Elastic DiskBBQ introduction", publisher: "Elastic Search Labs", url: "https://www.elastic.co/search-labs/blog/diskbbq-elasticsearch-introduction", date: "2025" },
  { id: "mongodb-voyage", title: "MongoDB acquires embedding model provider Voyage AI", publisher: "SiliconANGLE", url: "https://siliconangle.com/2025/02/24/mongodb-acquires-embedding-model-provider-voyage-ai/", date: "2025-02-24" },
  { id: "vespa-perplexity", title: "Perplexity partners with Vespa.ai", publisher: "Vespa", url: "https://vespa.ai/perplexity-partners-with-vespa-ai-to-bring-its-search-function-in-house/", date: "2025-04-15" },
  { id: "google-agent-retrieval", title: "Agent Retrieval (formerly Vector Search 2.0)", publisher: "Google Cloud Docs", url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search-2/overview", date: "2026" },
  // Databricks
  { id: "databricks-190b", title: "Databricks grows >80% YoY, surpasses $7B revenue run-rate", publisher: "Databricks", url: "https://www.databricks.com/company/newsroom/press-releases/databricks-grows-80-yoy-surpasses-7b-revenue-run-rate-scales", date: "2026-08-13" },
  { id: "databricks-vs-docs", title: "Mosaic AI Vector Search", publisher: "Databricks Docs", url: "https://docs.databricks.com/aws/en/generative-ai/vector-search" },
  { id: "databricks-iceberg-ga", title: "Advancing Apache Iceberg on Databricks: Iceberg v3 GA", publisher: "Databricks", url: "https://www.databricks.com/blog/unity-catalog-and-next-era-apache-icebergtm", date: "2026-05-28" },
  { id: "cnbc-neon", title: "Databricks is buying database startup Neon for about $1 billion", publisher: "CNBC", url: "https://www.cnbc.com/2025/05/14/databricks-is-buying-database-startup-neon-for-about-1-billion.html", date: "2025-05-14" },
  { id: "pypi-mosaic-streaming", title: "mosaicml-streaming", publisher: "PyPI", url: "https://pypi.org/project/mosaicml-streaming/", date: "2025-07-15" },
  // Snowflake
  { id: "snowflake-q2fy27", title: "Snowflake reports financial results for Q2 fiscal 2027", publisher: "Snowflake (via Nasdaq)", url: "https://www.nasdaq.com/press-release/snowflake-reports-financial-results-second-quarter-fiscal-2027-2026-09-02", date: "2026-09-02" },
  { id: "snowflake-multimodal", title: "Cortex AI Functions: multimodal", publisher: "Snowflake Docs", url: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/ai-multimodal" },
  { id: "constellation-summit26", title: "Snowflake Summit 2026: context, custom model training, Iceberg V3", publisher: "Constellation Research", url: "https://www.constellationr.com/insights/news/snowflake-summit-2026-context-custom-model-training-iceberg-v3", date: "2026-06-02" },
  // VAST
  { id: "vast-series-f", title: "VAST Data valued at $30 billion", publisher: "VAST Data", url: "https://www.vastdata.com/press-releases/vast-series-f-financing-at-30-billion-valuation", date: "2026-04-22" },
  { id: "bf-vast-nvidia", title: "VAST broadens AI platform push with Nvidia tie-up and control plane", publisher: "Blocks and Files", url: "https://www.blocksandfiles.com/ai-ml/2026/02/26/vast-broadens-ai-platform-push-with-nvidia-tie-up-and-control-plane/4092639", date: "2026-02-26" },
  { id: "bf-vast-coreweave", title: "VAST Data lands $1.17 billion CoreWeave deal", publisher: "Blocks and Files", url: "https://www.blocksandfiles.com/ai-ml/2025/11/06/vast-data-lands-117-billion-coreweave-deal/1608868", date: "2025-11-06" },
  { id: "vast-database", title: "VAST DataBase", publisher: "VAST Data", url: "https://www.vastdata.com/platform/database" },
  // Google and Microsoft
  { id: "google-lakehouse-2026", title: "The future of data lakehouse for the agentic era", publisher: "Google Cloud", url: "https://cloud.google.com/blog/products/data-analytics/the-future-of-data-lakehouse-for-the-agentic-era", date: "2026-04-22" },
  { id: "fabric-multimodal", title: "Use multimodal input with AI Functions", publisher: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/fabric/data-science/ai-functions/multimodal-overview", date: "2026-06" },
  // Multimodal rivals
  { id: "deeplake-gh", title: "activeloopai/deeplake", publisher: "GitHub", url: "https://github.com/activeloopai/deeplake" },
  { id: "deeplake-pg", title: "Introducing Deep Lake PG", publisher: "Activeloop", url: "https://www.activeloop.ai/resources/introducing-deep-lake-pg-the-database-for-ai-behind-smartest-scientific/", date: "2025-12-08" },
  { id: "activeloop-series-a", title: "Activeloop raises $11M Series A", publisher: "PR Newswire", url: "https://www.prnewswire.com/news-releases/activeloop-raises-11m-series-a-and-brings-its-database-for-ai-to-fortune-500-companies-302099846.html", date: "2024-03-26" },
  { id: "gradientflow-mmlh", title: "The Rise of the Multimodal Lakehouse", publisher: "Gradient Flow", url: "https://gradientflow.com/the-rise-of-the-multimodal-lakehouse/", date: "2025-12-02" },
  { id: "pixeltable-seed", title: "Pixeltable launches AI data infrastructure", publisher: "Business Wire", url: "https://www.businesswire.com/news/home/20241204452772/en/Pixeltable-Launches-AI-Data-Infrastructure-Providing-a-Declarative-Incremental-Approach-for-Multimodal-Workloads-Transforming-How-Teams-Build-AI-Applications", date: "2024-12-04" },
  { id: "pixeltable-pypi", title: "pixeltable", publisher: "PyPI", url: "https://pypi.org/project/pixeltable/", date: "2026-09-16" },
  { id: "eventual-30m", title: "Eventual raises $30M to build the future of data", publisher: "Eventual", url: "https://www.eventual.ai/blog/eventual-raises-30m-to-build-the-future-of-data", date: "2025-06-24" },
  { id: "daft-lance", title: "Lance connector", publisher: "Daft Documentation", url: "https://docs.daft.ai/en/stable/connectors/lance/" },
  { id: "daft-roadmap", title: "Daft 2026 roadmap", publisher: "GitHub, Eventual-Inc/Daft", url: "https://github.com/Eventual-Inc/Daft/discussions/6562", date: "2026-03-31" },
  { id: "aperture-seed", title: "ApertureData $8.25M seed and ApertureDB Cloud", publisher: "GlobeNewswire", url: "https://www.globenewswire.com/news-release/2024/10/10/2961416/0/en/ApertureData-Powers-the-Future-of-Multimodal-AI-with-8-25M-Seed-Round-and-the-Launch-of-ApertureDB-Cloud.html", date: "2024-10-10" },
  { id: "aperture-docs", title: "What is ApertureDB?", publisher: "ApertureData Docs", url: "https://docs.aperturedata.io/Introduction/WhatIsAperture" },
  { id: "spiral-site", title: "Spiral", publisher: "SpiralDB", url: "https://spiraldb.com/" },
  { id: "gunder-spiral", title: "Spiral emerges from stealth with $22M seed and Series A", publisher: "Gunderson Dettmer", url: "https://www.gunder.com/en/news-insights/client-news/spiral-emerges-from-stealth-with-22-million-dollar-seed-and-series-a-financing", date: "2025-09" },
  { id: "magnus-vldb", title: "Magnus: A Holistic Approach to Data Management for Large-Scale ML", publisher: "PVLDB", url: "https://www.vldb.org/pvldb/vol18/p4964-song.pdf", date: "2025" },
  // Hugging Face and Ray
  { id: "nvidia-hf", title: "NVIDIA to Acquire Hugging Face", publisher: "NVIDIA", url: "https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/", date: "2026-09-03" },
  { id: "hf-lance-docs", title: "Lance", publisher: "Hugging Face Hub docs", url: "https://huggingface.co/docs/hub/datasets-lance" },
  { id: "lancedb-hf-blog", title: "Lance x Hugging Face: a new era of sharing multimodal data", publisher: "LanceDB", url: "https://www.lancedb.com/blog/lance-x-huggingface-a-new-era-of-sharing-multimodal-data", date: "2026-02" },
  { id: "hf-xet", title: "Migrating the Hub from Git LFS to Xet", publisher: "Hugging Face", url: "https://huggingface.co/blog/migrating-the-hub-to-xet", date: "2025-07-15" },
  { id: "nscale-anyscale", title: "Nscale acquires Anyscale", publisher: "Anyscale", url: "https://www.anyscale.com/press/nscale-acquires-anyscale-enhancing-its-full-stack-ai-cloud-platform", date: "2026-07-30" },
  { id: "bloomberg-anyscale", title: "Nscale to buy AI software startup Anyscale for $1.65 billion", publisher: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2026-07-30/nscale-to-buy-ai-software-startup-anyscale-for-1-65-billion", date: "2026-07-30" },
  { id: "ray-read-lance", title: "ray.data.read_lance", publisher: "Ray Docs", url: "https://docs.ray.io/en/latest/data/api/doc/ray.data.read_lance.html" },
  { id: "lance-ray-gh", title: "lance-format/lance-ray", publisher: "GitHub", url: "https://github.com/lance-format/lance-ray" },
  // Training loaders
  { id: "pypi-webdataset", title: "webdataset", publisher: "PyPI", url: "https://pypi.org/project/webdataset/", date: "2025-06-19" },
  { id: "pypi-dali", title: "nvidia-dali-cuda120", publisher: "PyPI", url: "https://pypi.org/project/nvidia-dali-cuda120/", date: "2026-08-28" },
  { id: "pypi-torchdata", title: "torchdata", publisher: "PyPI", url: "https://pypi.org/project/torchdata/", date: "2025-02-20" },
  { id: "litdata-gh", title: "Lightning-AI/litData", publisher: "GitHub", url: "https://github.com/Lightning-AI/litdata" },
];
