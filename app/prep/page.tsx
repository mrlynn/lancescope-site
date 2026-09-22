import Link from "next/link";
import Head, { H2, Say } from "@/app/components/prep/Head";
import { notes } from "@/content/prep/notes";
import { why } from "@/content/prep/why";
import { allCards as cards, allCompetitors, allQuiz as quiz, allRehearse as rehearse, allSources } from "@/app/lib/prep";
import { ask } from "@/content/prep/ask";

const STEPS = [
  { href: "/prep/why", title: "Why AI needs all four", text: "Scans, random access, wide blobs and growing columns, traced through one table's year, with a backfill calculator." },
  { href: "/prep/stack", title: "Stack explorer", text: "Five layers, analytics stack against Lance stack, and the Iceberg metadata tree next to Lance's." },
  { href: "/prep/market", title: "Market map and proof", text: "Where everyone sits, and the customer and benchmark evidence to quote." },
  { href: "/prep/competitors", title: "Competitors", text: `${allCompetitors.length} rivals and neighbours, threat-rated, each with a full profile.` },
  { href: "/prep/notes", title: "Briefing notes", text: `${notes.length} notes: the thesis, the room, the Iceberg question and your edge.` },
  { href: "/prep/cards", title: "Flashcards", text: `${cards.length} cards across every topic. Progress is kept in this browser.` },
  { href: "/prep/quiz", title: "Quiz", text: `${quiz.length} multiple-choice questions with the reasoning behind each answer.` },
  { href: "/prep/rehearse", title: "Rehearse", text: `${rehearse.length} questions to answer out loud against a clock, then check your points.` },
  { href: "/prep/ask", title: "Questions to ask Chang", text: `${ask.length} questions that show the homework.` },
  { href: "/prep/sources", title: "Sources", text: `${allSources.length} sources, each with what cites it.` },
];

export default function PrepHome() {
  const thesis = notes.find((n) => n.id === "thesis")!;
  return (
    <>
      <Head
        eyebrow="LanceDB interview prep"
        title="Lance, LanceDB and the market around them"
        lead="A study kit for Lance and LanceDB: the format, the business, the competition and the answers worth having ready. Research is current as of September 2026."
      />

      <Say label="The thesis">{thesis.paragraphs[0]}</Say>
      <p className="text-[13px] text-[var(--haze)] max-w-[64ch]">{thesis.paragraphs[1]}</p>

      <Say label="In thirty seconds">{why.thirtySeconds}</Say>

      <H2>Study path</H2>
      <ol className="grid sm:grid-cols-2 gap-3">
        {STEPS.map((s, i) => (
          <li key={s.href}>
            <Link href={s.href}
                  className="panel block h-full p-4 hover:border-[var(--haze)] transition-colors">
              <div className="mono text-[10px] text-[var(--dim)] mb-1">{String(i + 1).padStart(2, "0")}</div>
              <div className="text-[15px] font-bold text-[var(--bright)] mb-1">{s.title}</div>
              <p className="text-[13px] leading-relaxed text-[var(--body)]">{s.text}</p>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
