"use client";

/** The instrument.
 *
 *  Ported from the console's own byte scale (web/app/components/ByteScale.tsx),
 *  whose comment is the design brief for this section: at this scale the query is
 *  orders of magnitude smaller than the corpus, so a proportional bar renders as
 *  nothing at all. The rail is therefore logarithmic and the audience reads
 *  distance rather than area.
 *
 *  The rule that matters: ZERO IS NOT PLOTTED. An operation that reads no video
 *  does not get a bar of length zero at the left edge, which would look like "a
 *  very small amount". It prints NONE. Three of the six operations do, in a row,
 *  and that run is the argument the whole page is making.
 *
 *  Accessibility and reduced motion: the operation list underneath is the same
 *  data as the rail and is always rendered, so nothing here is conveyed by
 *  animation alone. Under `prefers-reduced-motion` the auto-advance never starts
 *  and the markers move without transition — the section becomes the static table
 *  it is built on top of.
 */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CORPUS, OPS, OPS_SOURCE, RAIL_MAX, RAIL_MIN } from "@/app/data/measurements";

const LOG_MIN = Math.log10(RAIL_MIN);
const LOG_MAX = Math.log10(RAIL_MAX);

/** Position on the rail, 0..1. Only ever called with a positive byte count. */
function pos(bytes: number): number {
  const p = (Math.log10(bytes) - LOG_MIN) / (LOG_MAX - LOG_MIN);
  return Math.min(1, Math.max(0, p));
}

/** The media query as an external store, which is what it is — subscribing with
 *  an effect that immediately setStates is both a lint error and a wasted render.
 *  The server snapshot is `false`: markup is identical either way, and the client
 *  corrects on hydration before any transition has had time to run. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

const TICKS = [
  { at: 1_000, label: "1 KB" },
  { at: 1_000_000, label: "1 MB" },
  { at: 1_000_000_000, label: "1 GB" },
];

export default function ByteRail() {
  const [step, setStep] = useState(0);
  const [live, setLive] = useState(false);
  const [touched, setTouched] = useState(false);
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Start only once the rail is actually on screen; an instrument that has
  // already finished its run by the time you scroll to it has shown you nothing.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setLive(true),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live || reduced || touched) return;
    const t = setInterval(() => setStep((s) => (s + 1) % OPS.length), 2100);
    return () => clearInterval(t);
  }, [live, reduced, touched]);

  const op = OPS[step];
  const select = (i: number) => {
    setTouched(true);
    setStep(i);
  };

  return (
    <div ref={ref}>
      {/* ------------------------------------------------------------ the rail */}
      <div className="panel p-5 md:p-7">
        <div className="flex items-baseline justify-between gap-4 mb-1.5">
          <div className="mono text-[12px] text-[var(--bright)]">{op.label}</div>
          <div className="eyebrow shrink-0">
            {step + 1} / {OPS.length}
          </div>
        </div>
        {/* The corpus label lives here rather than as a tick: on a log rail 1 GB
            and 2.65 GB are four pixels apart, and the two labels collided. */}
        <div className="mono text-[9px] text-[var(--dim)] mb-5">
          the rail runs from 1 KB to the whole corpus, {CORPUS.videoBytes}
        </div>

        <Row
          tone="index"
          name="index"
          bytes={op.indexBytes}
          display={op.index}
          reduced={reduced}
        />
        <Row
          tone="video"
          name="video"
          bytes={op.videoBytes}
          display={op.video}
          reduced={reduced}
        />

        {/* scale */}
        <div className="relative h-5 mt-1" aria-hidden>
          {TICKS.map((t) => (
            <span
              key={t.label}
              className="mono absolute text-[9px] text-[var(--dim)] -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${pos(t.at) * 100}%` }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------- the same, as a table */}
      <ol className="mt-5">
        {OPS.map((o, i) => (
          <li key={o.label}>
            <button
              type="button"
              onClick={() => select(i)}
              onMouseEnter={() => select(i)}
              aria-current={i === step}
              className={`w-full text-left flex flex-wrap items-baseline gap-x-4 gap-y-1
                          px-3 py-2.5 rounded-sm border-l-2 transition-colors
                          ${i === step
                            ? "border-[var(--video)] bg-[rgb(var(--video-rgb)/0.06)]"
                            : "border-transparent hover:bg-[var(--ink-2)]"}`}
            >
              <span className="text-[13px] text-[var(--body)] w-full sm:w-auto sm:flex-1">
                {o.label}
                {o.note && <span className="text-[var(--dim)]"> — {o.note}</span>}
              </span>
              <span className="mono text-[11px] text-[var(--index)] tabular-nums text-right
                               ml-auto sm:ml-0 w-[76px]">
                {o.index ?? "—"}
              </span>
              <span
                className={`mono text-[11px] tabular-nums text-right w-[92px] ${
                  o.videoBytes === 0
                    ? "text-[var(--bright)] font-bold tracking-wider"
                    : "text-[var(--video)]"
                }`}
              >
                {o.video ?? "—"}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="flex gap-5 mt-4 px-3">
        <Key tone="index" label="bytes an index read" />
        <Key tone="video" label="bytes of video read" />
      </div>

      <p className="mono text-[10px] text-[var(--dim)] mt-5 px-3">{OPS_SOURCE}</p>
    </div>
  );
}

/** One track. `bytes === 0` is the case the whole instrument exists to show. */
function Row({
  tone,
  name,
  bytes,
  display,
  reduced,
}: {
  tone: "index" | "video";
  name: string;
  bytes: number | null;
  display: string | null;
  reduced: boolean;
}) {
  const colour = `var(--${tone})`;
  const none = bytes === 0;
  const absent = bytes === null;

  const value = (
    <span className="mono text-[12px] tabular-nums text-right shrink-0"
          style={{ color: none ? "var(--bright)" : colour }}>
      {display ?? "—"}
    </span>
  );

  return (
    <div className="mb-4">
      {/* Narrow screens put the label and the figure on their own line: at 375px
          a 46px name, a track and a 96px figure leave the track too short to
          carry any distance, and distance is the only thing it is drawing. */}
      <div className="flex items-baseline justify-between mb-1 sm:hidden">
        <span className="mono text-[10px] uppercase tracking-widest"
              style={{ color: colour }}>
          {name}
        </span>
        {/* When the answer is NONE the rail says so a few pixels below, and
            printing it twice on one narrow screen reads as a stutter. The empty
            track under the label is the correct picture: nothing was plotted. */}
        {!none && value}
      </div>

      <div className="flex items-center gap-4">
      <span className="mono text-[10px] uppercase tracking-widest w-[46px] shrink-0 hidden sm:block"
            style={{ color: colour }}>
        {name}
      </span>

      <div className="relative flex-1 h-[26px]">
        {/* the rail itself */}
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
             style={{ background: "var(--hairline)" }} />

        {none ? (
          <span className="mono absolute left-0 top-1/2 -translate-y-1/2 text-[11px]
                           font-bold tracking-[0.2em] text-[var(--bright)]">
            NONE
          </span>
        ) : absent ? (
          <span className="mono absolute left-0 top-1/2 -translate-y-1/2 text-[11px]
                           text-[var(--dim)]">
            —
          </span>
        ) : (
          <>
            <div
              className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
              style={{
                left: 0,
                width: `${pos(bytes) * 100}%`,
                background: `rgb(var(--${tone}-rgb) / 0.35)`,
                transition: reduced ? "none" : "width 520ms cubic-bezier(.2,.7,.2,1)",
              }}
            />
            <span
              className="absolute top-1/2 w-[11px] h-[11px] rounded-full -translate-y-1/2 -translate-x-1/2"
              style={{
                left: `${pos(bytes) * 100}%`,
                background: colour,
                transition: reduced ? "none" : "left 520ms cubic-bezier(.2,.7,.2,1)",
              }}
            />
          </>
        )}
      </div>

      <span className="hidden sm:block w-[96px] shrink-0">{value}</span>
      </div>
    </div>
  );
}

function Key({ tone, label }: { tone: "index" | "video"; label: string }) {
  return (
    <span className="flex items-center gap-2 mono text-[10px] text-[var(--dim)]">
      <span className="w-2 h-2 rounded-full" style={{ background: `var(--${tone})` }} />
      {label}
    </span>
  );
}
