import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    // Skip during build — type-check runs separately to avoid OOM in Turbopack worker
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
