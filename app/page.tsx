import Link from "next/link";
import { FlameIcon } from "lucide-react";
import Header from "@/components/Header";
import TrendingCard from "@/components/TrendingCard";
import { createClient } from "@/lib/supabase-server";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import type { TrendingGift } from "@/types";

async function getTrendingGifts(): Promise<TrendingGift[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.functions.invoke("gift-recommend", {
      body: { mode: "trending", region: "us" },
    });
    if (error) return [];
    return (data?.gifts as TrendingGift[]) ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const trending = await getTrendingGifts();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <div
        className="text-white px-4 py-12 text-center space-y-4"
        style={{ background: "linear-gradient(to bottom, #3D0A14, #9B1C31)" }}
      >
        <h1
          className="font-playfair text-3xl sm:text-4xl font-bold italic tracking-wide"
          style={{ textShadow: "0 0 10px rgba(240,165,0,0.5)" }}
        >
          The perfect gift, picked for you
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-xs mx-auto leading-relaxed">
          Answer a few quick questions and get curated gift ideas in seconds.
        </p>
        <Link
          href="/quiz/1"
          className="inline-block mt-2 bg-ruby-dark hover:bg-ruby text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-colors text-base"
        >
          Find a Gift →
        </Link>
      </div>

      <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 py-8 space-y-8">
        {trending.length > 0 && (
          <section>
            <div className="flex items-center gap-1.5 mb-4">
              <FlameIcon size={13} className="text-orange-500" />
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                Hot Gifts Right Now
              </h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {trending.map((gift, i) => (
                <TrendingCard key={i} gift={gift} region="us" />
              ))}
            </div>
          </section>
        )}

        <p className="text-[11px] text-gray-400 text-center pb-4">
          {AMAZON_DISCLOSURE}
        </p>
      </main>
    </div>
  );
}
