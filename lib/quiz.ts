import { sanitizeString } from "./sanitize";

export interface QuizStep {
  id: string;
  question: string;
  field: keyof QuizAnswers;
  type: "single" | "multi" | "budget" | "text";
  options?: { label: string; value: string; emoji: string }[];
}

export interface QuizAnswers {
  relationship: string;
  gender: string;
  occasion: string;
  age_range: string;
  interests: string[];
  vibe?: string[];
  budget_min: number;
  budget_max: number | null;
  extra_context?: string;
}

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: "relationship",
    question: "Who are you shopping for?",
    field: "relationship",
    type: "single",
    options: [
      { label: "Partner / Spouse",  value: "partner",     emoji: "💑" },
      { label: "Parent",            value: "parent",      emoji: "👨‍👩‍👦" },
      { label: "Sibling",           value: "sibling",     emoji: "👫" },
      { label: "Friend",            value: "friend",      emoji: "🤝" },
      { label: "Coworker / Boss",   value: "coworker",    emoji: "💼" },
      { label: "Child",             value: "child",       emoji: "🧒" },
      { label: "Grandparent",       value: "grandparent", emoji: "👴" },
      { label: "Myself",            value: "myself",      emoji: "🙋" },
      { label: "Someone else",      value: "other",       emoji: "✨" },
    ],
  },
  {
    id: "gender",
    question: "What's their gender?",
    field: "gender",
    type: "single",
    options: [
      { label: "Man",        value: "man",        emoji: "👨" },
      { label: "Woman",      value: "woman",      emoji: "👩" },
      { label: "Non-binary", value: "non_binary", emoji: "🧑" },
      { label: "Not sure",   value: "not_sure",   emoji: "🎁" },
    ],
  },
  {
    id: "occasion",
    question: "What's the occasion?",
    field: "occasion",
    type: "single",
    options: [
      { label: "Birthday",       value: "birthday",       emoji: "🎂" },
      { label: "Anniversary",    value: "anniversary",    emoji: "💍" },
      { label: "Holiday",        value: "holiday",        emoji: "🎄" },
      { label: "Graduation",     value: "graduation",     emoji: "🎓" },
      { label: "New baby",       value: "new_baby",       emoji: "👶" },
      { label: "Wedding",        value: "wedding",        emoji: "💒" },
      { label: "Work milestone", value: "work_milestone", emoji: "🏆" },
      { label: "Mother's Day",   value: "mothers_day",    emoji: "🌸" },
      { label: "Just because",   value: "just_because",   emoji: "💝" },
    ],
  },
  {
    id: "age_range",
    question: "How old are they?",
    field: "age_range",
    type: "single",
    options: [
      { label: "Under 12", value: "under_12", emoji: "🧸" },
      { label: "13–17",    value: "13_17",    emoji: "🎮" },
      { label: "18–25",    value: "18_25",    emoji: "🎉" },
      { label: "26–40",    value: "26_40",    emoji: "☕" },
      { label: "41–60",    value: "41_60",    emoji: "🏡" },
      { label: "60+",      value: "60_plus",  emoji: "🌿" },
    ],
  },
  {
    id: "interests",
    question: "What are their interests?",
    field: "interests",
    type: "multi",
    options: [
      { label: "Outdoors / Hiking", value: "outdoors", emoji: "🏔️" },
      { label: "Tech / Gadgets",    value: "tech",     emoji: "💻" },
      { label: "Cooking / Food",    value: "cooking",  emoji: "🍳" },
      { label: "Reading / Books",   value: "reading",  emoji: "📚" },
      { label: "Fitness / Sports",  value: "fitness",  emoji: "🏋️" },
      { label: "Music",             value: "music",    emoji: "🎵" },
      { label: "Art / Crafts",      value: "art",      emoji: "🎨" },
      { label: "Gaming",            value: "gaming",   emoji: "🎮" },
      { label: "Travel",            value: "travel",   emoji: "✈️" },
      { label: "Home / Garden",     value: "home",     emoji: "🪴" },
      { label: "Fashion / Style",   value: "fashion",  emoji: "👗" },
      { label: "Wellness / Spa",    value: "wellness", emoji: "🧘" },
    ],
  },
  {
    id: "vibe",
    question: "How would you describe them?",
    field: "vibe",
    type: "multi",
    options: [
      { label: "Practical & no-fuss",    value: "practical",   emoji: "🔧" },
      { label: "Cozy & homebody",        value: "cozy",        emoji: "🏠" },
      { label: "Adventurous & bold",     value: "adventurous", emoji: "🌋" },
      { label: "Creative & quirky",      value: "creative",    emoji: "🎨" },
      { label: "Sentimental & nostalgic",value: "sentimental", emoji: "💌" },
      { label: "Social & outgoing",      value: "social",      emoji: "🎉" },
    ],
  },
  {
    id: "budget",
    question: "What's your budget?",
    field: "budget_min",
    type: "budget",
    options: [
      { label: "Under $25",  value: "under_25",  emoji: "💵" },
      { label: "Under $50",  value: "under_50",  emoji: "💰" },
      { label: "Under $100", value: "under_100", emoji: "💳" },
      { label: "Under $200", value: "under_200", emoji: "🎁" },
      { label: "No limit",   value: "no_limit",  emoji: "✨" },
    ],
  },
  {
    id: "extra_context",
    question: "Describe them in a few words",
    field: "extra_context",
    type: "text",
  },
];

export const TOTAL_STEPS = QUIZ_STEPS.length;

export function parseBudget(value: string): { min: number; max: number | null } {
  const sanitized = sanitizeString(value);
  if (sanitized === "no_limit") return { min: 0, max: null };
  const max = parseInt(sanitized.replace("under_", ""), 10);
  return { min: 0, max };
}

export function isQuizComplete(answers: Partial<QuizAnswers>): answers is QuizAnswers {
  return !!(
    answers.relationship &&
    answers.gender &&
    answers.occasion &&
    answers.age_range &&
    answers.interests?.length &&
    answers.budget_min !== undefined
  );
}

export function stepParamToIndex(step: string): number {
  return Math.max(0, parseInt(step, 10) - 1);
}

export const RELATIONSHIP_LABELS: Record<string, string> = {
  partner: "Partner",
  parent: "Parent",
  sibling: "Sibling",
  friend: "Friend",
  coworker: "Coworker / Boss",
  child: "Child",
  grandparent: "Grandparent",
  myself: "Myself",
  other: "Someone else",
};

export const OCCASION_LABELS: Record<string, string> = {
  birthday: "Birthday",
  anniversary: "Anniversary",
  holiday: "Holiday",
  graduation: "Graduation",
  new_baby: "New baby",
  wedding: "Wedding",
  work_milestone: "Work milestone",
  mothers_day: "Mother's Day",
  just_because: "Just because",
};
