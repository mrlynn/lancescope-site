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
