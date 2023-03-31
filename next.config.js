/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.NODE_ENV === "production"
    ? "http://contacts-app-next-js.vercel.app"
    : process.env.API_URL
  }
}

module.exports = nextConfig
