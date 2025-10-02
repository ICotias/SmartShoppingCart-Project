/** @type {import('next').NextConfig} */
const nextConfig = {
  // REMOVA esta linha: output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // ... outros env vars
  }
}

module.exports = nextConfig