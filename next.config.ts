import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "optimistic-firefly-857.eu-west-1.convex.cloud",
        port: "",
      },
    ],
  },
};

export default nextConfig;
