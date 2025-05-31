import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'picsum.photos',
      's3.sellerpintar.com',
      'res.cloudinary.com',
      'localhost:3000',
    ],
  },
};

export default nextConfig;
