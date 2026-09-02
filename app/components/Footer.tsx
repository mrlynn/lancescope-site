import { REPO } from "@/app/data/measurements";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--hairline)] mt-10">
      <div className="max-w-[880px] mx-auto px-6 py-12">
        <p className="text-[13px] leading-relaxed text-[var(--haze)] max-w-[62ch]">
          A hosted, read-only console you can try without installing anything is
          planned. Until then the app runs on your machine, against your data, and
          sends nothing anywhere.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mono text-[11px] mt-7">
          <a href={REPO} className="text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
            source
          </a>
          <a href={`${REPO}/releases`} className="text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
            releases
          </a>
          <a href={`${REPO}/issues`} className="text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
            issues
          </a>
          <span className="text-[var(--dim)]">Apache-2.0</span>
        </div>
        <p className="text-[11px] leading-relaxed text-[var(--dim)] mt-8 max-w-[62ch]">
          An independent tool. Not affiliated with, or supported by, LanceDB. The
          dot lattice in the mark is derived from theirs, with thanks; the glass is
          ours. LanceDB is a trademark of its owner.
        </p>
      </div>
    </footer>
  );
}
