/** Someone else's data.
 *
 *  The obvious objection to everything above is that the corpus was built by the
 *  same project making the claim. This is the answer: the same measurement, on a
 *  dataset this project did not create, that anyone can point a fresh install at.
 */
import CopyLine from "@/app/components/CopyLine";
import { OPENVID } from "@/app/data/measurements";

export default function OpenVid() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Stat value={OPENVID.rows} label="rows" detail="each carrying an MP4 beside its embedding" />
        <Stat value={OPENVID.openBytes} label="to open it" detail="0.3 seconds, over the network" accent />
        <Stat value={OPENVID.browseBytes} label="to browse five rows" detail="and no video at all" />
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
