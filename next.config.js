/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        MONGODB_URI: "mongodb://localhost:27017/taskage",
    },
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },
};

module.exports = nextConfig;
