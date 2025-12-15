import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/peggy-blog-web',
  assetPrefix: '/peggy-blog-web/',
};

export default nextConfig;
