/** Where the database is, and why that is a capability rather than a checkbox.
 *
 *  A Lance table is a directory, which means "open a database" is really "resolve a
 *  URI, then read manifests over whatever protocol that implies". The console does
 *  the same thing over all of them and reports the same byte counts, so the numbers
 *  on every other section of this page survive the database not being on your disk.
 *
 *  The OpenVid figures are the proof, and they are here rather than in a section of
 *  their own because a remote read is the claim they are evidence for.
 */
import CopyLine from "@/app/components/CopyLine";
import Shot from "@/app/components/Shot";
import { OPENVID, SHOTS, STORES } from "@/app/data/measurements";

export default function Connections() {
  return (
    <>
      <div className="panel divide-y divide-[var(--hairline)]">
        {STORES.map((s) => (
          <div
            key={s.label}
            className="flex flex-col sm:flex-row sm:items-baseline gap-x-5 gap-y-1 px-5 py-3.5"
          >
            <code className="mono text-[13px] text-[var(--bright)] sm:w-[10rem] shrink-0">
              {s.label}
            </code>
            <span className="text-[13px] leading-relaxed text-[var(--body)]">
              {s.detail}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-5 max-w-[64ch]">
        Measured against a real bucket, the byte counts are the same as on disk and
        only the latency differs — which is the point of counting bytes rather than
        seconds. A store nothing installed can list is saved and reported as
        unbrowsable rather than shown as an empty database, and adding support for one
        is an installable package rather than a wait.
      </p>

      <Shot shot={SHOTS.hf} className="mt-9" />

      <h3 className="text-[17px] font-bold tracking-tight text-[var(--bright)] mt-12 mb-4">
        Try it on a dataset nobody here wrote
      </h3>
      <p className="text-[14px] leading-relaxed text-[var(--body)] max-w-[62ch] mb-6">
        LanceDB publishes datasets on HuggingFace that open directly over{" "}
        <code className="mono text-[12px] text-[var(--bright)]">hf://</code> with no
        download. Paste this into settings and watch the counter — the URI is saved,
        not the corpus.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Stat
          value={OPENVID.rows}
          label="rows"
          detail="each carrying an MP4 beside its embedding"
        />
        <Stat
          value={OPENVID.openBytes}
          label="to open it"
          detail="two IO operations, over the network, in under a second"
          accent
        />
        <Stat
          value={OPENVID.browseBytes}
          label="to browse five rows"
          detail="and no video at all"
        />
      </div>
      <CopyLine text={OPENVID.uri} label="uri" />
    </>
  );
}

function Stat({
  value,
  label,
  detail,
  accent = false,
}: {
  value: string;
  label: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <div className="panel p-4">
      <div
        className="mono text-[19px] font-bold tracking-tight"
        style={{ color: accent ? "var(--index)" : "var(--bright)" }}
      >
        {value}
      </div>
      <div className="eyebrow mt-1.5">{label}</div>
      <p className="text-[12px] leading-relaxed text-[var(--haze)] mt-2">{detail}</p>
    </div>
  );
}
