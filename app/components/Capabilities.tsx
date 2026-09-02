/** What it does — the four leads from docs/guide/index.md, kept in that structure
 *  because they are already the clearest statement of the product's scope. */
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
    title: "Says what it already knows",
    body: "Seven rules over metadata — an unindexed vector column, small-file counts that would be misleading to act on, tombstone debt — each carrying the numbers it was derived from. No model is involved in any of them.",
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
