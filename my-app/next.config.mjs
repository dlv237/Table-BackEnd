/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
    webpack: (config, options) => {
      if (options.isServer) {
        config.watchOptions = {
          poll: 1000, // Check for changes every second
          aggregateTimeout: 300, // delay before reloading
          ignored: /node_modules/,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;