import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "utfs.io", port: "", protocol: "https" }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
