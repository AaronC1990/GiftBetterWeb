import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { detectRegionServer } from "@/lib/regionServer";
import { regionToLocale } from "@/lib/i18n";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "GiftBetter — Find the Perfect Gift",
  description:
    "Answer a few quick questions and get personalized gift ideas with Amazon buy links.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const region = await detectRegionServer();
  const locale = regionToLocale(region);

  return (
    <html lang={locale} className={`${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-bg">
        <TranslationProvider locale={locale}>
          {children}
        </TranslationProvider>
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
