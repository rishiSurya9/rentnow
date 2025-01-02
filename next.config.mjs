/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      PUBLIC_API: process.env.PUBLIC_API,
    },
};

export default nextConfig;
