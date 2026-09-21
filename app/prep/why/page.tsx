import type { Metadata } from "next";
import Head, { H2, P, Say } from "@/app/components/prep/Head";
import Pipeline from "@/app/components/prep/Pipeline";
import BackfillCalculator from "@/app/components/prep/BackfillCalculator";
import { why } from "@/content/prep/why";

export const metadata: Metadata = { title: "Why all four · Prep" };

export default function Why() {
  return (
    <>
      <Head eyebrow="The core argument" title="Why AI needs all four" lead={why.intro} />

      <H2>One table, one year</H2>
      <P>{why.dataset}</P>
      <Pipeline stages={why.stages} />

      {why.needs.map((n) => (
        <section key={n.id}>
          <H2 id={n.id}>{n.name}</H2>
          {n.paragraphs.map((p, i) => <P key={i}>{p}</P>)}
          {n.id === "columns" && (
            <div className="mt-6">
              <BackfillCalculator defaults={why.calculator.defaults} assumption={why.calculator.assumption} />
            </div>
          )}
        </section>
      ))}

      <H2 id="same-data">Why on the same data</H2>
      {why.sameData.map((p, i) => <P key={i}>{p}</P>)}

      <Say label="In thirty seconds">{why.thirtySeconds}</Say>
    </>
  );
}
