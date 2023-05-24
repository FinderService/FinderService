/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ["res.cloudinary.com",'th.bing.com', 'cdn.pixabay.com'],
  },
};
