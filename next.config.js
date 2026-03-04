/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // static export — no server-side runtime
  trailingSlash: true,
  images: {
    unoptimized: true,       // required for static export
  },
  // Security headers applied at Netlify/Vercel layer via docs/DEPLOYMENT.md
};

module.exports = nextConfig;
