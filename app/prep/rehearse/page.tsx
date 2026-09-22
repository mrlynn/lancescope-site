import type { Metadata } from "next";
import Head from "@/app/components/prep/Head";
import Rehearse from "@/app/components/prep/Rehearse";
import { allRehearse as rehearse } from "@/app/lib/prep";

export const metadata: Metadata = { title: "Rehearse · Prep" };

export default function RehearsePage() {
  return (
    <>
      <Head eyebrow="Rehearse" title="Say it out loud"
            lead="Start the clock, answer as if Chang asked, then check yourself against the points." />
      <Rehearse prompts={rehearse} />
    </>
  );
}
