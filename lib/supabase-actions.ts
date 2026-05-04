"use client";

import { createClient } from "./supabase-browser";
import type { QuizAnswers } from "./quiz";
import type { GiftIdea, SavedGift, TrendingGift, GiftSession } from "@/types";
import type { Region } from "./region";
import { sanitizeQuizAnswers, sanitizeRegion, sanitizeString } from "./sanitize";

function getSupabase() {
  return createClient();
}

// ── Gift recommendations ────────────────────────────────────────────────────

export async function fetchGiftRecommendations(
  quiz: QuizAnswers,
  pro = false,
  region: Region = "us"
): Promise<{ session_id: string | null; gifts: GiftIdea[] }> {
  const supabase = getSupabase();
  const sanitizedQuiz = sanitizeQuizAnswers(quiz);
  const sanitizedRegion = sanitizeRegion(region);

  const { data, error } = await supabase.functions.invoke("gift-recommend", {
    body: { quiz: sanitizedQuiz, pro, region: sanitizedRegion },
  });
  if (error) throw new Error(error.message);
  return data as { session_id: string | null; gifts: GiftIdea[] };
}

export async function fetchTrendingGifts(region: Region = "us"): Promise<TrendingGift[]> {
  const supabase = getSupabase();
  const sanitizedRegion = sanitizeRegion(region);

  const { data, error } = await supabase.functions.invoke("gift-recommend", {
    body: { mode: "trending", region: sanitizedRegion },
  });
  if (error) throw error;
  return data.gifts as TrendingGift[];
}

// ── Saved gifts ─────────────────────────────────────────────────────────────

export async function saveGift(params: {
  recommendation_id?: string;
  name: string;
  description: string;
  search_query: string;
  price_estimate?: string;
  for_person?: string;
  occasion?: string;
  asin?: string;
  category?: string;
  image_url?: string;
  amazon_price?: string;
}): Promise<void> {
  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const sanitizedParams = {
    ...params,
    name: sanitizeString(params.name),
    description: sanitizeString(params.description),
    search_query: sanitizeString(params.search_query),
    for_person: params.for_person ? sanitizeString(params.for_person) : params.for_person,
    occasion: params.occasion ? sanitizeString(params.occasion) : params.occasion,
    category: params.category ? sanitizeString(params.category) : params.category,
  };

  const { error } = await supabase
    .from("saved_gifts")
    .insert({ user_id: user.id, ...sanitizedParams });
  if (error) throw error;
}

export async function getSavedGiftCount(): Promise<number> {
  const supabase = getSupabase();
  const { count, error } = await supabase
    .from("saved_gifts")
    .select("*", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}

export async function fetchSavedGifts(): Promise<SavedGift[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("saved_gifts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as SavedGift[];
}

export async function deleteSavedGift(id: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from("saved_gifts").delete().eq("id", id);
  if (error) throw error;
}

// ── Gift History ─────────────────────────────────────────────────────────────

export async function getGiftHistory(): Promise<GiftSession[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("quiz_sessions")
    .select(`id, relationship, occasion, age_range, created_at,
             gift_recommendations(name)`)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw error;

  return (data ?? []).map((s: any) => ({
    id: s.id,
    relationship: s.relationship,
    occasion: s.occasion,
    age_range: s.age_range,
    created_at: s.created_at,
    recommendation_count: s.gift_recommendations?.length ?? 0,
    preview_gifts: (s.gift_recommendations ?? []).slice(0, 3).map((r: any) => r.name),
  }));
}

export async function getSessionGifts(sessionId: string): Promise<GiftIdea[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("gift_recommendations")
    .select("*")
    .eq("session_id", sessionId)
    .order("position");
  if (error) throw error;
  return data as GiftIdea[];
}
