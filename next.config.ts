import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Formats modernes servis en priorité (gain de poids important sur les JPG)
    formats: ["image/avif", "image/webp"],
    // Tailles réellement utilisées par les carrousels/galeries du site
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [48, 96, 144, 160, 192, 240, 320, 384],
    // Cache long : les visuels du projet changent rarement
    minimumCacheTTL: 60 * 60 * 24 * 30,
    contentDispositionType: "inline",
  },
};

export default nextConfig;

