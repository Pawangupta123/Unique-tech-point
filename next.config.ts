import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // Allowed external image hosts (Next 16 uses remotePatterns, not domains).
    // Unsplash = sample product photos. Add the Supabase Storage host here in
    // Phase 1 once the project is created (e.g. <ref>.supabase.co).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
