import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Head, { H2, P, Say } from "@/app/components/prep/Head";
import { Threat } from "@/app/components/prep/CompetitorList";
import { FitMark } from "@/app/components/prep/FourNeeds";
import SourceLinks, { Label } from "@/app/components/prep/SourceLinks";
import { GROUPS, NEEDS, allCompetitors, competitorById, detailFor } from "@/app/lib/prep";

export function generateStaticParams() {
  return allCompetitors.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const c = competitorById((await params).id);
  return c ? { title: `${c.name} · Prep` } : {};
}

function List({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-[var(--body)]">
          <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow mb-1">{label}</dt>
      <dd className="text-[14px] leading-relaxed text-[var(--body)]">{children}</dd>
    </div>
  );
}

export default async function CompetitorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = competitorById(id);
  if (!c) notFound();
  const d = detailFor(id);

  const i = allCompetitors.findIndex((x) => x.id === id);
  const prev = allCompetitors[(i - 1 + allCompetitors.length) % allCompetitors.length];
  const next = allCompetitors[(i + 1) % allCompetitors.length];

  return (
    <>
      <Link href="/prep/competitors" className="mono text-[11px] text-[var(--haze)] hover:text-[var(--bright)]">
        ← All competitors
      </Link>
      <Head eyebrow={GROUPS[c.group] ?? c.group} title={c.name} lead={c.whatItIs}>
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <Threat score={c.threat} />
          <span className="mono text-[11px] text-[var(--haze)]">threat {c.threat} of 5</span>
          {d && <span className="mono text-[10px] text-[var(--dim)]">researched {d.asOf}</span>}
        </div>
      </Head>

      <dl className="grid sm:grid-cols-2 gap-5 mb-2">
        <Fact label="Origin">{c.origin}</Fact>
        {d?.company && <Fact label="Company and backing">{d.company}</Fact>}
      </dl>

      <H2>Why it matters</H2>
      <P>{c.whyItMatters}</P>

      {d && (
        <>
          <H2>How it works</H2>
          <P>{d.howItWorks}</P>
          {d.status && (<><H2>Where it stands now</H2><P>{d.status}</P></>)}
          {(d.pricing || d.customers || d.partnerOrRival) && (
            <dl className="grid sm:grid-cols-2 gap-5 mt-8">
              {d.pricing && <Fact label="Pricing">{d.pricing}</Fact>}
              {d.customers && <Fact label="Named customers">{d.customers}</Fact>}
              {d.partnerOrRival && <Fact label="Partner or rival">{d.partnerOrRival}</Fact>}
            </dl>
          )}

          {d.fourNeeds && (<>
          <div className="flex items-center gap-3 mt-14 mb-4 flex-wrap">
            <h2 className="text-[19px] font-bold tracking-tight text-[var(--bright)]">Against the four needs</h2>
            <Label kind="my read" />
          </div>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(NEEDS).map(([k, label]) => (
              <div key={k} className="panel p-3">
                <dt className="eyebrow mb-1.5">{label}</dt>
                <dd><FitMark fit={d.fourNeeds![k as keyof NonNullable<typeof d.fourNeeds>]} /></dd>
              </div>
            ))}
          </dl>
          </>)}

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <section>
              <h2 className="text-[16px] font-bold text-[var(--bright)] mb-3">Strengths</h2>
              <List items={d.strengths} accent="var(--index)" />
            </section>
            <section>
              <h2 className="text-[16px] font-bold text-[var(--bright)] mb-3">Weaknesses for AI data</h2>
              <List items={d.weaknesses} accent="var(--video)" />
            </section>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-10">
            <div className="panel p-4">
              <div className="eyebrow mb-1.5">Where it wins</div>
              <p className="text-[14px] leading-relaxed text-[var(--body)]">{d.whereItWins}</p>
            </div>
            <div className="panel p-4" style={{ borderColor: "var(--index)" }}>
              <div className="eyebrow mb-1.5" style={{ color: "var(--index)" }}>Where Lance wins</div>
              <p className="text-[14px] leading-relaxed text-[var(--body)]">{d.whereLanceWins}</p>
            </div>
          </div>
        </>
      )}

      <Say label="The Lance angle">{c.lanceAngle}</Say>

      {d && (
        <>
          <H2>If they ask</H2>
          <p className="text-[16px] font-semibold text-[var(--bright)] mb-3 max-w-[68ch]">{d.objection.q}</p>
          <P>{d.objection.a}</P>

          {!!d.vendorClaims?.length && (
            <>
              <div className="flex items-center gap-3 mt-10 mb-3"><h2 className="text-[16px] font-bold text-[var(--bright)]">Numbers to quote carefully</h2><Label kind="vendor claim" /></div>
              <List items={d.vendorClaims} accent="var(--video)" />
            </>
          )}
          {!!d.uncertain?.length && (
            <>
              <h2 className="text-[16px] font-bold text-[var(--bright)] mt-10 mb-3">Not verified</h2>
              <List items={d.uncertain} accent="var(--dim)" />
            </>
          )}
        </>
      )}

      <SourceLinks ids={[...new Set([...c.sourceIds, ...(d?.sourceIds ?? [])])]} className="mt-10" />

      <nav className="flex justify-between gap-4 mt-12 pt-6 border-t border-[var(--hairline)] mono text-[12px]">
        <Link href={`/prep/competitors/${prev.id}`} className="text-[var(--haze)] hover:text-[var(--bright)]">← {prev.name}</Link>
        <Link href={`/prep/competitors/${next.id}`} className="text-right text-[var(--haze)] hover:text-[var(--bright)]">{next.name} →</Link>
      </nav>
    </>
  );
}
