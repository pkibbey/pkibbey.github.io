import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  // Export as a static site for GitHub Pages
  output: "export",
  images: {
    // Not using next/image; ensure no remote optimizations are required when exporting
    unoptimized: true,
  },
};

export default nextConfig;
