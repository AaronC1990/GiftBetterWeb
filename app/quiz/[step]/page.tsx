"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import QuizOption from "@/components/QuizOption";
import { useQuizStore } from "@/lib/quizStore";
import {
  TOTAL_STEPS,
  parseBudget,
  isQuizComplete,
  stepParamToIndex,
  getLocalizedSteps,
} from "@/lib/quiz";
import { fetchGiftRecommendations } from "@/lib/supabase-actions";
import { detectRegionBrowser } from "@/lib/region";
import { useTranslation } from "@/contexts/TranslationContext";

export default function QuizStepPage() {
  const params = useParams<{ step: string }>();
  const router = useRouter();
  const { answers, setField, toggleArrayField, setResults, setRegion, region } = useQuizStore();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState((answers.extra_context as string) ?? "");
  const tr = useTranslation();

  useEffect(() => {
    setRegion(detectRegionBrowser());
  }, [setRegion]);

  const steps = getLocalizedSteps(tr);
  const stepIndex = stepParamToIndex(params.step);
  const step = steps[stepIndex];
  const isLastStep = stepIndex === TOTAL_STEPS - 1;
  const nextStep = stepIndex + 2;
  const prevStep = stepIndex;

  if (!step) {
    router.replace("/quiz/1");
    return null;
  }

  const currentValue = answers[step.field];

  function isSelected(value: string): boolean {
    if (step.type === "multi") {
      return Array.isArray(currentValue) && (currentValue as string[]).includes(value);
    }
    return currentValue === value;
  }

  function handleSelect(value: string) {
    if (step.type === "budget") {
      const { min, max } = parseBudget(value);
      setField("budget_min", min);
      setField("budget_max", max);
      if (!isLastStep) setTimeout(() => router.push(`/quiz/${nextStep}`), 200);
    } else if (step.type === "single") {
      setField(step.field as any, value);
      if (!isLastStep) setTimeout(() => router.push(`/quiz/${nextStep}`), 200);
    } else if (step.type === "multi") {
      toggleArrayField(step.field as "interests" | "vibe", value);
    }
  }

  async function handleSubmit() {
    if (step.type === "text") setField("extra_context", text);

    const finalAnswers = step.type === "text"
      ? { ...answers, extra_context: text }
      : answers;

    if (!isQuizComplete(finalAnswers)) {
      toast.error(tr.quiz.errorIncomplete);
      return;
    }

    setLoading(true);
    try {
      const { gifts, session_id } = await fetchGiftRecommendations(
        finalAnswers as any,
        false,
        region
      );
      setResults(gifts, session_id);
      router.push("/quiz/results");
    } catch (err: any) {
      toast.error(err?.message ?? tr.quiz.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  function canAdvance(): boolean {
    if (step.type === "multi") return Array.isArray(currentValue) && (currentValue as string[]).length > 0;
    if (step.type === "text") return true;
    if (step.type === "budget") return answers.budget_min !== undefined;
    return !!currentValue;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-6">
        <ProgressBar current={stepIndex + 1} total={TOTAL_STEPS} />

        <div className="flex items-center gap-2">
          {stepIndex === 0 ? (
            <Link href="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeftIcon size={14} />
              {tr.quiz.home}
            </Link>
          ) : (
            <button
              onClick={() => router.push(`/quiz/${prevStep}`)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeftIcon size={14} />
              {tr.quiz.back}
            </button>
          )}
        </div>

        <h1 className="text-xl font-bold text-gray-900">{step.question}</h1>

        {step.type === "text" ? (
          <div className="space-y-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={tr.quiz.extraContextPlaceholder}
              rows={3}
              maxLength={500}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-ruby/40 focus:border-ruby"
            />
            <p className="text-xs text-gray-400 text-right">{text.length}/500</p>
          </div>
        ) : (
          <div className="space-y-2">
            {step.options?.map((opt) => (
              <QuizOption
                key={opt.value}
                label={opt.label}
                emoji={opt.emoji}
                selected={isSelected(opt.value)}
                onClick={() => handleSelect(opt.value)}
              />
            ))}
          </div>
        )}

        {(step.type === "multi" || step.type === "text" || isLastStep) && (
          <div className="pt-2">
            {isLastStep ? (
              <button
                onClick={handleSubmit}
                disabled={loading || !canAdvance()}
                className="w-full bg-ruby hover:bg-ruby-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2Icon size={18} className="animate-spin" />
                    {tr.quiz.loading}
                  </>
                ) : (
                  tr.quiz.submit
                )}
              </button>
            ) : (
              <button
                onClick={() => router.push(`/quiz/${nextStep}`)}
                disabled={!canAdvance()}
                className="w-full bg-ruby hover:bg-ruby-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-colors"
              >
                {tr.quiz.next}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
