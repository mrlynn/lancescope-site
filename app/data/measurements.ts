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
  searchBytes: "20.1 MB",
  searchBytesNum: 20_100_000,
  ratio: 132,
  source: "README.md — measured on the 16-talk reference corpus",
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

export const OPS_SOURCE = "README.md — the same table `make verify` reproduces";

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
  source: "docs/guide/explain-blobs.md",
} as const;

/** Someone else's data — the rebuttal to "your corpus is rigged." */
export const OPENVID = {
  uri: "hf://datasets/lance-format/openvid-lance/data",
  rows: "937,957",
  openBytes: "24,568 bytes",
  browseBytes: "about 73 KB",
  source: "README.md — the same claim, checked against a dataset this project did not build",
} as const;

export const MCP_INSTALL =
  "claude mcp add lancescope -- uv --directory /path/to/lancescope run python -m server.mcp_server";

export const REPO = "https://github.com/mrlynn/lancescope";

/** Shown when the GitHub release API cannot be reached. See app/lib/release.ts. */
export const DMG_FALLBACK = {
  url: `${REPO}/releases/latest`,
  minMacOS: "macOS 11.0 or later",
  arch: "Apple Silicon",
} as const;
