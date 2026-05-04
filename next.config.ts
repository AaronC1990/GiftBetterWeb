import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.amazon.com" },
      { protocol: "https", hostname: "**.amazon.co.uk" },
      { protocol: "https", hostname: "**.amazon.de" },
      { protocol: "https", hostname: "**.amazon.co.jp" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "**.serpapi.com" },
      { protocol: "https", hostname: "serpapi.com" },
      // Google image results from SerpAPI
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "**.gstatic.com" },
      { protocol: "https", hostname: "**.ggpht.com" },
      // Generic — any HTTPS image host (SerpAPI returns images from many domains)
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
