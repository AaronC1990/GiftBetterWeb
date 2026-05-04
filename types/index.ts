// types/index.ts

export interface GiftSession {
  id: string;
  relationship: string;
  occasion: string;
  age_range: string;
  created_at: string;
  recommendation_count: number;
  preview_gifts: string[];  // first 2-3 gift names
}

export interface TrendingGift {
  name: string;
  tagline: string;
  description: string;
  search_query: string;
  price_estimate: string;
  category: string;
  asin?: string;
  image_url?: string;
  amazon_price?: string;
}

export interface GiftIdea {
  id?: string;
  name: string;
  description: string;
  search_query: string;
  price_estimate: string;
  category: string;
  asin?: string;
  image_url?: string;
  amazon_price?: string;
}

export interface SavedGift extends GiftIdea {
  id: string;
  user_id: string;
  recommendation_id?: string;
  for_person?: string;
  occasion?: string;
  created_at: string;
}

export interface RecipientProfile {
  id: string;
  user_id: string;
  name: string;
  relationship?: string;
  gender?: string;
  age_range?: string;
  interests?: string[];
  birthday?: string;                  // ISO date string YYYY-MM-DD
  anniversary?: string;               // ISO date string YYYY-MM-DD, optional
  birthday_remind_days?: number[];    // days-before offsets, e.g. [7, 0]
  anniversary_remind_days?: number[]; // days-before offsets, e.g. [7, 0]
  notes?: string;
  created_at: string;
}

export type Occasion =
  | "birthday"
  | "anniversary"
  | "holiday"
  | "graduation"
  | "new_baby"
  | "wedding"
  | "work_milestone"
  | "just_because";

export type Relationship =
  | "partner"
  | "parent"
  | "sibling"
  | "friend"
  | "coworker"
  | "child"
  | "grandparent"
  | "other";
