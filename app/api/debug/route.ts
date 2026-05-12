import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "testtoken";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const url = `${supabaseUrl}/functions/v1/wishlist-view?token=${encodeURIComponent(token)}`;

  let fetchResult: unknown = null;
  let fetchError: string | null = null;
  let status: number | null = null;

  try {
    const res = await fetch(url, {
      headers: { apikey: anonKey! },
    });
    status = res.status;
    fetchResult = await res.json();
  } catch (e) {
    fetchError = String(e);
  }

  return NextResponse.json({
    supabaseUrl,
    hasAnonKey: !!anonKey,
    fetchUrl: url,
    httpStatus: status,
    fetchError,
    fetchResult,
  });
}
