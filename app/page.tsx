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

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            disabled
            className="flex items-center gap-2 bg-black/30 border border-white/20 text-white px-4 py-2 rounded-xl opacity-70 cursor-not-allowed text-left"
            title="Coming soon"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span>
              <span className="block text-[10px] leading-none opacity-80">Coming soon on</span>
              <span className="block text-sm font-semibold leading-tight">App Store</span>
            </span>
          </button>

          <button
            disabled
            className="flex items-center gap-2 bg-black/30 border border-white/20 text-white px-4 py-2 rounded-xl opacity-70 cursor-not-allowed text-left"
            title="Coming soon"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
              <path d="M3.18 23.76c.3.17.65.19.97.06l11.37-6.57-2.45-2.46-9.89 8.97zm-1.81-19.6v19.69c0 .07.01.14.02.2l10.4-10.38L1.39 3.29c-.01.29-.02.58-.02.87zm19.44 8.15-2.54-1.47-2.75 2.74 2.75 2.75 2.56-1.48c.73-.42.73-1.12-.02-1.54zM4.15.27c-.32-.13-.67-.11-.97.06l9.9 9.9 2.44-2.44L4.15.27z"/>
            </svg>
            <span>
              <span className="block text-[10px] leading-none opacity-80">Coming soon on</span>
              <span className="block text-sm font-semibold leading-tight">Google Play</span>
            </span>
          </button>
        </div>
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
