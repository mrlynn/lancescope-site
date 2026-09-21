"use client";

import { useState } from "react";
import { bytes } from "@/app/lib/prep";
import { Label } from "@/app/components/prep/SourceLinks";

type Defaults = { rows: number; blobBytes: number; dims: number; bytesPerValue: number };

/** What a per-row embedding backfill writes, Lance against a worst-case Parquet
 *  layout. Arithmetic on the reader's own assumptions, so it is labelled as such. */
export default function BackfillCalculator({ defaults, assumption }: {
  defaults: Defaults;
  assumption: string;
}) {
  const [v, setV] = useState(defaults);
  const set = (k: keyof Defaults) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const n = Number(e.target.value);
    setV((old) => ({ ...old, [k]: Number.isFinite(n) && n >= 0 ? n : 0 }));
  };

  const blobs = v.rows * v.blobBytes;
  const column = v.rows * v.dims * v.bytesPerValue;
  const perRow = v.dims * v.bytesPerValue;
  const parquet = blobs + column;
  const ratio = column > 0 ? parquet / column : 0;

  const field = "w-full mt-1 bg-[var(--ink)] border border-[var(--rule)] rounded-[3px] px-2.5 py-1.5 mono text-[13px] text-[var(--bright)]";

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="text-[15px] font-bold text-[var(--bright)]">Backfill calculator</div>
        <Label kind="illustrative" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <label className="mono text-[10px] uppercase tracking-[0.12em] text-[var(--haze)]">
          Rows
          <input type="number" min={0} step={1_000_000} value={v.rows} onChange={set("rows")} className={field} />
          <span className="block mt-1 normal-case tracking-normal text-[var(--dim)]">
            {new Intl.NumberFormat("en", { notation: "compact" }).format(v.rows)} rows
          </span>
        </label>
        <label className="mono text-[10px] uppercase tracking-[0.12em] text-[var(--haze)]">
          Blob bytes / row
          <input type="number" min={0} step={10_000} value={v.blobBytes} onChange={set("blobBytes")} className={field} />
          <span className="block mt-1 normal-case tracking-normal text-[var(--dim)]">{bytes(v.blobBytes)} each</span>
        </label>
        <label className="mono text-[10px] uppercase tracking-[0.12em] text-[var(--haze)]">
          Dimensions
          <input type="number" min={0} step={128} value={v.dims} onChange={set("dims")} className={field} />
        </label>
        <label className="mono text-[10px] uppercase tracking-[0.12em] text-[var(--haze)]">
          Bytes / value
          <select value={v.bytesPerValue} onChange={set("bytesPerValue")} className={field}>
            <option value={4}>4 (float32)</option>
            <option value={2}>2 (float16)</option>
            <option value={1}>1 (int8)</option>
          </select>
        </label>
      </div>

      <dl className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-[4px] border border-[var(--hairline)] p-3">
          <dt className="eyebrow mb-1">Table (blobs)</dt>
          <dd className="mono text-[20px] text-[var(--bright)]">{bytes(blobs)}</dd>
          <dd className="mono text-[10px] text-[var(--dim)] mt-1">{bytes(perRow)} embedding per row</dd>
        </div>
        <div className="rounded-[4px] border p-3" style={{ borderColor: "var(--index)" }}>
          <dt className="eyebrow mb-1" style={{ color: "var(--index)" }}>Lance writes</dt>
          <dd className="mono text-[20px] text-[var(--bright)]">{bytes(column)}</dd>
          <dd className="mono text-[10px] text-[var(--dim)] mt-1">the new column only</dd>
        </div>
        <div className="rounded-[4px] border p-3" style={{ borderColor: "var(--video)" }}>
          <dt className="eyebrow mb-1" style={{ color: "var(--video)" }}>Parquet rewrites, worst case</dt>
          <dd className="mono text-[20px] text-[var(--bright)]">{bytes(parquet)}</dd>
          <dd className="mono text-[10px] text-[var(--dim)] mt-1">
            {ratio > 0 ? `${Math.round(ratio).toLocaleString()}× the Lance write` : "—"}
          </dd>
        </div>
      </dl>

      <p className="text-[12px] leading-relaxed text-[var(--haze)] mt-4 max-w-[70ch]">{assumption}</p>
      <button type="button" className="pill mt-3" onClick={() => setV(defaults)}>Reset</button>
    </div>
  );
}
