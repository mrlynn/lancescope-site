/** Both numbers are true. That is the point.
 *
 *  This is the most credibility-producing block on the page precisely because it
 *  is a limitation rather than a feature: the manifest and the disk disagree
 *  about the size of the same table, both correctly, and a tool that quietly
 *  merged them into one figure would be lying to you.
 */
import { TWO_NUMBERS } from "@/app/data/measurements";

export default function TwoNumbers() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Figure
        value={TWO_NUMBERS.manifest}
        label="what the manifest reports"
        detail="Lance's own tracked_files(), asked how big this table is."
      />
      <Figure
        value={TWO_NUMBERS.actual}
        label="what is actually on disk"
        detail="The same table, measured by walking it."
        accent
      />
      <p className="sm:col-span-2 text-[15px] leading-relaxed text-[var(--body)] max-w-[62ch]">
        {TWO_NUMBERS.why} Neither number is wrong; they answer different questions,
        and which one you want depends on whether you are asking what a query will
        cost or what the storage bill will say. LanceScope shows both, and says
        which is which.
      </p>
    </div>
  );
}

function Figure({
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
    <div className="panel p-5">
      <div
        className="mono text-[24px] md:text-[28px] font-bold tracking-tight"
        style={{ color: accent ? "var(--video)" : "var(--bright)" }}
      >
        {value}
      </div>
      <div className="eyebrow mt-2">{label}</div>
      <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-3">{detail}</p>
    </div>
  );
}
