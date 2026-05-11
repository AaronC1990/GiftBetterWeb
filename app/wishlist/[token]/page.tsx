import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { GiftIcon, ShoppingCartIcon, HeartIcon } from "lucide-react";
import Header from "@/components/Header";
import { buildAmazonProductUrl, buildAmazonUrlWithCategory, AMAZON_DISCLOSURE } from "@/lib/amazon";
import { detectRegionServer } from "@/lib/regionServer";
import type { Metadata } from "next";

interface WishlistItem {
  id: string;
  name: string;
  description?: string;
  price_estimate?: string;
  amazon_price?: string;
  search_query: string;
  asin?: string;
  image_url?: string;
  category?: string;
}

interface Props {
  params: Promise<{ token: string }>;
}

async function fetchWishlist(token: string): Promise<WishlistItem[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/wishlist-view?token=${encodeURIComponent(token)}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const items = await fetchWishlist(token);
  if (!items) return { title: "Wishlist — GiftBetter" };
  return {
    title: `Gift Wishlist — GiftBetter`,
    description: `${items.length} gift idea${items.length !== 1 ? "s" : ""} on this wishlist.`,
  };
}

export default async function WishlistPage({ params }: Props) {
  const { token } = await params;
  const [items, region] = await Promise.all([
    fetchWishlist(token),
    detectRegionServer(),
  ]);

  if (!items) notFound();

  return (
    <>
      <Header />

      <div className="bg-header text-white px-4 py-4">
        <div className="max-w-screen-md mx-auto flex items-center gap-3">
          <HeartIcon size={18} className="text-pink-300 flex-shrink-0" />
          <div>
            <h1 className="font-bold text-base">Gift Wishlist</h1>
            <p className="text-white/60 text-xs">
              {items.length} gift idea{items.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <main className="min-h-screen bg-[#fdf8f8]">
        <div className="max-w-screen-md mx-auto px-4 py-6">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <GiftIcon size={40} className="mx-auto text-gray-300" />
              <p className="text-gray-500 text-sm">This wishlist is empty.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const buyUrl = item.asin
                  ? buildAmazonProductUrl(item.asin, region)
                  : buildAmazonUrlWithCategory(item.search_query, item.category ?? "", region);

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-black/8 shadow-sm flex gap-3 p-3 items-center"
                  >
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <GiftIcon size={24} className="text-ruby opacity-40" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <p className="font-semibold text-sm text-gray-900 truncate">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      {(item.amazon_price || item.price_estimate) && (
                        <p className="text-xs font-bold text-gold">
                          {item.amazon_price ?? item.price_estimate}
                        </p>
                      )}
                    </div>

                    <a
                      href={buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center bg-ruby/10 text-ruby rounded-xl hover:bg-ruby hover:text-white transition-colors flex-shrink-0"
                      title="Buy on Amazon"
                    >
                      <ShoppingCartIcon size={15} />
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-[11px] text-gray-400 text-center pt-6">{AMAZON_DISCLOSURE}</p>

          {/* CTA */}
          <div className="mt-6 bg-header text-white rounded-2xl p-6 text-center">
            <p className="font-playfair font-bold text-lg mb-1">
              Want to make your own wishlist?
            </p>
            <p className="text-white/70 text-sm mb-4">
              GiftBetter helps you find the perfect gift and share what you want.
            </p>
            <Link
              href="/quiz/1"
              className="inline-block bg-ruby hover:bg-ruby-dark text-white font-bold text-sm px-8 py-3 rounded-xl transition-colors"
            >
              Find Gifts →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
