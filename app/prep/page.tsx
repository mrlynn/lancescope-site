import Link from "next/link";
import Head, { H2, Say } from "@/app/components/prep/Head";
import { notes } from "@/content/prep/notes";
import { notesExtra } from "@/content/prep/notes-extra";
import { why } from "@/content/prep/why";
import { allCards as cards, allCompetitors, allQuiz as quiz, allRehearse as rehearse, allSources } from "@/app/lib/prep";
import { ask } from "@/content/prep/ask";
import { askExtra } from "@/content/prep/ask-extra";
import { competitorsExtra } from "@/content/prep/competitors-extra";
import { marketExtra } from "@/content/prep/market-extra";
import { proofExtra } from "@/content/prep/proof-extra";
import { takeaways } from "@/content/prep/overview-extra";

const STEPS = [
  { href: "/prep/why", title: "Why AI needs all four", text: "Scans, random access, wide blobs and growing columns, traced through one table's year, with a backfill calculator and which rivals cover each need." },
  { href: "/prep/stack", title: "Stack explorer", text: "Five layers, analytics stack against Lance stack, where the 2026 rivals sit on each, and the Iceberg metadata tree next to Lance's." },
  { href: "/prep/market", title: "Market map and proof", text: `Where everyone sits, including ${marketExtra.length} points added for 2026, plus customer evidence and ${proofExtra.length} third-party projects that support Lance.` },
  { href: "/prep/competitors", title: "Competitors", text: `${allCompetitors.length} rivals and neighbours, ${competitorsExtra.length} of them added in September 2026, each with a full profile, and most rated against the four needs.` },
  { href: "/prep/notes", title: "Briefing notes", text: `${notes.length + notesExtra.length} notes: the thesis, the room, the Iceberg question, your edge, and ${notesExtra.length} on how the rivals moved in 2026.` },
  { href: "/prep/cards", title: "Flashcards", text: `${cards.length} cards across every topic, filterable by topic, with competitor cards linking to their profiles. Progress is kept in this browser.` },
  { href: "/prep/quiz", title: "Quiz", text: `${quiz.length} multiple-choice questions with the reasoning behind each answer, and answer options shown in a shuffled order.` },
  { href: "/prep/rehearse", title: "Rehearse", text: `${rehearse.length} questions to answer out loud against a clock, including one for every new competitor, then check your points.` },
  { href: "/prep/ask", title: "Questions to ask Chang", text: `${ask.length + askExtra.length} questions that show the homework, including ${askExtra.length} on the new competitors.` },
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

      <H2 id="changed">What changed in 2026</H2>
      <p className="text-[13px] text-[var(--haze)] mb-5 max-w-[64ch]">
        The competitive landscape from the September 2026 research, in six lines. Each links to
        where it&rsquo;s covered in depth.
      </p>
      <ul className="grid sm:grid-cols-2 gap-3">
        {takeaways.map((t) => (
          <li key={t.id}>
            <Link href={t.href} className="panel block h-full p-4 hover:border-[var(--haze)] transition-colors">
              <div className="text-[14.5px] font-bold text-[var(--bright)] mb-1">{t.title}</div>
              <p className="text-[13px] leading-relaxed text-[var(--body)]">{t.text}</p>
            </Link>
          </li>
        ))}
      </ul>

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
