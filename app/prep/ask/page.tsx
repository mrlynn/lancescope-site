import type { Metadata } from "next";
import Link from "next/link";
import Head from "@/app/components/prep/Head";
import { competitorById } from "@/app/lib/prep";
import { ask } from "@/content/prep/ask";
import { askExtra } from "@/content/prep/ask-extra";
import type { AskItem } from "@/content/prep/types";

export const metadata: Metadata = { title: "Ask Chang · Prep" };

function Question({ a, n }: { a: AskItem; n: number }) {
  const profiles = (a.competitorIds ?? []).flatMap((id) => {
    const c = competitorById(id);
    return c ? [c] : [];
  });
  return (
    <li id={a.id} className="panel p-5 flex gap-4">
      <span className="mono text-[12px] text-[var(--video)] pt-0.5">{String(n).padStart(2, "0")}</span>
      <div className="min-w-0">
        <p className="text-[16px] leading-relaxed text-[var(--bright)]">{a.q}</p>
        {a.why && (
          <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-3">
            <span className="eyebrow mr-2">Why ask</span>{a.why}
          </p>
        )}
        {profiles.length > 0 && (
          <p className="mono text-[10px] leading-relaxed text-[var(--dim)] mt-3">
            <span className="uppercase tracking-[0.14em] mr-2">Profiles</span>
            {profiles.map((c, i) => (
              <span key={c.id}>
                {i > 0 && <span className="mx-1.5">·</span>}
                <Link href={`/prep/competitors/${c.id}`}
                      className="text-[var(--video)] hover:underline underline-offset-2">{c.name}</Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </li>
  );
}

export default function Ask() {
  return (
    <>
      <Head eyebrow="Your questions" title="Questions to ask Chang" />
      <ol className="space-y-3">
        {ask.map((a, i) => <Question key={a.id} a={a} n={i + 1} />)}
      </ol>

      <div className="mt-16 mb-5">
        <div className="eyebrow mb-2">About the new competitors</div>
        <p className="text-[13px] text-[var(--haze)] max-w-[64ch]">
          Pick one or two. Each invites a story or a view, not a verdict on a rival.
        </p>
      </div>
      <ol className="space-y-3">
        {askExtra.map((a, i) => <Question key={a.id} a={a} n={ask.length + i + 1} />)}
      </ol>
    </>
  );
}
