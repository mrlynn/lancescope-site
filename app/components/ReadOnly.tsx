/** The write boundary, stated accurately.
 *
 *  An earlier version of this section said "It does not write. No route creates,
 *  compacts, restores or deletes anything." That was false, and lifted from the
 *  project's own docs, which are stale: there is an ingest wizard whose entire job
 *  is to build a Lance table from your files, and a discard endpoint that deletes
 *  one. Repeating it here would have been the single most damaging sentence on the
 *  page — the one thing a reader could disprove in a minute by opening the app.
 *
 *  The true guarantee is narrower and better, because it is the one people
 *  actually want: it will make you a database, and it will never edit one.
 */
export default function ReadOnly() {
  return (
    <div className="panel p-6 md:p-8" style={{ borderColor: "rgb(var(--index-rgb) / 0.35)" }}>
      <p className="text-[18px] md:text-[21px] leading-[1.5] font-semibold tracking-tight
                    text-[var(--bright)] text-balance">
        It will build you a database. It will never edit one.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <div className="eyebrow mb-2">browsing</div>
          <p className="text-[13px] leading-relaxed text-[var(--body)]">
            Reading a table cannot change it. That is checked rather than asserted:
            a test drives the entire read API and every MCP tool over a real corpus
            and then checks that not one byte on disk moved.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-2">building</div>
          <p className="text-[13px] leading-relaxed text-[var(--body)]">
            The ingest wizard creates a new table from your own files, and that is
            the only thing in the project that writes one. It is create-only by
            construction: it refuses a destination that already exists, only ever
            appends into a table it made itself during that same run, and has no
            reachable path to an overwrite.
          </p>
        </div>
      </div>

      <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-6 max-w-[64ch]">
        The whole write surface is one module, and CI fails if a dataset mutation
        appears anywhere else. Deleting only ever happens when you ask for it: the
        button that clears a finished job from the list and the button that deletes
        the table it produced are deliberately two different buttons.
      </p>
    </div>
  );
}
