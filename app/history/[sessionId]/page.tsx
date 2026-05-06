"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { ArrowLeftIcon, Loader2Icon, GiftIcon } from "lucide-react";
import Header from "@/components/Header";
import GiftCard from "@/components/GiftCard";
import { createClient } from "@/lib/supabase-browser";
import { getSessionGifts } from "@/lib/supabase-actions";
import { useTranslation } from "@/contexts/TranslationContext";
import { useQuizStore } from "@/lib/quizStore";
import type { GiftIdea } from "@/types";

export default function SessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tr = useTranslation();
  const { region } = useQuizStore();

  const relationship = searchParams.get("relationship") ?? "";
  const occasion = searchParams.get("occasion") ?? "";

  const [gifts, setGifts] = useState<GiftIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/auth");
        return;
      }
      getSessionGifts(sessionId)
        .then(setGifts)
        .finally(() => setLoading(false));
    });
  }, [sessionId, router]);

  const relLabel = tr.relationshipLabels[relationship] ?? relationship;
  const occLabel = tr.occasionLabels[occasion] ?? occasion;

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2Icon size={24} className="animate-spin text-ruby" />
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
            <Link href="/history" className="text-white/60 hover:text-white transition-colors">
              <ArrowLeftIcon size={16} />
            </Link>
            <h1 className="font-bold text-base">{tr.history.pageTitle}</h1>
          </div>
          {relLabel && occLabel && (
            <p className="text-white/70 text-xs ml-6">
              {tr.results.subtitle(relLabel, occLabel)}
            </p>
          )}
        </div>
      </div>

      <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 py-6 space-y-6">
        {gifts.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <GiftIcon size={40} className="mx-auto text-gray-300" />
            <p className="text-gray-500 text-sm">{tr.history.noGifts}</p>
            <Link href="/history" className="text-ruby text-sm font-medium hover:underline">
              {tr.history.backLink}
            </Link>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-500">
              {tr.history.sessionGiftCount(gifts.length)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {gifts.map((gift, i) => (
                <GiftCard
                  key={gift.id ?? i}
                  gift={gift}
                  region={region}
                  isTopPick={i === 0}
                  forPerson={relLabel || undefined}
                  occasion={occasion || undefined}
                />
              ))}
            </div>
            <p className="text-[11px] text-gray-400 text-center pb-4">{tr.amazonDisclosure}</p>
          </>
        )}
      </main>
    </div>
  );
}
