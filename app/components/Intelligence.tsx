/** Where the model is, and — more usefully — where it is not.
 *
 *  Every tool shipping this year says it is AI-powered, and the claim carries almost
 *  no information. What carries information is the boundary: which answers on this
 *  page were computed, which were generated, what the generated ones cost, and what
 *  left the machine to get them. All three are stated here because all three are
 *  answerable, and a page that only said "AI-powered" would be making a weaker claim
 *  about a better product.
 *
 *  Source: content/guide/howto-intelligence.md and reference-models.md.
 */
import CopyLine from "@/app/components/CopyLine";
import Readout from "@/app/components/Readout";
import { INTELLIGENCE, RULES } from "@/app/data/measurements";

export default function Intelligence() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Layer
          n="no model"
          title="What it works out"
          body={`The ${RULES.length} rules, the byte counters, the access paths, the fragment layout, the training figures and the version history. All of it is derived from manifests and IO counters. It runs with nothing configured, costs nothing, and is the part of this tool that tells you what is wrong with a table.`}
        />
        <Layer
          n="your model"
          title="What it asks"
          body="Two jobs, both optional and both something you pressed: turn a question into a filter, and describe a table in a few sentences. A local model does it free and offline; a key does it faster. Nothing is asked on load — a panel that spends money because somebody opened a tab is a panel that spends money nobody agreed to spend."
          accent
        />
        <Layer
          n="your agent"
          title="What it hands over"
          body="The same read-only surface over MCP, so the intelligence is your agent's and the evidence is the console's. There is no key of ours and no model in that loop, and no tool in it can spend your API budget."
        />
      </div>

      <h3 className="text-[17px] font-bold tracking-tight text-[var(--bright)] mt-14 mb-4">
        Two ways in, and one of them is free
      </h3>
      <p className="text-[14px] leading-relaxed text-[var(--body)] max-w-[62ch] mb-5">
        Pull a local model and the console probes{" "}
        <code className="mono text-[12px] text-[var(--bright)]">localhost:11434</code> and
        comes up local. That is the whole setup, and it costs nothing per response
        forever.
      </p>
      <div className="space-y-2.5">
        <CopyLine text={`ollama pull ${INTELLIGENCE.localModels[0]}`} label="local" />
        <CopyLine text="export ANTHROPIC_API_KEY=sk-…" label="hosted" />
      </div>
      <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-5 max-w-[62ch]">
        A key beats a local model when both are present, and an explicit choice in
        settings beats both. The hosted default is{" "}
        <code className="mono text-[12px] text-[var(--bright)]">
          {INTELLIGENCE.hostedDefault}
        </code>
        ; choosing a cheaper one is your call, made in settings, and not something the
        tool does quietly to save money. Any OpenAI-compatible endpoint works too —
        vLLM, LM Studio, Groq, llama.cpp — with a base URL and a model name.
      </p>

      <h3 className="text-[17px] font-bold tracking-tight text-[var(--bright)] mt-14 mb-4">
        Every response comes back with its receipt
      </h3>
      <Readout
        title="settings → intelligence → test the model"
        lines={[
          { label: "answered, and honoured the schema", value: INTELLIGENCE.receipt },
          { rule: true },
          { label: `asked in English`, value: `“${INTELLIGENCE.askedIn}”` },
          { label: "dry-run count", value: INTELLIGENCE.matched, tone: "figure" },
          { label: "landed in the filter box", value: INTELLIGENCE.predicate, tone: "figure" },
          { rule: true },
          {
            label: "describe this table",
            value: `${INTELLIGENCE.describeCold} cold`,
            note: `· ${INTELLIGENCE.describeWarm}s warm — the answer is kept against the table version, so it is asked once`,
          },
        ]}
        foot={
          <>
            A failure answers in the same shape, with the reason: a stale key, a model
            that was deleted, an endpoint answering prose where a schema was promised.
            Better a sentence there than a mystery three features later.
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div className="panel p-5">
          <h4 className="text-[14px] font-semibold tracking-tight text-[var(--bright)] mb-2.5">
            What it costs, counted honestly
          </h4>
          <p className="text-[13px] leading-relaxed text-[var(--body)]">
            Tokens and dollars, per response, beside the bytes it read — and a running
            total for the session. A cache hit is counted as a call that did not
            happen. A local model costs zero. A model with no published price reports
            its cost as <span className="text-[var(--bright)]">unknown</span> rather
            than as zero, because those are different claims.
          </p>
          <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-3">
            Set a ceiling and it is checked <em className="not-italic text-[var(--bright)]">before</em>{" "}
            each call. Refusing after the money is gone is a receipt, not a limit.
          </p>
        </div>
        <div className="panel p-5">
          <h4 className="text-[14px] font-semibold tracking-tight text-[var(--bright)] mb-2.5">
            What leaves your machine
          </h4>
          <p className="text-[13px] leading-relaxed text-[var(--body)]">
            Schema and statistics, by default. A table summary is written from the
            shape of a table, never its contents. Blob columns, vectors and binary
            columns are never sent under any setting.
          </p>
          <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-3">
            The one exception is deliberate and visible. Translating a question is much
            more accurate when the model knows the actual values of low-cardinality
            string columns — so a{" "}
            <span className="text-[var(--bright)]">local</span> model gets them, because
            nothing leaves the machine, and a{" "}
            <span className="text-[var(--bright)]">hosted</span> one does not unless you
            ask. Either way the response names the columns whose values were sent.
          </p>
        </div>
      </div>

      <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-8 max-w-[64ch]">
        Prices in the registry carry the date they were read —{" "}
        <span className="mono">{INTELLIGENCE.priceDate}</span> — and the two local
        models named here are the ones that got every one of the repository&rsquo;s own
        natural-language-to-filter cases right:{" "}
        <code className="mono text-[12px] text-[var(--body)]">
          {INTELLIGENCE.localModels.join(", ")}
        </code>
        . A local model not on that list still runs; it is assumed to handle structured
        output and <em className="not-italic text-[var(--bright)]">not</em> to handle
        multi-turn tool use, which is the cautious assumption rather than the convenient
        one.
      </p>
    </>
  );
}

function Layer({
  n,
  title,
  body,
  accent = false,
}: {
  n: string;
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div
      className="panel p-5"
      style={accent ? { borderColor: "rgb(var(--video-rgb) / 0.4)" } : undefined}
    >
      <div
        className="eyebrow mb-2.5"
        style={accent ? { color: "var(--video)" } : undefined}
      >
        {n}
      </div>
      <h3 className="text-[15px] font-bold tracking-tight text-[var(--bright)] mb-2.5">
        {title}
      </h3>
      <p className="text-[13px] leading-relaxed text-[var(--body)]">{body}</p>
    </div>
  );
}
