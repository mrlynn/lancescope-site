/** Lookups the prep pages share. The study content itself lives in content/prep/
 *  and is kept word for word; everything that turns an id into a label is here. */
import { sources } from "@/content/prep/sources";

export type Source = (typeof sources)[number];

const BY_ID = new Map<string, Source>(sources.map((s) => [s.id, s]));

export function sourcesFor(ids: readonly string[] | undefined): Source[] {
  return (ids ?? []).flatMap((id) => {
    const s = BY_ID.get(id);
    return s ? [s] : [];
  });
}

export const TOPICS: Record<string, string> = {
  format: "Lance format",
  "why-four": "Why all four",
  iceberg: "Iceberg",
  "analytics-formats": "Delta and Hudi",
  "file-formats": "File formats",
  catalogs: "Catalogs",
  vector: "Vector search",
  platforms: "Platforms",
  company: "Company",
  proof: "Proof",
  lancescope: "LanceScope",
};

export const GROUPS: Record<string, string> = {
  "table-format": "Table formats",
  "file-format": "File formats",
  catalog: "Catalogs",
  vector: "Vector search",
  platform: "Platforms",
  "training-data": "Training data",
};

export const NEEDS: Record<string, string> = {
  scans: "Scans",
  random: "Random access",
  blobs: "Wide blobs",
  columns: "Growing columns",
};

/** The prep section's own pages, in study order. */
export const PREP_PAGES = [
  { href: "/prep", label: "Overview" },
  { href: "/prep/why", label: "Why all four" },
  { href: "/prep/stack", label: "Stack" },
  { href: "/prep/market", label: "Market" },
  { href: "/prep/competitors", label: "Competitors" },
  { href: "/prep/notes", label: "Briefing" },
  { href: "/prep/cards", label: "Cards" },
  { href: "/prep/quiz", label: "Quiz" },
  { href: "/prep/rehearse", label: "Rehearse" },
  { href: "/prep/ask", label: "Ask Chang" },
  { href: "/prep/sources", label: "Sources" },
] as const;

/** Decimal units, because that is how storage is sold and how the notes quote it. */
export function bytes(n: number): string {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
  let i = 0;
  let v = n;
  while (v >= 1000 && i < units.length - 1) {
    v /= 1000;
    i++;
  }
  const digits = v >= 100 || i === 0 ? 0 : v >= 10 ? 1 : 2;
  return `${v.toFixed(digits)} ${units[i]}`;
}
