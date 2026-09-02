/** What the download button knows about the latest release.
 *
 *  Three layers, because each fails differently.
 *
 *  1. The GitHub releases API, revalidated hourly. In Next 16 `fetch` is NOT
 *     cached by default, so the window has to be asked for explicitly — without
 *     `next.revalidate` this would hit GitHub on every render.
 *  2. A fallback constant. Unauthenticated GitHub allows 60 requests an hour per
 *     IP and Vercel's egress addresses are shared, so a 403 here is a live
 *     possibility rather than a theoretical one. When it happens the button
 *     points at /releases/latest, which GitHub redirects to the newest release
 *     page, and simply renders without a version chip. A button with no version
 *     is a much smaller problem than a button that 404s.
 *  3. app/download/route.ts, which calls this and redirects — so there is a
 *     stable URL to put in a talk or a README that does not name a tag.
 *
 *  Set GITHUB_TOKEN (fine-grained, read-only, public repositories) in the Vercel
 *  project if the rate limit starts biting.
 */

import { DMG_FALLBACK, REPO } from "@/app/data/measurements";

export type Release = {
  tag: string | null;
  url: string;
  sizeBytes: number | null;
  publishedAt: string | null;
  /** False when this is the fallback — the UI drops the version and size chips. */
  resolved: boolean;
};

const API = "https://api.github.com/repos/mrlynn/lancescope/releases/latest";

const FALLBACK: Release = {
  tag: null,
  url: DMG_FALLBACK.url,
  sizeBytes: null,
  publishedAt: null,
  resolved: false,
};

type GhAsset = { name: string; browser_download_url: string; size: number };
type GhRelease = { tag_name?: string; published_at?: string; assets?: GhAsset[] };

export async function getLatestRelease(): Promise<Release> {
  try {
    const res = await fetch(API, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    });
    if (!res.ok) return FALLBACK;

    const data = (await res.json()) as GhRelease;
    const dmg = data.assets?.find((a) => a.name.endsWith(".dmg"));
    if (!dmg) return FALLBACK;

    return {
      tag: data.tag_name ?? null,
      url: dmg.browser_download_url,
      sizeBytes: dmg.size,
      publishedAt: data.published_at ?? null,
      resolved: true,
    };
  } catch {
    return FALLBACK;
  }
}

/** Bytes as the release page states them: whole megabytes, no false precision. */
export function fmtSize(bytes: number | null): string | null {
  if (bytes === null) return null;
  return `${Math.round(bytes / 1_000_000)} MB`;
}

export const SOURCE_URL = REPO;
