import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    const dashboardUrl = process.env.DASHBOARD_URL || 'http://localhost:3001';

    return [
      {
        source: '/dashboard',
        destination: `${dashboardUrl}`,
      },
      {
        source: '/dashboard/:path*',
        destination: `${dashboardUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
