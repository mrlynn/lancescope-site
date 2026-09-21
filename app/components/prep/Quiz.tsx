"use client";

import { useMemo, useState } from "react";
import { TOPICS } from "@/app/lib/prep";
import TopicFilter, { topicsOf } from "@/app/components/prep/TopicFilter";
import { shuffled } from "@/app/components/prep/progress";

type Question = { id: string; topic: string; q: string; options: readonly string[]; answer: number; why: string };

/** One question at a time. Options stay in the order written, because `answer`
 *  indexes into them. */
export default function Quiz({ questions }: { questions: readonly Question[] }) {
  const { topics, counts } = useMemo(() => topicsOf(questions), [questions]);
  const byId = useMemo(() => new Map(questions.map((q) => [q.id, q])), [questions]);

  const [topic, setTopic] = useState<string | null>(null);
  const [deck, setDeck] = useState<string[]>(() => questions.map((q) => q.id));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  const [missed, setMissed] = useState<string[]>([]);

  const start = (ids: string[]) => {
    setDeck(ids);
    setI(0);
    setPicked(null);
    setRight(0);
    setMissed([]);
  };
  const forTopic = (t: string | null) => questions.filter((q) => !t || q.topic === t).map((q) => q.id);

  const done = i >= deck.length;
  const q = done ? null : byId.get(deck[i])!;

  const choose = (n: number) => {
    if (picked !== null || !q) return;
    setPicked(n);
    if (n === q.answer) setRight((r) => r + 1);
    else setMissed((m) => [...m, q.id]);
  };

  return (
    <div>
      <TopicFilter topics={topics} counts={counts} value={topic}
                   onChange={(t) => { setTopic(t); start(forTopic(t)); }} />
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button type="button" className="pill" onClick={() => start(shuffled(forTopic(topic)))}>Shuffle and restart</button>
        <button type="button" className="pill" onClick={() => start(forTopic(topic))}>Restart in order</button>
        <span className="mono text-[11px] text-[var(--haze)] ml-auto">
          {right} right · {missed.length} missed · {Math.min(i + (picked !== null ? 1 : 0), deck.length)} / {deck.length}
        </span>
      </div>

      {q && (
        <div className="panel p-6 md:p-8 mt-6">
          <div className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--dim)] mb-3">
            {TOPICS[q.topic] ?? q.topic} · {i + 1} of {deck.length}
          </div>
          <p className="text-[19px] md:text-[21px] font-bold leading-snug text-[var(--bright)] mb-6">{q.q}</p>
          <ol className="space-y-2">
            {q.options.map((o, n) => {
              const isAnswer = picked !== null && n === q.answer;
              const isWrongPick = picked === n && n !== q.answer;
              return (
                <li key={n}>
                  <button type="button" onClick={() => choose(n)} disabled={picked !== null}
                          className="w-full text-left rounded-[4px] border px-4 py-3 text-[14.5px] leading-snug transition-colors
                                     enabled:hover:border-[var(--haze)] disabled:cursor-default"
                          style={{
                            borderColor: isAnswer ? "var(--index)" : isWrongPick ? "var(--video)" : "var(--rule)",
                            background: isAnswer ? "rgb(var(--index-rgb) / 0.1)" : isWrongPick ? "rgb(var(--video-rgb) / 0.1)" : undefined,
                            color: picked !== null && !isAnswer && !isWrongPick ? "var(--haze)" : "var(--bright)",
                          }}>
                    <span className="mono text-[11px] text-[var(--dim)] mr-3">{"ABCD"[n] ?? n + 1}</span>
                    {o}
                  </button>
                </li>
              );
            })}
          </ol>
          {picked !== null && (
            <div className="mt-6">
              <p className="text-[14px] font-semibold mb-1.5"
                 style={{ color: picked === q.answer ? "var(--index)" : "var(--video)" }}>
                {picked === q.answer ? "Right." : "Not quite."}
              </p>
              <p className="text-[14px] leading-relaxed text-[var(--body)] max-w-[68ch]">{q.why}</p>
              <button type="button" className="pill mt-5"
                      style={{ color: "var(--bright)", borderColor: "var(--haze)" }}
                      onClick={() => { setI(i + 1); setPicked(null); }}>
                {i + 1 < deck.length ? "Next question →" : "See score →"}
              </button>
            </div>
          )}
        </div>
      )}

      {done && (
        <div className="panel p-6 md:p-8 mt-6">
          <div className="eyebrow mb-2">Score</div>
          <p className="mono text-[34px] text-[var(--bright)] mb-1">{right} / {deck.length}</p>
          <p className="text-[13px] text-[var(--haze)] mb-6">
            {deck.length ? `${Math.round((right / deck.length) * 100)}%` : ""}
          </p>
          {missed.length > 0 && (
            <>
              <div className="eyebrow mb-3">Missed</div>
              <ul className="space-y-3 mb-6">
                {missed.map((id) => {
                  const m = byId.get(id)!;
                  return (
                    <li key={id} className="border-l-2 pl-3" style={{ borderColor: "var(--video)" }}>
                      <p className="text-[14px] font-semibold text-[var(--bright)]">{m.q}</p>
                      <p className="text-[13.5px] text-[var(--index)] mt-0.5">{m.options[m.answer]}</p>
                      <p className="text-[13px] text-[var(--body)] mt-0.5">{m.why}</p>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          <div className="flex flex-wrap gap-2">
            {missed.length > 0 && (
              <button type="button" className="pill" style={{ color: "var(--video)", borderColor: "var(--video)" }}
                      onClick={() => start(shuffled(missed))}>Retry the {missed.length} missed</button>
            )}
            <button type="button" className="pill" onClick={() => start(shuffled(forTopic(topic)))}>Go again, shuffled</button>
          </div>
        </div>
      )}
    </div>
  );
}
