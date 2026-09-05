/** What it does — the leads from the app's own README, kept in that structure
 *  because they are already the clearest statement of the product's scope.
 *
 *  There were four of these. Two more exist now and both are the kind of thing this
 *  page is for: one reads columns rather than manifests and prices them before it
 *  starts, and one lets the whole diagnosis leave as a document. Leaving them off
 *  would have been the page describing an older product than the button downloads.
 */
import { CHECKS } from "@/app/data/measurements";

const CARDS = [
  {
    title: "Reads a database, exactly",
    body: "Schema, versions, indices, fragments and rows, with the byte cost of each read shown as you go. Describing 2.65 GB of video costs 23.8 KB and opens none of it.",
  },
  {
    title: "Answers “why is this slow”",
    body: "Run a scalar, full-text, vector or hybrid search, see which access path Lance chose, what it read, and the script that reproduces it elsewhere. Compare two versions of a table and run the same query against both.",
  },
  {
    title: "Checks the data, and charges for it out loud",
    body:
      "Duplicates, rows missing their content, class imbalance, a split that leaks, " +
      "dead embeddings. These read your columns rather than a manifest, so each is " +
      "priced from the file footers before it runs and cancelling stops the work. " +
      `Asking whether the videos are all actually there reads ${CHECKS.missingContent} ` +
      `and none of the ${CHECKS.blobUntouched}.`,
  },
  {
    title: "Lets the answer leave",
    body: "Take the whole diagnosis away as one document — the findings with their evidence, the plan, the exact cost, the reader underneath — as markdown to paste into an issue, or JSON another console opens. No rows, no credentials, and the database root redacted unless you ask for it.",
  },
  {
    title: "Says what it already knows",
    body: "Ten rules over metadata — an unindexed vector column, small-file counts that would be misleading to act on, tombstone debt, a manifest that understates the size of the thing it describes — each carrying the numbers it was derived from. No model is involved in any of them.",
  },
  {
    title: "Adds language, optionally",
    body: "With a local model or an API key it will translate a question into a filter and describe a table in a few sentences. Every response reports the tokens and dollars it spent beside the bytes it read.",
  },
];

export default function Capabilities() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {CARDS.map((c) => (
        <div key={c.title} className="panel p-5">
          <h3 className="text-[16px] font-bold tracking-tight text-[var(--bright)] mb-3">
            {c.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-[var(--body)]">{c.body}</p>
        </div>
      ))}
    </div>
  );
}
