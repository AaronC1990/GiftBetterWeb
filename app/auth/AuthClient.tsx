"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2Icon, ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase-browser";
import { useTranslation } from "@/contexts/TranslationContext";

type Mode = "signin" | "signup";

export default function AuthClient() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const tr = useTranslation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(tr.auth.welcome);
        router.push("/");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSignedUp(true);
      }
    } catch (err: any) {
      toast.error(err?.message ?? tr.auth.error);
    } finally {
      setLoading(false);
    }
  }

  if (signedUp) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="bg-header text-white px-4 h-14 flex items-center">
          <Link href="/" className="font-playfair font-bold text-lg">{tr.appName}</Link>
        </div>
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-sm w-full text-center space-y-4">
            <div className="text-5xl">📬</div>
            <h1 className="text-xl font-bold text-gray-900">{tr.auth.checkEmail}</h1>
            <p className="text-gray-500 text-sm">
              {tr.auth.checkEmailBody(email)}
            </p>
            <button
              onClick={() => { setSignedUp(false); setMode("signin"); }}
              className="text-ruby hover:underline text-sm font-medium"
            >
              {tr.auth.backToSignIn}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-header text-white px-4 h-14 flex items-center gap-3">
        <Link href="/" className="text-white/60 hover:text-white transition-colors">
          <ArrowLeftIcon size={18} />
        </Link>
        <span className="font-playfair font-bold text-lg">{tr.appName}</span>
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-sm w-full space-y-6">
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={[
                "flex-1 py-2.5 text-sm border-b-2 transition-colors",
                mode === "signin"
                  ? "border-ruby text-ruby font-bold"
                  : "border-transparent text-gray-400 font-medium hover:text-gray-600",
              ].join(" ")}
            >
              {tr.auth.signIn}
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={[
                "flex-1 py-2.5 text-sm border-b-2 transition-colors",
                mode === "signup"
                  ? "border-ruby text-ruby font-bold"
                  : "border-transparent text-gray-400 font-medium hover:text-gray-600",
              ].join(" ")}
            >
              {tr.auth.createAccount}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{tr.auth.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={tr.auth.emailPlaceholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-ruby/40 focus:border-ruby"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{tr.auth.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder={tr.auth.passwordPlaceholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-ruby/40 focus:border-ruby"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ruby hover:bg-ruby-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2Icon size={16} className="animate-spin" />
                  {mode === "signin" ? tr.auth.signingIn : tr.auth.creating}
                </>
              ) : mode === "signin" ? (
                tr.auth.signInBtn
              ) : (
                tr.auth.createBtn
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400">
            {mode === "signin" ? tr.auth.noAccount : tr.auth.hasAccount}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-ruby hover:underline font-medium"
            >
              {mode === "signin" ? tr.auth.signUp : tr.auth.signIn}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
