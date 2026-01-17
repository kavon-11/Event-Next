import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler : true, 
  // imporve react performance after npm install babel-plugin-react-compiler@latest
  // auto use of uememo and usecallback in react components
  experimental: {
    turbopackFileSystemCacheForDev: true,//faster dev builds
  },
};

export default nextConfig;
