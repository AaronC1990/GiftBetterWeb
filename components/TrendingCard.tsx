"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GiftIcon, XIcon } from "lucide-react";
import { buildAmazonProductUrl, buildAmazonUrlWithCategory } from "@/lib/amazon";
import { useTranslation } from "@/contexts/TranslationContext";
import type { TrendingGift } from "@/types";
import type { Region } from "@/lib/region";

interface Props {
  gift: TrendingGift;
  region?: Region;
}

export default function TrendingCard({ gift, region = "us" }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const tr = useTranslation();

  useEffect(() => { setMounted(true); }, []);

  const buyUrl = gift.asin
    ? buildAmazonProductUrl(gift.asin, region)
    : buildAmazonUrlWithCategory(gift.search_query, gift.category, region);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="w-40 flex-shrink-0 rounded-xl border border-black/8 bg-white shadow-sm hover:shadow-md transition-shadow text-left overflow-hidden"
      >
        <div className="w-full h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
          {gift.image_url && !imgError ? (
            <Image
              src={gift.image_url}
              alt={gift.name}
              width={160}
              height={128}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <GiftIcon size={36} className="text-ruby opacity-60" />
          )}
        </div>
        <div className="p-2.5 space-y-0.5">
          <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">
            {gift.name}
          </p>
          <p className="text-xs font-bold text-gold">{gift.price_estimate}</p>
        </div>
      </button>

      {modalOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {gift.image_url && !imgError && (
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={gift.image_url}
                  alt={gift.name}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            )}
            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-gray-900 text-base leading-tight">{gift.name}</h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0 mt-0.5"
                >
                  <XIcon size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{gift.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gold text-base">{gift.price_estimate}</span>
                <a
                  href={buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ruby text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-ruby-dark transition-colors"
                >
                  {tr.trending.buyBtn}
                </a>
              </div>
              <p className="text-[10px] text-gray-400">{tr.amazonDisclosure}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
