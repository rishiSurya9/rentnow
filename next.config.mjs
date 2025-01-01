/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*', // Match `/api` and all sub-paths
                destination: 'http://localhost:3001/api/:path*', 
            },
        ];
    },
};

export default nextConfig;
