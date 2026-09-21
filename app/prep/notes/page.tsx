import type { Metadata } from "next";
import Head, { H2, P } from "@/app/components/prep/Head";
import SourceLinks from "@/app/components/prep/SourceLinks";
import { notes } from "@/content/prep/notes";

export const metadata: Metadata = { title: "Briefing · Prep" };

export default function Notes() {
  return (
    <>
      <Head eyebrow="Briefing notes" title="What to know walking in" />
      <nav aria-label="Notes" className="flex flex-wrap gap-2 mb-4">
        {notes.map((n) => (
          <a key={n.id} href={`#${n.id}`} className="chip hover:text-[var(--bright)]">{n.title}</a>
        ))}
      </nav>
      {notes.map((n) => (
        <section key={n.id}>
          <H2 id={n.id}>{n.title}</H2>
          {n.paragraphs.map((p, i) => <P key={i}>{p}</P>)}
          <SourceLinks ids={"sourceIds" in n ? n.sourceIds : undefined} />
        </section>
      ))}
    </>
  );
}
