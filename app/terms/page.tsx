import type { Metadata } from "next";
import Prose, { A, H2, P, UL } from "@/app/components/Prose";

export const metadata: Metadata = {
  title: "Terms — LanceScope",
  description: "The licence the software is under, and what is and is not promised.",
};

export default function Terms() {
  return (
    <Prose
      title="Terms"
      updated="2 September 2026"
      lead="LanceScope is free, open-source software offered as-is by one person. Nothing here is sold, and nothing here is a service you depend on us to keep running."
    >
      <H2>The software</H2>
      <P>
        LanceScope is licensed under the{" "}
        <A href="https://www.apache.org/licenses/LICENSE-2.0">Apache License 2.0</A>.
        That licence, not this page, governs your use of the code: you may use,
        modify and redistribute it under its terms, including commercially. The
        authoritative copy ships in the repository as{" "}
        <code className="mono text-[13px]">LICENSE</code>.
      </P>
      <P>
        As Apache-2.0 says at more length: the software is provided on an &ldquo;AS
        IS&rdquo; basis, without warranties or conditions of any kind, and the
        contributors are not liable for damages arising from its use.
      </P>

      <H2>What that means in practice</H2>
      <UL>
        <li>
          It reads your data. It is built so that browsing cannot modify a table, and
          that is enforced by tests rather than by intention — but it is still
          software, and you should keep backups of anything you care about.
        </li>
        <li>
          Its one write path creates new tables from files you point it at. It
          refuses a destination that already exists, and deletes a table only when
          you explicitly ask it to.
        </li>
        <li>
          The optional language layer sends what you ask it to send to whichever
          model you configured. If that is a hosted API, their terms and their
          pricing apply, and the cost is yours.
        </li>
        <li>
          There is no support commitment, no service level, and no guarantee that any
          release will be maintained.
        </li>
      </UL>

      <H2>This website</H2>
      <P>
        The measurements published here were taken on specific data on specific
        dates, and each one says which. They describe how Lance behaved for that
        dataset; they are not a promise about how it will behave for yours. If a
        figure here does not match what you measure, please{" "}
        <A href="https://github.com/mrlynn/lancescope-site/issues">say so</A> — that
        is a bug in the page.
      </P>
      <P>
        The site may change or disappear. Links to third-party sites are not
        endorsements, and their contents are not ours.
      </P>

      <H2>Not affiliated</H2>
      <P>
        LanceScope is an independent project. It is not affiliated with, endorsed by,
        sponsored by, or supported by LanceDB. See{" "}
        <A href="/attribution">Attribution</A> for the trademark and copyright
        position.
      </P>
    </Prose>
  );
}
