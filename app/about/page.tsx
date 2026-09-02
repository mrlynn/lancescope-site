import type { Metadata } from "next";
import Prose, { A, H2, P } from "@/app/components/Prose";

export const metadata: Metadata = {
  title: "About — LanceScope",
  description: "Who built LanceScope, and why.",
};

export default function About() {
  return (
    <Prose
      title="About"
      lead="LanceScope is built by one person, in the open, because a demo raised a question that none of the tools on hand could answer."
    >
      <H2>Who</H2>
      <P>
        I&rsquo;m Michael Lynn. I&rsquo;m an AI Adoption Engineer at Cursor, based in
        the Philadelphia area, and I&rsquo;ve spent about fifteen years helping
        developers adopt modern data platforms and, more recently, AI-native tooling
        — mostly through talks, workshops, and open-source projects people can pull
        apart and learn from. A couple of hundred talks in, the thing I still care
        most about is turning a dense idea into something you can actually run.
      </P>

      <H2>Why this exists</H2>
      <P>
        It started as a conference demo. The claim was that a Lance table could hold
        a corpus of video and its search index in the same table, and that searching
        the whole thing would read none of the video. That is a strange claim, and
        the honest reaction to it is disbelief.
      </P>
      <P>
        The problem was proving it. I could describe the architecture, but describing
        it is exactly what makes people suspicious. What settled it was putting a
        byte counter on screen and letting the number speak: a search reads three and
        a half megabytes of index and zero bytes of video, and you can watch it
        happen.
      </P>
      <P>
        Once the counter existed, it turned out to be more interesting than the demo.
        Most tools show you rows. Very few show you what the rows cost, and none of
        them knew about the thing that makes Lance unusual — that the bytes a search
        touches and the bytes a table holds are in different files. So the instrument
        built for one talk became the product, and the talk became a page inside it.
      </P>

      <H2>What I&rsquo;m trying to get right</H2>
      <P>
        Every number this tool shows comes from a counter, not an estimate, and it
        says where it came from. When two measurements of the same table disagree —
        and they do, because a Lance manifest cannot see blob side files — it shows
        both and explains which question each one answers. A tool that quietly picked
        one would be easier to build and worse to trust.
      </P>
      <P>
        The same rule governs this site. Every figure on the home page was measured,
        on a named dataset, on a stated date. If one of them does not reproduce for
        you, that is a bug and I would like to know.
      </P>

      <H2>Elsewhere</H2>
      <P>
        <A href="https://mlynn.org">mlynn.org</A> ·{" "}
        <A href="https://www.linkedin.com/in/mlynn">linkedin.com/in/mlynn</A> ·{" "}
        <A href="https://github.com/mrlynn">github.com/mrlynn</A>
      </P>
    </Prose>
  );
}
