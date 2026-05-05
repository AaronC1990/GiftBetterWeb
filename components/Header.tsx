"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookmarkIcon, ClockIcon, LogInIcon, LogOutIcon, BookOpenIcon } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="bg-header text-white border-b border-white/10">
      <div className="max-w-screen-lg mx-auto px-4 h-14 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-lg font-bold font-playfair tracking-wide truncate">
            GiftBetter
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/guides"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white\80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <BookOpenIcon size={14} />
            <span className="hidden sm:inline">Guides</span>
          </Link>
          <Link
            href="/saved"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <BookmarkIcon size={14} />
            <span className="hidden sm:inline">Saved</span>
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ClockIcon size={14} />
            <span className="hidden sm:inline">History</span>
          </Link>

          {user ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <LogOutIcon size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          ) : (
            <Link
              href="/auth"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-ruby/80 hover:bg-ruby text-white transition-colors ml-1"
            >
              <LogInIcon size={14} />
              <span>Sign In</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
