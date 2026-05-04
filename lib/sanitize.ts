export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/\0/g, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "")
    .replace(/on\w+=\w+/gi, "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/data:[^,]*,/gi, "")
    .substring(0, 1000);
}

export function sanitizeQuizAnswers(answers: any): any {
  if (!answers || typeof answers !== "object") return {};
  const sanitized: any = {};

  const stringFields = ["relationship", "gender", "occasion", "age_range", "extra_context"];
  stringFields.forEach((field) => {
    sanitized[field] =
      typeof answers[field] === "string"
        ? sanitizeString(answers[field])
        : answers[field];
  });

  if (Array.isArray(answers.interests)) {
    sanitized.interests = answers.interests
      .map((i: any) => (typeof i === "string" ? sanitizeString(i) : i))
      .filter((i: string) => typeof i === "string" && i.length > 0);
  } else {
    sanitized.interests = [];
  }

  if (Array.isArray(answers.vibe)) {
    sanitized.vibe = answers.vibe
      .map((v: any) => (typeof v === "string" ? sanitizeString(v) : v))
      .filter((v: string) => typeof v === "string" && v.length > 0);
  } else {
    sanitized.vibe = [];
  }

  sanitized.budget_min =
    typeof answers.budget_min === "number" && !isNaN(answers.budget_min)
      ? Math.max(0, Math.min(10000, answers.budget_min))
      : 0;

  sanitized.budget_max =
    answers.budget_max == null
      ? null
      : typeof answers.budget_max === "number" && !isNaN(answers.budget_max)
      ? Math.max(0, Math.min(10000, answers.budget_max))
      : null;

  return sanitized;
}

export function sanitizeRegion(region: string): string {
  return ["us", "uk", "de", "jp"].includes(region) ? region : "us";
}
