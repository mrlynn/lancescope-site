import type { Metadata } from "next";
import Prose, { A, H2, P, UL } from "@/app/components/Prose";

export const metadata: Metadata = {
  title: "Attribution — LanceScope",
  description: "Whose trademarks, whose copyright, and what this project does and does not claim.",
};

export default function Attribution() {
  return (
    <Prose
      title="Attribution"
      updated="2 September 2026"
      lead="LanceScope is a tool for looking at somebody else's file format. That means a good deal of what you see here belongs to other people, and this page says exactly which parts and to whom."
    >
      <H2>LanceDB and Lance</H2>
      <P>
        <strong className="text-[var(--bright)]">LanceDB</strong> and{" "}
        <strong className="text-[var(--bright)]">Lance</strong>, the names, the logos,
        the wordmark, the product and the file format, are the property of their
        owner, LanceDB Inc. and its contributors. All rights in them are theirs. This
        project claims no ownership of, or rights in, any of it.
      </P>
      <P>
        The names are used here descriptively — to say truthfully what this tool
        works with — and not as a badge of origin. That is nominative use, and it is
        not a claim of association. LanceScope is an independent project. It is{" "}
        <strong className="text-[var(--bright)]">
          not affiliated with, endorsed by, sponsored by, or supported by LanceDB
        </strong>
        . Please do not contact them about it.
      </P>
      <P>
        Lance itself is open source under Apache-2.0. Their documentation is at{" "}
        <A href="https://docs.lancedb.com">docs.lancedb.com</A> and the format lives
        at <A href="https://github.com/lancedb/lance">github.com/lancedb/lance</A>.
        Several statements on this site about how blob columns are stored are
        theirs, and are cited where they appear.
      </P>

      <H2>The mark</H2>
      <P>
        The LanceScope mark is a deliberate derivative of the LanceDB mark: it uses
        the same four-by-four dot lattice, cell for cell. The magnifying glass over
        the corner cell is the only part that is ours. It is drawn this way as an
        acknowledgement rather than a disguise — a tool for reading Lance data should
        look like it belongs to that world, and pretending the resemblance is
        accidental would be worse than saying so plainly.
      </P>
      <P>
        The underlying lattice remains LanceDB&rsquo;s design. If LanceDB would
        prefer it not be used this way, it will be changed on request.
      </P>

      <H2>The demo corpus</H2>
      <P>
        The &ldquo;Ctrl-F for Video&rdquo; demo is built from{" "}
        <A href="https://fosdem.org">FOSDEM</A> 2025 conference recordings, published
        by FOSDEM and their speakers under{" "}
        <A href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</A>. Credit
        for those talks belongs to the speakers who gave them and to FOSDEM for
        recording and releasing them. They are used here under that licence; no
        video is redistributed by this website.
      </P>

      <H2>Typefaces</H2>
      <UL>
        <li>
          <A href="https://fonts.google.com/specimen/Schibsted+Grotesk">Schibsted Grotesk</A>{" "}
          and <A href="https://fonts.google.com/specimen/Martian+Mono">Martian Mono</A>,
          both under the SIL Open Font License. They stand in for LanceDB&rsquo;s own
          Aeonik Pro and Aeonik Fono, which are licensed commercially and are not
          used here.
        </li>
      </UL>

      <H2>LanceScope</H2>
      <P>
        Copyright 2026 Michael Lynn, licensed under Apache-2.0. That covers the
        application, this website, and the mark&rsquo;s original elements — not the
        LanceDB lattice it derives from, and not the FOSDEM recordings.
      </P>
      <P>
        Something on this page wrong, or a rights holder who would like something
        changed or removed:{" "}
        <A href="https://github.com/mrlynn/lancescope-site/issues">open an issue</A>{" "}
        and it will be dealt with promptly.
      </P>
    </Prose>
  );
}
