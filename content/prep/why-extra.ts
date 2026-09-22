/** Notes for the "Why all four" page on how the competitors added in the
 *  September 2026 deep-dive cover each need. The lists of who is strong or
 *  partial are derived from the four-needs ratings in the profiles, which are my
 *  read; these notes interpret them and deliberately carry no counts, so they
 *  can't drift from the ratings. Keyed by need id from why.ts. */
export const whyNeedNotes: Record<string, string> = {
  scans: "The analytics side still owns scans. Among the new rivals, the table formats and the platforms' SQL engines are strong here. Vector databases are weak: they're built to find a few rows, not read all of them, which is why curation and backfills happen somewhere else.",
  random: "The crowded need. Most of the new rivals are strong at random access, mostly vector databases doing lookups. So random access alone isn't a moat any more. The question is random access over which data: vector databases do it over embeddings and metadata, and Lance does it over the images and video too.",
  blobs: "The thin need. The rivals strong here are small, seed- or Series A-stage companies, and neither is widely read by other engines. Vector databases are weak: they hold the embedding, not the image. The platforms' FILE and ObjectRef types are partial at best, because they point at files rather than holding the bytes.",
  columns: "Also thin. The rivals strong here either evolve columns without rewrites or compute them incrementally. The vector databases are weak: every new embedding model means re-exporting and re-indexing. This is where Geneva's pitch lands.",
};

export const whyAllFourNote = {
  title: "The 2026 rivals against all four",
  text: "None of the new rivals is strong on all four; the list shows how many each covers. That's the argument above made concrete: picking the best tool for each need still means several copies of the data and several sync jobs. Engines and partners that store nothing themselves, like Daft, Ray and the Hugging Face Hub, aren't rated.",
};
