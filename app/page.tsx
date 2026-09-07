/** The landing page.
 *
 *  It is about the app. That sounds obvious and the previous version was not: it
 *  opened with a property of the Lance format, spent its first four sections proving
 *  that property, and reached "what it does" in section five. Everything on it was
 *  true and sourced, and a reader could finish it having learned something
 *  interesting about LanceDB and very little about the thing the button downloads.
 *
 *  So the order is now: what it is, the six things it does with a picture of each,
 *  the screen for a training run, where the model is and is not, the agent surface,
 *  where a database can live — and only then the measurements, which have become
 *  evidence for the tool's claims rather than the claims themselves.
 *
 *  The one rule survives the reordering: every number arrives with a source, and the
 *  screenshots are captioned with what the read on them cost. A page arguing that a
 *  counter beats a description cannot make its own case from adjectives.
 *
 *  A server component: the release lookup happens here, once, and the only client
 *  components below are the rail and the copy buttons.
 */
import AgentSection from "@/app/components/AgentSection";
import ByteRail from "@/app/components/ByteRail";
import Connections from "@/app/components/Connections";
import DemoSection from "@/app/components/DemoSection";
import DownloadButton from "@/app/components/DownloadButton";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Intelligence from "@/app/components/Intelligence";
import Nav from "@/app/components/Nav";
import RatioGrid from "@/app/components/RatioGrid";
import ReadOnly from "@/app/components/ReadOnly";
import Section from "@/app/components/Section";
import BuildFromSource from "@/app/components/BuildFromSource";
import Tour from "@/app/components/Tour";
import Training from "@/app/components/Training";
import TryItLive from "@/app/components/TryItLive";
import TwoNumbers from "@/app/components/TwoNumbers";
import {
  CHECK_QUOTE,
  CORPUS,
  INTELLIGENCE,
  MCP_SOURCE,
  STORES_SOURCE,
  TRAINING,
  TWO_NUMBERS,
  QUERY,
} from "@/app/data/measurements";
import { getLatestRelease } from "@/app/lib/release";

export default async function Home() {
  const release = await getLatestRelease();

  return (
    <>
      <Nav />
      <main>
        <Hero release={release} />

        <Section
          eyebrow="what it does"
          title="Six things, precisely"
          lead={
            <>
              LanceDB gives you a format and an engine. Neither of them has a face.
              These are the six things this puts in front of one — each on a screen,
              each printing what it spent, and none of them asking you to take a
              number on trust.
            </>
          }
          id="what"
          source={`${QUERY.source} ${CHECK_QUOTE.source}`}
        >
          <Tour />
        </Section>

        <Section
          eyebrow="for a training run"
          title="What a table’s shape costs you before the maths starts"
          lead={
            <>
              The part of a training run that is taking too long is usually not the
              maths. It is the loop before it — assembling a dataset, looking at it,
              deciding whether it is any good, and discovering three hours in that
              your retrieval eval is scanning every vector you own. There is a screen
              for that, and it answers four questions from metadata alone.
            </>
          }
          id="training"
          source={TRAINING.source}
        >
          <Training />
        </Section>

        <Section
          eyebrow="the model, and the absence of one"
          title="Which answers were computed, and which were generated"
          lead={
            <>
              Both kinds are here and they are labelled. The findings, the byte
              counters, the access paths and the training figures are derived — no
              model, no tokens, and they work with nothing configured. The language
              layer is a separate, optional thing that you press, and every response
              it gives comes back with what it cost and what left the machine to get
              it.
            </>
          }
          id="intelligence"
          source={INTELLIGENCE.source}
        >
          <Intelligence />
        </Section>

        <Section
          eyebrow="for agents"
          title="Point a model at it"
          lead="The same read-only surface over MCP, so an agent works from evidence instead of guesses. There is no key of ours in this and no model of ours in the loop: the intelligence is your agent's, the numbers are the console's."
          source={MCP_SOURCE}
        >
          <AgentSection />
        </Section>

        <Section
          eyebrow="wherever it lives"
          title="A folder, a bucket, a Hub repo, or LanceDB Cloud"
          lead="The same screens and the same byte counts, whatever the database is sitting on. Nothing is downloaded to look at a remote one — the URI is saved, not the corpus."
          id="connect"
          source={`${STORES_SOURCE} ${CORPUS.source}`}
        >
          <Connections />
        </Section>

        {/* The measurements, kept — but after the product rather than in front of it.
            They are why the screens above can print a number at all, and they are the
            page's own evidence that the numbers on those screens mean something. */}
        <Section
          eyebrow="why every screen carries a number"
          title="Six operations, and what each of them read"
          lead={
            <>
              The reference corpus is {CORPUS.moments.toLocaleString()} moments and{" "}
              {CORPUS.segments} segments across {CORPUS.talks} talks. The rail is
              logarithmic, because at this scale a proportional bar renders as nothing
              at all. Zero is not plotted: an operation that reads no video prints{" "}
              <span className="mono text-[var(--bright)]">NONE</span> rather than a bar
              of length zero, which would look like a small amount.
            </>
          }
          id="cost"
        >
          <ByteRail />
          <div className="mt-14">
            <div className="eyebrow mb-3">the same fact as area</div>
            <RatioGrid />
          </div>
        </Section>

        <Section
          eyebrow="the limitation that made the tool"
          title="The manifest and the disk disagree, correctly"
          lead="Two numbers, both true, answering different questions — and a tool that merged them into one would be lying to you. This is on the landing page because it is the reason the thing exists."
          source={TWO_NUMBERS.source}
        >
          <TwoNumbers />
        </Section>

        <Section eyebrow="the write boundary" title="What it will and will not touch">
          <ReadOnly />
        </Section>

        <Section eyebrow="also included">
          <DemoSection />
        </Section>

        {/* Before "get it" rather than after: someone deciding whether to download
            a 160 MB DMG is better served by looking at the thing first. */}
        <Section eyebrow="try it" title="Or look at one first, in a browser" id="try">
          <TryItLive />
        </Section>

        <Section eyebrow="get it" title="Runs on your machine, against your data" id="get">
          {!release.resolved && <BuildFromSource />}
          {release.resolved && (
            <div className="panel p-6 md:p-8">
              <DownloadButton release={release} />
              <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-6 max-w-[60ch]">
                {release.resolved && "Signed and notarised. "}
                There is no telemetry and no account. It reaches the network in four
                cases: a dataset you pointed it at over{" "}
                <code className="mono text-[12px]">hf://</code>, which it reads from
                huggingface.co; a language model, if you configured one; this page, to
                find the current version; and once a day on launch, to ask GitHub
                whether there is a newer release. That last one is the only request it
                makes without being asked, it sends nothing but the request itself, and
                it never installs anything — it tells you, and the button opens the
                release page.
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
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
