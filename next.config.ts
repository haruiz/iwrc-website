import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : (isProd ? "/iwrc-website" : "");

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  basePath: basePath || undefined,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

export default nextConfig;
