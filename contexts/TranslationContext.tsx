"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { WebTranslation, WebLocale } from "@/lib/i18n";
import en from "@/constants/translations/en";
import de from "@/constants/translations/de";
import ja from "@/constants/translations/ja";

const TranslationContext = createContext<WebTranslation>(en);

export function TranslationProvider({
  locale,
  children,
}: {
  locale: WebLocale;
  children: ReactNode;
}) {
  const translation = locale === "ja" ? ja : locale === "de" ? de : en;
  return (
    <TranslationContext.Provider value={translation}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): WebTranslation {
  return useContext(TranslationContext);
}
