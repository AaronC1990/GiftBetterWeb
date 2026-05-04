"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, RefreshCwIcon } from "lucide-react";
import Header from "@/components/Header";
import GiftCard from "@/components/GiftCard";
import { useQuizStore } from "@/lib/quizStore";
import { RELATIONSHIP_LABELS, OCCASION_LABELS } from "@/lib/quiz";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";

export default function ResultsPage() {
  const { results, answers, reset } = useQuizStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const recipientLabel =
    RELATIONSHIP_LABELS[answers.relationship ?? ""] ?? answers.relationship ?? "";
  const occasionLabel =
    OCCASION_LABELS[answers.occasion ?? ""] ?? answers.occasion ?? "";

  if (results.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center space-y-4">
          <p className="text-gray-500">No results yet. Take the quiz to get gift ideas!</p>
          <Link
            href="/quiz/1"
            className="bg-ruby hover:bg-ruby-dark text-white font-bold px-6 py-3 rounded-2xl transition-colors"
          >
            Start the Quiz →
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Sub-header */}
      <div className="bg-header text-white px-4 py-4">
        <div className="max-w-screen-lg mx-auto space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/quiz/1" className="text-white/60 hover:text-white transition-colors">
              <ArrowLeftIcon size={16} />
            </Link>
            <h1 className="font-bold text-base">Your Gift Ideas</h1>
          </div>
          {recipientLabel && occasionLabel && (
            <p className="text-white/70 text-xs ml-6">
              For your {recipientLabel.toLowerCase()} · {occasionLabel}
            </p>
          )}
        </div>
      </div>

      <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {results.length} gift{results.length !== 1 ? "s" : ""} curated for you
          </p>
          <Link
            href="/quiz/1"
            onClick={() => reset()}
            className="flex items-center gap-1 text-xs text-ruby hover:text-ruby-dark font-medium"
          >
            <RefreshCwIcon size={12} />
            Start over
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((gift, i) => (
            <GiftCard
              key={gift.id ?? i}
              gift={gift}
              region="us"
              isTopPick={i === 0}
              forPerson={recipientLabel || undefined}
              occasion={answers.occasion}
            />
          ))}
        </div>

        <p className="text-[11px] text-gray-400 text-center pb-4">{AMAZON_DISCLOSURE}</p>
      </main>
    </div>
  );
}
