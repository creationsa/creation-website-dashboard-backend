import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const isProduction = process.env.NODE_ENV === "production";

const localRemotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] =
  [
    {
      protocol: "http",
      hostname: "127.0.0.1",
      port: "8000",
    },
    {
      protocol: "http",
      hostname: "localhost",
      port: "8000",
    },
  ];

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 90],
    unoptimized: !isProduction,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.creation.sa",
      },
      {
        protocol: "https",
        hostname: "creation.sa",
      },
      {
        protocol: "https",
        hostname: "creation.wecreation.tech",
      },
      {
        protocol: "https",
        hostname: "api.creation.sa",
      },
      ...(isProduction ? [] : localRemotePatterns),
    ],
  },

  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
