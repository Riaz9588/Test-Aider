/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dummyjson.com', "cdn.dummyjson.com", "source.unsplash.com"],
  },
}

module.exports = nextConfig
