/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
  i18n: {
    locales: ['en', 'sv'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
