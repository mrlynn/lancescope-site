export const why = {
  intro: "In analytics, data is facts about events, and you mostly ask questions about all of it at once. In AI, data is raw material that you keep reprocessing, and different stages of the pipeline touch it in completely different ways. Each of the four needs comes from a specific stage.",
  dataset: "Picture a team that collects a billion images with captions, source URLs and license info. Follow that one table through a year.",
  stages: [
    { id: "curate", name: "Curate", text: "Compute stats, filter out low-resolution images, drop bad licenses, remove near-duplicates. Read one or two narrow columns across every row.", needs: ["scans"] },
    { id: "enrich", name: "Enrich", text: "Run a vision model to caption every image, a CLIP model to embed it, a classifier to score quality and safety. Each pass reads the image bytes once and writes a new column.", needs: ["scans", "blobs", "columns"] },
    { id: "train", name: "Train", text: "The loader pulls batches of rows in random order, thousands of times per second, for days.", needs: ["random", "blobs"] },
    { id: "debug", name: "Evaluate and debug", text: "The model fails on 300 specific samples, so someone pulls exactly those 300 rows to look at them.", needs: ["random", "blobs"] },
    { id: "serve", name: "Serve", text: "A retrieval system runs vector search, gets back 10 row IDs scattered across the table, and fetches those images.", needs: ["random", "blobs"] },
    { id: "iterate", name: "Iterate", text: "A better embedding model comes out, and the cycle starts again on the whole history.", needs: ["scans", "columns"] },
  ],
  needs: [
    { id: "scans", name: "Scans", paragraphs: [
      "This is the part analytics already handles well. Curation, deduplication, computing features over everything, and aggregate stats over metadata are all scans.",
      "So Lance has to be at least as good as Parquet here, or nobody switches. That's why the pitch is 'all four', not 'random access instead of scans.'" ] },
    { id: "random", name: "Random access", paragraphs: [
      "Training shuffles. Models learn best when each batch is a random mix of the dataset. Read in storage order and a batch might be all images from one source or one week, and the model learns that bias. Every training step asks for a few thousand rows at random positions.",
      "On Parquet, reading one row means finding its row group, reading at least a full compressed page of that column (often around a megabyte), and decoding it to pull out one value. Teams work around this with pre-shuffled copies in formats like WebDataset or TFRecord shards. That works, but it's a second copy that goes stale the moment the source table changes.",
      "Vector search. An ANN index returns row IDs, and those IDs land wherever the matching rows sit. Ten results means ten random reads while a user waits.",
      "Debugging and evaluation. 'Show me every sample the model got wrong' is a list of IDs with no order. Same for dedupe clusters and rows a labeler flagged.",
      "Don't quote a speedup you can't back up. The Lance paper (arXiv 2504.15247) benchmarks random access against Parquet. Read its results section before the interview." ] },
    { id: "blobs", name: "Wide blobs", paragraphs: [
      "An analytics row might be a hundred bytes. AI's raw material is images at hundreds of kilobytes, audio at megabytes, video at megabytes to gigabytes, and PDFs in between.",
      "Even derived data is wide. One 1,536-dimension float32 embedding is 1,536 × 4 = 6,144 bytes, about 60 times an entire analytics row, for one column. A billion rows of it is about 6 TB of vectors.",
      "Leaving blobs in a bucket with paths in the table breaks three things. Paths rot when files move. Compliance deletes mean chasing files across systems. Reproducibility breaks, because nothing guarantees the file at that path today is the one the model trained on.",
      "Putting blobs inside Parquet fails differently. A row group of 10,000 rows with 5 MB images means a writer buffers 50 GB before it can flush. Shrink row groups to fix that and narrow columns get split into runt pages that read slowly from object storage." ] },
    { id: "columns", name: "Growing columns", paragraphs: [
      "In analytics, columns are facts. The schema comes from the data model and rarely changes. In AI, most columns are opinions a model formed about the data: captions, embeddings from model v1, v2 and v3, quality scores, safety labels, OCR text, language IDs, dedupe cluster IDs. Every new model means a new column across the entire history.",
      "Run the math. A billion images at about 500 KB each is roughly 500 TB. A new embedding column adds about 6 TB. If blobs and embeddings share Parquet files under Iceberg, backfilling rewrites the files it touches, potentially hundreds of terabytes. Lance writes the 6 TB. Teams do this monthly, sometimes weekly." ] },
  ],
  sameData: [
    "Each need alone already has a tool. Warehouses do scans, vector databases do lookups, buckets hold blobs, feature stores hold derived columns, and pre-shuffled shards feed training. Each tool wants its own copy.",
    "Five copies means five sync jobs, five versions of the truth, and no easy answer to 'which embeddings matched which images when we trained model v7?'",
    "Picture a bad batch of images found in evaluation. You find them with vector search, filter the related rows, delete them and retrain. With copies you touch four systems and hope they agree. With one versioned table it's one transaction, and the old version is still there to explain the model you already shipped." ],
  thirtySeconds: "In analytics, columns are facts and you query all of them at once. In AI, columns are model outputs that keep piling up, the raw data is huge media files, and training and retrieval pull rows at random. Today teams handle that with five copies in five systems. Lance lets one versioned table do all of it.",
  calculator: {
    defaults: { rows: 1_000_000_000, blobBytes: 500_000, dims: 1536, bytesPerValue: 4 },
    assumption: "Worst case for Parquet: blobs, metadata and embeddings share data files, so a per-row backfill rewrites every file it touches. Real layouts vary. Lance figure is the new column only.",
  },
}
