/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode - cause data fetching 2 times
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
