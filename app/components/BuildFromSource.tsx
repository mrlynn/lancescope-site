/** What the page offers when there is no release to download.
 *
 *  A download button pointing at an empty releases page is worse than no button:
 *  it spends the reader's interest and returns nothing. Until a signed build is
 *  published, the honest offer is the one that actually works today — clone it and
 *  run it — and it is a better offer than it sounds, because the console is the
 *  part worth seeing and it needs no packaging at all.
 */
import CopyLine from "@/app/components/CopyLine";
import { REPO } from "@/app/data/measurements";

export default function BuildFromSource() {
  return (
    <div className="panel p-6 md:p-8">
      <div className="eyebrow mb-3">no signed build published yet</div>
      <h3 className="text-[19px] font-bold tracking-tight text-[var(--bright)] mb-3">
        Run it from source — about five minutes
      </h3>
      <p className="text-[14px] leading-relaxed text-[var(--body)] max-w-[62ch] mb-6">
        The macOS app is a packaging of the same console you can run directly. Until
        it is signed, notarised and published, this is the whole thing, and nothing
        is missing from it.
      </p>

      <div className="space-y-2.5">
        <CopyLine text={`git clone ${REPO} && cd lancescope`} label="1" />
        <CopyLine text="make setup" label="2" />
        <CopyLine text="make dev" label="3" />
      </div>

      <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-5 max-w-[62ch]">
        Then open <code className="mono text-[12px]">localhost:3000/console</code> and
        point it at any directory holding <code className="mono text-[12px]">.lance</code>{" "}
        tables — or paste the OpenVid URI above and read someone else&rsquo;s, over
        the network, without downloading it. Needs{" "}
        <a href="https://docs.astral.sh/uv/" className="text-[var(--video)] hover:underline">uv</a>{" "}
        and Node.
      </p>

      <div className="mt-6 pt-6 border-t border-[var(--hairline)]">
        <p className="text-[13px] leading-relaxed text-[var(--haze)] max-w-[62ch] mb-3">
          To build the macOS app yourself — a window that starts and stops its own
          server, with nothing to install afterwards. Additionally needs Rust.
        </p>
        <CopyLine text="make app" label="app" />
      </div>

      <p className="text-[12px] leading-relaxed text-[var(--dim)] mt-6 max-w-[62ch]">
        A signed, notarised DMG is the next thing to ship. It is built by a tagged
        release workflow rather than by hand, so when it lands it will be
        reproducible and the button above this will change to point at it.
      </p>
    </div>
  );
}
