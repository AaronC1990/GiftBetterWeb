import { REGION_CONFIG } from "./region";
import type { Region } from "./region";

export function buildAmazonUrl(searchQuery: string, region: Region = "us"): string {
  const { amazonDomain, affiliateTag } = REGION_CONFIG[region];
  const encoded = encodeURIComponent(searchQuery.trim());
  return `https://www.${amazonDomain}/s?k=${encoded}&tag=${affiliateTag}`;
}

export function buildAmazonProductUrl(asin: string, region: Region = "us"): string {
  const { amazonDomain, affiliateTag } = REGION_CONFIG[region];
  return `https://www.${amazonDomain}/dp/${asin}?tag=${affiliateTag}`;
}

export function buildAmazonUrlWithCategory(
  searchQuery: string,
  category: string,
  region: Region = "us"
): string {
  const base = buildAmazonUrl(searchQuery, region);
  const nodeId = CATEGORY_NODES[category];
  if (!nodeId) return base;
  return `${base}&rh=n%3A${nodeId}`;
}

export const AMAZON_DISCLOSURE =
  "As an Amazon Associate, GiftBetter earns from qualifying purchases.";

export const CATEGORY_NODES: Record<string, string> = {
  tech: "172282",
  outdoor: "3375251",
  home: "1055398",
  food: "16310101",
  fashion: "7141123011",
  wellness: "3760901",
  books: "283155",
  kids: "165793011",
  art: "2617941011",
  experience: "",
};
