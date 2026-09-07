/** The headline names the product's job, not the format's property.
 *
 *  It used to open with "A Lance table can hold 2.65 GB of video while a search over
 *  it reads none" — true, sourced, and a fact about LanceDB rather than about this
 *  tool. A reader who arrived knowing nothing left knowing something interesting
 *  about a database they may not use and nothing about the thing the button
 *  downloads. That number is still on the page; it is now evidence for a claim this
 *  tool makes rather than the claim itself.
 *
 *  Three clauses, because the app has three answers: what is in there, what is wrong
 *  with it, and what asking cost. The third is the one nothing else prints, so it is
 *  the one that gets the colour.
 */
import DownloadButton from "@/app/components/DownloadButton";
import Shot from "@/app/components/Shot";
import type { Release } from "@/app/lib/release";
import { SHOTS } from "@/app/data/measurements";

export default function Hero({ release }: { release: Release }) {
  return (
    <section className="max-w-[880px] mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
      <h1
        className="text-[32px] md:text-[50px] leading-[1.06] font-black tracking-[-0.02em]
                   text-[var(--bright)] text-balance"
      >
        Point it at a LanceDB database.
        <br className="hidden md:block" />{" "}
        <span className="text-[var(--body)]">
          It says what is in there, what is wrong with it, and{" "}
        </span>
        <span style={{ color: "var(--video)" }}>what asking cost</span>
        <span className="text-[var(--body)]">.</span>
      </h1>

      <p className="text-[16px] md:text-[18px] leading-relaxed text-[var(--body)] mt-7 max-w-[60ch]">
        LanceScope is a read-only workbench for LanceDB — a macOS app, or a console
        you run yourself. It opens a database wherever it lives and gives the format
        the screens it never had: schema and versions, the access path a query
        actually took, what a table costs a training run, and ten rules that have
        already looked. Every screen prints the bytes it spent getting there.
      </p>

      <div className="mt-9">
        <DownloadButton release={release} />
      </div>

      <div className="flex flex-wrap gap-2 mt-7">
        {[
          "read-only by construction",
          "no telemetry, no account",
          "runs against your data, where it is",
          "a model is optional",
        ].map((c) => (
          <span key={c} className="chip">
            {c}
          </span>
        ))}
      </div>

      <Shot shot={SHOTS.schema} priority className="mt-12" />
    </section>
  );
}
