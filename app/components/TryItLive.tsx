import { DEMO } from "@/app/data/measurements";

/** The console, running, before you decide whether to download it.
 *
 *  Deliberately not the Ctrl-F for Video demo, which is a different thing and needs
 *  a corpus and a local embedding model — see DemoSection, which says so. This is
 *  the console itself: the same build the DMG carries, pinned to a public dataset
 *  and put behind `LANCESCOPE_KIOSK=1`, which unmounts the routes that write.
 *
 *  The limitations are named rather than discovered, because the whole argument of
 *  this project is that a measured number beats a claim, and a demo that quietly
 *  refuses a query would undercut that faster than not having one.
 */
export default function TryItLive() {
  return (
    <div className="panel p-6 md:p-8">
      <p className="text-[14px] leading-relaxed text-[var(--body)] max-w-[62ch]">
        The console itself, on a public LanceDB dataset, with{" "}
        <span className="text-[var(--bright)]">nothing to install</span>. Every number
        on it is real — the schema, the findings, the access path a query took, and
        the bytes each answer cost, read from Lance&rsquo;s own IO counters.
      </p>

      <a
        href={DEMO}
        className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-sm
                   mono text-[11px] font-semibold tracking-wide
                   text-[var(--ink)] transition-opacity hover:opacity-90"
        style={{ background: "var(--video)" }}
      >
        open the live console →
      </a>

      <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-6 max-w-[62ch]">
        Read-only, and pinned to one dataset it does not host: pylance opens{" "}
        <code className="mono text-[12px]">hf://</code> lazily, so the demo stores
        nothing and reads only what you look at. Queries are rate limited, because
        each one is paid for in range requests against somebody else&rsquo;s server —
        which is the one number a hosted demo cannot show you honestly, and the reason
        the interesting version of this runs on your own disk.
      </p>
    </div>
  );
}
