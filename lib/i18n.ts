import type { Region } from "./region";
import en from "@/constants/translations/en";
import de from "@/constants/translations/de";
import ja from "@/constants/translations/ja";

export type WebLocale = "en" | "de" | "ja";

export interface WebTranslation {
  appName: string;
  lang: WebLocale;

  nav: {
    guides: string;
    saved: string;
    history: string;
    signIn: string;
    signOut: string;
  };

  home: {
    headline: string;
    subheadline: string;
    cta: string;
    hotGiftsTitle: string;
    hotGiftsLoading: string;
    appStoreSoon: string;
    playStoreSoon: string;
  };

  quiz: {
    stepOf: (current: number, total: number) => string;
    back: string;
    home: string;
    selectMultiple: string;
    extraContextPlaceholder: string;
    loading: string;
    submit: string;
    next: string;
    errorIncomplete: string;
    errorGeneric: string;
  };

  results: {
    title: string;
    subtitle: (forPerson: string, occasion: string) => string;
    count: (n: number) => string;
    empty: string;
    startQuiz: string;
    startOver: string;
  };

  saved: {
    title: string;
    count: (n: number) => string;
    empty: string;
    findCta: string;
    deleteConfirm: string;
    removed: string;
    removeError: string;
    loadError: string;
    buyBtn: string;
    removeTitle: string;
  };

  history: {
    title: string;
    pastSearches: (n: number) => string;
    empty: string;
    findCta: string;
    loadError: string;
    giftCount: (n: number) => string;
    pageTitle: string;
    sessionGiftCount: (n: number) => string;
    backLink: string;
    noGifts: string;
  };

  auth: {
    signIn: string;
    createAccount: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    signInBtn: string;
    createBtn: string;
    signingIn: string;
    creating: string;
    noAccount: string;
    hasAccount: string;
    signUp: string;
    welcome: string;
    error: string;
    checkEmail: string;
    checkEmailBody: (email: string) => string;
    backToSignIn: string;
  };

  giftCard: {
    buyBtn: string;
    saveBtn: string;
    savedBtn: string;
    topPick: string;
    saveError: string;
    notAuth: string;
  };

  trending: {
    buyBtn: string;
  };

  amazonDisclosure: string;

  quizQuestions: Record<string, string>;
  quizOptions: {
    relationship: Record<string, string>;
    gender: Record<string, string>;
    occasion: Record<string, string>;
    age_range: Record<string, string>;
    interests: Record<string, string>;
    vibe: Record<string, string>;
    budget: Record<string, string>;
  };

  occasionLabels: Record<string, string>;
  relationshipLabels: Record<string, string>;
}

const translations: Record<WebLocale, WebTranslation> = { en, de, ja };

export function t(locale: WebLocale): WebTranslation {
  return translations[locale] ?? translations.en;
}

export function regionToLocale(region: Region): WebLocale {
  if (region === "de") return "de";
  if (region === "jp") return "ja";
  return "en";
}
