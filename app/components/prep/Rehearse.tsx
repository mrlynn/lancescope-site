"use client";

import { useEffect, useMemo, useState } from "react";
import { TOPICS } from "@/app/lib/prep";
import TopicFilter, { topicsOf } from "@/app/components/prep/TopicFilter";
import { updateProgress, useProgress } from "@/app/components/prep/progress";

type Prompt = { id: string; topic: string; q: string; points: readonly string[] };

const TARGET = 90; // seconds: long enough for three points, short enough to keep the room

function clock(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Answer out loud against a clock, then check the answer against the points. */
export default function Rehearse({ prompts }: { prompts: readonly Prompt[] }) {
  const progress = useProgress();
  const { topics, counts } = useMemo(() => topicsOf(prompts), [prompts]);
  const [topic, setTopic] = useState<string | null>(null);
  const [id, setId] = useState(prompts[0].id);
  const [shown, setShown] = useState(false);
  const [running, setRunning] = useState(false);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const list = prompts.filter((p) => !topic || p.topic === topic);
  const p = prompts.find((x) => x.id === id) ?? prompts[0];
  const done = Object.keys(progress.rehearsed).length;

  const pick = (next: string) => {
    setId(next);
    setShown(false);
    setRunning(false);
    setSecs(0);
  };
  const random = () => {
    const pool = list.filter((x) => x.id !== id);
    if (pool.length) pick(pool[Math.floor(Math.random() * pool.length)].id);
  };

  return (
    <div>
      <TopicFilter topics={topics} counts={counts} value={topic} onChange={setTopic} />

      <div className="grid md:grid-cols-[1fr_260px] gap-6 mt-6">
        <div className="panel p-6 md:p-8 self-start">
          <div className="flex justify-between gap-3 mono text-[10px] uppercase tracking-[0.14em] text-[var(--dim)] mb-4">
            <span>{TOPICS[p.topic] ?? p.topic}</span>
            {progress.rehearsed[p.id] && <span style={{ color: "var(--index)" }}>practiced</span>}
          </div>
          <p className="text-[21px] md:text-[24px] font-bold leading-snug text-[var(--bright)] mb-6">{p.q}</p>

          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span className="mono text-[28px] tabular-nums"
                  style={{ color: secs > TARGET ? "var(--video)" : "var(--bright)" }}>
              {clock(secs)}
            </span>
            <button type="button" className="pill" onClick={() => setRunning(!running)}
                    style={running ? { color: "var(--video)", borderColor: "var(--video)" } : undefined}>
              {running ? "Stop" : secs ? "Resume" : "Start answering"}
            </button>
            <button type="button" className="pill" onClick={() => { setRunning(false); setSecs(0); }}>Reset</button>
            <span className="mono text-[10px] text-[var(--dim)]">aim for under {clock(TARGET)}</span>
          </div>

          {shown ? (
            <ol className="space-y-3 mb-6">
              {p.points.map((pt, n) => (
                <li key={n} className="flex gap-3">
                  <span className="mono text-[11px] pt-1" style={{ color: "var(--index)" }}>{n + 1}</span>
                  <p className="text-[15px] leading-relaxed text-[var(--body)]">{pt}</p>
                </li>
              ))}
            </ol>
          ) : (
            <button type="button" className="pill mb-6" style={{ color: "var(--bright)", borderColor: "var(--haze)" }}
                    onClick={() => { setShown(true); setRunning(false); }}>
              Show the points
            </button>
          )}

          <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--hairline)]">
            <button type="button" className="pill" onClick={() =>
              updateProgress((pr) => {
                const r = { ...pr.rehearsed };
                if (r[p.id]) delete r[p.id]; else r[p.id] = true;
                return { ...pr, rehearsed: r };
              })}>
              {progress.rehearsed[p.id] ? "Unmark practiced" : "Mark practiced"}
            </button>
            <button type="button" className="pill" onClick={random}>Random question →</button>
          </div>
        </div>

        <div>
          <div className="eyebrow mb-2">{done} of {prompts.length} practiced</div>
          <ol className="space-y-1">
            {list.map((x) => (
              <li key={x.id}>
                <button type="button" onClick={() => pick(x.id)} aria-current={x.id === id}
                        className="w-full text-left text-[13px] leading-snug px-2.5 py-2 rounded-[3px] transition-colors hover:bg-[var(--ink-2)]"
                        style={{
                          color: x.id === id ? "var(--bright)" : "var(--haze)",
                          background: x.id === id ? "var(--ink-2)" : undefined,
                        }}>
                  <span className="mr-1.5" style={{ color: progress.rehearsed[x.id] ? "var(--index)" : "var(--dim)" }}>
                    {progress.rehearsed[x.id] ? "●" : "○"}
                  </span>
                  {x.q}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
