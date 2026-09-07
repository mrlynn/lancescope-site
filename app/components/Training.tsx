/** The screen for people whose job is a training run.
 *
 *  This is the section the landing page was missing. The rest of the page argues
 *  that a Lance table is cheaper to read than it looks, which is interesting; this
 *  one answers the question somebody with a GPU budget actually arrives with, which
 *  is what an epoch is going to cost and why it is taking so long.
 *
 *  Four questions, because the Training tab answers four. All of them come out of
 *  metadata — content/guide/path-build-models.md is explicit that no model is
 *  involved and nothing scans the data to work them out.
 */
import Shot from "@/app/components/Shot";
import { SHOTS, TRAINING } from "@/app/data/measurements";

const QUESTIONS = [
  {
    q: "How many workers your fragments can feed",
    a:
      "A fragment is the unit a reader parallelises over: one fragment to each " +
      "worker. The fragment count is therefore the ceiling on useful workers, and " +
      "nothing about the row count reveals it. A table written as a single fragment " +
      "is single-threaded whatever you pass to num_workers.",
  },
  {
    q: "Which fragment everyone else is waiting for",
    a:
      "Uneven fragments cost an epoch the largest fragment rather than the average " +
      "one. A query planner never notices — it reads what it needs and stops — so " +
      "this is a problem that exists only for you. On a blob table it measures bytes " +
      "rather than rows, because rows can be even while the media hanging off them " +
      "is not.",
  },
  {
    q: "What one pass actually reads",
    a:
      "Two numbers on a table with a large half: the metadata pass, and the pass " +
      "that opens the media. Knowing which one your job is doing is most of a GPU " +
      "budget.",
  },
  {
    q: "What the embeddings cost you",
    a:
      `Vectors are usually the largest ordinary column and the one most likely to be ` +
      `rewritten. A ${TRAINING.vectorDims}-dimension float32 vector over ` +
      `${TRAINING.vectorRows} rows is ${TRAINING.vectorBytes}, ${TRAINING.vectorShare} — ` +
      `so an embedding-model swap is a cheaper decision than it feels like.`,
  },
];

export default function Training() {
  return (
    <>
      <Shot shot={SHOTS.trainingColumns} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        <Stat label="one epoch reads" value={TRAINING.epochBytes} tone="index" />
        <Stat label="loader ceiling" value={TRAINING.loaderCeiling} tone="video" />
        <Stat label="rows" value={TRAINING.rows} />
        <Stat label="version to pin" value={TRAINING.pinned} />
      </div>

      <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-6 max-w-[62ch]">
        Those four are the whole screen. The bar chart above them is what each column
        weighs on disk, measured from the file footers rather than predicted — click a
        column out of the projection and the epoch figure follows, with no further
        reads, because the weights are already here.
      </p>

      <h3 className="text-[17px] font-bold tracking-tight text-[var(--bright)] mt-14 mb-5">
        The four questions
      </h3>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {QUESTIONS.map((item) => (
          <div key={item.q} className="panel p-5">
            <dt className="text-[14px] font-semibold tracking-tight text-[var(--bright)] mb-2.5">
              {item.q}
            </dt>
            <dd className="text-[13px] leading-relaxed text-[var(--body)]">{item.a}</dd>
          </div>
        ))}
      </dl>

      <Shot shot={SHOTS.trainingFosdem} className="mt-10" />

      <h3 className="text-[17px] font-bold tracking-tight text-[var(--bright)] mt-14 mb-4">
        The index you think you have
      </h3>
      <p className="text-[14px] leading-relaxed text-[var(--body)] max-w-[62ch]">
        If your retrieval eval retrieves before it scores, an unindexed vector column
        is a silent tax. Every similarity search over {TRAINING.vectorRows} rows reads
        all of them — {TRAINING.vectorBytes} per query — so a{" "}
        {TRAINING.evalQueries.toLocaleString()}-query eval moves{" "}
        <span className="mono text-[var(--video)]">{TRAINING.evalBytes}</span> to answer
        questions an ANN index would answer from a fraction of it.
      </p>
      <p className="text-[14px] leading-relaxed text-[var(--body)] mt-4 max-w-[62ch]">
        Worse than no index is a partial one: an index built, then rows appended.
        Queries still return the new rows, by scanning them. There is no error, and
        the only symptom is that things got slower. The console names the access path
        Lance&rsquo;s own plan reports —{" "}
        <code className="mono text-[12px] text-[var(--bright)]">KNNVectorDistance</code>{" "}
        for a brute-force scan,{" "}
        <code className="mono text-[12px] text-[var(--bright)]">ANNSubIndex</code> for
        an index that engaged — before the query runs, so you can see which you are
        about to do.
      </p>

      <div
        className="panel p-6 mt-10"
        style={{ borderColor: "rgb(var(--index-rgb) / 0.35)" }}
      >
        <div className="eyebrow mb-3">what a run must pin</div>
        <p className="text-[14px] leading-relaxed text-[var(--body)] max-w-[62ch]">
          The dataset URI and the exact version, the columns the run reads, what those
          columns weigh, how many loader workers the split can actually feed, and the
          findings outstanding when it was generated — as one block to keep beside the
          code that runs it.
        </p>
        <div className="panel mt-5 px-3 py-2.5 bg-[var(--ink-3)]">
          <code className="mono text-[12px] text-[var(--body)]">
            lancescope run-config test
          </code>
        </div>
        <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-4 max-w-[62ch]">
          Derived from the table, never written by a model. A run config that drifts
          from the table it describes is worse than none, because it is believed. The
          same block comes back from the{" "}
          <code className="mono text-[12px]">table_run_config</code> tool, so an agent
          can put it in your run for you.
        </p>
      </div>

      <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-8 max-w-[64ch]">
        All of this is the <span className="text-[var(--bright)]">layout</span> — how
        the table is split, what a pass moves, what a query costs on top of it. Whether
        the labels are right, whether a train/eval split leaks, whether the embeddings
        came back dead: those are properties of the data, and they live on a different
        screen that reads your columns and tells you what that will cost first.
      </p>
    </>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "index" | "video";
}) {
  return (
    <div className="panel px-4 py-3.5">
      <div className="eyebrow mb-1.5">{label}</div>
      <div
        className="mono text-[17px] font-semibold tracking-tight"
        style={{
          color:
            tone === "video"
              ? "var(--video)"
              : tone === "index"
                ? "var(--index)"
                : "var(--bright)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
