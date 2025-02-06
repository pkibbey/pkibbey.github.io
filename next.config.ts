/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/phineas-dev.github.com',
  assetPrefix: '/phineas-dev.github.com/',
};

module.exports = nextConfig;
