import Link from "next/link";
import { Label } from "@/app/components/prep/SourceLinks";
import { NEEDS } from "@/app/lib/prep";
import { competitorDetail } from "@/content/prep/competitors-detail";
import { competitorsExtra } from "@/content/prep/competitors-extra";
import type { Fit } from "@/content/prep/types";

type Need = "scans" | "random" | "blobs" | "columns";

/** The new competitors that have a four-needs rating. Engines and partners that
 *  store nothing themselves have none, and are left out. */
function rated() {
  return competitorsExtra.flatMap((c) => {
    const f = competitorDetail[c.id]?.fourNeeds;
    return f ? [{ id: c.id, name: c.name, fit: f }] : [];
  });
}

function Names({ items }: { items: { id: string; name: string }[] }) {
  return (
    <>
      {items.map((c, i) => (
        <span key={c.id}>
          {i > 0 && <span className="mx-1.5 text-[var(--dim)]">·</span>}
          <Link href={`/prep/competitors/${c.id}`} className="text-[var(--video)] hover:underline underline-offset-2">{c.name}</Link>
        </span>
      ))}
    </>
  );
}

/** Under one need: a note, then who among the new rivals is strong or partial
 *  there, straight from the ratings. */
export default function NeedRivals({ need, note }: { need: Need; note: string }) {
  const all = rated();
  const at = (fit: Fit) => all.filter((c) => c.fit[need] === fit);
  const strong = at("strong"), partial = at("partial");
  return (
    <div className="border-l-2 pl-4 my-6 max-w-[68ch]" style={{ borderColor: "rgb(var(--index-rgb) / 0.5)" }}>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="eyebrow">The new rivals on {NEEDS[need].toLowerCase()}</span>
        <Label kind="my read" />
      </div>
      <p className="text-[14px] leading-relaxed text-[var(--body)] mb-3">{note}</p>
      <dl className="text-[13px] leading-relaxed space-y-1">
        <div><dt className="inline mono text-[10px] uppercase tracking-[0.14em] mr-2" style={{ color: "var(--index)" }}>Strong</dt>
          <dd className="inline">{strong.length ? <Names items={strong} /> : <span className="text-[var(--dim)]">none</span>}</dd></div>
        <div><dt className="inline mono text-[10px] uppercase tracking-[0.14em] mr-2 text-[var(--haze)]">Partial</dt>
          <dd className="inline">{partial.length ? <Names items={partial} /> : <span className="text-[var(--dim)]">none</span>}</dd></div>
      </dl>
    </div>
  );
}

/** After the same-data argument: each rated rival's strong needs, most first. */
export function AllFour({ title, text }: { title: string; text: string }) {
  const rows = rated()
    .map((c) => ({ ...c, strong: (Object.keys(NEEDS) as Need[]).filter((n) => c.fit[n] === "strong") }))
    .sort((a, b) => b.strong.length - a.strong.length || a.name.localeCompare(b.name));
  return (
    <div className="panel p-5 mt-8">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <h3 className="text-[16px] font-bold text-[var(--bright)]">{title}</h3>
        <Label kind="my read" />
      </div>
      <p className="text-[14px] leading-relaxed text-[var(--body)] mb-4 max-w-[64ch]">{text}</p>
      <ul className="text-[13px] leading-relaxed space-y-1.5">
        {rows.map((c) => (
          <li key={c.id} className="flex flex-wrap gap-x-2">
            <Link href={`/prep/competitors/${c.id}`} className="text-[var(--bright)] hover:text-[var(--video)]">{c.name}</Link>
            <span className="mono text-[11px] text-[var(--haze)]">
              {c.strong.length} of 4{c.strong.length ? `: ${c.strong.map((n) => NEEDS[n].toLowerCase()).join(", ")}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
