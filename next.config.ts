import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Tailwind v4 CSS pipeline; disable Cache Components / PPR shell
  // so client waitlist handlers hydrate reliably in this MVP.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
