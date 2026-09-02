/** The landing page.
 *
 *  One rule governs the order: every claim arrives as a number with a source, and
 *  the sections that show a measurement come before the sections that describe a
 *  feature. docs/guide/explain-cost.md sets the standard the page is held to —
 *  "that is hard to believe from a description and trivial to believe from a
 *  counter, so the counter is on screen."
 *
 *  A server component: the release lookup happens here, once, and the only client
 *  components below are the two that need state (the rail and the copy buttons).
 */
import AgentSection from "@/app/components/AgentSection";
import ByteRail from "@/app/components/ByteRail";
import Capabilities from "@/app/components/Capabilities";
import DemoSection from "@/app/components/DemoSection";
import DownloadButton from "@/app/components/DownloadButton";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Nav from "@/app/components/Nav";
import OpenVid from "@/app/components/OpenVid";
import RatioGrid from "@/app/components/RatioGrid";
import ReadOnly from "@/app/components/ReadOnly";
import Section from "@/app/components/Section";
import TwoNumbers from "@/app/components/TwoNumbers";
import { CORPUS, OPENVID, TWO_NUMBERS } from "@/app/data/measurements";
import { getLatestRelease } from "@/app/lib/release";

export default async function Home() {
  const release = await getLatestRelease();

  return (
    <>
      <Nav />
      <main>
        <Hero release={release} />

        <Section
          eyebrow="the instrument"
          title="Every read, with what it cost"
          lead={
            <>
              Six operations on the reference corpus — {CORPUS.moments.toLocaleString()} moments
              and {CORPUS.segments} segments across {CORPUS.talks} talks. The rail is
              logarithmic, because at this scale a proportional bar renders as
              nothing at all. Zero is not plotted: an operation that reads no video
              prints <span className="mono text-[var(--bright)]">NONE</span> rather
              than a bar of length zero, which would look like a small amount.
            </>
          }
        >
          <ByteRail />
        </Section>

        <Section
          eyebrow="the ratio"
          title={`${CORPUS.ratio} to 1`}
          lead="The same fact as area, for anyone who would rather glance than read."
          source={CORPUS.source}
        >
          <RatioGrid />
        </Section>

        <Section
          eyebrow="two true numbers"
          title="The manifest and the disk disagree, correctly"
          lead="This is a limitation of the format's own bookkeeping, and it is on the landing page because it is the reason the tool exists."
          source={TWO_NUMBERS.source}
        >
          <TwoNumbers />
        </Section>

        <Section
          eyebrow="someone else's data"
          title="The same claim, on a dataset this project did not build"
          lead="Point a fresh install at a public Hugging Face dataset and watch the counter. Nothing is downloaded — the URI is saved, not the corpus."
          source={OPENVID.source}
        >
          <OpenVid />
        </Section>

        <Section eyebrow="what it does" title="Four things, precisely">
          <Capabilities />
        </Section>

        <Section eyebrow="the write boundary" title="What it will and will not touch">
          <ReadOnly />
        </Section>

        <Section
          eyebrow="for agents"
          title="Point a model at it"
          lead="The same read-only surface over MCP, so an agent gets evidence instead of guesses."
        >
          <AgentSection />
        </Section>

        <Section eyebrow="also included">
          <DemoSection />
        </Section>

        <Section eyebrow="get it" title="Runs on your machine, against your data">
          <div className="panel p-6 md:p-8">
            <DownloadButton release={release} />
            <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-6 max-w-[60ch]">
              {release.resolved && "Signed and notarised. "}
              There is no telemetry and no account. It reaches the network in
              exactly three cases, all of them ones you asked for: a dataset you
              pointed it at over{" "}
              <code className="mono text-[12px]">hf://</code>, which it reads from
              huggingface.co; a language model, if you configured one; and this
              page, to find the current version.
            </p>
            <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-3">
              On an Intel Mac?{" "}
              <a
                href="https://github.com/mrlynn/lancescope/issues"
                className="text-[var(--video)] hover:underline"
              >
                Open an issue
              </a>{" "}
              — that is how the demand gets measured.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
