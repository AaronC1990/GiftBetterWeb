export type Region = "us" | "uk" | "de" | "jp";
export type Locale = "en" | "de" | "ja";

const LANG_TO_REGION: Record<string, Region> = {
  ja: "jp",
  de: "de",
  at: "de",
  ch: "de",
  "en-gb": "uk",
  "en-au": "uk",
  "en-nz": "uk",
};

/** Parse an Accept-Language header or navigator.language string into a Region. */
export function detectRegionFromAcceptLanguage(acceptLanguage: string): Region {
  if (!acceptLanguage) return "us";
  const langs = acceptLanguage
    .split(",")
    .map((l) => l.split(";")[0].trim().toLowerCase())
    .filter(Boolean);
  for (const lang of langs) {
    if (LANG_TO_REGION[lang]) return LANG_TO_REGION[lang];
    const base = lang.split("-")[0];
    if (LANG_TO_REGION[base]) return LANG_TO_REGION[base];
  }
  return "us";
}

/** Detect region from the browser's navigator.language (client-side only). */
export function detectRegionBrowser(): Region {
  if (typeof navigator === "undefined") return "us";
  const lang = navigator.language ?? (navigator as any).languages?.[0] ?? "";
  return detectRegionFromAcceptLanguage(lang);
}

export interface RegionConfig {
  amazonDomain: string;
  affiliateTag: string;
  serpDomain: string;
  locale: Locale;
  currencySymbol: string;
  label: string;
}

export const REGION_CONFIG: Record<Region, RegionConfig> = {
  us: {
    amazonDomain: "amazon.com",
    affiliateTag: "giftspark0a-20",
    serpDomain: "amazon.com",
    locale: "en",
    currencySymbol: "$",
    label: "United States",
  },
  uk: {
    amazonDomain: "amazon.co.uk",
    affiliateTag: "giftspark-21",
    serpDomain: "amazon.co.uk",
    locale: "en",
    currencySymbol: "£",
    label: "United Kingdom",
  },
  de: {
    amazonDomain: "amazon.de",
    affiliateTag: "giftspark07-21",
    serpDomain: "amazon.de",
    locale: "de",
    currencySymbol: "€",
    label: "Deutschland",
  },
  jp: {
    amazonDomain: "amazon.co.jp",
    affiliateTag: "giftspark01-22",
    serpDomain: "amazon.co.jp",
    locale: "ja",
    currencySymbol: "¥",
    label: "日本",
  },
};
