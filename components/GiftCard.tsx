"use client";

import Image from "next/image";
import { useState } from "react";
import { BookmarkIcon, ShoppingCartIcon, GiftIcon, StarIcon } from "lucide-react";
import { toast } from "sonner";
import { saveGift } from "@/lib/supabase-actions";
import { buildAmazonProductUrl, buildAmazonUrlWithCategory } from "@/lib/amazon";
import type { GiftIdea } from "@/types";
import type { Region } from "@/lib/region";

interface Props {
  gift: GiftIdea;
  region?: Region;
  isTopPick?: boolean;
  forPerson?: string;
  occasion?: string;
  onSaved?: () => void;
}

export default function GiftCard({
  gift,
  region = "us",
  isTopPick = false,
  forPerson,
  occasion,
  onSaved,
}: Props) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  const buyUrl = gift.asin
    ? buildAmazonProductUrl(gift.asin, region)
    : buildAmazonUrlWithCategory(gift.search_query, gift.category, region);

  async function handleSave() {
    setSaving(true);
    try {
      await saveGift({
        recommendation_id: gift.id,
        name: gift.name,
        description: gift.description,
        search_query: gift.search_query,
        price_estimate: gift.price_estimate,
        for_person: forPerson,
        occasion,
        asin: gift.asin,
        category: gift.category,
        image_url: gift.image_url,
        amazon_price: gift.amazon_price,
      });
      setSaved(true);
      toast.success("Gift saved!");
      onSaved?.();
    } catch (err: any) {
      if (err?.message === "Not authenticated") {
        toast.error("Sign in to save gifts");
      } else {
        toast.error("Couldn't save — try again");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-black/8 shadow-sm overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {isTopPick && (
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            <StarIcon size={9} />
            Great match
          </div>
        )}
        {gift.image_url && !imgError ? (
          <Image
            src={gift.image_url}
            alt={gift.name}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <GiftIcon size={40} className="text-ruby opacity-40" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex-1 space-y-1">
          <p className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
            {gift.name}
          </p>
          <p className="font-bold text-gold text-sm">
            {gift.amazon_price ?? gift.price_estimate}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
            {gift.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleSave}
            disabled={saved || saving}
            title={saved ? "Saved" : "Save"}
            className={[
              "flex items-center justify-center w-9 h-9 rounded-xl border transition-colors flex-shrink-0",
              saved
                ? "bg-ruby/10 border-ruby/30 text-ruby"
                : "border-gray-200 text-gray-400 hover:border-ruby/40 hover:text-ruby",
            ].join(" ")}
          >
            <BookmarkIcon size={15} fill={saved ? "currentColor" : "none"} />
          </button>

          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-ruby hover:bg-ruby-dark text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
          >
            <ShoppingCartIcon size={13} />
            Buy on Amazon
          </a>
        </div>
      </div>
    </div>
  );
}
