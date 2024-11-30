import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: '',
        pathname: '/**',
        search: '',
      }
    ]
  }
};

export default nextConfig;
