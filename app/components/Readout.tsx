/** What the tool printed, quoted verbatim.
 *
 *  Used where a screenshot would be worse than the text on it: a quote for six data
 *  checks is nine short lines, and a picture of nine short lines is nine short lines
 *  that cannot be selected, searched, or read by a screen reader.
 *
 *  Amber for a figure, coral for a refusal, haze for the rest — the same three
 *  meanings the console gives those colours, so a reader who has seen one recognises
 *  the other. Nothing here is highlighted by a parser; the lines carry their own
 *  parts, because inventing a grammar for four kinds of output would be more code
 *  than the four cases.
 */
export type Line =
  | { label: string; value: string; tone?: "figure" | "refuse"; note?: string }
  | { rule: true };

export default function Readout({
  title,
  lines,
  foot,
}: {
  /** The eyebrow over the block — where in the app this was printed. */
  title?: string;
  lines: Line[];
  foot?: React.ReactNode;
}) {
  return (
    <div className="panel overflow-hidden">
      {title && (
        <div className="eyebrow px-4 py-2.5 border-b border-[var(--hairline)]">{title}</div>
      )}
      <div className="px-4 py-3.5">
        {lines.map((line, i) =>
          "rule" in line ? (
            <hr key={i} className="border-0 border-t border-[var(--hairline)] my-3" />
          ) : (
            <div
              key={line.label}
              className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[15rem_minmax(0,1fr)]
                         gap-x-4 gap-y-0.5 py-1.5"
            >
              <code className="mono text-[12px] text-[var(--body)] break-words">
                {line.label}
              </code>
              <div className="min-w-0">
                <code
                  className="mono text-[12px] break-words"
                  style={{
                    color:
                      line.tone === "refuse"
                        ? "var(--video)"
                        : line.tone === "figure"
                          ? "var(--index)"
                          : "var(--haze)",
                  }}
                >
                  {line.value}
                </code>
                {line.note && (
                  <span className="mono text-[11px] text-[var(--dim)]"> {line.note}</span>
                )}
              </div>
            </div>
          ),
        )}
      </div>
      {foot && (
        <div className="px-4 py-3 border-t border-[var(--hairline)] text-[12px]
                        leading-relaxed text-[var(--haze)]">
          {foot}
        </div>
      )}
    </div>
  );
}
