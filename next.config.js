/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // Раскомментируйте и измените basePath если репозиторий НЕ username.github.io
  // basePath: '/site_vera',
  // Для картинок из next/image нужно unoptimized в static export
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
