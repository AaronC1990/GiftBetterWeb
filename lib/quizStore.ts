"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { QuizAnswers } from "./quiz";
import { sanitizeString } from "./sanitize";
import { detectRegionBrowser } from "./region";
import type { Region } from "./region";
import type { GiftIdea } from "@/types";

interface QuizStore {
  answers: Partial<QuizAnswers>;
  results: GiftIdea[];
  sessionId: string | null;
  region: Region;
  setField: <K extends keyof QuizAnswers>(field: K, value: QuizAnswers[K]) => void;
  toggleArrayField: (field: "interests" | "vibe", value: string) => void;
  setResults: (gifts: GiftIdea[], sessionId: string | null) => void;
  setRegion: (region: Region) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      answers: {},
      results: [],
      sessionId: null,
      region: "us",

      setField: (field, value) =>
        set((state) => {
          let sanitizedValue: any = value;
          if (typeof value === "string") {
            sanitizedValue = sanitizeString(value);
          } else if (Array.isArray(value)) {
            sanitizedValue = (value as string[]).map((item) =>
              typeof item === "string" ? sanitizeString(item) : item
            );
          }
          return { answers: { ...state.answers, [field]: sanitizedValue } };
        }),

      toggleArrayField: (field, value) =>
        set((state) => {
          const sanitized = sanitizeString(value);
          const current = (state.answers[field] as string[] | undefined) ?? [];
          const updated = current.includes(sanitized)
            ? current.filter((v) => v !== sanitized)
            : [...current, sanitized];
          return { answers: { ...state.answers, [field]: updated } };
        }),

      setResults: (gifts, sessionId) => set({ results: gifts, sessionId }),

      setRegion: (region) => set({ region }),

      reset: () => set({ answers: {}, results: [], sessionId: null }),
    }),
    {
      name: "giftspark-quiz",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? sessionStorage : localStorage
      ),
    }
  )
);
