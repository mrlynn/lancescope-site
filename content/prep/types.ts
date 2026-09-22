/** Shapes for the competitor deep-dive, added after the original content.
 *  The original modules keep their inferred types; these describe the additions. */

export type SourceEntry = { id: string; title: string; publisher: string; url: string; date?: string };

/** Same shape as an entry in competitors.ts, for rivals that list left out. */
export type CompetitorEntry = {
  id: string;
  name: string;
  group: string;
  threat: number;
  sourceIds: string[];
  origin: string;
  whatItIs: string;
  whyItMatters: string;
  lanceAngle: string;
};

/** How well a rival serves each of the four needs. My read, labelled as such. */
export type Fit = "strong" | "partial" | "weak";

export type CompetitorDetail = {
  /** Matches an id in competitors.ts or competitors-extra.ts. */
  id: string;
  /** When the research behind this profile was done. */
  asOf: string;
  company?: string;
  howItWorks: string;
  status?: string;
  pricing?: string;
  customers?: string;
  strengths: string[];
  weaknesses: string[];
  whereItWins: string;
  whereLanceWins: string;
  partnerOrRival?: string;
  /** Left out for catalogs and engines, which serve none of the four themselves. */
  fourNeeds?: { scans: Fit; random: Fit; blobs: Fit; columns: Fit };
  objection: { q: string; a: string };
  /** Numbers that only the vendor or project asserts. */
  vendorClaims?: string[];
  /** Things the research could not pin down. */
  uncertain?: string[];
  sourceIds: string[];
};

/** A flashcard. `competitorId` links the card to that competitor's profile. */
export type StudyCard = { id: string; topic: string; q: string; a: string; competitorId?: string };

/** A quiz question. `answer` indexes into `options`, so options keep their order. */
export type QuizItem = {
  id: string; topic: string; q: string; options: readonly string[]; answer: number; why: string;
  competitorId?: string;
};

/** A question to answer out loud, with the points a good answer hits. */
export type RehearseItem = { id: string; topic: string; q: string; points: readonly string[]; competitorId?: string };

/** A briefing note. `competitorIds` link the note to the profiles it covers. */
export type NoteItem = { id: string; title: string; paragraphs: readonly string[]; sourceIds?: readonly string[]; competitorIds?: readonly string[] };

/** A question to ask. `why` says what asking it signals; `competitorIds` link the
 *  profiles behind it. */
export type AskItem = { id: string; q: string; why?: string; competitorIds?: readonly string[] };

/** A market map point added after the original map. Same axes: x runs from scans
 *  to random access, y from structured to multimodal. Placement is my read. */
export type MarketPoint = { id: string; label: string; x: number; y: number; note: string; competitorIds: readonly string[] };

/** A proof point added after the original list. `competitorIds` link the
 *  profiles it bears on. */
export type ProofItem = { id: string; label: string; text: string; sourceIds: readonly string[]; competitorIds?: readonly string[] };

/** A note on who else occupies one layer of the stack explorer. */
export type StackNote = { competitorIds: readonly string[]; text: string };
