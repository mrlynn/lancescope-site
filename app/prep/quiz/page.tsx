import type { Metadata } from "next";
import Head from "@/app/components/prep/Head";
import Quiz from "@/app/components/prep/Quiz";
import { quiz } from "@/content/prep/quiz";

export const metadata: Metadata = { title: "Quiz · Prep" };

export default function QuizPage() {
  return (
    <>
      <Head eyebrow="Quiz" title={`${quiz.length} questions`}
            lead="Pick an answer to see why. At the end, retry only what you missed." />
      <Quiz questions={quiz} />
    </>
  );
}
