import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true, // disable optimization for static export
  },
  trailingSlash: true,
};

export default nextConfig;
