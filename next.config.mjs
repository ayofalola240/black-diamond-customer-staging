const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bdf-auction.s3.eu-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "bdf-auction-bucket.s3.eu-west-2.amazonaws.com",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_Backend_URL}/api/:path*`,
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: "/profile",
        destination: "/profile/account-information",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.FRONTEND_BASE_URL || "http://localhost:3000",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

export default nextConfig;
