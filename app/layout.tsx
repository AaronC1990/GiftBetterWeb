import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-bg">
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
