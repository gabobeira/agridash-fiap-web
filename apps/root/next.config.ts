import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: 'http://localhost:3001/dashboard'
      },
      {
        source: '/dashboard/:path*',
        destination: 'http://localhost:3001/dashboard/:path*'
      }
    ];
  }
};

export default nextConfig;
