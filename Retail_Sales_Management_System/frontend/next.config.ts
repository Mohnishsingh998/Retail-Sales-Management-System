import type { NextConfig } from "next";

const nextConfig = {
  reactCompiler: true,

  typescript: {
    ignoreBuildErrors: true,
  },
} satisfies NextConfig;

export default nextConfig;
