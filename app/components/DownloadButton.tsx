/** The button, and what it admits.
 *
 *  Apple Silicon only, and it says so on the button rather than in a footnote —
 *  167 MB downloaded by someone on an Intel Mac who then cannot run it is a worse
 *  outcome than a clear label. When the release API could not be reached the
 *  version and size chips are simply absent; see app/lib/release.ts.
 */
import { DMG_FALLBACK } from "@/app/data/measurements";
import { fmtSize, type Release } from "@/app/lib/release";

export default function DownloadButton({
  release,
  size = "lg",
}: {
  release: Release;
  size?: "lg" | "md";
}) {
  const chips = [release.tag, fmtSize(release.sizeBytes), DMG_FALLBACK.arch].filter(
    Boolean,
  ) as string[];

  // No published release: send the reader to the build instructions rather than to
  // an empty releases page. A dead download link spends their interest for nothing.
  if (!release.resolved) {
    return (
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href="#get"
          className={`inline-flex items-center gap-2.5 rounded-sm font-bold tracking-tight
                      text-[var(--ink)] transition-opacity hover:opacity-90
                      ${size === "lg" ? "px-6 py-3.5 text-[16px]" : "px-5 py-3 text-[14px]"}`}
          style={{ background: "var(--video)" }}
        >
          <GlassIcon />
          Run it in five minutes
        </a>
        <span className="mono text-[11px] text-[var(--haze)]">
          open source · Apache-2.0
          <span className="text-[var(--dim)]"> · signed build coming</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <a
        href={release.url}
        className={`inline-flex items-center gap-2.5 rounded-sm font-bold tracking-tight
                    text-[var(--ink)] transition-opacity hover:opacity-90
                    ${size === "lg" ? "px-6 py-3.5 text-[16px]" : "px-5 py-3 text-[14px]"}`}
        style={{ background: "var(--video)" }}
      >
        <GlassIcon />
        {release.resolved ? "Download for macOS" : "Get LanceScope"}
      </a>
      <span className="mono text-[11px] text-[var(--haze)]">
        {chips.join(" · ")}
        <span className="text-[var(--dim)]"> · {DMG_FALLBACK.minMacOS}</span>
      </span>
    </div>
  );
}

function GlassIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 204 204" fill="none" stroke="currentColor"
         strokeWidth={16} aria-hidden>
      <circle cx="88" cy="88" r="60" />
      <line x1="132" y1="132" x2="184" y2="184" strokeLinecap="round" />
    </svg>
  );
}
