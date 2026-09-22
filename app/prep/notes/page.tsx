import type { Metadata } from "next";
import Link from "next/link";
import Head, { H2, P } from "@/app/components/prep/Head";
import SourceLinks from "@/app/components/prep/SourceLinks";
import { competitorById } from "@/app/lib/prep";
import { notes } from "@/content/prep/notes";
import { notesExtra } from "@/content/prep/notes-extra";
import type { NoteItem } from "@/content/prep/types";

export const metadata: Metadata = { title: "Briefing · Prep" };

function Note({ n }: { n: NoteItem }) {
  const profiles = (n.competitorIds ?? []).flatMap((id) => {
    const c = competitorById(id);
    return c ? [c] : [];
  });
  return (
    <section>
      <H2 id={n.id}>{n.title}</H2>
      {n.paragraphs.map((p, i) => <P key={i}>{p}</P>)}
      {profiles.length > 0 && (
        <p className="mono text-[10px] leading-relaxed text-[var(--dim)] mb-2">
          <span className="uppercase tracking-[0.14em] mr-2">Profiles</span>
          {profiles.map((c, i) => (
            <span key={c.id}>
              {i > 0 && <span className="mx-1.5">·</span>}
              <Link href={`/prep/competitors/${c.id}`}
                    className="text-[var(--video)] hover:underline underline-offset-2">{c.name}</Link>
            </span>
          ))}
        </p>
      )}
      <SourceLinks ids={n.sourceIds} />
    </section>
  );
}

export default function Notes() {
  return (
    <>
      <Head eyebrow="Briefing notes" title="What to know walking in" />
      <nav aria-label="Notes" className="flex flex-wrap gap-2 mb-4">
        {[...notes, ...notesExtra].map((n) => (
          <a key={n.id} href={`#${n.id}`} className="chip chip-wrap hover:text-[var(--bright)]">{n.title}</a>
        ))}
      </nav>
      {notes.map((n) => <Note key={n.id} n={n} />)}

      <div className="mt-20 pt-8 border-t border-[var(--hairline)]">
        <div className="eyebrow mb-2">The competitive landscape</div>
        <p className="text-[13px] text-[var(--haze)] max-w-[64ch]">
          What changed among the rivals in 2026, by theme. Researched September 2026; each note links
          to the full profiles.
        </p>
      </div>
      {notesExtra.map((n) => <Note key={n.id} n={n} />)}
    </>
  );
}
