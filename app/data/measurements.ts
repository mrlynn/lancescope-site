/** Every number that appears on this page, with where it came from.
 *
 *  The product's argument is that a counter is more persuasive than a
 *  description — docs/guide/explain-cost.md puts it as "that is hard to believe
 *  from a description and trivial to believe from a counter, so the counter is on
 *  screen." A landing page that asserted those numbers without saying where they
 *  were measured would be making the opposite argument.
 *
 *  So: nothing here is rounded for effect and nothing is invented. Each entry
 *  carries a `source` naming the file it was taken from — all of them in
 *  mrlynn/lancescope, the repository this page is about — rendered as a footnote
 *  under the block that uses it. If a figure changes in the repo, change it here
 *  and the page follows; if a figure cannot be sourced, it does not go on the page.
 */

export const CORPUS = {
  talks: 16,
  moments: 1114,
  segments: 162,
  videoBytes: "2.65 GB",
  videoBytesNum: 2_650_000_000,
  searchBytes: "20.0 MB",
  searchBytesNum: 20_040_000,
  ratio: 132,
  source:
    "Re-measured on the reference corpus, 2 September 2026: 2.651 GB in .blob " +
    "side files against 20.04 MB for the moments table a search actually reads.",
} as const;

/** The operations rail. `null` means zero video bytes, and zero is not plotted.
 *
 *  web/app/components/ByteScale.tsx explains why: at this scale a proportional bar
 *  renders as nothing at all, so the instrument shows distance on a log rail and
 *  prints NONE rather than drawing a bar of length zero. The three NONE rows in a
 *  row are the whole point — a search over every moment reads no video, not very
 *  little video.
 */
export type Op = {
  label: string;
  /** Display string and the number behind it. `null` means the op does not touch
   *  that side at all; `0` means it touched it and read nothing. Those are
   *  different facts and the rail draws them differently. */
  index: string | null;
  indexBytes: number | null;
  video: string | null;
  videoBytes: number | null;
  note?: string;
};

export const OPS: Op[] = [
  { label: "semantic search over every moment", index: "3.45 MB", indexBytes: 3_450_000, video: "NONE", videoBytes: 0 },
  { label: "full-text search over transcripts", index: "0.11 MB", indexBytes: 110_000, video: "NONE", videoBytes: 0 },
  { label: "the same search, filtered to one devroom", index: "3.45 MB", indexBytes: 3_450_000, video: "NONE", videoBytes: 0 },
  { label: "open a blob handle", index: null, indexBytes: null, video: "2,722 bytes", videoBytes: 2_722 },
  { label: "start playback (cold segment)", index: null, indexBytes: null, video: "~17 MB", videoBytes: 17_000_000, note: "one segment" },
  { label: "seek again inside it (warm)", index: null, indexBytes: null, video: "262,144 bytes", videoBytes: 262_144, note: "byte-exact" },
];

/** The rail's span: one kilobyte to the whole corpus. */
export const RAIL_MIN = 1_000;
export const RAIL_MAX = 2_650_000_000;

export const OPS_SOURCE =
  "Re-measured by `make verify` on 2 September 2026, on the 16-talk corpus " +
  "(1,114 moments, 162 segments): vector search 3.45 MB index and 0 B video, " +
  "FTS 0.11 MB and 0 B, blob handle 2,722 B, cold segment 17.0 MB, warm seek " +
  "262,144 B. The check that asserts search reads zero video bytes passes.";

/** The two true numbers. Both correct; they answer different questions.
 *
 *  This is the most credibility-producing block on the page, and it is a
 *  limitation rather than a feature: a tool that merged these into one number
 *  would be lying to you, and saying so is the reason to trust the rest.
 */
export const TWO_NUMBERS = {
  manifest: "43,424 bytes",
  actual: "2.65 GB",
  why: "tracked_files() lists no .blob paths, so the manifest cannot see the side files where the video lives.",
  source:
    "docs/guide/explain-blobs.md. Lance says the same thing in its own API " +
    "documentation — \u201cBlob v2 payloads live in separate blob files and are " +
    "not counted\u201d (lance/optimize.py) — so this is the format behaving as " +
    "designed, not a defect.",
} as const;

/** Someone else's data — the rebuttal to "your corpus is rigged." */
export const OPENVID = {
  /** The root you point the console at; the table inside it is `train.lance`. */
  uri: "hf://datasets/lance-format/openvid-lance/data",
  rows: "937,957",
  openBytes: "24,568 bytes",
  browseBytes: "about 73 KB",
  source:
    "Re-opened over the network on 2 September 2026: 937,957 rows, 24,568 bytes " +
    "and 2 IO operations to open, in about a third of a second — counting the " +
    "rows then cost nothing further. The row count matches LanceDB's own page " +
    "for the dataset (docs.lancedb.com/datasets/openvid), which also states that " +
    "the MP4 bytes live in a side blob file that search and filtering never read.",
} as const;

export const MCP_INSTALL =
  "claude mcp add lancescope -- uv --directory /path/to/lancescope run python -m server.mcp_server";

/** The MCP tool set, in the order the reference lists it.
 *
 *  Eleven, not seven — this page said seven for a while, which was the count before
 *  the bundle, the run config, the two estimators and the data-scan quote existed.
 *  Source: content/guide/reference-mcp.md, which is generated from the code and
 *  vendored here at the commit in content/.upstream.json, so the count moves when
 *  the sync does and not before.
 */
export const MCP_TOOLS = [
  "list_tables",
  "describe_table",
  "read_rows",
  "table_findings",
  "table_versions",
  "table_fragments",
  "table_indices",
  "table_run_config",
  "table_bundle",
  "estimate_scan",
  "data_scan_estimate",
] as const;

export const MCP_SOURCE =
  "content/guide/reference-mcp.md, generated from the code and vendored at the " +
  "commit in content/.upstream.json. Every tool is declared read-only, and every " +
  "one is the HTTP route called in process rather than a second implementation of it.";

/** The ten rules, by the names the reference gives them.
 *
 *  Named rather than counted, because "ten rules" is a claim and a list is the
 *  evidence for it. Source: content/guide/reference-findings.md.
 */
export const RULES = [
  "unindexed vector",
  "partial index",
  "small files",
  "deleted rows",
  "blob split",
  "manifest blind",
  "version churn",
  "loader parallelism",
  "fragment skew",
  "embedding footprint",
] as const;

/** The six data checks. These read columns, so they are the one surface that is
 *  priced before it runs. Source: content/guide/reference-data-checks.md. */
export const DATA_CHECKS = [
  "missing-content",
  "exact-duplicates",
  "near-duplicates",
  "class-balance",
  "split-leakage",
  "vector-health",
] as const;

/** What a training run pays for, on the two tables this page shows.
 *
 *  `moments` is the reference corpus, read from docs/assets/console-training.png and
 *  path-build-models.md. `test` is the public MNIST table the demo is pinned to,
 *  read off the live console on 6 September 2026 — the same build, on a dataset
 *  neither this page nor the app built.
 */
export const TRAINING = {
  epochBytes: "23.4 MB",
  loaderCeiling: "1 worker",
  rows: "10,000",
  pinned: "v4",
  /** The other corpus, where the vector column is the one that gets rewritten. */
  vectorDims: 768,
  vectorRows: "1,114",
  vectorBytes: "3.42 MB",
  vectorShare: "about a sixth of that table",
  evalQueries: 1_000,
  evalBytes: "3.4 GB",
  source:
    "content/guide/path-build-models.md for the reference corpus, and the live " +
    "console at demo.lancescope.mlynn.dev on 6 September 2026 for the MNIST " +
    "figures — 10,000 rows at v4, one epoch 23.4 MB, image_emb 20.5 MB of it, and " +
    "a loader ceiling of one worker because the table is one fragment.",
} as const;

/** One query, diagnosed. The screenshot beside this is where the numbers are from. */
export const QUERY = {
  returned: "25 of 10,000",
  time: "222 ms",
  read: "14.7 KB",
  ios: 4,
  fragments: 1,
  verdict: "A plain read. No index was involved and none was needed.",
  fullPass: "23.4 MB",
  source:
    "Read off demo.lancescope.mlynn.dev on 6 September 2026, against the public " +
    "mnist-lance table over hf://. The bytes are the handle's own IO counters, " +
    "drained before and after that query and nothing else.",
} as const;

/** The language layer. Optional, off by default, and priced per response.
 *
 *  Source: content/guide/howto-intelligence.md and reference-models.md. The local
 *  models named are the two that got every one of the repository's own
 *  natural-language-to-filter cases right; a model not on that list still runs.
 */
export const INTELLIGENCE = {
  /** Verbatim from the model test in Settings → Intelligence. */
  receipt:
    "gemma3:27b · 11.8s · 72 in / 41 out · no cost — this ran on your machine",
  askedIn: "moments in the Go devroom more than ten minutes in",
  matched: "matches 44 of 1,114 rows",
  predicate: "track = 'Go' AND ts_s > 600",
  describeCold: "47 seconds",
  describeWarm: "0.06",
  hostedDefault: "claude-opus-5",
  localModels: ["qwen3:8b", "gemma3:27b"],
  priceDate: "2026-06-24",
  source:
    "content/guide/howto-intelligence.md and content/guide/reference-models.md. " +
    "Prices in the registry carry the date they were read, 2026-06-24, and a model " +
    "with no published price reports its cost as unknown rather than as zero.",
} as const;

/** Where a database can be, in the order the connect guide lists them. */
export const STORES = [
  { label: "a local directory", detail: "any folder holding .lance tables" },
  { label: "hf://", detail: "the datasets LanceDB publishes on HuggingFace" },
  { label: "s3://", detail: "measured against a real bucket — same bytes, more latency" },
  { label: "gs:// · az://", detail: "Google Cloud Storage and Azure" },
  { label: "LanceDB Cloud", detail: "a hosted database, read the same way" },
] as const;

export const STORES_SOURCE =
  "content/guide/howto-connect.md. A store nothing installed can list is saved and " +
  "reported as unbrowsable rather than shown as an empty database, and adding " +
  "support for one is an installable package rather than a wait.";

export const REPO = "https://github.com/mrlynn/lancescope";

/** The public console — the app itself, running, with nothing to install.
 *
 *  Read-only and pinned to one dataset by `LANCESCOPE_KIOSK=1`, which unmounts the
 *  routes that write and rate limits the ones that read over the network. What it
 *  shows is real: real schema, real findings, real byte counters from Lance's own
 *  IO stats. See "Running it in public" in the guide for what that mode does and
 *  why the dataset it points at is a small one. */
export const DEMO = "https://demo.lancescope.mlynn.dev";

/** Shown when the GitHub release API cannot be reached. See app/lib/release.ts. */
export const DMG_FALLBACK = {
  url: `${REPO}/releases/latest`,
  minMacOS: "macOS 11.0 or later",
  arch: "Apple Silicon",
} as const;

/** What a check that reads columns costs, against the reference corpus.
 *
 *  The other numbers on this page are about reads that touch no data at all. These
 *  are the opposite — the first thing in the tool that opens columns rather than
 *  manifests — and they are here because the interesting property is that it is
 *  still kilobytes, and still none of the video.
 */
export const CHECKS = {
  missingContent: "11.9 KB–43.4 KB",
  duplicates: "6.8 KB–43.4 KB",
  blobUntouched: "2.65 GB",
  source:
    "docs/guide/howto-check-data.md, measured on the reference corpus: a " +
    "missing-content check reads 11.9 KB–43.4 KB and none of the 2.65 GB of blob " +
    "payload.",
} as const;

/** What checking somebody else's data cost, on the OpenVid table.
 *
 *  The interesting line is the first: nine hundred thousand videos, and deciding
 *  whether the checks are worth running costs less than a megabyte.
 */
export const CHECK_QUOTE = {
  rows: "937,957",
  price: "196,608 B",
  priceTime: "6.4 s",
  content: "29.7 MB",
  duplicates: "69.4 MB",
  vectors: "3.89 GB",
  source:
    "content/guide/howto-check-data.md, measured against " +
    "hf://datasets/lance-format/openvid-lance/data on 5 September 2026 with " +
    "pylance 11.0.0. The last figure is a quote rather than a spend — vector-health " +
    "was priced at 3.89 GB and not run.",
} as const;

/* ---------------------------------------------------------------------------
   The product screenshots.

   Two origins, both real, and nothing on any of them is staged.

   Five are the app's own documentation images, from docs/assets in
   mrlynn/lancescope, taken against the 16-talk reference corpus. Four were
   captured from demo.lancescope.mlynn.dev on 6 September 2026 — the same build
   the DMG carries, pinned to a public MNIST table it reads over hf:// — so their
   numbers are a live read of a dataset this project did not write.

   All nine show the console in its light theme, which is the theme its own docs
   use. A set that changed theme halfway would read as two products, and the frame
   in app/components/Shot.tsx is what carries them on a dark page.
   --------------------------------------------------------------------------- */

export type Shot = {
  src: string;
  /** Intrinsic pixels, for the layout to reserve before the file arrives. */
  w: number;
  h: number;
  alt: string;
  /** Printed under the frame. Says what is being looked at and what it cost. */
  caption: string;
  /** Crop the frame to this aspect ratio, anchored at the top — for a capture that
   *  ran to the bottom of its window with nothing in the last third of it.
   *
   *  It must be WIDER than the image's own aspect, or `object-cover` scales to fill
   *  the height and takes the crop out of the sides instead, which on a screenshot
   *  means slicing the table rail off the left. The captures are 3200x2000, so
   *  anything under 1.6 crops the wrong axis. */
  ratio?: string;
};

export const SHOTS = {
  schema: {
    src: "/shots/console-schema-blob.png",
    w: 1600,
    h: 1013,
    alt:
      "The console on the segments table: 162 rows, 7 columns, version 16 of 16, " +
      "storage format 2.2, a video_blob column marked BLOB — SIDE FILE, a bar " +
      "reading 2.65 GB in .blob side files, and two findings below it.",
    caption:
      "segments · 162 rows · 7 columns · v16 — this read 23.8 KB and opened none of the 2.65 GB",
  },
  versions: {
    src: "/shots/console-versions.png",
    w: 1600,
    h: 1013,
    alt:
      "The versions tab listing sixteen versions of the segments table, newest " +
      "first, each with its operation, timestamp, row count, fragment count, file " +
      "count and the change in manifest size.",
    caption: "sixteen versions, newest first · this read 67.1 KB over 47 IOs",
  },
  query: {
    src: "/shots/console-query-cost.png",
    w: 3200,
    h: 2000,
    alt:
      "The query tab on the mnist-lance test table: a filter box holding " +
      "label_name = '0', and a result card reading 25 of 10,000 returned in 222 " +
      "milliseconds, 14.7 KB read over 4 IOs across 1 fragment, with the note that " +
      "no index was involved and none was needed.",
    caption:
      "mnist-lance · read live over hf:// — a full pass would weigh 23.4 MB; this question cost 14.7 KB",
  },
  findings: {
    src: "/shots/console-findings.png",
    w: 1600,
    h: 795,
    alt:
      "The insights tab listing two findings for the moments table — one fragment " +
      "so one worker, and vector has no vector index — each with the metadata " +
      "numbers it was computed from on the same row.",
    caption:
      "two findings, and the numbers each was derived from · no model was asked, and nothing here cost a token",
  },
  english: {
    src: "/shots/console-english-filter.png",
    w: 1600,
    h: 864,
    alt:
      "The rows panel on the segments table: a plain-English question box above an " +
      "SQL predicate box holding talk_id = 'fosdem-2025-4227-25-year', with the " +
      "matching rows listed underneath.",
    caption:
      "the question above, the predicate it drafted below — nothing runs until you press filter",
  },
  trainingColumns: {
    src: "/shots/console-training-columns.png",
    w: 3200,
    h: 2000,
    alt:
      "The training tab on the mnist-lance test table: one epoch reads 23.4 MB, " +
      "loader ceiling 1 worker, 10,000 rows, version to pin v4, and a bar chart of " +
      "what each column weighs — image_emb 20.5 MB, image 2.9 MB, label_name 50.3 " +
      "KB, id 16.2 KB, label 5.3 KB.",
    caption:
      "what each column weighs, from the file footers · click one out of the projection and the epoch figure follows",
  },
  trainingFosdem: {
    src: "/shots/console-training-fosdem.png",
    w: 1600,
    h: 568,
    alt:
      "The training tab on the moments table warning that two things in this " +
      "layout will cost a run time, with one epoch reads 20.0 MB, loader ceiling 1 " +
      "worker, 1,114 rows and version to pin v2.",
    caption:
      "the same four questions on the reference corpus · derived from manifests — no model, no tokens",
  },
  hf: {
    src: "/shots/console-schema-hf.png",
    w: 3200,
    h: 2000,
    ratio: "1600 / 700",
    alt:
      "The console pointed at mnist-lance over hf://, showing the train table: " +
      "60,000 rows, 5 columns, version 4 of 4, storage format 2.1, and fields " +
      "including a large_binary image column and a 512-dimension image_emb vector.",
    caption:
      "someone else's dataset, opened over hf:// · listing every table cost 7.4 KB and nothing was downloaded",
  },
  video: {
    src: "/shots/demo-video-search.png",
    w: 1600,
    h: 1013,
    alt:
      "The Ctrl-F for Video demo: a semantic search for “a diagram with boxes " +
      "and arrows” returning 24 moments from conference talks in 193 " +
      "milliseconds, with a log-scale rail at the foot reading 5.1 MB to find it " +
      "and NONE to play it.",
    caption:
      "24 moments in 193 ms · 3.81 MB to find them, and none of the 2.65 GB of video",
  },
} as const satisfies Record<string, Shot>;
