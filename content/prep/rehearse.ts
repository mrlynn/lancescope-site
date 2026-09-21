export const rehearse = [
  { id: "r-iceberg-add", topic: "iceberg", q: "Why won't Iceberg just add this?", points: [
    "Row groups and footer metadata are baked into Parquet. Cheap per-row backfills and fast random access mean changing the file format.",
    "Iceberg's value is stability across dozens of engines. That makes it slow to change by design.",
    "Lance can move fast because the AI workload is still being defined." ] },
  { id: "r-v3", topic: "iceberg", q: "Iceberg v3 added deletion vectors and default values. Doesn't that close the gap?", points: [
    "Some of it. Lance already had deletion files, and a constant default is now metadata-only in Iceberg too.",
    "It doesn't help per-row backfills. Every row needs its own 6 KB embedding, and that still rewrites Parquet files.",
    "It doesn't touch random access into wide columns or out-of-line blobs. Those live below the table layer." ] },
  { id: "r-vortex", topic: "file-formats", q: "What happens to Lance if Vortex lands inside Iceberg?", points: [
    "Take it seriously. Microsoft, Snowflake and Palantir back it, and it targets random access.",
    "Lance still has out-of-line blobs, per-column data files for cheap backfills, and indexes versioned with the table.",
    "Position Lance as a complete AI table, not only a faster file format." ] },
  { id: "r-buyer", topic: "platforms", q: "Who's the buyer?", points: [
    "The ML platform team feels the pain. The data platform team owns the lakehouse budget and the Iceberg commitment.",
    "Win ML engineers with OSS LanceDB's developer experience.",
    "Win the platform team with 'it sits next to Iceberg in your bucket and your catalog can see it.'" ] },
  { id: "r-snowflake-eng", topic: "why-four", q: "Explain Lance to a data engineer at a Snowflake shop.", points: [
    "Parquet is a distance runner. Lance is a decathlete.",
    "If all you do is the marathon of BI scans, keep Parquet.",
    "AI makes you throw the javelin and run the 100 m on the same afternoon: scans, lookups, blobs and backfills on one table." ] },
  { id: "r-why-four", topic: "why-four", q: "Why does AI need scans, random access, blobs and growing columns on the same data?", points: [
    "Different pipeline stages: curation scans, training and retrieval read at random, the raw data is media files, and every new model adds a column.",
    "Today each need gets its own tool and its own copy. Five copies, five sync jobs, no lineage.",
    "One versioned table means a bad batch is one transaction to find, delete and retrain." ] },
  { id: "r-parquet-vdb", topic: "vector", q: "Why not Parquet plus a vector database?", points: [
    "Two copies of the data, two versioning schemes, and lineage that breaks between them.",
    "Every new embedding model means a re-export and a re-index in a second system.",
    "Lance keeps source data, features, embeddings and indexes in one versioned table." ] },
  { id: "r-s3v", topic: "vector", q: "AWS says S3 Vectors is 90% cheaper than a vector database. Why pick LanceDB?", points: [
    "For vectors plus metadata alone, S3 Vectors is a fair choice.",
    "It doesn't hold the images, captions, feature generations or training sets. That's where LanceDB's value is.",
    "Vector search is becoming a commodity feature. That's why the multimodal lakehouse positioning is right." ] },
  { id: "r-lose", topic: "platforms", q: "Where does LanceDB lose?", points: [
    "Pure aggregations over narrow structured data. Parquet plus Iceberg is fine there.",
    "Small text-only RAG. pgvector wins by default.",
    "Ecosystem breadth today. Owning the weaknesses makes the rest of your pitch believable." ] },
  { id: "r-vast", topic: "platforms", q: "How would you position against VAST Data?", points: [
    "Both pitch unified AI data infrastructure.",
    "Lance is an open format that runs in any bucket and any cloud. VAST is a platform you buy.",
    "Lead with portability and the neocloud story: source of truth in object storage, caches next to whichever GPUs you rent." ] },
  { id: "r-databricks", topic: "platforms", q: "A customer already runs Databricks. Why add LanceDB?", points: [
    "Keep Databricks for analytics. Lance tables sit in the same bucket and can show up in the catalog.",
    "Bring Lance in for the workloads Parquet handles badly: training shuffles, blob fetches, per-row backfills.",
    "Start with one multimodal table and measure bytes read and pipeline time before and after." ] },
  { id: "r-lancescope", topic: "lancescope", q: "Tell me about LanceScope.", points: [
    "An independent, read-only workbench showing schema, versions, fragments, indexes and the byte cost of every read.",
    "Headline: 2.65 GB of video, vector search reads none of it, about 132 to 1.",
    "Your advantage is invisible until someone shows the bytes. I built the thing that shows the bytes." ] },
  { id: "r-90", topic: "company", q: "What would your first 90 days look like?", points: [
    "First 30: ship something with the product. Reproduce the top three customer workloads myself.",
    "Next 30: one sharp narrative for the Iceberg question and one for the vector database question, each with a runnable demo.",
    "Last 30: turn those into talks, benchmarks and content partners can reuse." ] },
  { id: "r-why-you", topic: "company", q: "Why LanceDB, and why technical product marketing?", points: [
    "A decade of developer advocacy at MongoDB: building things and teaching them one-to-many is the work I'm best at.",
    "LanceDB sits where data infrastructure and AI meet, which is the territory I've worked in.",
    "I built LanceScope before we ever talked. That's the kind of marketer I'd be." ] },
  { id: "r-risk", topic: "company", q: "What's the biggest messaging risk for LanceDB right now?", points: [
    "Being filed as another vector database when the value is the whole data layer.",
    "The lakehouse word is crowded. 'Multimodal' has to carry the difference.",
    "Fix: lead every story with a workload the analytics stack can't do well, then show the bytes." ] },
]
