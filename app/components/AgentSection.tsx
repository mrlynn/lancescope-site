import CopyLine from "@/app/components/CopyLine";
import { MCP_INSTALL } from "@/app/data/measurements";

const TOOLS = [
  "list_tables", "describe_table", "read_rows", "table_findings",
  "table_fragments", "table_indices", "table_versions",
];

export default function AgentSection() {
  return (
    <>
      <CopyLine text={MCP_INSTALL} label="mcp" />
      <div className="flex flex-wrap gap-2 mt-5">
        {TOOLS.map((t) => (
          <span
            key={t}
            className="mono text-[11px] px-2.5 py-1 rounded-sm border border-[var(--rule)]
                       text-[var(--haze)]"
          >
            {t}
          </span>
        ))}
      </div>
      <p className="text-[14px] leading-relaxed text-[var(--body)] mt-6 max-w-[62ch]">
        Seven tools, every one of them read-only and declared as such. Ask it what
        is in a database and what is wrong with it, and it comes back with the
        unindexed vector column and what a search therefore costs — with the
        numbers those conclusions were derived from, not a summary of them.
      </p>
    </>
  );
}
