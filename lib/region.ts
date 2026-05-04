export type Region = "us" | "uk" | "de" | "jp";
export type Locale = "en" | "de" | "ja";

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
