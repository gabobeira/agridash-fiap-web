import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Em desenvolvimento, usa localhost. Em produção, usar URLs dos serviços deployados
    const dashboardUrl = process.env.DASHBOARD_URL || 'http://localhost:3001';
    
    return [
      {
        source: '/dashboard',
        destination: `${dashboardUrl}/dashboard`
      },
      {
        source: '/dashboard/:path*',
        destination: `${dashboardUrl}/dashboard/:path*`
      }
    ];
  }
};

export default nextConfig;
