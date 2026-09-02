import Link from "next/link";
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
          {/* The about page is reachable from here and nowhere else, on purpose:
              it is for the reader who has decided the tool is interesting and now
              wants to know who is behind it. */}
          <Link href="/about" className="text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
            about
          </Link>
          <Link href="/privacy" className="text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
            privacy
          </Link>
          <Link href="/terms" className="text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
            terms
          </Link>
          <Link href="/attribution" className="text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
            attribution
          </Link>
          <span className="text-[var(--dim)]">Apache-2.0</span>
        </div>
        <p className="text-[11px] leading-relaxed text-[var(--dim)] mt-8 max-w-[62ch]">
          An independent tool. Not affiliated with, endorsed by, or supported by
          LanceDB. The dot lattice in the mark is derived from theirs, with thanks;
          the glass is ours. LanceDB and Lance, and their logos, are the property of
          their owner. Copyright 2026 Michael Lynn, Apache-2.0. Full detail on the{" "}
          <Link href="/attribution" className="text-[var(--haze)] underline hover:text-[var(--bright)]">
            attribution page
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
