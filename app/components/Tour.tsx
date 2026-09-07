/** The six things, each with the screen it happens on.
 *
 *  The six are the app's own list, in the app's own order — README.md in
 *  mrlynn/lancescope, which is where the count in the heading comes from. What is
 *  new here is that each one now arrives with a picture of itself, because "the
 *  byte cost of every read is shown as you go" is a sentence anybody could write
 *  and a screenshot of the counter is not.
 *
 *  Four have a screenshot and two have a readout, chosen per item rather than for
 *  consistency: a quote for six data checks is nine lines of text, and a picture of
 *  nine lines of text is nine lines of text nobody can select.
 */
import Readout from "@/app/components/Readout";
import Shot from "@/app/components/Shot";
import {
  CHECK_QUOTE,
  DATA_CHECKS,
  QUERY,
  RULES,
  SHOTS,
} from "@/app/data/measurements";

export default function Tour() {
  return (
    <div className="divide-y divide-[var(--hairline)]">
      <Band
        n="01"
        title="Reads a database, exactly"
        lead={
          <>
            Schema, versions, indices, fragments and rows — the five things a Lance
            table is — each on a screen of its own, and each printing what looking at
            it cost. A column whose values live in side files is marked as one, and
            the ratio between the two halves is stated rather than left for you to
            work out. Nothing on these screens opens a data file.
          </>
        }
      >
        <p className="text-[14px] leading-relaxed text-[var(--body)] max-w-[62ch]">
          The screen at the top of this page is the first of those five. Here is the
          second: every write a table has ever taken, with what each one did to the
          row, fragment and file counts. Every write makes a version and the old ones
          stay — a model trained on version 37 can be pointed back at version 37, and
          this is where you find out that version 37 exists.
        </p>
        <Shot shot={SHOTS.versions} className="mt-6" />
      </Band>

      <Band
        n="02"
        title="Answers “why is this slow”"
        lead={
          <>
            Run a scalar, full-text, vector or hybrid search and read the diagnosis:
            which access path Lance chose, whether the filter was pushed down, how
            many bytes and IOs it actually moved, and the Python that reproduces it
            somewhere this console is not. The bytes are not an estimate — the
            handle&rsquo;s own IO counters are drained before and after that query and
            nothing else.
          </>
        }
      >
        <Shot shot={SHOTS.query} />
        <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-6 max-w-[62ch]">
          A full pass over that table weighs {QUERY.fullPass}. The question cost{" "}
          <span className="mono text-[var(--index)]">{QUERY.read}</span> over{" "}
          {QUERY.ios} IOs, and the card says why —{" "}
          <span className="text-[var(--bright)]">&ldquo;{QUERY.verdict}&rdquo;</span> An
          index that exists and is not used gets a sentence of its own, naming the
          metric it was built for and the metric you asked for.
        </p>
      </Band>

      <Band
        n="03"
        title="Checks the data, and charges for it out loud"
        lead={
          <>
            Everything else here is derived from manifests. These six read your
            columns, so they are the one surface that is priced before it runs —
            weighed from the file footers without opening a page of them — and the
            run button spends it only when you press it. Cancelling stops the work
            rather than the wait.
          </>
        }
      >
        <Readout
          title={`the bill, before anything runs — ${CHECK_QUOTE.rows} rows of video`}
          lines={[
            { label: "priced every check", value: CHECK_QUOTE.price, tone: "figure", note: `· ${CHECK_QUOTE.priceTime}` },
            { rule: true },
            { label: "missing-content", value: CHECK_QUOTE.content, tone: "figure", note: "· and none of the video it points at" },
            { label: "exact-duplicates", value: CHECK_QUOTE.duplicates, tone: "figure", note: "· and you knew that before you spent it" },
            { label: "vector-health", value: CHECK_QUOTE.vectors, tone: "figure", note: "· quoted, not run" },
            { rule: true },
            {
              label: "near-duplicates",
              value: "will not run",
              tone: "refuse",
              note: "· no vector index, so this would be a full pass per row sampled",
            },
            {
              label: "class-balance",
              value: "name the label column",
              tone: "refuse",
              note: "· a guess would answer a question nobody asked",
            },
          ]}
          foot={
            <>
              What none of them can tell you is on the panel too: whether a label is{" "}
              <em className="text-[var(--bright)] not-italic font-semibold">right</em>,
              whether two rows mean the same thing when the embedding does not say so,
              and what made a distribution move. A panel of green ticks implies
              otherwise, so it says so where the ticks are.
            </>
          }
        />
        <div className="flex flex-wrap gap-2 mt-5">
          {DATA_CHECKS.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
      </Band>

      <Band
        n="04"
        title="Says what it already knows"
        lead={
          <>
            Ten rules run over the same manifests the other screens read, before you
            ask anything. Each finding carries its evidence on the same row — the
            fragment count, the rows, the bytes per vector — and each also appears
            under the panel holding the numbers it came from. Some of them are
            reasons <em className="not-italic text-[var(--bright)]">not</em> to act.
          </>
        }
      >
        <Shot shot={SHOTS.findings} />
        <div className="flex flex-wrap gap-2 mt-6">
          {RULES.map((r) => (
            <span key={r} className="chip">
              {r}
            </span>
          ))}
        </div>
        <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-5 max-w-[62ch]">
          No model is involved in any of the ten, and nothing here costs a token. That
          is worth saying plainly on a page that also has a section about language
          models: the part of this tool that tells you what is wrong with a table is
          the part with no model in it.
        </p>
      </Band>

      <Band
        n="05"
        title="Lets the answer leave"
        lead={
          <>
            The whole diagnosis comes out as one document — the findings with their
            evidence, the plan, the exact cost, the reader underneath — and it says
            what assembling it spent. Markdown to paste into an issue, or JSON another
            console opens and renders with the same cards, from the file, with nothing
            uploaded.
          </>
        }
      >
        <Readout
          title="what does not travel"
          lines={[
            {
              label: "the rows",
              value: "left behind",
              note: "· the reproduction re-runs against the reader's own copy",
            },
            { label: "credentials", value: "dropped by key", note: "· wherever they appear" },
            {
              label: "the database root",
              value: "<root>",
              note: "· a local path carries a username and a bucket carries an employer",
            },
          ]}
          foot={
            <>
              The document records which mode produced it and reports the scheme
              separately, so the substitution costs no meaning. Pass{" "}
              <code className="mono text-[11px] text-[var(--body)]">paths=kept</code> when
              the reader is you.
            </>
          }
        />
      </Band>

      <Band
        n="06"
        title="Adds language, optionally"
        lead={
          <>
            With a local model or an API key, a question typed in English lands in the
            filter box as a predicate — in it, for you to read, before anything runs.
            The console is useful with nothing configured: findings, the query
            workspace and compare mode all work without a model and cost nothing.
          </>
        }
      >
        <Shot shot={SHOTS.english} />
        <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-6 max-w-[62ch]">
          Refusing is a first-class outcome. Ask for something the columns cannot
          express and it says so, rather than producing a filter that runs and means
          something else. What that costs, where it runs and what leaves the machine
          is the next section.
        </p>
      </Band>
    </div>
  );
}

function Band({
  n,
  title,
  lead,
  children,
}: {
  n: string;
  title: string;
  lead: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article className="py-12 first:pt-0 last:pb-0">
      <div className="flex items-baseline gap-3">
        <span className="mono text-[11px] text-[var(--rule)] tabular-nums">{n}</span>
        <h3 className="text-[20px] md:text-[24px] font-bold tracking-tight text-[var(--bright)] text-balance">
          {title}
        </h3>
      </div>
      <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--body)] mt-3 max-w-[62ch]">
        {lead}
      </p>
      <div className="mt-7">{children}</div>
    </article>
  );
}
