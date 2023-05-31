/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ["res.cloudinary.com","lh3.googleusercontent.com",'th.bing.com', 'cdn.pixabay.com', 'platform-lookaside.fbsbx.com'],
  },
};
