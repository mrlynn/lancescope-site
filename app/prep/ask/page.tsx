import type { Metadata } from "next";
import Head from "@/app/components/prep/Head";
import { ask } from "@/content/prep/ask";

export const metadata: Metadata = { title: "Ask Chang · Prep" };

export default function Ask() {
  return (
    <>
      <Head eyebrow="Your questions" title="Questions to ask Chang" />
      <ol className="space-y-3">
        {ask.map((a, i) => (
          <li key={a.id} id={a.id} className="panel p-5 flex gap-4">
            <span className="mono text-[12px] text-[var(--video)] pt-0.5">{String(i + 1).padStart(2, "0")}</span>
            <p className="text-[16px] leading-relaxed text-[var(--bright)]">{a.q}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
