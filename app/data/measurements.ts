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
