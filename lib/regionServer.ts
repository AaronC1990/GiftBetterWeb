import { headers } from "next/headers";
import { detectRegionFromAcceptLanguage } from "./region";
import type { Region } from "./region";

/** Detect region from the incoming request's Accept-Language header (server components only). */
export async function detectRegionServer(): Promise<Region> {
  try {
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language") ?? "";
    return detectRegionFromAcceptLanguage(acceptLanguage);
  } catch {
    return "us";
  }
}
