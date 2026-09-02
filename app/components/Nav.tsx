import Link from "next/link";
import Mark from "@/app/components/Mark";
import ThemeToggle from "@/app/components/ThemeToggle";
import { REPO } from "@/app/data/measurements";

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
          <span className="text-[16px] font-extrabold tracking-tight text-[var(--bright)]">
            LanceScope
          </span>
        </Link>
        <div className="flex items-center gap-5 mono text-[11px]">
          <a href={`${REPO}#readme`} className="text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
            docs
          </a>
          <a href={REPO} className="text-[var(--haze)] hover:text-[var(--bright)] transition-colors">
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
