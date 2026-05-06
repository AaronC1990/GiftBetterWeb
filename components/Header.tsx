"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookmarkIcon, ClockIcon, LogInIcon, LogOutIcon, BookOpenIcon } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { useTranslation } from "@/contexts/TranslationContext";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const tr = useTranslation();

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
          <Image
            src="/logo.png"
            alt={tr.appName}
            width={30}
            height={30}
            className="rounded-lg flex-shrink-0"
            priority
          />
          <span className="text-lg font-bold font-playfair tracking-wide truncate">
            {tr.appName}
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/guides"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <BookOpenIcon size={14} />
            <span className="hidden sm:inline">{tr.nav.guides}</span>
          </Link>
          <Link
            href="/saved"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <BookmarkIcon size={14} />
            <span className="hidden sm:inline">{tr.nav.saved}</span>
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ClockIcon size={14} />
            <span className="hidden sm:inline">{tr.nav.history}</span>
          </Link>

          {user ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <LogOutIcon size={14} />
              <span className="hidden sm:inline">{tr.nav.signOut}</span>
            </button>
          ) : (
            <Link
              href="/auth"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-ruby/80 hover:bg-ruby text-white transition-colors ml-1"
            >
              <LogInIcon size={14} />
              <span>{tr.nav.signIn}</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
