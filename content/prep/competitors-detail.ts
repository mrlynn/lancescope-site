import type { CompetitorDetail } from "./types";
import { formatDetails } from "./detail-formats";
import { vectorDetails } from "./detail-vector";
import { platformDetails } from "./detail-platforms";

/** Deep-dive profiles, keyed by competitor id. Researched September 2026. */
export const competitorDetail: Record<string, CompetitorDetail> = Object.fromEntries(
  [...formatDetails, ...vectorDetails, ...platformDetails].map((d) => [d.id, d]),
);
