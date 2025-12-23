import type { NextConfig } from "next";
import { API_SERVER_URL } from './src/lib/api/config';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_SERVER_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
