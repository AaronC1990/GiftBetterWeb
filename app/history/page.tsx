"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRightIcon, GiftIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import { createClient } from "@/lib/supabase-browser";
import { getGiftHistory } from "@/lib/supabase-actions";
import { RELATIONSHIP_LABELS, OCCASION_LABELS } from "@/lib/quiz";
import type { GiftSession } from "@/types";

export default function HistoryPage() {
  const [sessions, setSessions] = useState<GiftSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/auth");
        return;
      }
      setAuthed(true);
      getGiftHistory()
        .then(setSessions)
        .catch(() => toast.error("Couldn't load history"))
        .finally(() => setLoading(false));
    });
  }, []);

  if (!authed || loading) {
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
        <div className="max-w-screen-lg mx-auto">
          <h1 className="font-bold text-base">Gift History</h1>
          <p className="text-white/60 text-xs">{sessions.length} past searches</p>
        </div>
      </div>

      <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 py-6">
        {sessions.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <GiftIcon size={40} className="mx-auto text-gray-300" />
            <p className="text-gray-500 text-sm">No gift searches yet.</p>
            <Link
              href="/quiz/1"
              className="inline-block bg-ruby hover:bg-ruby-dark text-white font-bold px-6 py-3 rounded-2xl transition-colors text-sm"
            >
              Find Gift Ideas →
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {sessions.map((session) => {
              const relLabel =
                RELATIONSHIP_LABELS[session.relationship] ?? session.relationship;
              const occLabel =
                OCCASION_LABELS[session.occasion] ?? session.occasion;
              const date = new Date(session.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              return (
                <div
                  key={session.id}
                  className="bg-white rounded-2xl border border-black/8 shadow-sm px-4 py-3 flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-gray-900">
                        {relLabel}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-sm text-gray-600">{occLabel}</span>
                    </div>
                    {session.preview_gifts.length > 0 && (
                      <p className="text-xs text-gray-400 truncate">
                        {session.preview_gifts.slice(0, 3).join(" · ")}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">
                      {date} · {session.recommendation_count} gift
                      {session.recommendation_count !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <ChevronRightIcon size={16} className="text-gray-300 flex-shrink-0" />
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
