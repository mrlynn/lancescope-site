import Link from "next/link";
import Mark from "@/app/components/Mark";
import ThemeToggle from "@/app/components/ThemeToggle";
import { DEMO, REPO } from "@/app/data/measurements";

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--hairline)]"
      style={{ background: "var(--rail)", backdropFilter: "blur(8px)" }}
    >
      <nav className="max-w-[880px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          title="LanceScope — an independent tool, not affiliated with LanceDB"
          className="flex items-center gap-2.5 shrink-0"
        >
          <Mark size={22} className="text-[var(--haze)]" />
          {/* The wordmark goes below sm, and the mark alone carries the link. The
              row had 7px of headroom at 375px before the guide and the demo each
              wanted a link in it, so this is not a squeeze that buys one more item
              — it is the nav becoming responsive rather than nearly fitting. */}
          <span className="hidden sm:inline text-[16px] font-extrabold tracking-tight text-[var(--bright)]">
            LanceScope
          </span>
        </Link>
        {/* gap-3.5 below sm: four links, a theme control and a button did fit at
            375px until the guide and the demo each wanted one, and the row then
            pushed the layout viewport to 458px and cut every page off at the right
            edge. github is the one that goes, because the footer already carries
            "source" and a phone is the least likely place to want a repository. */}
        <div className="flex items-center gap-3.5 sm:gap-5 mono text-[11px]">
          {/* The guide itself, not the README. It used to point at GitHub because
              there was nowhere else for it to point; the pages are now built from
              the same markdown the app ships, vendored by scripts/sync-upstream.mjs. */}
          <Link href="/docs/index" className="text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
            docs
          </Link>
          <a href={DEMO} className="text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
            demo
          </a>
          <a href={REPO} className="hidden sm:inline text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
            github
          </a>
          <ThemeToggle />
          <Link
            href="/download"
            className="px-3 py-1.5 rounded-sm font-semibold tracking-wide
                       text-[var(--ink)] transition-opacity hover:opacity-90"
            style={{ background: "var(--video)" }}
          >
            get it
          </Link>
        </div>
      </nav>
    </header>
  );
}
