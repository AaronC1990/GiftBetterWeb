"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, RefreshCwIcon } from "lucide-react";
import Header from "@/components/Header";
import GiftCard from "@/components/GiftCard";
import { useQuizStore } from "@/lib/quizStore";
import { useTranslation } from "@/contexts/TranslationContext";

export default function ResultsPage() {
  const { results, answers, reset, region } = useQuizStore();
  const [mounted, setMounted] = useState(false);
  const tr = useTranslation();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const recipientLabel =
    tr.relationshipLabels[answers.relationship ?? ""] ?? answers.relationship ?? "";
  const occasionLabel =
    tr.occasionLabels[answers.occasion ?? ""] ?? answers.occasion ?? "";

  if (results.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center space-y-4">
          <p className="text-gray-500">{tr.results.empty}</p>
          <Link
            href="/quiz/1"
            className="bg-ruby hover:bg-ruby-dark text-white font-bold px-6 py-3 rounded-2xl transition-colors"
          >
            {tr.results.startQuiz}
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="bg-header text-white px-4 py-4">
        <div className="max-w-screen-lg mx-auto space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/quiz/1" className="text-white/60 hover:text-white transition-colors">
              <ArrowLeftIcon size={16} />
            </Link>
            <h1 className="font-bold text-base">{tr.results.title}</h1>
          </div>
          {recipientLabel && occasionLabel && (
            <p className="text-white/70 text-xs ml-6">
              {tr.results.subtitle(recipientLabel, occasionLabel)}
            </p>
          )}
        </div>
      </div>

      <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">{tr.results.count(results.length)}</p>
          <Link
            href="/quiz/1"
            onClick={() => reset()}
            className="flex items-center gap-1 text-xs text-ruby hover:text-ruby-dark font-medium"
          >
            <RefreshCwIcon size={12} />
            {tr.results.startOver}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((gift, i) => (
            <GiftCard
              key={gift.id ?? i}
              gift={gift}
              region={region}
              isTopPick={i === 0}
              forPerson={recipientLabel || undefined}
              occasion={answers.occasion}
            />
          ))}
        </div>

        <p className="text-[11px] text-gray-400 text-center pb-4">{tr.amazonDisclosure}</p>
      </main>
    </div>
  );
}
