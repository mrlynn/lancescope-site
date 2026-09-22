"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { TOPICS } from "@/app/lib/prep";
import TopicFilter, { topicsOf } from "@/app/components/prep/TopicFilter";
import { shuffled, updateProgress, useProgress } from "@/app/components/prep/progress";

type Card = { id: string; topic: string; q: string; a: string; competitorId?: string };

/** Flip, then say whether you had it. Keyboard: space flips, arrows move,
 *  1 is "again", 2 is "got it". */
export default function Flashcards({ cards }: { cards: readonly Card[] }) {
  const progress = useProgress();
  const [topic, setTopic] = useState<string | null>(null);
  const [onlyLeft, setOnlyLeft] = useState(false);
  const [order, setOrder] = useState<string[] | null>(null);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const { topics, counts } = useMemo(() => topicsOf(cards), [cards]);

  const deck = useMemo(() => {
    const base = order ? order.map((id) => cards.find((c) => c.id === id)!) : cards.slice();
    return base.filter((c) => (!topic || c.topic === topic) && (!onlyLeft || progress.cards[c.id] !== "known"));
  }, [cards, order, topic, onlyLeft, progress]);

  const at = deck.length ? Math.min(i, deck.length - 1) : 0;
  const card = deck[at];
  const inTopic = cards.filter((c) => !topic || c.topic === topic);
  const known = inTopic.filter((c) => progress.cards[c.id] === "known").length;

  const go = (d: number) => {
    setFlipped(false);
    setI(deck.length ? (at + d + deck.length) % deck.length : 0);
  };
  const mark = (m: "known" | "again") => {
    if (!card) return;
    updateProgress((p) => ({ ...p, cards: { ...p.cards, [card.id]: m } }));
    setFlipped(false);
    // In "not yet known" mode a card marked known leaves the deck, so the same
    // index already points at the next one.
    if (!(onlyLeft && m === "known")) setI(deck.length ? (at + 1) % deck.length : 0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // A focused button already answers space and enter with its own click.
      if (e.key === " " || e.key === "Enter") {
        if (t?.tagName === "BUTTON") return;
        e.preventDefault();
        setFlipped((f) => !f);
      }
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "1") mark("again");
      else if (e.key === "2") mark("known");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const reset = (fn: () => void) => { fn(); setI(0); setFlipped(false); };

  return (
    <div>
      <TopicFilter topics={topics} counts={counts} value={topic} onChange={(t) => reset(() => setTopic(t))} />
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button type="button" className="pill" aria-pressed={onlyLeft}
                onClick={() => reset(() => setOnlyLeft(!onlyLeft))}
                style={onlyLeft ? { color: "var(--video)", borderColor: "var(--video)" } : undefined}>
          Not yet known
        </button>
        <button type="button" className="pill" onClick={() => reset(() => setOrder(shuffled(cards.map((c) => c.id))))}>Shuffle</button>
        {order && <button type="button" className="pill" onClick={() => reset(() => setOrder(null))}>In order</button>}
        <span className="mono text-[11px] text-[var(--haze)] ml-auto">
          {known} of {inTopic.length} known
        </span>
      </div>

      <div className="h-1 rounded-full bg-[var(--ink-3)] mt-3 overflow-hidden">
        <div className="h-full transition-all" style={{ width: `${inTopic.length ? (known / inTopic.length) * 100 : 0}%`, background: "var(--index)" }} />
      </div>

      {card ? (
        <>
          <button type="button" onClick={() => setFlipped(!flipped)}
                  className="panel w-full min-h-[260px] mt-6 p-6 md:p-8 flex flex-col text-left hover:border-[var(--haze)] transition-colors"
                  style={flipped ? { borderColor: "var(--index)" } : undefined}
                  aria-label={flipped ? "Show question" : "Show answer"}>
            <div className="flex justify-between gap-3 w-full mono text-[10px] uppercase tracking-[0.14em] text-[var(--dim)]">
              <span>{TOPICS[card.topic] ?? card.topic}</span>
              <span>
                {progress.cards[card.id] === "known" && <span style={{ color: "var(--index)" }}>known · </span>}
                {progress.cards[card.id] === "again" && <span style={{ color: "var(--video)" }}>again · </span>}
                {at + 1} / {deck.length}
              </span>
            </div>
            <div className="flex-1 flex items-center py-6">
              <p className={`leading-snug ${flipped ? "text-[17px] text-[var(--body)]" : "text-[21px] md:text-[24px] font-bold text-[var(--bright)]"}`}>
                {flipped ? card.a : card.q}
              </p>
            </div>
            <div className="mono text-[10px] text-[var(--dim)]">
              {flipped ? card.q : "Tap or press space to flip"}
            </div>
          </button>

          {flipped && card.competitorId && (
            <Link href={`/prep/competitors/${card.competitorId}`}
                  className="inline-block mono text-[11px] mt-3 hover:underline" style={{ color: "var(--video)" }}>
              Read the full profile →
            </Link>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            <button type="button" className="pill" onClick={() => go(-1)}>← Prev</button>
            <button type="button" className="pill" onClick={() => mark("again")}
                    style={{ color: "var(--video)", borderColor: "rgb(var(--video-rgb) / 0.5)" }}>1 · Again</button>
            <button type="button" className="pill" onClick={() => mark("known")}
                    style={{ color: "var(--index)", borderColor: "rgb(var(--index-rgb) / 0.5)" }}>2 · Got it</button>
            <button type="button" className="pill" onClick={() => go(1)}>Next →</button>
          </div>
        </>
      ) : (
        <div className="panel p-8 mt-6 text-center">
          <p className="text-[16px] text-[var(--bright)] mb-3">Every card here is marked known.</p>
          <button type="button" className="pill" onClick={() => reset(() => setOnlyLeft(false))}>Show all</button>
        </div>
      )}

      <button type="button" className="mono text-[10px] text-[var(--dim)] hover:text-[var(--haze)] underline mt-10"
              onClick={() => { if (confirm("Clear flashcard progress in this browser?")) updateProgress((p) => ({ ...p, cards: {} })); }}>
        Clear card progress
      </button>
    </div>
  );
}
