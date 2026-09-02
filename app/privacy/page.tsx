import type { Metadata } from "next";
import Prose, { A, H2, P, UL } from "@/app/components/Prose";

export const metadata: Metadata = {
  title: "Privacy — LanceScope",
  description: "What this site collects, which is almost nothing, and what the app collects, which is nothing.",
};

export default function Privacy() {
  return (
    <Prose
      title="Privacy"
      updated="2 September 2026"
      lead="Two different things are worth separating: this website, and the LanceScope app you might download from it. Neither collects anything about you, and the reasons are slightly different."
    >
      <H2>This website</H2>
      <P>
        There is no analytics, no tag manager, no tracking pixel, no advertising
        network and no A/B testing. No cookies are set. Nothing on this site tries
        to work out who you are or whether you have been here before.
      </P>
      <P>
        Your browser makes no third-party requests while reading this page. The two
        typefaces are served from this domain rather than from Google, so visiting
        does not tell Google you were here.
      </P>

      <H2>The one thing stored on your device</H2>
      <P>
        If you use the light/dark control in the header, your choice is written to{" "}
        <code className="mono text-[13px]">localStorage</code> under the key{" "}
        <code className="mono text-[13px]">lancescope-theme</code>. It stays in your
        browser, is never transmitted, and choosing &ldquo;Follow the system&rdquo;
        deletes it. Clearing site data removes it. That is the only thing this site
        stores.
      </P>

      <H2>What the server unavoidably sees</H2>
      <P>
        The site is hosted on Vercel, which keeps ordinary request logs — the sort
        every web server keeps, including IP address, user agent, and the page
        requested. Those logs are Vercel&rsquo;s, retained under their policy, and
        they are not read, exported, joined to anything, or used to build a profile.
        See <A href="https://vercel.com/legal/privacy-policy">Vercel&rsquo;s privacy policy</A>.
      </P>
      <P>
        To show the current version, this site asks GitHub&rsquo;s public API for the
        latest release. That request is made by the server, once an hour, not by your
        browser. Clicking a download or GitHub link does take you to GitHub, at which
        point their policies apply.
      </P>

      <H2>The app</H2>
      <P>
        LanceScope runs on your machine and reads your data. It has no account, no
        sign-in, no licence check and no telemetry — nothing reports back to anyone,
        including us. It makes network requests in exactly three cases, all of which
        you initiate:
      </P>
      <UL>
        <li>
          A dataset you point it at over <code className="mono text-[13px]">hf://</code>,
          which it reads from huggingface.co.
        </li>
        <li>
          A language model, if you configure one — either a local model, or an API
          you supply a key for. Nothing is sent to a model unless you turn that layer
          on.
        </li>
        <li>Downloading the app itself, from GitHub.</li>
      </UL>
      <P>
        Your database contents, file paths, queries and settings stay on your
        machine. The only file the app writes for itself is its own settings file, in
        your user config directory.
      </P>

      <H2>Contact</H2>
      <P>
        Questions, or something here that looks wrong:{" "}
        <A href="https://github.com/mrlynn/lancescope-site/issues">open an issue</A>.
      </P>
    </Prose>
  );
}
