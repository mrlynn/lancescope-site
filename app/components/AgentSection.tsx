/** The read surface as MCP tools.
 *
 *  The count was seven for a while, which was true before the bundle, the run
 *  config, the two estimators and the data-scan quote existed. It is read from
 *  MCP_TOOLS now, so the sentence and the list cannot disagree — the failure mode
 *  this page is most exposed to is a number that was right when it was typed.
 */
import CopyLine from "@/app/components/CopyLine";
import { MCP_INSTALL, MCP_TOOLS } from "@/app/data/measurements";

const COUNT = ["", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve"][MCP_TOOLS.length] ?? String(MCP_TOOLS.length);

export default function AgentSection() {
  return (
    <>
      <CopyLine text={MCP_INSTALL} label="mcp" />
      <div className="flex flex-wrap gap-2 mt-5">
        {MCP_TOOLS.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <p className="text-[14px] leading-relaxed text-[var(--body)] mt-6 max-w-[62ch]">
        {COUNT.charAt(0).toUpperCase() + COUNT.slice(1)} tools, every one of them
        read-only and declared as such, and every one the HTTP route called in process
        rather than a second implementation of it — so the two surfaces cannot drift.
        Ask what is in a database and what is wrong with it, and the answer comes back
        with the unindexed vector column and what a search therefore costs, carrying
        the numbers those conclusions were derived from rather than a summary of them.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7">
        <Bound
          title="It cannot materialise a blob"
          body="read_rows has no expand parameter at all, so an agent cannot spend a turn discovering that the route underneath would refuse it. Reading every row of a table holding gigabytes of video costs kilobytes, however many times something asks."
        />
        <Bound
          title="It cannot write"
          body="Nothing under the console's read routes writes, so nothing here does either. The ingest wizard, which is the one thing in the project that creates a table, is not exposed as a tool."
        />
        <Bound
          title="It cannot spend your budget"
          body="No summarise tool and no ask tool. It can quote what checking a table's data would read; running that scan is a button in your console, which is where a decision to spend megabytes belongs."
        />
      </div>
    </>
  );
}

function Bound({ title, body }: { title: string; body: string }) {
  return (
    <div className="panel p-4">
      <h4 className="text-[13px] font-semibold tracking-tight text-[var(--bright)] mb-2">
        {title}
      </h4>
      <p className="text-[12.5px] leading-relaxed text-[var(--haze)]">{body}</p>
    </div>
  );
}
