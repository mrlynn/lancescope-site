/** The headline states the mechanism, not a benefit.
 *
 *  "Understand your data faster" is what every tool on the shelf says. This one
 *  can say something specific and checkable instead, so it does — and the number
 *  in it is the same number the rail underneath measures.
 */
import DownloadButton from "@/app/components/DownloadButton";
import type { Release } from "@/app/lib/release";
import { CORPUS } from "@/app/data/measurements";

export default function Hero({ release }: { release: Release }) {
  return (
    <section className="max-w-[880px] mx-auto px-6 pt-16 pb-10 md:pt-24 md:pb-14">
      <h1
        className="text-[34px] md:text-[52px] leading-[1.05] font-black tracking-[-0.02em]
                   text-[var(--bright)] text-balance"
      >
        A Lance table can hold {CORPUS.videoBytes} of video
        <br className="hidden md:block" />{" "}
        while a search over it reads{" "}
        <span style={{ color: "var(--video)" }}>none</span>.
      </h1>

      <p className="text-[16px] md:text-[18px] leading-relaxed text-[var(--body)] mt-6 max-w-[58ch]">
        LanceScope is a workbench for reading LanceDB datasets: schema, versions,
        indices, fragments and rows, with the byte cost of every read shown as you
        go. The bytes a search touches and the bytes a table holds live in different
        files. It measures both.
      </p>

      <div className="mt-9">
        <DownloadButton release={release} />
      </div>
    </section>
  );
}
