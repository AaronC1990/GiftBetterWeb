import { notFound } from "next/navigation";
import Link from "next/link";
import { ShoppingCartIcon, ArrowLeftIcon } from "lucide-react";
import Header from "@/components/Header";
import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { buildAmazonUrlWithCategory } from "@/lib/amazon";
import { detectRegionServer } from "@/lib/regionServer";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — GiftBetter`,
    description: guide.intro,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const region = await detectRegionServer();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#fdf8f8]">
        {/* Hero */}
        <section className="bg-header text-white py-12 px-4">
          <div className="max-w-screen-md mx-auto">
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeftIcon size={14} />
              All Guides
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair leading-tight mb-2">
              {guide.title}
            </h1>
            <p className="text-white/70 text-sm">{guide.subtitle}</p>
          </div>
        </section>

        <div className="max-w-screen-md mx-auto px-4 py-10">
          {/* Intro */}
          <p className="text-gray-700 leading-relaxed mb-10 text-base">
            {guide.intro}
          </p>

          {/* Products */}
          <div className="space-y-8">
            {guide.products.map((product, i) => {
              const buyUrl = buildAmazonUrlWithCategory(
                product.searchQuery,
                product.category,
                region
              );
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-black/8 shadow-sm p-6 flex flex-col sm:flex-row gap-5"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h2 className="text-base font-bold text-gray-900 font-playfair">
                        {product.name}
                      </h2>
                      <span className="text-sm font-bold text-gold flex-shrink-0">
                        {product.priceHint}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mt-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex sm:flex-col justify-end sm:justify-center flex-shrink-0">
                    <a
                      href={buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-ruby hover:bg-ruby-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                    >
                      <ShoppingCartIcon size={13} />
                      Shop on Amazon
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Affiliate disclosure */}
          <p className="text-xs text-gray-400 mt-10 leading-relaxed border-t border-black/6 pt-6">
            {AMAZON_DISCLOSURE}
          </p>

          {/* CTA */}
          <div className="mt-10 bg-header text-white rounded-2xl p-8 text-center">
            <p className="font-playfair font-bold text-xl mb-2">
              Want a personalised recommendation?
            </p>
            <p className="text-white/70 text-sm mb-5">
              Answer a few quick questions and we'll pick the perfect gift for
              your specific person.
            </p>
            <Link
              href="/quiz/1"
              className="inline-block bg-ruby hover:bg-ruby-dark text-white font-bold text-sm px-8 py-3 rounded-xl transition-colors"
            >
              Take the Gift Quiz
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
