import type { Metadata } from "next";
import Head from "@/app/components/prep/Head";
import Flashcards from "@/app/components/prep/Flashcards";
import { allCards as cards } from "@/app/lib/prep";

export const metadata: Metadata = { title: "Cards · Prep" };

export default function Cards() {
  return (
    <>
      <Head eyebrow="Flashcards" title={`${cards.length} cards`}
            lead="Space flips, arrows move, 1 marks again, 2 marks got it. Progress is kept in this browser only." />
      <Flashcards cards={cards} />
    </>
  );
}
