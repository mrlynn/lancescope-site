/** Lookups the prep pages share. The study content itself lives in content/prep/
 *  and is kept word for word; everything that turns an id into a label is here. */
import { sources } from "@/content/prep/sources";
import { sourcesExtra } from "@/content/prep/sources-extra";
import { competitors } from "@/content/prep/competitors";
import { competitorsExtra } from "@/content/prep/competitors-extra";
import { competitorDetail } from "@/content/prep/competitors-detail";
import { cards } from "@/content/prep/cards";
import { quiz } from "@/content/prep/quiz";
import { rehearse } from "@/content/prep/rehearse";
import { cardsExtra, quizExtra, rehearseExtra } from "@/content/prep/study-extra";
import type { CompetitorDetail, CompetitorEntry, QuizItem, RehearseItem, SourceEntry, StudyCard } from "@/content/prep/types";

export type Source = SourceEntry;

/** The original sources first, then the ones the competitor research added. */
export const allSources: Source[] = [...sources, ...sourcesExtra];

const BY_ID = new Map<string, Source>(allSources.map((s) => [s.id, s]));

/** Every competitor, original list first. */
export const allCompetitors: CompetitorEntry[] = [
  ...competitors.map((c) => ({ ...c, sourceIds: [...c.sourceIds] })),
  ...competitorsExtra,
];

/** Study decks: the original items first, then the competitor deep-dive's. */
export const allCards: StudyCard[] = [...cards, ...cardsExtra];
export const allQuiz: QuizItem[] = [...quiz, ...quizExtra];
export const allRehearse: RehearseItem[] = [...rehearse, ...rehearseExtra];

export function competitorById(id: string): CompetitorEntry | undefined {
  return allCompetitors.find((c) => c.id === id);
}

export function detailFor(id: string): CompetitorDetail | undefined {
  return competitorDetail[id];
}

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
  rivals: "Multimodal rivals",
  partners: "Partners",
};

export const GROUPS: Record<string, string> = {
  "table-format": "Table formats",
  "file-format": "File formats",
  catalog: "Catalogs",
  vector: "Vector search",
  platform: "Platforms",
  "training-data": "Training data",
  multimodal: "Multimodal AI data",
  engine: "Engines and partners",
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
