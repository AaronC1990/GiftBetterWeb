import Link from "next/link";
import { BookOpenIcon, ArrowRightIcon } from "lucide-react";
import Header from "@/components/Header";
import { GUIDES } from "@/lib/guides";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift Guides — GiftBetter",
  description:
    "Curated gift guides for every occasion, interest, and budget. Discover thoughtful ideas handpicked to help you find the perfect gift.",
};

export default function GuidesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#fdf8f8]">
        {/* Hero */}
        <section className="bg-header text-white py-14 px-4">
          <div className="max-w-screen-md mx-auto text-center">
            <div className="flex justify-center mb-4">
              <BookOpenIcon size={36} className="text-gold" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-playfair mb-3">
              Gift Guides
            </h1>
            <p className="text-white/70 text-base max-w-md mx-auto">
              Curated ideas for every person, occasion, and budget — hand-picked
              to take the guesswork out of gift giving.
            </p>
          </div>
        </section>

        {/* Guide cards */}
        <section className="max-w-screen-md mx-auto px-4 py-12">
          <div className="grid gap-6">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-white rounded-2xl border border-black/8 shadow-sm p-6 flex items-start gap-5 hover:shadow-md transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-ruby transition-colors font-playfair leading-snug">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{guide.subtitle}</p>
                  <p className="text-xs text-ruby mt-3 font-medium">
                    {guide.products.length} picks
                  </p>
                </div>
                <ArrowRightIcon
                  size={18}
                  className="text-gray-300 group-hover:text-ruby transition-colors flex-shrink-0 mt-1"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pb-16 px-4">
          <p className="text-sm text-gray-500 mb-4">
            Want personalised picks chosen just for someone specific?
          </p>
          <Link
            href="/quiz/1"
            className="inline-block bg-ruby hover:bg-ruby-dark text-white font-bold text-sm px-8 py-3 rounded-xl transition-colors"
          >
            Take the Gift Quiz
          </Link>
        </section>
      </main>
    </>
  );
}
