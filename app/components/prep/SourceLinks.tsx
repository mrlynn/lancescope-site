import { sourcesFor } from "@/app/lib/prep";

/** The sources behind one block of study content, as a footnote line. */
export default function SourceLinks({ ids, className = "" }: {
  ids?: readonly string[];
  className?: string;
}) {
  const list = sourcesFor(ids);
  if (!list.length) return null;
  return (
    <p className={`mono text-[10px] leading-relaxed text-[var(--dim)] ${className}`}>
      <span className="uppercase tracking-[0.14em] mr-2">Sources</span>
      {list.map((s, i) => (
        <span key={s.id}>
          {i > 0 && <span className="mx-1.5">·</span>}
          <a href={s.url} target="_blank" rel="noreferrer"
             className="text-[var(--haze)] hover:text-[var(--bright)] underline underline-offset-2">
            {s.publisher}
          </a>
        </span>
      ))}
    </p>
  );
}

/** A small uppercase tag for how much weight a number can bear. */
export function Label({ kind }: { kind: "measured" | "illustrative" | "vendor claim" | "my read" }) {
  const color = kind === "measured" ? "var(--index)" : kind === "vendor claim" ? "var(--video)" : "var(--haze)";
  return (
    <span className="mono text-[9px] uppercase tracking-[0.16em] px-1.5 py-0.5 rounded-[2px] border align-middle whitespace-nowrap"
          style={{ color, borderColor: color }}>
      {kind}
    </span>
  );
}
