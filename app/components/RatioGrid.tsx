/** The ratio, as area rather than a sentence.
 *
 *  132 squares, one of them coral. It is the cheapest possible proof and it sits
 *  directly under the rail because it answers the question the rail provokes:
 *  fine, but how much bigger is the table than the search? This much.
 *
 *  Server component — nothing here changes after render.
 */
import { CORPUS } from "@/app/data/measurements";

export default function RatioGrid() {
  return (
    <>
      <div
        className="grid gap-[3px] max-w-[560px]"
        style={{ gridTemplateColumns: "repeat(22, minmax(0, 1fr))" }}
        role="img"
        aria-label={`${CORPUS.ratio} to 1: ${CORPUS.videoBytes} of video against ${CORPUS.searchBytes} that a search reads`}
      >
        {Array.from({ length: CORPUS.ratio }, (_, i) => (
          <span
            key={i}
            className="aspect-square rounded-[1px]"
            style={{
              background: i === 0 ? "var(--video)" : "rgb(var(--video-rgb) / 0.13)",
            }}
          />
        ))}
      </div>
      <p className="text-[14px] leading-relaxed text-[var(--body)] mt-5 max-w-[54ch]">
        <span className="text-[var(--bright)] font-semibold">{CORPUS.videoBytes} of video</span>{" "}
        in <code className="mono text-[13px]">.blob</code> side files, against{" "}
        <span className="text-[var(--bright)] font-semibold">{CORPUS.searchBytes}</span> of
        everything a search reads. One square is lit.
      </p>
    </>
  );
}
