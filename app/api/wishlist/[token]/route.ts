import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const CORS = {
  "Access-Control-Allow-Origin": "*",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token || token.length > 64) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400, headers: CORS });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: tokenRow, error: tokenErr } = await admin
    .from("wishlist_tokens")
    .select("user_id")
    .eq("token", token)
    .single();

  if (tokenErr || !tokenRow) {
    return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS });
  }

  const { data: gifts, error: giftsErr } = await admin
    .from("wishlist_items")
    .select("*")
    .eq("user_id", tokenRow.user_id)
    .order("created_at", { ascending: false });

  if (giftsErr) {
    return NextResponse.json({ error: "Internal error" }, { status: 500, headers: CORS });
  }

  return NextResponse.json({ gifts: gifts ?? [] }, { headers: CORS });
}
