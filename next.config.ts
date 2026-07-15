import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "img-src 'self' data: https:",
  "font-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline' https:",
  isDev
    ? "connect-src 'self' ws: wss: http: https:"
    : "connect-src 'self' https:",
  `script-src 'self' 'unsafe-inline' ${isProd ? "" : "'unsafe-eval'"}`.trim(),
  "frame-ancestors 'none'",
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: isProd ? "max-age=63072000; includeSubDomains; preload" : "max-age=0",
          },
          {
            key: "Content-Security-Policy",
            value: isProd ? contentSecurityPolicy.join("; ") + "; upgrade-insecure-requests" : contentSecurityPolicy.join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
