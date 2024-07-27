/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dummyjson.com', "cdn.dummyjson.com", "picsum.photos"],
  },
}

module.exports = nextConfig
