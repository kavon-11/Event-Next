import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // port: '',
        // pathname: '/dpx9jsxzf/**',
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
  // imporve react performance after npm install babel-plugin-react-compiler@latest
  // auto use of uememo and usecallback in react components
  experimental: {
    turbopackFileSystemCacheForDev: true,//faster dev builds
    useCache: true,
  },
};

export default nextConfig;
