

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "klr-europe.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
