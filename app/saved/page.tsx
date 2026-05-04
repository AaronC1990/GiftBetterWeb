"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2Icon, ShoppingCartIcon, GiftIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import { createClient } from "@/lib/supabase-browser";
import { fetchSavedGifts, deleteSavedGift } from "@/lib/supabase-actions";
import { buildAmazonProductUrl, buildAmazonUrlWithCategory, AMAZON_DISCLOSURE } from "@/lib/amazon";
import { OCCASION_LABELS } from "@/lib/quiz";
import type { SavedGift } from "@/types";

export default function SavedPage() {
  const [gifts, setGifts] = useState<SavedGift[]>([]);
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
      fetchSavedGifts()
        .then(setGifts)
        .catch(() => toast.error("Couldn't load saved gifts"))
        .finally(() => setLoading(false));
    });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Remove this gift from your saved list?")) return;
    try {
      await deleteSavedGift(id);
      setGifts((prev) => prev.filter((g) => g.id !== id));
      toast.success("Gift removed");
    } catch {
      toast.error("Couldn't remove gift");
    }
  }

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
          <h1 className="font-bold text-base">Saved Gifts</h1>
          <p className="text-white/60 text-xs">{gifts.length} saved</p>
        </div>
      </div>

      <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 py-6">
        {gifts.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <GiftIcon size={40} className="mx-auto text-gray-300" />
            <p className="text-gray-500 text-sm">No saved gifts yet.</p>
            <Link
              href="/quiz/1"
              className="inline-block bg-ruby hover:bg-ruby-dark text-white font-bold px-6 py-3 rounded-2xl transition-colors text-sm"
            >
              Find Gift Ideas →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {gifts.map((gift) => {
              const buyUrl = gift.asin
                ? buildAmazonProductUrl(gift.asin, "us")
                : buildAmazonUrlWithCategory(gift.search_query, gift.category ?? "", "us");

              return (
                <div
                  key={gift.id}
                  className="bg-white rounded-2xl border border-black/8 shadow-sm flex gap-3 p-3 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {gift.image_url ? (
                      <Image
                        src={gift.image_url}
                        alt={gift.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <GiftIcon size={24} className="text-ruby opacity-40" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <p className="font-semibold text-sm text-gray-900 truncate">{gift.name}</p>
                    {gift.for_person && (
                      <p className="text-xs text-gray-400 truncate">
                        For {gift.for_person}
                        {gift.occasion
                          ? ` · ${OCCASION_LABELS[gift.occasion] ?? gift.occasion}`
                          : ""}
                      </p>
                    )}
                    <p className="text-xs font-bold text-gold">{gift.price_estimate}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <a
                      href={buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center bg-ruby/10 text-ruby rounded-xl hover:bg-ruby hover:text-white transition-colors"
                      title="Buy on Amazon"
                    >
                      <ShoppingCartIcon size={15} />
                    </a>
                    <button
                      onClick={() => handleDelete(gift.id)}
                      className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-red-500 rounded-xl transition-colors"
                      title="Remove"
                    >
                      <Trash2Icon size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {gifts.length > 0 && (
          <p className="text-[11px] text-gray-400 text-center pt-6">{AMAZON_DISCLOSURE}</p>
        )}
      </main>
    </div>
  );
}
